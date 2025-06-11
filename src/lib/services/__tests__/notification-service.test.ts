import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase';
import { NotificationService } from '../notificationService';
import type { Notification } from '@/types/notifications';

// Mock Supabase client
vi.mock('@/lib/supabase', () => {
  const mockFrom = vi.fn();
  const mockSelect = vi.fn();
  const mockEq = vi.fn();
  const mockSingle = vi.fn();
  const mockInsert = vi.fn();

  mockFrom.mockReturnValue({ select: mockSelect, insert: mockInsert });
  mockSelect.mockReturnValue({ eq: mockEq });
  mockEq.mockReturnValue({ single: mockSingle });
  mockInsert.mockReturnValue({ select: mockSelect });

  return {
    supabase: {
      from: mockFrom,
    },
  };
});

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    vi.clearAllMocks();
    notificationService = NotificationService.service;

    // Setup default mock responses
    const mockSingle = vi.fn();
    mockSingle
      // Template response
      .mockResolvedValueOnce({
        data: {
          type: 'system_alert',
          title_template: 'Test Title {{name}}',
          message_template: 'Test Message {{message}}',
        },
        error: null,
      })
      // Notification response
      .mockResolvedValueOnce({
        data: {
          id: '1',
          user_id: 'test-user',
          type: 'system_alert',
          severity: 'info',
          category: 'system',
          title: 'Test Title John',
          message: 'Test Message Hello',
          data: { name: 'John', message: 'Hello' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null,
      });

    const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({
      select: mockSelect,
      insert: vi.fn().mockReturnValue({ select: mockSelect }),
    });

    vi.mocked(supabase.from).mockImplementation(mockFrom);
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
    // Setup mock for preferences
    const mockSingle = vi.fn().mockResolvedValueOnce({
      data: {
        user_id: 'test-user',
        email_enabled: true,
        push_enabled: true,
        sms_enabled: false,
      },
      error: null,
    });

    const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

    vi.mocked(supabase.from).mockImplementation(mockFrom);

    const notification: Notification = {
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
}); 