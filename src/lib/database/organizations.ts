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
    console.log("Updates being sent:", updates);
    
    // Debug: Let's first try to select the organization to see if it exists
    const { data: existingOrg, error: selectError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id);
    
    console.log("Existing organization query result:", { existingOrg, selectError });
    
    if (selectError) {
      console.error("Error selecting organization:", selectError);
      throw selectError;
    }
    
    if (!existingOrg || existingOrg.length === 0) {
      console.error("Organization not found with ID:", id);
      throw new Error(`Organization with ID ${id} not found`);
    }
    
    console.log("Found organization:", existingOrg[0]);
    
    // Now perform the update with a simpler approach
    const { data, error } = await supabase
      .from("organizations")
      .update(updates)
      .eq("id", id)
      .select();
    
    console.log("Update result:", { data, error });
    
    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error("No rows updated - this might be a permissions issue");
      throw new Error("Update failed - no rows were updated. Check permissions.");
    }
    
    console.log("Update successful, returned data:", data[0]);
    return data[0];
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
