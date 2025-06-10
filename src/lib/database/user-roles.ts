
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type AppRole = Database["public"]["Enums"]["app_role"];

export const userRolesApi = {
  async getUserSystemRole(userId?: string): Promise<AppRole | null> {
    const { data, error } = await supabase.rpc('get_user_system_role', {
      user_id_param: userId || undefined
    });
    
    if (error) {
      console.error('Error fetching user system role:', error);
      return null;
    }
    
    return data as AppRole;
  },

  async assignSystemRole(targetUserId: string, role: AppRole, assignedBy?: string) {
    const { error } = await supabase.rpc('assign_system_role', {
      target_user_id: targetUserId,
      new_role: role,
      assigned_by_user_id: assignedBy || undefined
    });
    
    if (error) {
      console.error('Error assigning system role:', error);
      throw error;
    }
    
    return true;
  },

  async getUserRoles() {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async isUserOrgAdmin(userId?: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('user_is_org_admin', {
      user_id_param: userId || undefined
    });
    
    if (error) {
      console.error('Error checking if user is org admin:', error);
      return false;
    }
    
    return data as boolean;
  },

  async getCurrentUserTenantId(): Promise<string | null> {
    const { data, error } = await supabase.rpc('get_current_user_tenant_id');
    
    if (error) {
      console.error('Error getting current user tenant ID:', error);
      return null;
    }
    
    return data;
  },

  async currentUserIsSuperAdmin(): Promise<boolean> {
    const { data, error } = await supabase.rpc('current_user_is_super_admin');
    
    if (error) {
      console.error('Error checking if current user is super admin:', error);
      return false;
    }
    
    return data as boolean;
  }
};
