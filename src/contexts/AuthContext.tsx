
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, company?: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle successful signup confirmation or sign in
        if (event === 'SIGNED_IN' && session?.user) {
          // Use setTimeout to avoid blocking the auth state change
          setTimeout(async () => {
            try {
              await handleUserSetup(session.user);
            } catch (error) {
              console.error('Error in user setup:', error);
            }
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSetup = async (user: User) => {
    try {
      // First check if user already exists in our users table
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('id, tenant_id')
        .eq('id', user.id)
        .single();

      if (userCheckError && userCheckError.code !== 'PGRST116') {
        console.error('Error checking user existence:', userCheckError);
        return;
      }

      if (existingUser) {
        console.log('User already exists with tenant:', existingUser.tenant_id);
        return;
      }

      console.log('Creating tenant and organization for new user');
      await createUserTenantAndOrganization(user);
    } catch (error) {
      console.error('Error in handleUserSetup:', error);
    }
  };

  const createUserTenantAndOrganization = async (user: User) => {
    try {
      const firstName = user.user_metadata?.first_name || '';
      const lastName = user.user_metadata?.last_name || '';
      const company = user.user_metadata?.company || `${firstName} ${lastName}'s Organization`.trim();

      console.log('Creating tenant with name:', company);
      
      // Create tenant first
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({
          name: company || 'Default Organization'
        })
        .select()
        .single();

      if (tenantError) {
        console.error('Error creating tenant:', tenantError);
        throw tenantError;
      }

      console.log('Created tenant:', tenant.id);

      // Create organization
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: company || 'Default Organization',
          created_by: user.id,
          contact: {
            email: user.email,
            phone: null,
            address: null
          }
        })
        .select()
        .single();

      if (orgError) {
        console.error('Error creating organization:', orgError);
        throw orgError;
      }

      console.log('Created organization:', organization.id);

      // Create user record with admin role
      const { data: userRecord, error: userError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          tenant_id: tenant.id,
          role: 'admin'
        })
        .select()
        .single();

      if (userError) {
        console.error('Error creating user record:', userError);
        throw userError;
      }

      console.log('Created user record with admin role');

      // Update user metadata to mark tenant as created
      await supabase.auth.updateUser({
        data: { tenant_created: true, tenant_id: tenant.id }
      });

      console.log('Successfully created tenant, organization, and user records');
    } catch (error) {
      console.error('Error in createUserTenantAndOrganization:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string, company?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // Disable email confirmation redirect
        data: {
          first_name: firstName,
          last_name: lastName,
          company: company,
        },
      },
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
