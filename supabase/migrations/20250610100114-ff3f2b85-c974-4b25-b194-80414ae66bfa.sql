
-- Create enum for system-level roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'organization_admin', 'user');

-- Create user_roles table for system-level roles
CREATE TABLE public.user_roles (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL DEFAULT 'user',
    assigned_at timestamp with time zone DEFAULT now(),
    assigned_by uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user's system role
CREATE OR REPLACE FUNCTION public.get_user_system_role(user_id_param uuid DEFAULT auth.uid())
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.user_roles 
  WHERE user_id = user_id_param 
  ORDER BY 
    CASE role 
      WHEN 'super_admin' THEN 1
      WHEN 'organization_admin' THEN 2
      WHEN 'user' THEN 3
    END
  LIMIT 1;
$$;

-- Create function to check if user is admin/owner of any organization
CREATE OR REPLACE FUNCTION public.user_is_org_admin(user_id_param uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members 
    WHERE user_id = user_id_param 
    AND role IN ('owner', 'admin')
    AND status = 'active'
  );
$$;

-- Create function to assign system role
CREATE OR REPLACE FUNCTION public.assign_system_role(
  target_user_id uuid,
  new_role app_role,
  assigned_by_user_id uuid DEFAULT auth.uid()
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (target_user_id, new_role, assigned_by_user_id)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Create function to auto-assign organization_admin role
CREATE OR REPLACE FUNCTION public.auto_assign_org_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If user becomes owner or admin of an organization, assign organization_admin system role
  IF NEW.role IN ('owner', 'admin') AND NEW.status = 'active' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'organization_admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  -- If user loses admin privileges, check if they should lose organization_admin role
  IF OLD.role IN ('owner', 'admin') AND (NEW.role NOT IN ('owner', 'admin') OR NEW.status != 'active') THEN
    -- Check if user is still admin/owner of any other organization
    IF NOT public.user_is_org_admin(NEW.user_id) THEN
      DELETE FROM public.user_roles 
      WHERE user_id = NEW.user_id AND role = 'organization_admin';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for auto role assignment
CREATE TRIGGER auto_assign_org_admin_role_trigger
  AFTER INSERT OR UPDATE ON public.organization_members
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_assign_org_admin_role();

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.get_user_system_role() = 'super_admin');

CREATE POLICY "Super admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.get_user_system_role() = 'super_admin');

-- Update handle_new_user function to assign default user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
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

  -- Create user record
  INSERT INTO public.users (id, email, tenant_id)
  VALUES (NEW.id, NEW.email, new_tenant_id);

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
$$;
