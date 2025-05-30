
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
    const { data, error } = await supabase
      .from("organizations")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating organization:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("Organization not found or you don't have permission to update it");
    }
    
    return data;
  },

  async getOrganizationMembers(organizationId: string) {
    // First get the organization members
    const { data: members, error: membersError } = await supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });
    
    if (membersError) {
      console.error("Error fetching organization members:", membersError);
      throw membersError;
    }

    // Then get user details for each member
    if (!members || members.length === 0) {
      return [];
    }

    const userIds = members.filter(m => m.user_id).map(m => m.user_id);
    
    if (userIds.length === 0) {
      return members.map(member => ({
        ...member,
        users: null
      }));
    }

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email")
      .in("id", userIds);

    if (usersError) {
      console.error("Error fetching users:", usersError);
      // Return members without user data if user fetch fails
      return members.map(member => ({
        ...member,
        users: null
      }));
    }

    // Combine the data
    return members.map(member => ({
      ...member,
      users: users?.find(user => user.id === member.user_id) || null
    }));
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
