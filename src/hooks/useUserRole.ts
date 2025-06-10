
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type SystemRole = 'super_admin' | 'organization_admin' | 'user';

export const useUserRole = () => {
  const [systemRole, setSystemRole] = useState<SystemRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setSystemRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('get_user_system_role');
        
        if (error) {
          console.error('Error fetching user role:', error);
          setSystemRole('user'); // Default to user role
        } else {
          setSystemRole(data as SystemRole || 'user');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setSystemRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return { systemRole, loading };
};
