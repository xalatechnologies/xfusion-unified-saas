import { useState } from 'react';
import { useNotifications } from './NotificationProvider';
import { NotificationItem } from './NotificationItem';
import { NotificationModal } from './NotificationModal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, Check, Loader2, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function NotificationDropdown() {
  const { notifications, unreadCount, markAllAsRead, deleteNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recentNotifications = notifications.slice(0, 3); // Show only 3 most recent notifications

  const handleMarkAllRead = async () => {
    setIsLoading(true);
    try {
      await markAllAsRead();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    setIsLoading(true);
    try {
      await deleteNotifications(notifications.map(n => n.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-[11px] text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-2" align="end">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-medium">Recent</h3>
            <div className="flex gap-0.5">
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6"
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0}
                    title="Mark all as read"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleClearAll}
                    disabled={notifications.length === 0}
                    title="Clear all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <ScrollArea className="h-[180px]">
            <div className="space-y-0.5 pr-2">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    compact
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-4 text-xs">
                  No notifications
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="mt-1 pt-1 border-t flex items-center justify-between">
            <span className="text-[10px] text-gray-500">
              {unreadCount} unread
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] font-medium px-2"
              onClick={() => {
                setShowAllModal(true);
                setIsOpen(false);
              }}
            >
              View all
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <NotificationModal
        open={showAllModal}
        onOpenChange={setShowAllModal}
      />
    </>
  );
} 