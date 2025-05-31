
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
    
    // If we have subscriptions, make sure the organization's current_subscription_id is set to the active one
    if (data && data.length > 0) {
      const activeSubscription = data.find(sub => sub.status === 'active' || sub.status === 'trialing');
      if (activeSubscription) {
        // Update the organization's current_subscription_id if it's not set
        const { data: orgData, error: orgError } = await supabase
          .from("organizations")
          .select("current_subscription_id")
          .eq("id", organizationId)
          .single();
        
        if (!orgError && orgData && !orgData.current_subscription_id) {
          await supabase
            .from("organizations")
            .update({ current_subscription_id: activeSubscription.id })
            .eq("id", organizationId);
        }
      }
    }
    
    return data;
  },

  async getSubscriptionTemplates() {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .is("organization_id", null)
      .order("price_monthly", { ascending: true });
    
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
    
    // Update the organization's current_subscription_id
    if (data && subscription.organization_id && (subscription.status === 'active' || subscription.status === 'trialing')) {
      await supabase
        .from("organizations")
        .update({ current_subscription_id: data.id })
        .eq("id", subscription.organization_id);
    }
    
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
