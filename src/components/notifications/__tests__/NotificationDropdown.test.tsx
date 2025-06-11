import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationDropdown } from '../NotificationDropdown';
import { NotificationProvider } from '../NotificationProvider';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    user_id: 'test-user',
    organization_id: null,
    type: 'system_alert',
    severity: 'info',
    category: 'system',
    title: 'Test Notification 1',
    message: 'This is a test notification',
    data: null,
    read_at: null,
    expires_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'test-user',
    organization_id: null,
    type: 'security_alert',
    severity: 'error',
    category: 'security',
    title: 'Test Notification 2',
    message: 'This is another test notification',
    data: null,
    read_at: new Date().toISOString(),
    expires_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock NotificationProvider context
vi.mock('../NotificationProvider', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => children,
  useNotifications: () => ({
    notifications: mockNotifications,
    unreadCount: 1,
    markAllAsRead: vi.fn(),
    deleteNotifications: vi.fn(),
  }),
}));

describe('NotificationDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders notification button with unread count', () => {
    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Test Notification 1')).toBeInTheDocument();
      expect(screen.getByText('Test Notification 2')).toBeInTheDocument();
    });
  });

  it('navigates to notifications page when "View All" is clicked', async () => {
    const mockPush = vi.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('View All')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('View All'));
    expect(mockPush).toHaveBeenCalledWith('/notifications');
  });

  it('shows empty state when there are no notifications', async () => {
    vi.mocked(useNotifications).mockImplementation(() => ({
      notifications: [],
      unreadCount: 0,
      markAllAsRead: vi.fn(),
      deleteNotifications: vi.fn(),
    }));

    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    });
  });

  it('calls markAllAsRead when "Mark all as read" button is clicked', async () => {
    const mockMarkAllAsRead = vi.fn();
    vi.mocked(useNotifications).mockImplementation(() => ({
      notifications: mockNotifications,
      unreadCount: 1,
      markAllAsRead: mockMarkAllAsRead,
      deleteNotifications: vi.fn(),
    }));

    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      const markAllReadButton = screen.getByRole('button', { name: /mark all as read/i });
      fireEvent.click(markAllReadButton);
      expect(mockMarkAllAsRead).toHaveBeenCalled();
    });
  });

  it('calls deleteNotifications when "Clear all" button is clicked', async () => {
    const mockDeleteNotifications = vi.fn();
    vi.mocked(useNotifications).mockImplementation(() => ({
      notifications: mockNotifications,
      unreadCount: 1,
      markAllAsRead: vi.fn(),
      deleteNotifications: mockDeleteNotifications,
    }));

    render(
      <NotificationProvider>
        <NotificationDropdown />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      const clearAllButton = screen.getByRole('button', { name: /clear all/i });
      fireEvent.click(clearAllButton);
      expect(mockDeleteNotifications).toHaveBeenCalledWith(['1', '2']);
    });
  });
}); 