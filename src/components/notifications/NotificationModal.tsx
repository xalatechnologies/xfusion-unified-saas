import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './NotificationProvider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Filter, Check, Trash2, Loader2 } from 'lucide-react';
import { NotificationType, NotificationSeverity } from '@/types/notifications';

export function NotificationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { notifications, unreadCount, markAllAsRead, deleteNotifications } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || notification.severity === selectedSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const unreadNotifications = filteredNotifications.filter((n) => !n.read_at);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5" />
              <div>
                <DialogTitle className="text-xl">Notifications</DialogTitle>
                <DialogDescription className="mt-1">
                  Manage your notifications and stay updated
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark all read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleClearAll}
                    disabled={notifications.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear all
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="system_alert">System Alert</SelectItem>
                <SelectItem value="user_action">User Action</SelectItem>
                <SelectItem value="subscription_update">Subscription</SelectItem>
                <SelectItem value="billing_reminder">Billing</SelectItem>
                <SelectItem value="security_alert">Security</SelectItem>
                <SelectItem value="organization_invite">Organization Invite</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="all" className="flex-1">
                All Notifications
                <Badge variant="secondary" className="ml-2 bg-gray-100">
                  {filteredNotifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
                <Badge variant="secondary" className="ml-2 bg-gray-100">
                  {unreadNotifications.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 pr-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No notifications found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 pr-4">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No unread notifications
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
} 