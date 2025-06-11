import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase';
import type { PostgrestSingleResponse, PostgrestError } from '@supabase/supabase-js';
import {
  getUserNotifications,
  markNotificationsRead,
  markAllNotificationsRead,
  getUserNotificationPreferences,
  upsertNotificationPreferences,
  getNotificationTemplate,
  getUnreadNotificationCount,
  deleteNotifications,
} from '../notifications';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    rpc: vi.fn(),
  },
}));

const createMockResponse = <T>(data: T): PostgrestSingleResponse<T> => ({
  data,
  error: null,
  count: null,
  status: 200,
  statusText: 'OK',
});

const createMockError = (message: string): PostgrestError => ({
  message,
  details: '',
  hint: '',
  code: 'ERROR',
  name: 'PostgrestError',
});

describe('Notification Database Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserNotifications', () => {
    it('should fetch notifications with default parameters', async () => {
      const mockData = [{ id: '1', title: 'Test Notification' }];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await getUserNotifications({ p_user_id: 'user-123' });

      expect(supabase.rpc).toHaveBeenCalledWith('get_user_notifications', {
        p_user_id: 'user-123',
        p_organization_id: null,
        p_type: null,
        p_category: null,
        p_severity: null,
        p_unread_only: false,
        p_limit: 20,
        p_offset: 0,
      });
      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const error = createMockError('Database error');
      vi.mocked(supabase.rpc).mockResolvedValueOnce({ data: null, error, count: null, status: 400, statusText: 'Bad Request' });

      await expect(getUserNotifications({ p_user_id: 'user-123' })).rejects.toThrow('Database error');
    });
  });

  describe('markNotificationsRead', () => {
    it('should mark notifications as read', async () => {
      const mockData = ['1', '2'];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await markNotificationsRead({
        p_user_id: 'user-123',
        p_notification_ids: ['1', '2'],
      });

      expect(supabase.rpc).toHaveBeenCalledWith('mark_notifications_read', {
        p_user_id: 'user-123',
        p_notification_ids: ['1', '2'],
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('markAllNotificationsRead', () => {
    it('should mark all notifications as read', async () => {
      const mockData = ['1', '2', '3'];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await markAllNotificationsRead({
        p_user_id: 'user-123',
        p_organization_id: 'org-123',
      });

      expect(supabase.rpc).toHaveBeenCalledWith('mark_all_notifications_read', {
        p_user_id: 'user-123',
        p_organization_id: 'org-123',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getUserNotificationPreferences', () => {
    it('should fetch user preferences', async () => {
      const mockData = [{
        id: '1',
        user_id: 'user-123',
        email_enabled: true,
        push_enabled: true,
        sms_enabled: false,
        frequency: 'immediate',
      }];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await getUserNotificationPreferences({ p_user_id: 'user-123' });

      expect(supabase.rpc).toHaveBeenCalledWith('get_user_notification_preferences', {
        p_user_id: 'user-123',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('upsertNotificationPreferences', () => {
    it('should update notification preferences', async () => {
      const mockData = [{
        id: '1',
        user_id: 'user-123',
        email_enabled: true,
        push_enabled: false,
        sms_enabled: true,
        frequency: 'daily',
      }];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await upsertNotificationPreferences({
        p_user_id: 'user-123',
        p_email_enabled: true,
        p_push_enabled: false,
        p_sms_enabled: true,
        p_frequency: 'daily',
      });

      expect(supabase.rpc).toHaveBeenCalledWith('upsert_notification_preferences', {
        p_user_id: 'user-123',
        p_email_enabled: true,
        p_push_enabled: false,
        p_sms_enabled: true,
        p_frequency: 'daily',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getNotificationTemplate', () => {
    it('should fetch notification template', async () => {
      const mockData = [{
        id: '1',
        type: 'system_alert',
        title_template: 'System Alert: {{alert_type}}',
        message_template: '{{message}}',
      }];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await getNotificationTemplate({ p_type: 'system_alert' });

      expect(supabase.rpc).toHaveBeenCalledWith('get_notification_template', {
        p_type: 'system_alert',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getUnreadNotificationCount', () => {
    it('should get unread notification count', async () => {
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(5));

      const result = await getUnreadNotificationCount({
        p_user_id: 'user-123',
        p_organization_id: 'org-123',
      });

      expect(supabase.rpc).toHaveBeenCalledWith('get_unread_notification_count', {
        p_user_id: 'user-123',
        p_organization_id: 'org-123',
      });
      expect(result).toBe(5);
    });
  });

  describe('deleteNotifications', () => {
    it('should delete notifications', async () => {
      const mockData = ['1', '2'];
      vi.mocked(supabase.rpc).mockResolvedValueOnce(createMockResponse(mockData));

      const result = await deleteNotifications({
        p_user_id: 'user-123',
        p_notification_ids: ['1', '2'],
      });

      expect(supabase.rpc).toHaveBeenCalledWith('delete_notifications', {
        p_user_id: 'user-123',
        p_notification_ids: ['1', '2'],
      });
      expect(result).toEqual(mockData);
    });
  });
}); 