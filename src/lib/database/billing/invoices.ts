
import { supabase } from "@/integrations/supabase/client";

export const invoicesApi = {
  async getInvoices(organizationId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },
};
