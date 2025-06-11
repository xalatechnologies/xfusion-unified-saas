import type { NotificationType } from '@/types/notifications';

interface EmailTemplate {
  subject: string;
  html: (data: Record<string, unknown>) => string;
}

export class EmailTemplates {
  private static templates: Record<NotificationType, EmailTemplate> = {
    system_alert: {
      subject: '[System Alert] {{alert_type}}',
      html: (data) => `
        <h2>System Alert: ${data.alert_type}</h2>
        <p>${data.message}</p>
        ${data.action_required ? '<p><strong>Action Required</strong></p>' : ''}
        <hr>
        <p><small>You received this email because you are subscribed to system alerts.</small></p>
        <p><small><a href="{{unsubscribe_link}}">Unsubscribe</a></small></p>
      `
    },
    user_action: {
      subject: 'Action Required: {{action_type}}',
      html: (data) => `
        <h2>Action Required</h2>
        <p>${data.message}</p>
        <p><a href="${data.action_link}">Take Action</a></p>
        <hr>
        <p><small>You received this email because an action is required from you.</small></p>
        <p><small><a href="{{unsubscribe_link}}">Unsubscribe</a></small></p>
      `
    },
    subscription_update: {
      subject: 'Subscription Update: {{plan_name}}',
      html: (data) => `
        <h2>Subscription Update</h2>
        <p>Your subscription plan has been updated to: ${data.plan_name}</p>
        <p>Effective Date: ${data.effective_date}</p>
        <p>${data.message}</p>
        <hr>
        <p><small>You received this email because you have an active subscription.</small></p>
        <p><small><a href="{{unsubscribe_link}}">Unsubscribe</a></small></p>
      `
    },
    billing_reminder: {
      subject: 'Billing Reminder: {{invoice_number}}',
      html: (data) => `
        <h2>Billing Reminder</h2>
        <p>Invoice #${data.invoice_number}</p>
        <p>Amount Due: $${data.amount}</p>
        <p>Due Date: ${data.due_date}</p>
        ${data.retry_date ? `<p>Next Payment Attempt: ${data.retry_date}</p>` : ''}
        <hr>
        <p><small>You received this email because you are a billing administrator.</small></p>
        <p><small><a href="{{unsubscribe_link}}">Unsubscribe</a></small></p>
      `
    },
    security_alert: {
      subject: 'Security Alert: {{alert_type}}',
      html: (data) => `
        <h2>Security Alert</h2>
        <p>Alert Type: ${data.alert_type}</p>
        <p>Time: ${data.timestamp}</p>
        ${data.device ? `<p>Device: ${data.device}</p>` : ''}
        ${data.location ? `<p>Location: ${data.location}</p>` : ''}
        <hr>
        <p><small>You received this email because this activity affects your account security.</small></p>
        <p><small><a href="{{unsubscribe_link}}">Unsubscribe</a></small></p>
      `
    },
    organization_invite: {
      subject: 'Invitation to join {{organization_name}}',
      html: (data) => `
        <h2>Organization Invitation</h2>
        <p>You have been invited to join ${data.organization_name} as ${data.role} by ${data.inviter_name}.</p>
        <p>This invitation will expire on ${data.expires_at}.</p>
        <p><a href="{{accept_invite_link}}">Accept Invitation</a></p>
        <hr>
        <p><small>You received this email because someone invited you to their organization.</small></p>
      `
    }
  };

  public static getTemplate(type: NotificationType): EmailTemplate {
    const template = this.templates[type];
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }
    return template;
  }

  public static renderTemplate(
    type: NotificationType,
    data: Record<string, unknown>,
    unsubscribeLink?: string
  ): { subject: string; html: string } {
    const template = this.getTemplate(type);
    
    // Replace variables in subject
    let subject = template.subject;
    Object.entries(data).forEach(([key, value]) => {
      subject = subject.replace(`{{${key}}}`, String(value));
    });

    // Generate HTML with data
    let html = template.html(data);

    // Replace unsubscribe link if provided
    if (unsubscribeLink) {
      html = html.replace('{{unsubscribe_link}}', unsubscribeLink);
    }

    return { subject, html };
  }
} 