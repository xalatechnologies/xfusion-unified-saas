import { useNotifications } from './NotificationProvider';
import type { Notification } from '@/types/notifications';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
  compact?: boolean;
}

const severityColors = {
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  success: 'bg-green-500',
} as const;

const categoryIcons = {
  billing: '💰',
  security: '🔒',
  system: '⚙️',
  organization: '🏢',
  user: '👤',
} as const;

export function NotificationItem({ notification, onClose, compact = false }: NotificationItemProps) {
  const { markAsRead, deleteNotification } = useNotifications();
  const navigate = useNavigate();

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read_at) {
      await markAsRead(notification.id);
    }
    onClose?.();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteNotification(notification.id);
    onClose?.();
  };

  const handleClick = () => {
    if (notification.data?.link) {
      navigate(notification.data.link);
      onClose?.();
    }
  };

  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-start gap-4 rounded-lg border bg-card transition-colors hover:bg-accent/50',
        !notification.read_at && 'bg-accent/10',
        compact ? 'p-2' : 'p-4'
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full',
          severityColors[notification.severity as keyof typeof severityColors] || 'bg-gray-500',
          compact ? 'h-6 w-6' : 'h-8 w-8'
        )}
      >
        <span className="text-white">{categoryIcons[notification.category as keyof typeof categoryIcons]}</span>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('font-medium leading-none', compact ? 'text-xs' : 'text-sm')}>
            {notification.title}
          </p>
          <span className={cn('shrink-0 text-muted-foreground', compact ? 'text-[10px]' : 'text-xs')}>
            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
          </span>
        </div>
        <p className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>{notification.message}</p>
      </div>

      <div
        className={cn(
          'absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100',
          compact ? 'gap-0.5' : 'gap-1'
        )}
      >
        {!notification.read_at && (
          <Button
            variant="ghost"
            size={compact ? 'sm' : 'icon'}
            onClick={handleMarkAsRead}
            className={cn('h-6 w-6', compact && 'h-5 w-5')}
          >
            <Check className={cn('h-4 w-4', compact && 'h-3 w-3')} />
          </Button>
        )}
        <Button
          variant="ghost"
          size={compact ? 'sm' : 'icon'}
          onClick={handleDelete}
          className={cn('h-6 w-6', compact && 'h-5 w-5')}
        >
          <X className={cn('h-4 w-4', compact && 'h-3 w-3')} />
        </Button>
      </div>
    </div>
  );
} 