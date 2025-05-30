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

  async inviteOrganizationMember(invitation: {
    organization_id: string;
    invited_email: string;
    role: Database["public"]["Enums"]["organization_role"];
    invited_by: string;
  }) {
    const { data, error } = await supabase
      .from("organization_members")
      .insert({
        organization_id: invitation.organization_id,
        invited_email: invitation.invited_email,
        role: invitation.role,
        status: "pending",
        invited_by: invitation.invited_by,
        invited_at: new Date().toISOString(),
      })
      .select("*, organizations(name)")
      .single();
    
    if (error) throw error;
    return data;
  },

  async sendInvitationEmail(params: {
    email: string;
    organizationName: string;
    inviterName: string;
    role: string;
    invitationToken: string;
  }) {
    const { data, error } = await supabase.functions.invoke('send-invitation', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async getInvitationByToken(token: string) {
    const { data, error } = await supabase.rpc('get_invitation_by_token', {
      token_param: token
    });

    if (error) throw error;
    return data?.[0] || null;
  },

  async acceptInvitation(token: string, userId: string) {
    const { data, error } = await supabase.rpc('accept_invitation', {
      token_param: token,
      user_id_param: userId
    });

    if (error) throw error;
    return data;
  },
};
