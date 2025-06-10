
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type GlobalThemeSettings = Tables["global_theme_settings"]["Row"];
type GlobalThemeInsert = Tables["global_theme_settings"]["Insert"];
type GlobalThemeUpdate = Tables["global_theme_settings"]["Update"];

export const globalThemeApi = {
  async getActiveTheme(): Promise<GlobalThemeSettings | null> {
    const { data, error } = await supabase
      .from("global_theme_settings")
      .select("*")
      .eq("is_active", true)
      .single();
    
    if (error) {
      console.error('Error fetching active theme:', error);
      return null;
    }
    
    return data;
  },

  async getAllThemes() {
    const { data, error } = await supabase
      .from("global_theme_settings")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createTheme(theme: GlobalThemeInsert) {
    const { data, error } = await supabase
      .from("global_theme_settings")
      .insert(theme)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTheme(id: string, updates: GlobalThemeUpdate) {
    const { data, error } = await supabase
      .from("global_theme_settings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async activateTheme(id: string) {
    // Deactivate all themes first
    await supabase
      .from("global_theme_settings")
      .update({ is_active: false })
      .neq("id", "");
    
    // Activate the selected theme
    const { data, error } = await supabase
      .from("global_theme_settings")
      .update({ is_active: true })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTheme(id: string) {
    const { error } = await supabase
      .from("global_theme_settings")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
};
