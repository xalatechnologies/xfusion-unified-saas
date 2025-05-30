
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const assetsApi = {
  async getAssets() {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createAsset(asset: Tables["assets"]["Insert"]) {
    const { data, error } = await supabase
      .from("assets")
      .insert(asset)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
