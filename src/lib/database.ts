
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const databaseApi = {
  // Tenants
  async getTenants() {
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createTenant(tenant: Tables["tenants"]["Insert"]) {
    const { data, error } = await supabase
      .from("tenants")
      .insert(tenant)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createUser(user: Tables["users"]["Insert"]) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Work Orders
  async getWorkOrders() {
    const { data, error } = await supabase
      .from("work_orders")
      .select(`
        *,
        assets(name, location),
        users(email)
      `)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createWorkOrder(workOrder: Tables["work_orders"]["Insert"]) {
    const { data, error } = await supabase
      .from("work_orders")
      .insert(workOrder)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateWorkOrder(id: string, updates: Tables["work_orders"]["Update"]) {
    const { data, error } = await supabase
      .from("work_orders")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Assets
  async getAssets() {
    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createAsset(asset: Tables["assets"]["Insert"]) {
    const { data, error } = await supabase
      .from("assets")
      .insert(asset)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Inventory Items
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

  // Purchase Orders
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

  // Procedures
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

  // Chat Messages
  async getChatMessages(workOrderId: string) {
    const { data, error } = await supabase
      .from("chat_messages")
      .select(`
        *,
        users(email)
      `)
      .eq("work_order_id", workOrderId)
      .order("created_at", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createChatMessage(message: Tables["chat_messages"]["Insert"]) {
    const { data, error } = await supabase
      .from("chat_messages")
      .insert(message)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
