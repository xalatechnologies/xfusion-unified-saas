import { NotificationPreferences } from '@/components/notifications/NotificationPreferences';

export default function NotificationSettingsPage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
      <NotificationPreferences />
    </div>
  );
} 