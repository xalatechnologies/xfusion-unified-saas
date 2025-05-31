
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const billingApi = {
  async getOrganizationSubscription(organizationId: string) {
    const { data, error } = await supabase
      .from("organization_subscriptions")
      .select(`
        *,
        subscriptions (
          id,
          plan_id,
          plan_name,
          price_monthly,
          price_yearly,
          max_users,
          features
        )
      `)
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getSubscriptionTemplates() {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .neq("plan_id", "trial")
      .order("price_monthly", { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createOrganizationSubscription(organizationSubscription: {
    organization_id: string;
    subscription_id: string;
    status: string;
    billing_cycle: string;
    current_period_start: string;
    current_period_end: string;
  }) {
    // First, cancel any existing active subscriptions
    await supabase
      .from("organization_subscriptions")
      .update({ status: 'cancelled' })
      .eq("organization_id", organizationSubscription.organization_id)
      .eq("status", "active");

    const { data, error } = await supabase
      .from("organization_subscriptions")
      .insert(organizationSubscription)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update the organization's current_subscription_id
    if (data) {
      await supabase
        .from("organizations")
        .update({ current_subscription_id: data.id })
        .eq("id", organizationSubscription.organization_id);
    }
    
    return data;
  },

  async updateOrganizationSubscription(id: string, updates: any) {
    const { data, error } = await supabase
      .from("organization_subscriptions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async cancelOrganizationSubscription(id: string) {
    const { data, error } = await supabase
      .from("organization_subscriptions")
      .update({ status: 'cancelled' })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Clear the organization's current_subscription_id if this was the current subscription
    if (data) {
      await supabase
        .from("organizations")
        .update({ current_subscription_id: null })
        .eq("current_subscription_id", data.id);
    }
    
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
