
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const procurementApi = {
  async getPurchaseOrders() {
    const { data, error } = await supabase
      .from("purchase_orders")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createPurchaseOrder(po: Tables["purchase_orders"]["Insert"]) {
    const { data, error } = await supabase
      .from("purchase_orders")
      .insert(po)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
