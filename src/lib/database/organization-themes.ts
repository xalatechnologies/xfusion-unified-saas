import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/types/Json";

type Tables = Database["public"]["Tables"];
type OrganizationTheme = Tables["organization_themes"]["Row"];
type OrganizationThemeInsert = Tables["organization_themes"]["Insert"];
type OrganizationThemeUpdate = Tables["organization_themes"]["Update"];

export const organizationThemesApi = {
  async getOrganizationTheme(organizationId: string) {
    const { data, error } = await supabase
      .from("organization_themes")
      .select("*")
      .eq("organization_id", organizationId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }
    
    return data;
  },

  async createOrganizationTheme(theme: OrganizationThemeInsert) {
    const { data, error } = await supabase
      .from("organization_themes")
      .insert(theme)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateOrganizationTheme(organizationId: string, updates: OrganizationThemeUpdate) {
    const { data, error } = await supabase
      .from("organization_themes")
      .update(updates)
      .eq("organization_id", organizationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async upsertOrganizationTheme(organizationId: string, themeOverrides: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("organization_themes")
      .upsert({
        organization_id: organizationId,
        theme_overrides: themeOverrides as unknown as Json,
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteOrganizationTheme(organizationId: string) {
    const { error } = await supabase
      .from("organization_themes")
      .delete()
      .eq("organization_id", organizationId);
    
    if (error) throw error;
  }
};
