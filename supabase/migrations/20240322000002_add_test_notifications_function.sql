begin;

-- Create function to add test notifications
CREATE OR REPLACE FUNCTION public.create_test_notifications(p_user_id UUID)
RETURNS SETOF notifications
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- System alert
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'system_alert',
    'info',
    'system',
    'System Maintenance',
    'Scheduled maintenance will occur in 2 hours. The system may be temporarily unavailable.',
    '{"link": "/system-status"}',
    now(),
    now()
  );

  -- Security alert
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'security_alert',
    'error',
    'security',
    'Unusual Login Activity',
    'We detected a login from a new device in London, UK. Please verify if this was you.',
    '{"link": "/security-settings"}',
    now(),
    now()
  );

  -- Billing reminder
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'billing_reminder',
    'warning',
    'billing',
    'Payment Due Soon',
    'Your subscription payment is due in 3 days. Please ensure your payment method is up to date.',
    '{"link": "/billing"}',
    now(),
    now()
  );

  -- Organization invite
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'organization_invite',
    'info',
    'organization',
    'Team Invitation',
    'John Doe has invited you to join the Marketing team.',
    '{"link": "/organizations"}',
    now(),
    now()
  );

  -- User action
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'user_action',
    'success',
    'user',
    'Profile Updated',
    'Your profile changes have been saved successfully.',
    '{"link": "/profile"}',
    now(),
    now()
  );

  RETURN QUERY SELECT * FROM notifications WHERE user_id = p_user_id ORDER BY created_at DESC LIMIT 5;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_test_notifications TO authenticated;

commit; 