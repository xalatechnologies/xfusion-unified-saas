import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { User } from "@/types/User";

type Tables = Database["public"]["Tables"];

type UsersWithRoleRow = {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  status?: string;
  system_role?: string;
};

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

  async getUsers(options: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: {
      status?: string;
      role?: string;
      organization?: string;
      dateRange?: string;
      search?: string;
    };
  } = {}): Promise<any> {
    const {
      page = 1,
      pageSize = 20,
      sortBy = 'created_at',
      sortOrder = 'desc',
      filters = {}
    } = options;
    // @ts-expect-error: users_with_role is a custom view not present in generated types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = supabase.from("users_with_role") as any;

    // Filtering
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters.role && filters.role !== 'all') {
      query = query.eq('system_role', filters.role);
    }
    if (filters.organization && filters.organization !== 'all') {
      query = query.eq('organization_id', filters.organization);
    }
    if (filters.search) {
      query = query.ilike('email', `%${filters.search}%`);
    }
    // TODO: Add dateRange filtering if needed

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await query as any;
    let data: unknown, error: unknown, count: unknown;
    if (typeof result === 'object' && result !== null) {
      ({ data, error, count } = result as Record<string, unknown>);
    }
    if (error) throw error;
    return {
      users: Array.isArray(data) ? data.filter(isUser) : [],
      total: count || 0
    };
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

  async deleteUser(userId: string) {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
    if (error) throw error;
    return true;
  },

  async changeUserPassword(userId: string, newPassword: string) {
    // This requires service role key and Supabase admin API
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });
    if (error) throw error;
    return true;
  },
};

function isUser(obj: unknown): obj is User {
  return obj && typeof obj === 'object' && typeof (obj as User).id === 'string' && typeof (obj as User).email === 'string';
}
