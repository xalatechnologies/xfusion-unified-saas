import { NotificationService } from './notificationService';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Organization, Subscription, Invoice } from '@/types/database';

export class NotificationTriggers {
  private static instance: NotificationTriggers;
  private notificationService: NotificationService;

  private constructor() {
    this.notificationService = NotificationService.service;
  }

  public static getInstance(): NotificationTriggers {
    if (!NotificationTriggers.instance) {
      NotificationTriggers.instance = new NotificationTriggers();
    }
    return NotificationTriggers.instance;
  }

  // User Registration Trigger
  public async onUserRegistration(user: User): Promise<void> {
    // Notify super admins
    const { data: superAdmins } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'super_admin');

    if (superAdmins) {
      await this.notificationService.sendBulk(
        superAdmins.map(admin => ({
          userId: admin.id,
          organizationId: null,
          type: 'system_alert',
          data: {
            alert_type: 'New User Registration',
            message: `New user registered: ${user.email}`,
            action_required: false
          }
        }))
      );
    }
  }

  // Subscription Change Trigger
  public async onSubscriptionChange(
    subscription: Subscription,
    changeType: 'trial_ending' | 'payment_failed' | 'plan_change'
  ): Promise<void> {
    const organizationId = subscription.organization_id;
    const { data: orgAdmins } = await supabase
      .from('organization_members')
      .select('user_id')
      .eq('organization_id', organizationId)
      .eq('role', 'admin');

    if (orgAdmins) {
      const notificationData = {
        trial_ending: {
          type: 'subscription_update' as const,
          data: {
            plan_name: subscription.plan_name,
            effective_date: subscription.trial_end,
            message: 'Your trial period is ending soon'
          }
        },
        payment_failed: {
          type: 'billing_reminder' as const,
          data: {
            plan_name: subscription.plan_name,
            due_date: new Date().toISOString(),
            message: 'Payment failed for your subscription'
          }
        },
        plan_change: {
          type: 'subscription_update' as const,
          data: {
            plan_name: subscription.plan_name,
            effective_date: subscription.current_period_end,
            message: 'Your subscription plan has been updated'
          }
        }
      }[changeType];

      await this.notificationService.sendBulk(
        orgAdmins.map(admin => ({
          userId: admin.user_id,
          organizationId,
          type: notificationData.type,
          data: notificationData.data
        }))
      );
    }
  }

  // Organization Invitation Trigger
  public async onOrganizationInvite(
    invitedUserId: string,
    organization: Organization,
    inviterName: string,
    role: string
  ): Promise<void> {
    await this.notificationService.send(
      invitedUserId,
      'organization_invite',
      {
        organization_name: organization.name,
        inviter_name: inviterName,
        role,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      organization.id
    );
  }

  // System Maintenance Trigger
  public async onSystemMaintenance(
    message: string,
    startTime: Date,
    endTime: Date,
    affectedServices: string[]
  ): Promise<void> {
    const { data: allUsers } = await supabase
      .from('users')
      .select('id');

    if (allUsers) {
      await this.notificationService.sendBulk(
        allUsers.map(user => ({
          userId: user.id,
          organizationId: null,
          type: 'system_alert',
          data: {
            alert_type: 'System Maintenance',
            message,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            affected_services: affectedServices,
            action_required: false
          }
        }))
      );
    }
  }

  // Security Event Trigger
  public async onSecurityEvent(
    userId: string,
    eventType: 'password_change' | 'new_device' | 'suspicious_activity',
    eventData: Record<string, unknown>
  ): Promise<void> {
    await this.notificationService.send(
      userId,
      'security_alert',
      {
        alert_type: eventType,
        ...eventData,
        timestamp: new Date().toISOString()
      }
    );
  }

  // Billing Event Trigger
  public async onBillingEvent(
    invoice: Invoice,
    eventType: 'payment_due' | 'payment_failed' | 'payment_success'
  ): Promise<void> {
    const organizationId = invoice.organization_id;
    const { data: orgAdmins } = await supabase
      .from('organization_members')
      .select('user_id')
      .eq('organization_id', organizationId)
      .eq('role', 'admin');

    if (orgAdmins) {
      const notificationData = {
        payment_due: {
          type: 'billing_reminder' as const,
          data: {
            amount: invoice.amount,
            due_date: invoice.due_date,
            invoice_number: invoice.number
          }
        },
        payment_failed: {
          type: 'billing_reminder' as const,
          data: {
            amount: invoice.amount,
            due_date: invoice.due_date,
            invoice_number: invoice.number,
            retry_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        },
        payment_success: {
          type: 'billing_reminder' as const,
          data: {
            amount: invoice.amount,
            invoice_number: invoice.number,
            payment_date: new Date().toISOString()
          }
        }
      }[eventType];

      await this.notificationService.sendBulk(
        orgAdmins.map(admin => ({
          userId: admin.user_id,
          organizationId,
          type: notificationData.type,
          data: notificationData.data
        }))
      );
    }
  }

  // Export singleton instance
  public static readonly triggers = NotificationTriggers.getInstance();
} 