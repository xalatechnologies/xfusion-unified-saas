-- Function to get user notifications with filtering and pagination
CREATE OR REPLACE FUNCTION public.get_user_notifications(
  p_user_id UUID,
  p_organization_id UUID DEFAULT NULL,
  p_type notification_type[] DEFAULT NULL,
  p_category notification_category[] DEFAULT NULL,
  p_severity notification_severity[] DEFAULT NULL,
  p_unread_only BOOLEAN DEFAULT false,
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  organization_id UUID,
  type notification_type,
  severity notification_severity,
  category notification_category,
  title TEXT,
  message TEXT,
  data JSONB,
  read_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT n.*
  FROM public.notifications n
  WHERE n.user_id = p_user_id
    AND (p_organization_id IS NULL OR n.organization_id = p_organization_id)
    AND (p_type IS NULL OR n.type = ANY(p_type))
    AND (p_category IS NULL OR n.category = ANY(p_category))
    AND (p_severity IS NULL OR n.severity = ANY(p_severity))
    AND (NOT p_unread_only OR n.read_at IS NULL)
    AND (n.expires_at IS NULL OR n.expires_at > now())
  ORDER BY n.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark notifications as read
CREATE OR REPLACE FUNCTION public.mark_notifications_read(
  p_user_id UUID,
  p_notification_ids UUID[]
)
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  UPDATE public.notifications
  SET read_at = now()
  WHERE user_id = p_user_id
    AND id = ANY(p_notification_ids)
    AND read_at IS NULL
  RETURNING id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark all notifications as read
CREATE OR REPLACE FUNCTION public.mark_all_notifications_read(
  p_user_id UUID,
  p_organization_id UUID DEFAULT NULL
)
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  UPDATE public.notifications
  SET read_at = now()
  WHERE user_id = p_user_id
    AND (p_organization_id IS NULL OR organization_id = p_organization_id)
    AND read_at IS NULL
  RETURNING id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user notification preferences
CREATE OR REPLACE FUNCTION public.get_user_notification_preferences(
  p_user_id UUID
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  email_enabled BOOLEAN,
  push_enabled BOOLEAN,
  sms_enabled BOOLEAN,
  frequency TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.notification_preferences
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to upsert user notification preferences
CREATE OR REPLACE FUNCTION public.upsert_notification_preferences(
  p_user_id UUID,
  p_email_enabled BOOLEAN DEFAULT NULL,
  p_push_enabled BOOLEAN DEFAULT NULL,
  p_sms_enabled BOOLEAN DEFAULT NULL,
  p_frequency TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  email_enabled BOOLEAN,
  push_enabled BOOLEAN,
  sms_enabled BOOLEAN,
  frequency TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.notification_preferences (
    user_id,
    email_enabled,
    push_enabled,
    sms_enabled,
    frequency
  )
  VALUES (
    p_user_id,
    COALESCE(p_email_enabled, true),
    COALESCE(p_push_enabled, true),
    COALESCE(p_sms_enabled, false),
    COALESCE(p_frequency, 'immediate')
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    email_enabled = COALESCE(EXCLUDED.email_enabled, notification_preferences.email_enabled),
    push_enabled = COALESCE(EXCLUDED.push_enabled, notification_preferences.push_enabled),
    sms_enabled = COALESCE(EXCLUDED.sms_enabled, notification_preferences.sms_enabled),
    frequency = COALESCE(EXCLUDED.frequency, notification_preferences.frequency),
    updated_at = now()
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get notification template by type
CREATE OR REPLACE FUNCTION public.get_notification_template(
  p_type notification_type
)
RETURNS TABLE (
  id UUID,
  type notification_type,
  title_template TEXT,
  message_template TEXT,
  default_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.notification_templates
  WHERE type = p_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get unread notification count
CREATE OR REPLACE FUNCTION public.get_unread_notification_count(
  p_user_id UUID,
  p_organization_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM public.notifications
  WHERE user_id = p_user_id
    AND (p_organization_id IS NULL OR organization_id = p_organization_id)
    AND read_at IS NULL
    AND (expires_at IS NULL OR expires_at > now());
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete notifications
CREATE OR REPLACE FUNCTION public.delete_notifications(
  p_user_id UUID,
  p_notification_ids UUID[]
)
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  DELETE FROM public.notifications
  WHERE user_id = p_user_id
    AND id = ANY(p_notification_ids)
  RETURNING id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_notifications TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_notifications_read TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_all_notifications_read TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_notification_preferences TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_notification_preferences TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_notification_template TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_unread_notification_count TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_notifications TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.get_user_notifications IS 'Get user notifications with filtering and pagination options';
COMMENT ON FUNCTION public.mark_notifications_read IS 'Mark specific notifications as read for a user';
COMMENT ON FUNCTION public.mark_all_notifications_read IS 'Mark all notifications as read for a user';
COMMENT ON FUNCTION public.get_user_notification_preferences IS 'Get notification preferences for a user';
COMMENT ON FUNCTION public.upsert_notification_preferences IS 'Create or update notification preferences for a user';
COMMENT ON FUNCTION public.get_notification_template IS 'Get notification template by type';
COMMENT ON FUNCTION public.get_unread_notification_count IS 'Get count of unread notifications for a user';
COMMENT ON FUNCTION public.delete_notifications IS 'Delete specific notifications for a user'; 