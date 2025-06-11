import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotificationTriggers } from '../notificationTriggers';
import { supabase } from '@/lib/supabase';
import { NotificationService } from '../notificationService';
import type { User } from '@supabase/supabase-js';
import type { Organization, Subscription, Invoice } from '@/types/database';

// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            data: [{ id: 'admin-1' }, { id: 'admin-2' }],
            error: null
          }))
        }))
      }))
    }))
  }
}));

// Mock NotificationService
vi.mock('../notificationService', () => ({
  NotificationService: {
    service: {
      send: vi.fn(),
      sendBulk: vi.fn()
    }
  }
}));

describe('NotificationTriggers', () => {
  let notificationTriggers: NotificationTriggers;

  beforeEach(() => {
    vi.clearAllMocks();
    notificationTriggers = NotificationTriggers.triggers;
  });

  describe('onUserRegistration', () => {
    it('should notify super admins about new user registration', async () => {
      const user = {
        id: 'user-1',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User;
      
      await notificationTriggers.onUserRegistration(user);

      expect(supabase.from).toHaveBeenCalledWith('users');
      expect(NotificationService.service.sendBulk).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'system_alert',
            data: expect.objectContaining({
              alert_type: 'New User Registration',
              message: expect.stringContaining(user.email)
            })
          })
        ])
      );
    });
  });

  describe('onSubscriptionChange', () => {
    it('should notify organization admins about subscription changes', async () => {
      const subscription = {
        id: 'sub-1',
        organization_id: 'org-1',
        plan_name: 'Pro',
        status: 'active',
        trial_end: '2024-04-01',
        current_period_end: '2024-05-01',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Subscription;

      await notificationTriggers.onSubscriptionChange(subscription, 'trial_ending');

      expect(supabase.from).toHaveBeenCalledWith('organization_members');
      expect(NotificationService.service.sendBulk).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'subscription_update',
            data: expect.objectContaining({
              plan_name: subscription.plan_name
            })
          })
        ])
      );
    });
  });

  describe('onOrganizationInvite', () => {
    it('should send invitation notification to invited user', async () => {
      const organization = {
        id: 'org-1',
        name: 'Test Org',
        contact_email: 'org@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Organization;

      await notificationTriggers.onOrganizationInvite(
        'user-1',
        organization,
        'John Doe',
        'member'
      );

      expect(NotificationService.service.send).toHaveBeenCalledWith(
        'user-1',
        'organization_invite',
        expect.objectContaining({
          organization_name: organization.name,
          inviter_name: 'John Doe',
          role: 'member'
        }),
        organization.id
      );
    });
  });

  describe('onSecurityEvent', () => {
    it('should send security alert to affected user', async () => {
      const eventData = {
        device: 'iPhone',
        location: 'San Francisco'
      };

      await notificationTriggers.onSecurityEvent(
        'user-1',
        'new_device',
        eventData
      );

      expect(NotificationService.service.send).toHaveBeenCalledWith(
        'user-1',
        'security_alert',
        expect.objectContaining({
          alert_type: 'new_device',
          device: 'iPhone',
          location: 'San Francisco'
        })
      );
    });
  });

  describe('onBillingEvent', () => {
    it('should notify organization admins about billing events', async () => {
      const invoice = {
        id: 'inv-1',
        organization_id: 'org-1',
        number: 'INV-001',
        amount: 99.99,
        status: 'open',
        due_date: '2024-04-01',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Invoice;

      await notificationTriggers.onBillingEvent(invoice, 'payment_due');

      expect(supabase.from).toHaveBeenCalledWith('organization_members');
      expect(NotificationService.service.sendBulk).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'billing_reminder',
            data: expect.objectContaining({
              amount: invoice.amount,
              invoice_number: invoice.number
            })
          })
        ])
      );
    });
  });

  describe('onSystemMaintenance', () => {
    it('should notify all users about system maintenance', async () => {
      const message = 'Scheduled maintenance';
      const startTime = new Date('2024-04-01T10:00:00Z');
      const endTime = new Date('2024-04-01T12:00:00Z');
      const affectedServices = ['API', 'Dashboard'];

      await notificationTriggers.onSystemMaintenance(
        message,
        startTime,
        endTime,
        affectedServices
      );

      expect(supabase.from).toHaveBeenCalledWith('users');
      expect(NotificationService.service.sendBulk).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'system_alert',
            data: expect.objectContaining({
              alert_type: 'System Maintenance',
              message,
              affected_services: affectedServices
            })
          })
        ])
      );
    });
  });
}); 