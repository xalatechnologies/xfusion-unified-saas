import { useNotifications } from './NotificationProvider';
import { NotificationItem } from './NotificationItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Loader2, Search, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { NotificationCategory, NotificationSeverity } from '@/types/notifications';

export function NotificationCenter() {
  const { notifications, unreadCount, markAllAsRead, deleteNotifications } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<NotificationSeverity | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

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

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          notification.title.toLowerCase().includes(searchLower) ||
          notification.message.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && notification.category !== selectedCategory) {
        return false;
      }

      // Severity filter
      if (selectedSeverity !== 'all' && notification.severity !== selectedSeverity) {
        return false;
      }

      // Unread filter
      if (showUnreadOnly && notification.read_at) {
        return false;
      }

      return true;
    });
  }, [notifications, searchQuery, selectedCategory, selectedSeverity, showUnreadOnly]);

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || unreadCount === 0}
            onClick={handleMarkAllRead}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Mark All Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || notifications.length === 0}
            onClick={handleClearAll}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as NotificationCategory | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={selectedSeverity}
          onValueChange={(value) => setSelectedSeverity(value as NotificationSeverity | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="success">Success</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant={showUnreadOnly ? "secondary" : "outline"}
          className="w-[180px]"
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
        >
          {showUnreadOnly ? "Show All" : "Show Unread Only"}
        </Button>
      </div>

      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            No notifications found
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
} 