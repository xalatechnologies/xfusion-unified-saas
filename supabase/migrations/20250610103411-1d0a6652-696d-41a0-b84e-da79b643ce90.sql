
-- First, let's fix the existing user roles for current users
INSERT INTO public.user_roles (user_id, role, assigned_by)
SELECT id, 'super_admin'::app_role, id 
FROM auth.users 
WHERE email = 'ibrahim@xala.no'
AND NOT EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.users.id AND role = 'super_admin'
);

-- Assign organization_admin role to xalatech@outlook.com if exists
INSERT INTO public.user_roles (user_id, role, assigned_by)
SELECT id, 'organization_admin'::app_role, id 
FROM auth.users 
WHERE email = 'xalatech@outlook.com'
AND NOT EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.users.id AND role = 'organization_admin'
);

-- Create a main Xala Technologies organization if it doesn't exist
INSERT INTO public.organizations (
  name,
  created_by,
  contact_email,
  contact_phone,
  default_language,
  branding
)
SELECT 
  'Xala Technologies',
  au.id,
  'contact@xala.no',
  '+47 123 45 678',
  'en',
  jsonb_build_object(
    'primaryColor', '#3B82F6',
    'secondaryColor', '#6B7280',
    'logo', ''
  )
FROM auth.users au
WHERE au.email = 'ibrahim@xala.no'
AND NOT EXISTS (
  SELECT 1 FROM public.organizations WHERE name = 'Xala Technologies'
);

-- Create Xala tenant if it doesn't exist
INSERT INTO public.tenants (name)
SELECT 'Xala Technologies'
WHERE NOT EXISTS (
  SELECT 1 FROM public.tenants WHERE name = 'Xala Technologies'
);

-- Create subscription in the subscriptions table (without organization_id)
INSERT INTO public.subscriptions (
  plan_id,
  plan_name,
  status,
  billing_cycle,
  price_monthly,
  price_yearly,
  max_users,
  trial_start,
  trial_end,
  current_period_start,
  current_period_end,
  features
)
SELECT 
  'enterprise',
  'Enterprise',
  'active',
  'monthly',
  99.00,
  990.00,
  50,
  now(),
  now() + interval '30 days',
  now(),
  now() + interval '1 month',
  jsonb_build_object(
    'unlimited_users', true,
    'advanced_analytics', true,
    'priority_support', true,
    'custom_branding', true
  )
WHERE NOT EXISTS (
  SELECT 1 FROM public.subscriptions WHERE plan_id = 'enterprise' AND plan_name = 'Enterprise'
);

-- Link the organization to the subscription using organization_subscriptions table
INSERT INTO public.organization_subscriptions (
  organization_id,
  subscription_id,
  status,
  billing_cycle,
  current_period_start,
  current_period_end,
  trial_start,
  trial_end
)
SELECT 
  o.id,
  s.id,
  'active',
  'monthly',
  now(),
  now() + interval '1 month',
  now(),
  now() + interval '30 days'
FROM public.organizations o
CROSS JOIN public.subscriptions s
WHERE o.name = 'Xala Technologies'
AND s.plan_id = 'enterprise'
AND NOT EXISTS (
  SELECT 1 FROM public.organization_subscriptions os 
  WHERE os.organization_id = o.id
);

-- Create billing information for Xala Technologies if it doesn't exist
INSERT INTO public.billing_information (
  organization_id,
  payment_method_type,
  is_primary,
  billing_address
)
SELECT 
  o.id,
  'card',
  true,
  jsonb_build_object(
    'street', 'Tech Street 123',
    'city', 'Oslo',
    'state', 'Oslo',
    'zip', '0123',
    'country', 'Norway'
  )
FROM public.organizations o
WHERE o.name = 'Xala Technologies'
AND NOT EXISTS (
  SELECT 1 FROM public.billing_information bi WHERE bi.organization_id = o.id
);
