
-- Add first_name and last_name columns to the users table
ALTER TABLE public.users 
ADD COLUMN first_name text,
ADD COLUMN last_name text,
ADD COLUMN avatar_url text;

-- Update the handle_new_user function to include first_name and last_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  new_tenant_id uuid;
  new_organization_id uuid;
  company_name text;
BEGIN
  -- Extract company name from metadata, fallback to default
  company_name := COALESCE(NEW.raw_user_meta_data->>'company', 
                          CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', 
                                NEW.raw_user_meta_data->>'last_name', '''s Organization'));
  
  IF company_name IS NULL OR company_name = ' ''s Organization' THEN
    company_name := 'Default Organization';
  END IF;

  -- Create tenant first
  INSERT INTO public.tenants (name)
  VALUES (company_name)
  RETURNING id INTO new_tenant_id;

  -- Create organization with default branding, contact info, and language
  INSERT INTO public.organizations (
    name, 
    created_by, 
    contact_email,
    contact_phone,
    contact_fax,
    default_language,
    branding
  )
  VALUES (
    company_name,
    NEW.id,
    NEW.email,
    null,
    null,
    'en',
    jsonb_build_object(
      'primaryColor', '#3B82F6',
      'secondaryColor', '#6B7280',
      'logo', ''
    )
  )
  RETURNING id INTO new_organization_id;

  -- Create user record with first_name and last_name from metadata
  INSERT INTO public.users (
    id, 
    email, 
    tenant_id, 
    first_name, 
    last_name
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    new_tenant_id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );

  -- Assign default 'user' system role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  -- Add user as owner of their organization (this will trigger organization_admin assignment)
  INSERT INTO public.organization_members (user_id, organization_id, role, status, joined_at)
  VALUES (NEW.id, new_organization_id, 'owner', 'active', now());

  -- Create trial subscription
  INSERT INTO public.subscriptions (
    organization_id, 
    plan_id, 
    plan_name, 
    status, 
    billing_cycle,
    price_monthly,
    price_yearly,
    trial_start,
    trial_end,
    current_period_start,
    current_period_end
  )
  VALUES (
    new_organization_id,
    'trial',
    'Trial',
    'trialing',
    'monthly',
    29.00,
    290.00,
    now(),
    now() + interval '14 days',
    now(),
    now() + interval '14 days'
  );

  -- Create default billing information record
  INSERT INTO public.billing_information (
    organization_id,
    payment_method_type,
    is_primary,
    billing_address
  )
  VALUES (
    new_organization_id,
    null,
    true,
    jsonb_build_object(
      'street', '',
      'city', '',
      'state', '',
      'zip', '',
      'country', ''
    )
  );

  RETURN NEW;
END;
$function$;

-- Add functions to update user information
CREATE OR REPLACE FUNCTION public.update_user_info(
  user_id_param uuid,
  first_name_param text DEFAULT NULL,
  last_name_param text DEFAULT NULL,
  avatar_url_param text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Only super admins can update user info
  IF NOT public.current_user_is_super_admin() THEN
    RAISE EXCEPTION 'Access denied. Only super admins can update user information.';
  END IF;

  UPDATE public.users
  SET 
    first_name = COALESCE(first_name_param, first_name),
    last_name = COALESCE(last_name_param, last_name),
    avatar_url = COALESCE(avatar_url_param, avatar_url),
    updated_at = now()
  WHERE id = user_id_param;
END;
$function$;

-- Add function to update user status (activate/suspend)
CREATE OR REPLACE FUNCTION public.update_user_status(
  user_id_param uuid,
  status_param text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Only super admins can update user status
  IF NOT public.current_user_is_super_admin() THEN
    RAISE EXCEPTION 'Access denied. Only super admins can update user status.';
  END IF;

  -- For now, we'll handle status in the application layer
  -- This function is prepared for when we add a status column to users table
  -- UPDATE public.users SET status = status_param WHERE id = user_id_param;
END;
$function$;
