
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type Documentation = Tables["documentation"]["Row"];
type DocumentationInsert = Tables["documentation"]["Insert"];
type DocumentationUpdate = Tables["documentation"]["Update"];

export const documentationApi = {
  async getAllDocumentation() {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .order("category", { ascending: true })
      .order("title", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getPublishedDocumentation() {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .eq("is_published", true)
      .order("category", { ascending: true })
      .order("title", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getDocumentationBySlug(slug: string) {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getDocumentationByCategory(category: string) {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .eq("category", category)
      .eq("is_published", true)
      .order("title", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createDocumentation(doc: DocumentationInsert) {
    const { data, error } = await supabase
      .from("documentation")
      .insert(doc)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateDocumentation(id: string, updates: DocumentationUpdate) {
    const { data, error } = await supabase
      .from("documentation")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteDocumentation(id: string) {
    const { error } = await supabase
      .from("documentation")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from("documentation")
      .select("category")
      .order("category", { ascending: true });
    
    if (error) throw error;
    
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  },

  async searchDocumentation(query: string) {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .eq("is_published", true)
      .order("title", { ascending: true });
    
    if (error) throw error;
    return data;
  }
};
