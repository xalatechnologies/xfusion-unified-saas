import React, { createContext, useContext } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: ReturnType<typeof useUser>['user'];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
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
  const { user, loading } = useUser();

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Attempting to sign in...');
      const response = await supabase.auth.signInWithPassword({ email, password });
      console.log('AuthContext: Sign in response:', response);
      return response;
    } catch (error) {
      console.error('AuthContext: Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({ email, password });
      return response;
    } catch (error) {
      console.error('AuthContext: Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
