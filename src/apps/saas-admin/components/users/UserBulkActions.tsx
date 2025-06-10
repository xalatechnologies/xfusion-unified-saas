
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Trash2, Mail, Shield, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserBulkActionsProps {
  selectedCount: number;
  selectedUsers: string[];
  onClearSelection: () => void;
}

export function UserBulkActions({ selectedCount, selectedUsers, onClearSelection }: UserBulkActionsProps) {
  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on users:`, selectedUsers);
    // Here you would implement the actual bulk actions
  };

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="px-3 py-1">
          {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
        </Badge>
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          <X className="w-4 h-4 mr-1" />
          Clear selection
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <UserCheck className="w-4 h-4 mr-2" />
              Activate Users
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleBulkAction('activate')}>
              <UserCheck className="w-4 h-4 mr-2" />
              Activate All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkAction('deactivate')}>
              <UserX className="w-4 h-4 mr-2" />
              Deactivate All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Manage Roles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleBulkAction('make_admin')}>
              Assign Admin Role
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkAction('make_user')}>
              Assign User Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" onClick={() => handleBulkAction('send_email')}>
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </Button>

        <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Users
        </Button>
      </div>
    </div>
  );
}
