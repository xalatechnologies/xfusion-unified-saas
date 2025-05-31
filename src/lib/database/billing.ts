import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const billingApi = {
  async getSubscriptions(organizationId: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getSubscriptionTemplates() {
    console.log("Fetching subscription templates...");
    
    // First, let's try to get all subscriptions to see what's in the database
    const { data: allData, error: allError } = await supabase
      .from("subscriptions")
      .select("*");
    
    console.log("All subscriptions in database:", { allData, allError });
    
    // Now try the specific query for templates
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .is("organization_id", null)
      .order("price_monthly", { ascending: true });
    
    console.log("Subscription templates result:", { data, error });
    
    // Also try without the organization_id filter to debug
    const { data: dataWithoutOrgFilter, error: errorWithoutOrgFilter } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .order("price_monthly", { ascending: true });
    
    console.log("Templates without org filter:", { dataWithoutOrgFilter, errorWithoutOrgFilter });
    
    if (error) throw error;
    return data || [];
  },

  async createSubscription(subscription: Tables["subscriptions"]["Insert"]) {
    // First, mark any existing active subscriptions as cancelled
    if (subscription.organization_id && subscription.status === 'active') {
      await supabase
        .from("subscriptions")
        .update({ status: 'cancelled' })
        .eq("organization_id", subscription.organization_id)
        .eq("status", "active");
    }

    const { data, error } = await supabase
      .from("subscriptions")
      .insert(subscription)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSubscription(id: string, updates: Tables["subscriptions"]["Update"]) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async cancelSubscription(id: string) {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ status: 'cancelled' })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

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
