
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const billingInformationApi = {
  async getBillingInformation(organizationId: string) {
    const { data, error } = await supabase
      .from("billing_information")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createBillingInformation(billing: Tables["billing_information"]["Insert"]) {
    const { data, error } = await supabase
      .from("billing_information")
      .insert(billing)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
