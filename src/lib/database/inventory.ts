
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const inventoryApi = {
  async getInventoryItems() {
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createInventoryItem(item: Tables["inventory_items"]["Insert"]) {
    const { data, error } = await supabase
      .from("inventory_items")
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
