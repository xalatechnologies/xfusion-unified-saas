
-- Drop existing policies on users table
DROP POLICY IF EXISTS "Users can view users in their tenant" ON public.users;
DROP POLICY IF EXISTS "Super admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Super admins can create users" ON public.users;
DROP POLICY IF EXISTS "Super admins can update users" ON public.users;
DROP POLICY IF EXISTS "Super admins can delete users" ON public.users;

-- Add RLS policies for the users table to allow user creation

-- Policy to allow authenticated users to insert new users (for super admins)
CREATE POLICY "Super admins can create users" 
ON public.users 
FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Policy to allow users to view users within their tenant
CREATE POLICY "Users can view users in their tenant" 
ON public.users 
FOR SELECT 
TO authenticated 
USING (
  tenant_id IN (
    SELECT tenant_id FROM public.users WHERE id = auth.uid()
  )
);

-- Policy to allow super admins to view all users
CREATE POLICY "Super admins can view all users" 
ON public.users 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Policy to allow super admins to update users
CREATE POLICY "Super admins can update users" 
ON public.users 
FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Policy to allow super admins to delete users
CREATE POLICY "Super admins can delete users" 
ON public.users 
FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);
