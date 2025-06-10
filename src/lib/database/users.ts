
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const usersApi = {
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

  async updateUserInfo(userId: string, firstName?: string, lastName?: string, avatarUrl?: string) {
    const { error } = await supabase.rpc('update_user_info', {
      user_id_param: userId,
      first_name_param: firstName || null,
      last_name_param: lastName || null,
      avatar_url_param: avatarUrl || null
    });
    
    if (error) throw error;
  },

  async updateUserStatus(userId: string, status: string) {
    const { error } = await supabase.rpc('update_user_status', {
      user_id_param: userId,
      status_param: status
    });
    
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (error) throw error;
    return data;
  },
};
