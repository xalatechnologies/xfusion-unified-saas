
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type GlobalTranslation = Tables["global_translations"]["Row"];
type GlobalTranslationInsert = Tables["global_translations"]["Insert"];
type GlobalTranslationUpdate = Tables["global_translations"]["Update"];

export const globalTranslationsApi = {
  async getAllTranslations() {
    const { data, error } = await supabase
      .from("global_translations")
      .select("*")
      .order("translation_key", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getTranslationsByLanguage(language: string) {
    const { data, error } = await supabase
      .from("global_translations")
      .select("*")
      .eq("language", language);
    
    if (error) throw error;
    return data;
  },

  async getTranslationsByCategory(category: string) {
    const { data, error } = await supabase
      .from("global_translations")
      .select("*")
      .eq("category", category);
    
    if (error) throw error;
    return data;
  },

  async createTranslation(translation: GlobalTranslationInsert) {
    const { data, error } = await supabase
      .from("global_translations")
      .insert(translation)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTranslation(id: string, updates: GlobalTranslationUpdate) {
    const { data, error } = await supabase
      .from("global_translations")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTranslation(id: string) {
    const { error } = await supabase
      .from("global_translations")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  },

  async getLanguages(): Promise<string[]> {
    const { data, error } = await supabase
      .from("global_translations")
      .select("language")
      .order("language", { ascending: true });
    
    if (error) throw error;
    
    const uniqueLanguages = [...new Set(data.map(item => item.language))];
    return uniqueLanguages;
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from("global_translations")
      .select("category")
      .order("category", { ascending: true });
    
    if (error) throw error;
    
    const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
    return uniqueCategories;
  }
};
