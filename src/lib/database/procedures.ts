
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const proceduresApi = {
  async getProcedures() {
    const { data, error } = await supabase
      .from("procedures")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createProcedure(procedure: Tables["procedures"]["Insert"]) {
    const { data, error } = await supabase
      .from("procedures")
      .insert(procedure)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
