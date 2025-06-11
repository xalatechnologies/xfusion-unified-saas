import { Database } from './database';
import { 
  NotificationType, 
  NotificationSeverity, 
  NotificationCategory,
  Notification,
  NotificationPreferences,
  NotificationTemplate
} from './notifications';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: {
          id: string
          user_id: string
          organization_id: string | null
          type: string
          severity: string
          category: string
          title: string
          message: string
          data: Json | null
          read_at: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id?: string | null
          type: string
          severity?: string
          category: string
          title: string
          message: string
          data?: Json | null
          read_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string | null
          type?: string
          severity?: string
          category?: string
          title?: string
          message?: string
          data?: Json | null
          read_at?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notification_preferences: {
        Row: {
          id: string
          user_id: string
          email_enabled: boolean
          push_enabled: boolean
          sms_enabled: boolean
          frequency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email_enabled?: boolean
          push_enabled?: boolean
          sms_enabled?: boolean
          frequency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email_enabled?: boolean
          push_enabled?: boolean
          sms_enabled?: boolean
          frequency?: string
          created_at?: string
          updated_at?: string
        }
      }
      notification_templates: {
        Row: {
          id: string
          type: string
          title_template: string
          message_template: string
          default_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          title_template: string
          message_template: string
          default_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          title_template?: string
          message_template?: string
          default_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_notification_stats: {
        Args: {
          p_user_id: string
        }
        Returns: {
          total_unread: number
          total_notifications: number
          notifications_by_category: Record<string, number>
        }
      }
    }
    Enums: {
      notification_type: 'system_alert' | 'user_action' | 'subscription_update' | 'billing_reminder' | 'security_alert' | 'organization_invite'
      notification_severity: 'info' | 'warning' | 'error' | 'success'
      notification_category: 'billing' | 'security' | 'system' | 'organization' | 'user'
    }
  }
}

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

// Database function parameter types
export type GetUserNotificationsParams = {
  p_user_id: string;
  p_organization_id?: string | null;
  p_type?: NotificationType[] | null;
  p_category?: NotificationCategory[] | null;
  p_severity?: NotificationSeverity[] | null;
  p_unread_only?: boolean;
  p_limit?: number;
  p_offset?: number;
};

export type MarkNotificationsReadParams = {
  p_user_id: string;
  p_notification_ids: string[];
};

export type MarkAllNotificationsReadParams = {
  p_user_id: string;
  p_organization_id?: string | null;
};

export type GetUserNotificationPreferencesParams = {
  p_user_id: string;
};

export type UpsertNotificationPreferencesParams = {
  p_user_id: string;
  p_email_enabled?: boolean | null;
  p_push_enabled?: boolean | null;
  p_sms_enabled?: boolean | null;
  p_frequency?: string | null;
};

export type GetNotificationTemplateParams = {
  p_type: NotificationType;
};

export type GetUnreadNotificationCountParams = {
  p_user_id: string;
  p_organization_id?: string | null;
};

export type DeleteNotificationsParams = {
  p_user_id: string;
  p_notification_ids: string[];
};

// Database function return types
export type GetUserNotificationsResult = Notification[];
export type MarkNotificationsReadResult = string[];
export type MarkAllNotificationsReadResult = string[];
export type GetUserNotificationPreferencesResult = NotificationPreferences[];
export type UpsertNotificationPreferencesResult = NotificationPreferences[];
export type GetNotificationTemplateResult = NotificationTemplate[];
export type GetUnreadNotificationCountResult = number;
export type DeleteNotificationsResult = string[];

// Database function definitions
export interface Functions {
  get_user_notifications: {
    Args: GetUserNotificationsParams;
    Returns: GetUserNotificationsResult;
  };
  mark_notifications_read: {
    Args: MarkNotificationsReadParams;
    Returns: MarkNotificationsReadResult;
  };
  mark_all_notifications_read: {
    Args: MarkAllNotificationsReadParams;
    Returns: MarkAllNotificationsReadResult;
  };
  get_user_notification_preferences: {
    Args: GetUserNotificationPreferencesParams;
    Returns: GetUserNotificationPreferencesResult;
  };
  upsert_notification_preferences: {
    Args: UpsertNotificationPreferencesParams;
    Returns: UpsertNotificationPreferencesResult;
  };
  get_notification_template: {
    Args: GetNotificationTemplateParams;
    Returns: GetNotificationTemplateResult;
  };
  get_unread_notification_count: {
    Args: GetUnreadNotificationCountParams;
    Returns: GetUnreadNotificationCountResult;
  };
  delete_notifications: {
    Args: DeleteNotificationsParams;
    Returns: DeleteNotificationsResult;
  };
} 