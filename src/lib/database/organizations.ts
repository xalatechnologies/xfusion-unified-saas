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
    
    // Perform the update without trying to return the updated row first
    const { error } = await supabase
      .from("organizations")
      .update(updates)
      .eq("id", id);
    
    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    
    // Then fetch the updated organization
    const { data: updatedOrg, error: fetchError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single();
    
    if (fetchError) {
      console.error("Error fetching updated organization:", fetchError);
      throw fetchError;
    }
    
    console.log("Update successful:", updatedOrg);
    return updatedOrg;
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
