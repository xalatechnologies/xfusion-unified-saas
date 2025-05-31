
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
    
    // Check authentication status first
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log("Current user:", { user: user?.email, error: authError });
    
    // Try to check table permissions with a simple count first
    const { count, error: countError } = await supabase
      .from("subscriptions")
      .select("*", { count: 'exact', head: true });
    
    console.log("Subscriptions table access test:", { count, countError });
    
    // Check if we can access the table schema
    try {
      const { data: schemaTest, error: schemaError } = await supabase
        .from("subscriptions")
        .select("id")
        .limit(1);
      
      console.log("Schema access test:", { data: schemaTest, error: schemaError });
    } catch (err) {
      console.error("Schema access error:", err);
    }
    
    // Try to get ALL subscriptions to see what's in the table
    const { data: allSubscriptions, error: allError } = await supabase
      .from("subscriptions")
      .select("*");
    
    console.log("ALL subscriptions query:", { 
      data: allSubscriptions, 
      error: allError,
      dataLength: allSubscriptions?.length,
      errorCode: allError?.code,
      errorMessage: allError?.message
    });
    
    if (allSubscriptions && allSubscriptions.length > 0) {
      console.log("All subscription statuses found:", allSubscriptions.map(s => ({ 
        id: s.id, 
        plan_id: s.plan_id, 
        status: s.status,
        plan_name: s.plan_name 
      })));
    }
    
    // Now try the original query with template filter
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "template")
      .order("price_monthly", { ascending: true });
    
    console.log("Template-filtered query result:", { 
      data, 
      error,
      dataLength: data?.length,
      errorCode: error?.code,
      errorMessage: error?.message
    });
    
    // Also try a case-insensitive search
    const { data: caseInsensitiveData, error: caseInsensitiveError } = await supabase
      .from("subscriptions")
      .select("*")
      .ilike("status", "template")
      .order("price_monthly", { ascending: true });
    
    console.log("Case-insensitive template query:", { 
      data: caseInsensitiveData, 
      error: caseInsensitiveError,
      dataLength: caseInsensitiveData?.length
    });
    
    if (error) {
      console.error("Error getting subscription templates:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
    
    console.log("Final subscription templates count:", data?.length || 0);
    
    // Log each template for debugging
    if (data && data.length > 0) {
      console.log("Found templates:", data.map(t => ({ 
        id: t.id, 
        plan_id: t.plan_id, 
        plan_name: t.plan_name, 
        status: t.status 
      })));
    } else {
      console.warn("No subscription templates found. This might indicate:");
      console.warn("1. RLS policy blocking access");
      console.warn("2. No records with status='template' exist");
      console.warn("3. Table permissions issue");
    }
    
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
