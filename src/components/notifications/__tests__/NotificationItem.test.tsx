import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationItem } from '../NotificationItem';
import { NotificationProvider } from '../NotificationProvider';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

// Mock notification data
const mockNotification = {
  id: '1',
  user_id: 'test-user',
  organization_id: null,
  type: 'system_alert',
  severity: 'info',
  category: 'system',
  title: 'Test Notification',
  message: 'This is a test notification',
  data: { link: '/test-link' },
  read_at: null,
  expires_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Mock NotificationProvider context
vi.mock('../NotificationProvider', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => children,
  useNotifications: () => ({
    markAsRead: vi.fn(),
    deleteNotifications: vi.fn(),
  }),
}));

describe('NotificationItem', () => {
  const mockOnClose = vi.fn();
  const mockMarkAsRead = vi.fn();
  const mockDeleteNotifications = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
    vi.mocked(useNotifications).mockImplementation(() => ({
      markAsRead: mockMarkAsRead,
      deleteNotifications: mockDeleteNotifications,
    }));
  });

  it('renders notification content correctly', () => {
    render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification')).toBeInTheDocument();
  });

  it('shows correct severity color and category icon', () => {
    render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    const iconContainer = screen.getByText('⚙️').closest('div');
    expect(iconContainer).toHaveClass('bg-blue-500');
  });

  it('marks notification as read when clicked', () => {
    render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByText('Test Notification'));
    expect(mockMarkAsRead).toHaveBeenCalledWith([mockNotification.id]);
  });

  it('navigates to link when clicked', () => {
    render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByText('Test Notification'));
    expect(mockPush).toHaveBeenCalledWith('/test-link');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deletes notification when delete button is clicked', () => {
    render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockDeleteNotifications).toHaveBeenCalledWith([mockNotification.id]);
  });

  it('shows mark as read button only for unread notifications', () => {
    const readNotification = { ...mockNotification, read_at: new Date().toISOString() };
    
    const { rerender } = render(
      <NotificationProvider>
        <NotificationItem notification={mockNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    expect(screen.getByRole('button', { name: /mark as read/i })).toBeInTheDocument();

    rerender(
      <NotificationProvider>
        <NotificationItem notification={readNotification} onClose={mockOnClose} />
      </NotificationProvider>
    );

    expect(screen.queryByRole('button', { name: /mark as read/i })).not.toBeInTheDocument();
  });
}); 