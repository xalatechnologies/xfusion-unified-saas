export type NotificationType = 
  | 'system_alert'
  | 'user_action'
  | 'subscription_update'
  | 'billing_reminder'
  | 'security_alert'
  | 'organization_invite';

export type NotificationSeverity = 'info' | 'warning' | 'error' | 'success';

export type NotificationCategory = 'billing' | 'security' | 'system' | 'organization' | 'user';

export interface Notification {
  id: string;
  user_id: string;
  organization_id: string | null;
  type: string;
  severity: NotificationSeverity;
  category: NotificationCategory;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  read_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_enabled: boolean;
  push_enabled: boolean;
  sms_enabled: boolean;
  frequency: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  title_template: string;
  message_template: string;
  default_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// Database function return types
export interface NotificationStats {
  total_unread: number;
  total_notifications: number;
  notifications_by_category: Record<NotificationCategory, number>;
} 