import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';
import { toast } from 'sonner';
import { useUserRole } from '@/lib/hooks/useUserRole';

const testNotifications = [
  {
    type: 'system_alert',
    severity: 'info',
    category: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur in 2 hours. The system may be temporarily unavailable.',
    data: { link: '/system-status' }
  },
  {
    type: 'security_alert',
    severity: 'error',
    category: 'security',
    title: 'Unusual Login Activity',
    message: 'We detected a login from a new device in London, UK. Please verify if this was you.',
    data: { link: '/security-settings' }
  },
  {
    type: 'billing_reminder',
    severity: 'warning',
    category: 'billing',
    title: 'Payment Due Soon',
    message: 'Your subscription payment is due in 3 days. Please ensure your payment method is up to date.',
    data: { link: '/billing' }
  },
  {
    type: 'organization_invite',
    severity: 'info',
    category: 'organization',
    title: 'Team Invitation',
    message: 'John Doe has invited you to join the Marketing team.',
    data: { link: '/organizations' }
  },
  {
    type: 'user_action',
    severity: 'success',
    category: 'user',
    title: 'Profile Updated',
    message: 'Your profile changes have been saved successfully.',
    data: { link: '/profile' }
  }
];

export function TestNotifications() {
  const { user } = useUser();
  const { role } = useUserRole();

  const addTestNotifications = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    console.log('Current user:', user);
    console.log('User role:', role);
    console.log('Adding test notifications for user:', user.id);

    try {
      // Check if user is super admin first
      const { data: isAdmin, error: adminCheckError } = await supabase
        .rpc('check_super_admin');

      if (adminCheckError) {
        console.error('Error checking admin status:', adminCheckError);
        toast.error('Failed to verify admin status');
        return;
      }

      console.log('Is super admin:', isAdmin);

      // Try to add notifications using RPC function first
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('create_test_notifications', { p_user_id: user.id });

      if (rpcError) {
        console.log('RPC failed, falling back to direct insert:', rpcError);
        
        // Fall back to direct insert
        const testNotification = {
          user_id: user.id,
          ...testNotifications[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('Attempting to insert notification:', testNotification);

        const { data, error } = await supabase
          .from('notifications')
          .insert(testNotification)
          .select('*')
          .single();

        if (error) {
          console.error('Error details:', error);
          toast.error(`Failed to add notification: ${error.message}`);
          return;
        }

        console.log('Notification added successfully:', data);
        toast.success('Test notification added successfully');
      } else {
        console.log('Notifications added via RPC:', rpcData);
        toast.success('Test notifications added successfully');
      }
    } catch (error) {
      console.error('Failed to add test notifications:', error);
      toast.error('Failed to add test notifications');
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={addTestNotifications}
      className="fixed bottom-4 right-4 bg-white shadow-lg hover:bg-gray-100"
    >
      Add Test Notifications
    </Button>
  );
} 