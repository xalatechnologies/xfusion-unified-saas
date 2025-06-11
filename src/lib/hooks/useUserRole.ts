import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from './useUser';

export type UserRole = 'super_admin' | 'organization_admin' | 'user';

export function useUserRole() {
  const { user } = useUser();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const { data: roleData, error: roleError } = await supabase
          .rpc('get_user_system_role');

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          return;
        }

        console.log('Received role:', roleData);
        setRole(roleData);
      } catch (error) {
        console.error('Error in fetchRole:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return { role, isLoading };
} 