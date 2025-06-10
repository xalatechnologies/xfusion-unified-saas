
-- Create global theme settings table for SAAS-wide design system
CREATE TABLE public.global_theme_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  theme_config jsonb NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create global translations table for centralized language management
CREATE TABLE public.global_translations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  translation_key text NOT NULL,
  language text NOT NULL,
  value text NOT NULL,
  category text DEFAULT 'general',
  is_custom boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(translation_key, language)
);

-- Create documentation table for the documentation dashboard
CREATE TABLE public.documentation (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  slug text NOT NULL UNIQUE,
  version text DEFAULT '1.0',
  is_published boolean DEFAULT false,
  access_level text DEFAULT 'public' CHECK (access_level IN ('public', 'admin', 'super_admin')),
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create organization theme overrides table
CREATE TABLE public.organization_themes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  theme_overrides jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(organization_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.global_theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_themes ENABLE ROW LEVEL SECURITY;

-- RLS policies for global_theme_settings
CREATE POLICY "Super admins can manage global themes" 
ON public.global_theme_settings 
FOR ALL 
USING (public.get_user_system_role() = 'super_admin');

CREATE POLICY "Users can view active global themes" 
ON public.global_theme_settings 
FOR SELECT 
USING (is_active = true);

-- RLS policies for global_translations
CREATE POLICY "Super admins can manage global translations" 
ON public.global_translations 
FOR ALL 
USING (public.get_user_system_role() = 'super_admin');

CREATE POLICY "Users can view global translations" 
ON public.global_translations 
FOR SELECT 
USING (true);

-- RLS policies for documentation
CREATE POLICY "Super admins can manage all documentation" 
ON public.documentation 
FOR ALL 
USING (public.get_user_system_role() = 'super_admin');

CREATE POLICY "Users can view published documentation based on access level" 
ON public.documentation 
FOR SELECT 
USING (
  is_published = true AND (
    access_level = 'public' OR
    (access_level = 'admin' AND public.get_user_system_role() IN ('super_admin', 'organization_admin')) OR
    (access_level = 'super_admin' AND public.get_user_system_role() = 'super_admin')
  )
);

-- RLS policies for organization_themes
CREATE POLICY "Organization members can view their theme" 
ON public.organization_themes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members 
    WHERE organization_id = organization_themes.organization_id 
    AND user_id = auth.uid() 
    AND status = 'active'
  )
);

CREATE POLICY "Organization admins can manage their theme" 
ON public.organization_themes 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members 
    WHERE organization_id = organization_themes.organization_id 
    AND user_id = auth.uid() 
    AND role IN ('owner', 'admin') 
    AND status = 'active'
  )
);

CREATE POLICY "Super admins can manage all organization themes" 
ON public.organization_themes 
FOR ALL 
USING (public.get_user_system_role() = 'super_admin');

-- Insert default global theme
INSERT INTO public.global_theme_settings (name, theme_config, is_active) VALUES (
  'default',
  '{
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#6B7280",
      "accent": "#8B5CF6",
      "background": "#FFFFFF",
      "surface": "#F9FAFB",
      "text": "#111827",
      "textSecondary": "#6B7280"
    },
    "typography": {
      "fontFamily": "Inter, system-ui, sans-serif",
      "fontSize": {
        "base": "16px",
        "lg": "18px",
        "xl": "20px"
      }
    },
    "spacing": {
      "unit": "0.25rem"
    },
    "borderRadius": {
      "sm": "0.375rem",
      "md": "0.5rem",
      "lg": "0.75rem"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)"
    }
  }',
  true
);

-- Insert some default translations
INSERT INTO public.global_translations (translation_key, language, value, category) VALUES
('app.name', 'en', 'SupplyMantix', 'branding'),
('app.name', 'fr', 'SupplyMantix', 'branding'),
('app.name', 'no', 'SupplyMantix', 'branding'),
('saas.admin.title', 'en', 'SAAS Admin', 'admin'),
('saas.admin.title', 'fr', 'Admin SAAS', 'admin'),
('saas.admin.title', 'no', 'SAAS Admin', 'admin');

-- Insert default documentation
INSERT INTO public.documentation (title, content, category, slug, is_published, access_level) VALUES
('Platform Architecture', '# Unified SaaS Platform Architecture\n\nThis platform provides a three-tier architecture supporting multiple SaaS products under one unified system.', 'architecture', 'platform-architecture', true, 'admin'),
('Getting Started', '# Getting Started\n\nWelcome to the SupplyMantix platform. This guide will help you get started.', 'guides', 'getting-started', true, 'public'),
('User Role Management', '# User Role Management\n\nThe platform supports three system-level roles: Super Admin, Organization Admin, and User.', 'administration', 'user-roles', true, 'admin');
