import { supabase } from '@/lib/supabase';
import type {
  NotificationType,
  NotificationSeverity,
  NotificationCategory,
  Notification,
  NotificationPreferences,
  NotificationTemplate,
} from '@/types/notifications';
import type {
  GetUserNotificationsParams,
  GetUserNotificationsResult,
  MarkNotificationsReadParams,
  MarkNotificationsReadResult,
  MarkAllNotificationsReadParams,
  MarkAllNotificationsReadResult,
  GetUserNotificationPreferencesParams,
  GetUserNotificationPreferencesResult,
  UpsertNotificationPreferencesParams,
  UpsertNotificationPreferencesResult,
  GetNotificationTemplateParams,
  GetNotificationTemplateResult,
  GetUnreadNotificationCountParams,
  GetUnreadNotificationCountResult,
  DeleteNotificationsParams,
  DeleteNotificationsResult,
} from '@/types/supabase';

export async function getUserNotifications({
  p_user_id,
  p_organization_id = null,
  p_type = null,
  p_category = null,
  p_severity = null,
  p_unread_only = false,
  p_limit = 20,
  p_offset = 0,
}: GetUserNotificationsParams): Promise<GetUserNotificationsResult> {
  const { data, error } = await supabase.rpc('get_user_notifications', {
    p_user_id,
    p_organization_id,
    p_type,
    p_category,
    p_severity,
    p_unread_only,
    p_limit,
    p_offset,
  });

  if (error) throw error;
  return data || [];
}

export async function markNotificationsRead({
  p_user_id,
  p_notification_ids,
}: MarkNotificationsReadParams): Promise<MarkNotificationsReadResult> {
  const { data, error } = await supabase.rpc('mark_notifications_read', {
    p_user_id,
    p_notification_ids,
  });

  if (error) throw error;
  return data || [];
}

export async function markAllNotificationsRead({
  p_user_id,
  p_organization_id = null,
}: MarkAllNotificationsReadParams): Promise<MarkAllNotificationsReadResult> {
  const { data, error } = await supabase.rpc('mark_all_notifications_read', {
    p_user_id,
    p_organization_id,
  });

  if (error) throw error;
  return data || [];
}

export async function getUserNotificationPreferences({
  p_user_id,
}: GetUserNotificationPreferencesParams): Promise<GetUserNotificationPreferencesResult> {
  const { data, error } = await supabase.rpc('get_user_notification_preferences', {
    p_user_id,
  });

  if (error) throw error;
  return data || [];
}

export async function upsertNotificationPreferences({
  p_user_id,
  p_email_enabled = null,
  p_push_enabled = null,
  p_sms_enabled = null,
  p_frequency = null,
}: UpsertNotificationPreferencesParams): Promise<UpsertNotificationPreferencesResult> {
  const { data, error } = await supabase.rpc('upsert_notification_preferences', {
    p_user_id,
    p_email_enabled,
    p_push_enabled,
    p_sms_enabled,
    p_frequency,
  });

  if (error) throw error;
  return data || [];
}

export async function getNotificationTemplate({
  p_type,
}: GetNotificationTemplateParams): Promise<GetNotificationTemplateResult> {
  const { data, error } = await supabase.rpc('get_notification_template', {
    p_type,
  });

  if (error) throw error;
  return data || [];
}

export async function getUnreadNotificationCount({
  p_user_id,
  p_organization_id = null,
}: GetUnreadNotificationCountParams): Promise<GetUnreadNotificationCountResult> {
  const { data, error } = await supabase.rpc('get_unread_notification_count', {
    p_user_id,
    p_organization_id,
  });

  if (error) throw error;
  return data || 0;
}

export async function deleteNotifications({
  p_user_id,
  p_notification_ids,
}: DeleteNotificationsParams): Promise<DeleteNotificationsResult> {
  const { data, error } = await supabase.rpc('delete_notifications', {
    p_user_id,
    p_notification_ids,
  });

  if (error) throw error;
  return data || [];
} 