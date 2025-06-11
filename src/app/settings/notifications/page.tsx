import { NotificationPreferences } from '@/components/notifications/NotificationPreferences';

export const metadata = {
  title: 'Notification Settings | XFusion',
  description: 'Manage your notification preferences',
};

export default function NotificationSettingsPage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
      <NotificationPreferences />
    </div>
  );
} 