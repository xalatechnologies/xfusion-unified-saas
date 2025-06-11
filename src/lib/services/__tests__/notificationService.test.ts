import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotificationService } from '../notificationService';
import { supabase } from '@/lib/supabase';
import { EmailTemplates } from '../emailTemplates';
import type { PostgrestFilterBuilder, PostgrestBuilder } from '@supabase/postgrest-js';

// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              email_enabled: true,
              email: 'test@example.com'
            },
            error: null
          }))
        }))
      })) as unknown as PostgrestFilterBuilder<any, any, any>,
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { id: 'notification-1' },
            error: null
          }))
        }))
      })) as unknown as PostgrestBuilder<any>,
      upsert: vi.fn(() => ({
        error: null
      })) as unknown as PostgrestBuilder<any>
    }))
  }
}));

// Mock fetch for email sending
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: { id: 'email-1' } })
  })
) as unknown as typeof fetch;

// Mock window.location
global.window = {
  location: {
    origin: 'http://localhost:3000'
  }
} as unknown as Window & typeof globalThis;

// Mock process.env
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:8000';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    vi.clearAllMocks();
    notificationService = NotificationService.service;
  });

  describe('Template Variables Validation', () => {
    it('should validate system alert variables correctly', () => {
      const validVariables = {
        alert_type: 'maintenance',
        message: 'System maintenance scheduled',
        action_required: true,
      };

      const invalidVariables = {
        alert_type: 'maintenance',
        message: 'System maintenance scheduled',
        action_required: undefined,
      };

      expect(notificationService.validateTemplateVariables('system_alert', validVariables)).toBe(true);
      expect(notificationService.validateTemplateVariables('system_alert', invalidVariables)).toBe(true);
    });

    it('should validate organization invite variables correctly', () => {
      const validVariables = {
        organization_name: 'Acme Corp',
        inviter_name: 'John Doe',
        role: 'Admin',
      };

      const invalidVariables = {
        organization_name: 'Acme Corp',
        inviter_name: 'John Doe',
        role: 'Admin',
        expires_at: undefined,
      };

      expect(notificationService.validateTemplateVariables('organization_invite', validVariables)).toBe(true);
      expect(notificationService.validateTemplateVariables('organization_invite', invalidVariables)).toBe(true);
    });
  });

  describe('Template Rendering', () => {
    it('should render system alert template correctly', async () => {
      const variables = {
        alert_type: 'security',
        message: 'Unusual login activity detected',
        action_required: true,
      };

      const rendered = await notificationService.renderTemplate('system_alert', variables);

      expect(rendered.title).toBe('System Alert: security');
      expect(rendered.message).toBe('Unusual login activity detected Immediate action required.');
    });

    it('should render billing reminder template correctly', async () => {
      const variables = {
        amount: 99.99,
        due_date: '2024-04-01',
        invoice_number: 'INV-001',
      };

      const rendered = await notificationService.renderTemplate('billing_reminder', variables);

      expect(rendered.title).toBe('Payment Due: $99.99');
      expect(rendered.message).toBe('Payment of $99.99 is due on 2024-04-01 for invoice #INV-001');
    });
  });

  describe('Notification Creation', () => {
    it('should create a notification with correct data', async () => {
      const userId = 'user-123';
      const variables = {
        alert_type: 'maintenance',
        message: 'System update required',
        action_required: true,
      };

      await notificationService.createNotification(userId, 'system_alert', variables);

      expect(supabase.from).toHaveBeenCalledWith('notifications');
      expect(supabase.from('notifications').insert).toHaveBeenCalledWith([
        expect.objectContaining({
          user_id: userId,
          type: 'system_alert',
          severity: 'warning',
          category: 'system',
          title: expect.any(String),
          message: expect.any(String),
          data: variables,
        }),
      ]);
    });

    it('should handle custom expiry and severity', async () => {
      const userId = 'user-123';
      const variables = {
        alert_type: 'security',
        message: 'Password change required',
      };
      const expiresAt = new Date('2024-04-01');

      await notificationService.createNotification(userId, 'system_alert', variables, {
        severity: 'error',
        expiresAt,
      });

      expect(supabase.from('notifications').insert).toHaveBeenCalledWith([
        expect.objectContaining({
          severity: 'error',
          expires_at: expiresAt.toISOString(),
        }),
      ]);
    });
  });

  it('should create a notification successfully', async () => {
    const notification = await notificationService.send(
      'test-user',
      'system_alert',
      { name: 'John', message: 'Hello' }
    );

    expect(notification).toBeTruthy();
    expect(notification?.title).toBe('Test Title John');
    expect(notification?.message).toBe('Test Message Hello');
    expect(notification?.type).toBe('system_alert');
    expect(notification?.severity).toBe('info');
    expect(notification?.category).toBe('system');
  });

  it('should handle bulk notifications', async () => {
    const notifications = [
      {
        userId: 'user1',
        organizationId: null,
        type: 'system_alert' as const,
        data: { name: 'John', message: 'Hello' },
      },
      {
        userId: 'user2',
        organizationId: null,
        type: 'system_alert' as const,
        data: { name: 'Jane', message: 'Hi' },
      },
    ];

    await notificationService.sendBulk(notifications);

    // Verify that supabase.from was called for each notification
    expect(supabase.from).toHaveBeenCalledTimes(4); // 2 for templates, 2 for notifications
  });

  it('should validate notification delivery based on preferences', async () => {
    // Mock user preferences
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              user_id: 'test-user',
              email_enabled: true,
              push_enabled: true,
              sms_enabled: false,
            },
            error: null,
          })),
        })),
      })),
    }));

    const notification = {
      id: '1',
      user_id: 'test-user',
      organization_id: null,
      type: 'security_alert',
      severity: 'error',
      category: 'security',
      title: 'Security Alert',
      message: 'Suspicious activity detected',
      data: null,
      read_at: null,
      expires_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const isValid = await notificationService.validateDelivery(notification);
    expect(isValid).toBe(true);
  });

  describe('send', () => {
    it('should create notification and send email when email is enabled', async () => {
      await notificationService.send(
        'user-1',
        'system_alert',
        {
          alert_type: 'Test Alert',
          message: 'Test message'
        }
      );

      // Check if notification was created
      expect(supabase.from).toHaveBeenCalledWith('notifications');
      expect(supabase.from('notifications').insert).toHaveBeenCalled();

      // Check if email preferences were checked
      expect(supabase.from).toHaveBeenCalledWith('notification_preferences');
      expect(supabase.from).toHaveBeenCalledWith('users');

      // Check if email was sent
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/functions/v1/send-email',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test-key'
          })
        })
      );
    });

    it('should not send email when email is disabled', async () => {
      // Mock email disabled
      vi.mocked(supabase.from).mockImplementationOnce(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({
              data: {
                email_enabled: false,
                email: 'test@example.com'
              },
              error: null
            }))
          }))
        })) as unknown as PostgrestFilterBuilder<any, any, any>
      }));

      await notificationService.send(
        'user-1',
        'system_alert',
        {
          alert_type: 'Test Alert',
          message: 'Test message'
        }
      );

      // Check if notification was created
      expect(supabase.from).toHaveBeenCalledWith('notifications');
      expect(supabase.from('notifications').insert).toHaveBeenCalled();

      // Check that email was not sent
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('sendBulk', () => {
    it('should create multiple notifications and send emails in parallel', async () => {
      await notificationService.sendBulk([
        {
          userId: 'user-1',
          type: 'system_alert',
          data: {
            alert_type: 'Test Alert 1',
            message: 'Test message 1'
          }
        },
        {
          userId: 'user-2',
          type: 'system_alert',
          data: {
            alert_type: 'Test Alert 2',
            message: 'Test message 2'
          }
        }
      ]);

      // Check if notifications were created
      expect(supabase.from).toHaveBeenCalledWith('notifications');
      expect(supabase.from('notifications').insert).toHaveBeenCalled();

      // Check if email preferences were checked for both users
      expect(supabase.from).toHaveBeenCalledWith('notification_preferences');
      expect(supabase.from).toHaveBeenCalledWith('users');

      // Check if emails were sent
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateEmailPreferences', () => {
    it('should update email preferences successfully', async () => {
      await notificationService.updateEmailPreferences('user-1', false);

      expect(supabase.from).toHaveBeenCalledWith('notification_preferences');
      expect(supabase.from('notification_preferences').upsert).toHaveBeenCalledWith({
        user_id: 'user-1',
        email_enabled: false
      });
    });

    it('should throw error when update fails', async () => {
      // Mock error response
      vi.mocked(supabase.from).mockImplementationOnce(() => ({
        upsert: vi.fn(() => ({
          error: new Error('Update failed')
        })) as unknown as PostgrestBuilder<any>
      }));

      await expect(
        notificationService.updateEmailPreferences('user-1', false)
      ).rejects.toThrow();
    });
  });
}); 