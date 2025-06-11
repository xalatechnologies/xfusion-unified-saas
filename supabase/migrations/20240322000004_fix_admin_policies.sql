begin;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can create their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can delete their own notifications" ON public.notifications;

-- Create a function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  );
$$;

-- Create RPC function to expose is_super_admin to the client
CREATE OR REPLACE FUNCTION public.check_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT public.is_super_admin();
$$;

-- Create RPC function to create test notifications
CREATE OR REPLACE FUNCTION public.create_test_notifications(p_user_id uuid)
RETURNS SETOF notifications
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_notification notifications%ROWTYPE;
BEGIN
  -- Check if caller is super admin
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Only super admins can create test notifications';
  END IF;

  -- System alert notification
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'system_alert',
    'info',
    'system',
    'System Maintenance',
    'Scheduled maintenance will occur in 2 hours. The system may be temporarily unavailable.',
    '{"link": "/system-status"}'::jsonb,
    now(),
    now()
  ) RETURNING * INTO v_notification;
  RETURN NEXT v_notification;

  -- Security alert notification
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'security_alert',
    'error',
    'security',
    'Unusual Login Activity',
    'We detected a login from a new device in London, UK. Please verify if this was you.',
    '{"link": "/security-settings"}'::jsonb,
    now(),
    now()
  ) RETURNING * INTO v_notification;
  RETURN NEXT v_notification;

  -- Billing reminder notification
  INSERT INTO notifications (
    user_id, type, severity, category, title, message, data, created_at, updated_at
  ) VALUES (
    p_user_id,
    'billing_reminder',
    'warning',
    'billing',
    'Payment Due Soon',
    'Your subscription payment is due in 3 days. Please ensure your payment method is up to date.',
    '{"link": "/billing"}'::jsonb,
    now(),
    now()
  ) RETURNING * INTO v_notification;
  RETURN NEXT v_notification;

  RETURN;
END;
$$;

-- Create comprehensive policies that work for both regular users and super admins
CREATE POLICY "Users can view notifications"
  ON public.notifications
  FOR SELECT
  USING (
    auth.uid() = user_id OR 
    public.is_super_admin()
  );

CREATE POLICY "Users can create notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_super_admin()
  );

CREATE POLICY "Users can update notifications"
  ON public.notifications
  FOR UPDATE
  USING (
    auth.uid() = user_id OR 
    public.is_super_admin()
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    public.is_super_admin()
  );

CREATE POLICY "Users can delete notifications"
  ON public.notifications
  FOR DELETE
  USING (
    auth.uid() = user_id OR 
    public.is_super_admin()
  );

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_super_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_super_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_test_notifications TO authenticated;

commit; 