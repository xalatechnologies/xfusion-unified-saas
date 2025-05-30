
import { supabase } from '@/integrations/supabase/client';

export const useAuthActions = () => {
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

  return { signIn, signUp, signOut };
};
