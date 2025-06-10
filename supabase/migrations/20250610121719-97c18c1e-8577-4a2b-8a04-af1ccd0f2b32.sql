
-- First, drop the problematic policies
DROP POLICY IF EXISTS "Users can view users in their tenant" ON public.users;
DROP POLICY IF EXISTS "Super admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Super admins can create users" ON public.users;
DROP POLICY IF EXISTS "Super admins can update users" ON public.users;
DROP POLICY IF EXISTS "Super admins can delete users" ON public.users;

-- Create security definer functions to avoid recursion
CREATE OR REPLACE FUNCTION public.get_current_user_tenant_id()
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT tenant_id FROM public.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.current_user_is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  );
$$;

-- Now create the policies using these functions
CREATE POLICY "Users can view users in their tenant" 
ON public.users 
FOR SELECT 
TO authenticated 
USING (tenant_id = public.get_current_user_tenant_id());

CREATE POLICY "Super admins can view all users" 
ON public.users 
FOR SELECT 
TO authenticated 
USING (public.current_user_is_super_admin());

CREATE POLICY "Super admins can create users" 
ON public.users 
FOR INSERT 
TO authenticated 
WITH CHECK (public.current_user_is_super_admin());

CREATE POLICY "Super admins can update users" 
ON public.users 
FOR UPDATE 
TO authenticated 
USING (public.current_user_is_super_admin());

CREATE POLICY "Super admins can delete users" 
ON public.users 
FOR DELETE 
TO authenticated 
USING (public.current_user_is_super_admin());
