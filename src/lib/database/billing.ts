import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const billingApi = {
  async getOrganizationSubscription(organizationId: string) {
    console.log("Getting organization subscription for:", organizationId);
    
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
    
    if (error) {
      console.error("Error getting organization subscription:", error);
      throw error;
    }
    
    console.log("Organization subscription data:", data);
    return data;
  },

  async getSubscriptionTemplates() {
    console.log("Getting subscription templates...");
    
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .order("price_monthly", { ascending: true });
    
    if (error) {
      console.error("Error getting subscription templates:", error);
      throw error;
    }
    
    console.log("Found subscription templates:", data?.length || 0);
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
    console.log("Creating organization subscription:", organizationSubscription);
    
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
    
    if (error) {
      console.error("Error creating organization subscription:", error);
      throw error;
    }
    
    // Update the organization's current_subscription_id
    if (data) {
      await supabase
        .from("organizations")
        .update({ current_subscription_id: data.id })
        .eq("id", organizationSubscription.organization_id);
    }
    
    console.log("Created organization subscription:", data);
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
