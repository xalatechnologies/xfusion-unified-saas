import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotificationPreferences } from '../NotificationPreferences';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';

// Mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              email_enabled: true,
              push_enabled: true,
              sms_enabled: false,
              frequency: 'immediate',
            },
            error: null,
          })),
        })),
      })),
      upsert: vi.fn(() => ({
        error: null,
      })),
    })),
  },
}));

// Mock useUser hook
vi.mock('@/lib/hooks/useUser', () => ({
  useUser: vi.fn(() => ({
    user: { id: 'test-user' },
  })),
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('NotificationPreferences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads and displays user preferences', async () => {
    render(<NotificationPreferences />);

    await waitFor(() => {
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Push Notifications')).toBeInTheDocument();
      expect(screen.getByText('SMS Notifications')).toBeInTheDocument();
    });

    // Check initial switch states
    const emailSwitch = screen.getByRole('switch', { name: /email notifications/i });
    const pushSwitch = screen.getByRole('switch', { name: /push notifications/i });
    const smsSwitch = screen.getByRole('switch', { name: /sms notifications/i });

    expect(emailSwitch).toBeChecked();
    expect(pushSwitch).toBeChecked();
    expect(smsSwitch).not.toBeChecked();
    expect(smsSwitch).toBeDisabled();
  });

  it('updates preferences when switches are toggled', async () => {
    render(<NotificationPreferences />);

    await waitFor(() => {
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
    });

    const emailSwitch = screen.getByRole('switch', { name: /email notifications/i });
    fireEvent.click(emailSwitch);
    expect(emailSwitch).not.toBeChecked();
  });

  it('saves preferences when save button is clicked', async () => {
    const mockUpsert = vi.fn(() => ({ error: null }));
    vi.mocked(supabase.from).mockImplementation(() => ({
      upsert: mockUpsert,
    }));

    render(<NotificationPreferences />);

    await waitFor(() => {
      expect(screen.getByText('Save Preferences')).toBeInTheDocument();
    });

    const emailSwitch = screen.getByRole('switch', { name: /email notifications/i });
    fireEvent.click(emailSwitch);

    const saveButton = screen.getByText('Save Preferences');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpsert).toHaveBeenCalledWith({
        user_id: 'test-user',
        email_enabled: false,
        push_enabled: true,
        sms_enabled: false,
        frequency: 'immediate',
        updated_at: expect.any(String),
      });
    });
  });

  it('shows error toast when save fails', async () => {
    vi.mocked(supabase.from).mockImplementation(() => ({
      upsert: vi.fn(() => ({ error: new Error('Failed to save') })),
    }));

    render(<NotificationPreferences />);

    await waitFor(() => {
      expect(screen.getByText('Save Preferences')).toBeInTheDocument();
    });

    const saveButton = screen.getByText('Save Preferences');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to save notification preferences');
    });
  });

  it('shows loading state initially', () => {
    render(<NotificationPreferences />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles frequency selection changes', async () => {
    render(<NotificationPreferences />);

    await waitFor(() => {
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
    });

    const frequencySelect = screen.getByRole('combobox');
    fireEvent.click(frequencySelect);
    fireEvent.click(screen.getByText('Daily Digest'));

    const saveButton = screen.getByText('Save Preferences');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('notification_preferences');
      expect(toast.success).toHaveBeenCalledWith('Notification preferences saved');
    });
  });
}); 