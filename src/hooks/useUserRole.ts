
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { databaseApi } from '@/lib/database';

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
        console.log('Fetching user system role for user:', user.id);
        const role = await databaseApi.getUserSystemRole();
        console.log('Received role:', role);
        setSystemRole(role as SystemRole || 'user');
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
