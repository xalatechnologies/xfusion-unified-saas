import { NotificationType, NotificationSeverity, NotificationCategory } from './notifications';

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: {
          id: string;
          user_id: string;
          organization_id: string | null;
          type: NotificationType;
          severity: NotificationSeverity;
          category: NotificationCategory;
          title: string;
          message: string;
          data: Record<string, unknown>;
          read_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          organization_id?: string | null;
          type: NotificationType;
          severity?: NotificationSeverity;
          category: NotificationCategory;
          title: string;
          message: string;
          data?: Record<string, unknown>;
          read_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          organization_id?: string | null;
          type?: NotificationType;
          severity?: NotificationSeverity;
          category?: NotificationCategory;
          title?: string;
          message?: string;
          data?: Record<string, unknown>;
          read_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notification_preferences: {
        Row: {
          id: string;
          user_id: string;
          email_enabled: boolean;
          push_enabled: boolean;
          sms_enabled: boolean;
          frequency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email_enabled?: boolean;
          push_enabled?: boolean;
          sms_enabled?: boolean;
          frequency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email_enabled?: boolean;
          push_enabled?: boolean;
          sms_enabled?: boolean;
          frequency?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notification_templates: {
        Row: {
          id: string;
          type: NotificationType;
          title_template: string;
          message_template: string;
          default_data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: NotificationType;
          title_template: string;
          message_template: string;
          default_data?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: NotificationType;
          title_template?: string;
          message_template?: string;
          default_data?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Enums: {
      notification_type: NotificationType;
      notification_severity: NotificationSeverity;
      notification_category: NotificationCategory;
    };
    Functions: {
      [key: string]: unknown;
    };
  };
}

export interface Organization {
  id: string;
  name: string;
  contact_email: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  organization_id: string;
  plan_name: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  trial_end?: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  organization_id: string;
  number: string;
  amount: number;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  due_date: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
} 