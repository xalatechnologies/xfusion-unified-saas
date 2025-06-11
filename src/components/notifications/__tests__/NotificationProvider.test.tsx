import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationProvider, useNotifications } from '../NotificationProvider';
import { supabase } from '@/lib/supabase';
import type { Notification } from '@/types/notifications';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    }),
    removeChannel: vi.fn(),
  },
}));

// Mock database functions
vi.mock('@/lib/db/notifications', () => ({
  getUserNotifications: vi.fn().mockResolvedValue([
    {
      id: '1',
      user_id: 'test-user',
      organization_id: null,
      type: 'system_alert',
      severity: 'info',
      category: 'system',
      title: 'Test Notification',
      message: 'This is a test',
      data: null,
      read_at: null,
      expires_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]),
  markNotificationsRead: vi.fn().mockResolvedValue(['1']),
  markAllNotificationsRead: vi.fn().mockResolvedValue(['1']),
  deleteNotifications: vi.fn().mockResolvedValue(['1']),
}));

// Test component that uses notifications
function TestComponent() {
  const { notifications, unreadCount } = useNotifications();
  return (
    <div>
      <div data-testid="notification-count">{notifications.length}</div>
      <div data-testid="unread-count">{unreadCount}</div>
    </div>
  );
}

describe('NotificationProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load initial notifications', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('notification-count')).toHaveTextContent('1');
      expect(screen.getByTestId('unread-count')).toHaveTextContent('1');
    });
  });

  it('should handle new notifications', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Simulate new notification
    const newNotification: Notification = {
      id: '2',
      user_id: 'test-user',
      organization_id: null,
      type: 'system_alert',
      severity: 'info',
      category: 'system',
      title: 'New Notification',
      message: 'This is new',
      data: null,
      read_at: null,
      expires_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await act(async () => {
      const channel = (supabase.channel as jest.Mock)();
      const onCallback = channel.on.mock.calls[0][2];
      onCallback({ new: newNotification });
    });

    await waitFor(() => {
      expect(screen.getByTestId('notification-count')).toHaveTextContent('2');
      expect(screen.getByTestId('unread-count')).toHaveTextContent('2');
    });
  });

  it('should subscribe to notifications for the current user', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    await waitFor(() => {
      expect(supabase.channel).toHaveBeenCalledWith('user-notifications-test-user');
      expect((supabase.channel as jest.Mock)().on).toHaveBeenCalledWith(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: 'user_id=eq.test-user',
        },
        expect.any(Function)
      );
    });
  });
}); 