import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from './useUser';
import type { Notification } from '@/types/notifications';

export function useNotificationSubscription(onNewNotification: (notification: Notification) => void) {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Subscribe to notifications for the current user
    const subscription = supabase
      .channel(`user_notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          onNewNotification(payload.new as Notification);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, onNewNotification]);
} 