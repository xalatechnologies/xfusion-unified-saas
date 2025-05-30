
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const organizationsApi = {
  async getOrganizations() {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createOrganization(organization: Tables["organizations"]["Insert"]) {
    const { data, error } = await supabase
      .from("organizations")
      .insert(organization)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateOrganization(id: string, updates: Tables["organizations"]["Update"]) {
    console.log("Updating organization with ID:", id);
    console.log("Updates:", updates);
    
    const { data, error } = await supabase
      .from("organizations")
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error(`Organization with ID ${id} not found`);
    }
    
    return data;
  },

  async getOrganizationMembers(organizationId: string) {
    const { data, error } = await supabase
      .from("organization_members")
      .select(`
        *,
        users!organization_members_user_id_fkey(email)
      `)
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async inviteOrganizationMember(member: Tables["organization_members"]["Insert"]) {
    const { data, error } = await supabase
      .from("organization_members")
      .insert(member)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
