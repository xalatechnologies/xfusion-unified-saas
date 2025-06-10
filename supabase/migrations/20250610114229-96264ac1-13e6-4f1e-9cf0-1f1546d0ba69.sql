
-- Create full-text search function for organizations
CREATE OR REPLACE FUNCTION public.search_organizations(search_query text)
RETURNS TABLE (
  id uuid,
  name text,
  contact_email text,
  created_at timestamp with time zone,
  member_count bigint,
  relevance real
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    o.id,
    o.name,
    o.contact_email,
    o.created_at,
    COALESCE(member_counts.count, 0) as member_count,
    ts_rank(
      to_tsvector('english', COALESCE(o.name, '') || ' ' || COALESCE(o.contact_email, '')),
      plainto_tsquery('english', search_query)
    ) as relevance
  FROM organizations o
  LEFT JOIN (
    SELECT organization_id, COUNT(*) as count
    FROM organization_members
    WHERE status = 'active'
    GROUP BY organization_id
  ) member_counts ON o.id = member_counts.organization_id
  WHERE 
    to_tsvector('english', COALESCE(o.name, '') || ' ' || COALESCE(o.contact_email, '')) 
    @@ plainto_tsquery('english', search_query)
  ORDER BY relevance DESC, o.name ASC
  LIMIT 50;
$$;

-- Create full-text search function for users
CREATE OR REPLACE FUNCTION public.search_users(search_query text)
RETURNS TABLE (
  id uuid,
  email text,
  tenant_id uuid,
  created_at timestamp with time zone,
  organization_count bigint,
  relevance real
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    u.id,
    u.email,
    u.tenant_id,
    u.created_at,
    COALESCE(org_counts.count, 0) as organization_count,
    ts_rank(
      to_tsvector('english', u.email),
      plainto_tsquery('english', search_query)
    ) as relevance
  FROM users u
  LEFT JOIN (
    SELECT user_id, COUNT(*) as count
    FROM organization_members
    WHERE status = 'active'
    GROUP BY user_id
  ) org_counts ON u.id = org_counts.user_id
  WHERE 
    to_tsvector('english', u.email) @@ plainto_tsquery('english', search_query)
  ORDER BY relevance DESC, u.email ASC
  LIMIT 50;
$$;

-- Create full-text search function for subscriptions
CREATE OR REPLACE FUNCTION public.search_subscriptions(search_query text)
RETURNS TABLE (
  id uuid,
  plan_name text,
  status text,
  billing_cycle text,
  created_at timestamp with time zone,
  price_monthly numeric,
  relevance real
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    s.id,
    s.plan_name,
    s.status,
    s.billing_cycle,
    s.created_at,
    s.price_monthly,
    ts_rank(
      to_tsvector('english', COALESCE(s.plan_name, '') || ' ' || COALESCE(s.status, '')),
      plainto_tsquery('english', search_query)
    ) as relevance
  FROM subscriptions s
  WHERE 
    to_tsvector('english', COALESCE(s.plan_name, '') || ' ' || COALESCE(s.status, '')) 
    @@ plainto_tsquery('english', search_query)
  ORDER BY relevance DESC, s.plan_name ASC
  LIMIT 50;
$$;

-- Create full-text search function for documentation
CREATE OR REPLACE FUNCTION public.search_documentation(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  category text,
  slug text,
  access_level text,
  created_at timestamp with time zone,
  relevance real
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    d.id,
    d.title,
    d.category,
    d.slug,
    d.access_level,
    d.created_at,
    ts_rank(
      to_tsvector('english', COALESCE(d.title, '') || ' ' || COALESCE(d.content, '') || ' ' || COALESCE(d.category, '')),
      plainto_tsquery('english', search_query)
    ) as relevance
  FROM documentation d
  WHERE 
    d.is_published = true
    AND to_tsvector('english', COALESCE(d.title, '') || ' ' || COALESCE(d.content, '') || ' ' || COALESCE(d.category, '')) 
    @@ plainto_tsquery('english', search_query)
  ORDER BY relevance DESC, d.title ASC
  LIMIT 50;
$$;

-- Create unified global search function
CREATE OR REPLACE FUNCTION public.global_search(search_query text, entity_types text[] DEFAULT ARRAY['organizations', 'users', 'subscriptions', 'documentation'])
RETURNS TABLE (
  entity_type text,
  entity_id uuid,
  title text,
  subtitle text,
  url text,
  relevance real,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM (
    -- Organizations
    SELECT 
      'organization'::text as entity_type,
      o.id as entity_id,
      o.name as title,
      COALESCE(o.contact_email, '') as subtitle,
      '/saas-organizations?id=' || o.id::text as url,
      o.relevance,
      o.created_at
    FROM search_organizations(search_query) o
    WHERE 'organizations' = ANY(entity_types)
    
    UNION ALL
    
    -- Users
    SELECT 
      'user'::text as entity_type,
      u.id as entity_id,
      u.email as title,
      'User' as subtitle,
      '/saas-users?id=' || u.id::text as url,
      u.relevance,
      u.created_at
    FROM search_users(search_query) u
    WHERE 'users' = ANY(entity_types)
    
    UNION ALL
    
    -- Subscriptions
    SELECT 
      'subscription'::text as entity_type,
      s.id as entity_id,
      s.plan_name as title,
      s.status || ' • ' || COALESCE(s.billing_cycle, 'monthly') as subtitle,
      '/saas-subscriptions?id=' || s.id::text as url,
      s.relevance,
      s.created_at
    FROM search_subscriptions(search_query) s
    WHERE 'subscriptions' = ANY(entity_types)
    
    UNION ALL
    
    -- Documentation
    SELECT 
      'documentation'::text as entity_type,
      d.id as entity_id,
      d.title as title,
      d.category as subtitle,
      '/saas-documentation/' || d.slug as url,
      d.relevance,
      d.created_at
    FROM search_documentation(search_query) d
    WHERE 'documentation' = ANY(entity_types)
  ) combined_results
  ORDER BY relevance DESC, created_at DESC
  LIMIT 100;
END;
$$;

-- Create search analytics table
CREATE TABLE IF NOT EXISTS public.search_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  search_query text NOT NULL,
  entity_types text[] DEFAULT ARRAY['organizations', 'users', 'subscriptions', 'documentation'],
  results_count integer DEFAULT 0,
  clicked_result_id uuid DEFAULT NULL,
  clicked_result_type text DEFAULT NULL,
  search_duration_ms integer DEFAULT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on search analytics
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for search analytics (users can only see their own searches, admins can see all)
CREATE POLICY "Users can view their own search analytics" 
  ON public.search_analytics 
  FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Create policy for inserting search analytics
CREATE POLICY "Users can create their own search analytics" 
  ON public.search_analytics 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_organizations_search ON organizations USING gin(to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(contact_email, '')));
CREATE INDEX IF NOT EXISTS idx_users_search ON users USING gin(to_tsvector('english', email));
CREATE INDEX IF NOT EXISTS idx_subscriptions_search ON subscriptions USING gin(to_tsvector('english', COALESCE(plan_name, '') || ' ' || COALESCE(status, '')));
CREATE INDEX IF NOT EXISTS idx_documentation_search ON documentation USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, '') || ' ' || COALESCE(category, '')));
CREATE INDEX IF NOT EXISTS idx_search_analytics_user_id ON search_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_search_analytics_created_at ON search_analytics(created_at);

-- Function to log search analytics
CREATE OR REPLACE FUNCTION public.log_search_analytics(
  search_query_param text,
  entity_types_param text[] DEFAULT ARRAY['organizations', 'users', 'subscriptions', 'documentation'],
  results_count_param integer DEFAULT 0,
  search_duration_ms_param integer DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  analytics_id uuid;
BEGIN
  INSERT INTO public.search_analytics (
    user_id,
    search_query,
    entity_types,
    results_count,
    search_duration_ms
  )
  VALUES (
    auth.uid(),
    search_query_param,
    entity_types_param,
    results_count_param,
    search_duration_ms_param
  )
  RETURNING id INTO analytics_id;
  
  RETURN analytics_id;
END;
$$;

-- Function to log search result clicks
CREATE OR REPLACE FUNCTION public.log_search_click(
  analytics_id_param uuid,
  clicked_result_id_param uuid,
  clicked_result_type_param text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.search_analytics
  SET 
    clicked_result_id = clicked_result_id_param,
    clicked_result_type = clicked_result_type_param
  WHERE id = analytics_id_param AND user_id = auth.uid();
END;
$$;
