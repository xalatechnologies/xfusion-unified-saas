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
    
    // First, verify the organization exists
    const { data: existingOrg, error: checkError } = await supabase
      .from("organizations")
      .select("id")
      .eq("id", id)
      .single();
    
    if (checkError) {
      console.error("Organization not found:", checkError);
      throw new Error(`Organization with ID ${id} not found`);
    }
    
    console.log("Organization exists, proceeding with update");
    
    // Perform the update
    const { data, error } = await supabase
      .from("organizations")
      .update({
        name: updates.name,
        website: updates.website,
        address: updates.address,
        contact: updates.contact,
        contact_email: updates.contact_email,
        contact_phone: updates.contact_phone,
        contact_fax: updates.contact_fax,
        default_language: updates.default_language,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select();
    
    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error("No rows updated");
      throw new Error("Update failed - no rows were updated");
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
