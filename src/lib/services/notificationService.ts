import { supabase } from '@/lib/supabase';
import type {
  NotificationType,
  NotificationSeverity,
  NotificationCategory,
  Notification,
  NotificationTemplate,
} from '@/types/notifications';
import { EmailTemplates } from './emailTemplates';

interface NotificationConfig {
  type: NotificationType;
  severity: NotificationSeverity;
  category: NotificationCategory;
  expiresInDays?: number;
}

interface NotificationData {
  [key: string]: unknown;
}

export class NotificationService {
  private static instance: NotificationService;
  private notificationConfigs: Map<NotificationType, NotificationConfig>;
  private notificationQueue: Array<{
    userId: string;
    organizationId: string | null;
    type: NotificationType;
    data: NotificationData;
  }> = [];
  private isProcessing = false;

  private constructor() {
    this.notificationConfigs = new Map([
      ['system_alert', { type: 'system_alert', severity: 'info', category: 'system', expiresInDays: 30 }],
      ['user_action', { type: 'user_action', severity: 'info', category: 'user', expiresInDays: 7 }],
      ['subscription_update', { type: 'subscription_update', severity: 'info', category: 'billing', expiresInDays: 30 }],
      ['billing_reminder', { type: 'billing_reminder', severity: 'warning', category: 'billing', expiresInDays: 7 }],
      ['security_alert', { type: 'security_alert', severity: 'error', category: 'security', expiresInDays: 90 }],
      ['organization_invite', { type: 'organization_invite', severity: 'info', category: 'organization', expiresInDays: 14 }],
    ]);
  }

  public static get service(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async getTemplate(type: NotificationType): Promise<NotificationTemplate | null> {
    const { data, error } = await supabase
      .from('notification_templates')
      .select('*')
      .eq('type', type)
      .single();

    if (error) {
      console.error('Failed to fetch notification template:', error);
      return null;
    }

    return data;
  }

  private renderTemplate(template: string, data: NotificationData): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const trimmedKey = key.trim();
      return data[trimmedKey]?.toString() ?? match;
    });
  }

  private async createNotification(
    userId: string,
    organizationId: string | null,
    type: NotificationType,
    data: NotificationData
  ): Promise<Notification | null> {
    const config = this.notificationConfigs.get(type);
    if (!config) {
      console.error(`Invalid notification type: ${type}`);
      return null;
    }

    const template = await this.getTemplate(type);
    if (!template) {
      console.error(`Template not found for type: ${type}`);
      return null;
    }

    const title = this.renderTemplate(template.title_template, data);
    const message = this.renderTemplate(template.message_template, data);
    const expiresAt = config.expiresInDays
      ? new Date(Date.now() + config.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        organization_id: organizationId,
        type,
        severity: config.severity,
        category: config.category,
        title,
        message,
        data,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create notification:', error);
      return null;
    }

    return notification;
  }

  private async getUserEmailPreferences(userId: string): Promise<{
    email_enabled: boolean;
    email: string | null;
  }> {
    const { data: preferences } = await supabase
      .from('notification_preferences')
      .select('email_enabled')
      .eq('user_id', userId)
      .single();

    const { data: user } = await supabase
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();

    return {
      email_enabled: preferences?.email_enabled ?? true,
      email: user?.email ?? null
    };
  }

  private async sendEmail(
    email: string,
    type: NotificationType,
    data: Record<string, unknown>
  ): Promise<void> {
    const unsubscribeLink = `${window.location.origin}/settings/notifications?unsubscribe=${type}`;
    const { subject, html } = EmailTemplates.renderTemplate(type, data, unsubscribeLink);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          to: email,
          subject,
          html,
          unsubscribeLink
        })
      }
    );

    if (!response.ok) {
      console.error('Failed to send email:', await response.json());
    }
  }

  public async send(
    userId: string,
    type: NotificationType,
    data: Record<string, unknown>,
    organizationId?: string
  ): Promise<void> {
    // Create notification in database
    const notification = await this.createNotification(userId, organizationId ?? null, type, data);
    if (!notification) {
      return;
    }

    // Check email preferences and send email if enabled
    const { email_enabled, email } = await this.getUserEmailPreferences(userId);
    if (email_enabled && email) {
      await this.sendEmail(email, type, data);
    }
  }

  public async sendBulk(
    notifications: Array<{
      userId: string;
      type: NotificationType;
      data: Record<string, unknown>;
      organizationId?: string;
    }>
  ): Promise<void> {
    // Create notifications in database
    const results = await Promise.all(
      notifications.map(n => 
        this.createNotification(n.userId, n.organizationId ?? null, n.type, n.data)
      )
    );

    // Send emails in parallel for users with email notifications enabled
    await Promise.all(
      notifications.map(async (n, index) => {
        if (results[index]) {
          const { email_enabled, email } = await this.getUserEmailPreferences(n.userId);
          if (email_enabled && email) {
            await this.sendEmail(email, n.type, n.data);
          }
        }
      })
    );
  }

  public async updateEmailPreferences(
    userId: string,
    emailEnabled: boolean
  ): Promise<void> {
    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        email_enabled: emailEnabled
      });

    if (error) {
      console.error('Failed to update email preferences:', error);
      throw error;
    }
  }
} 