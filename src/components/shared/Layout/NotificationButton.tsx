import { Button } from '@/components/ui/button';
import { Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NotificationButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-muted/50 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Notifications</p>
      </TooltipContent>
    </Tooltip>
  );
};
