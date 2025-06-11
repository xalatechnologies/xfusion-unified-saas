import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { UserCheck, UserX, Trash2, Mail, Shield, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/shared/Menu";
import { useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/database/users";
import { userRolesApi } from "@/lib/database/user-roles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UserBulkActionsProps {
  selectedCount: number;
  selectedUsers: string[];
  onClearSelection: () => void;
}

export function UserBulkActions({ selectedCount, selectedUsers, onClearSelection }: UserBulkActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [roleToAssign, setRoleToAssign] = useState<'super_admin' | 'organization_admin' | 'user'>('user');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleBulkAction = (action: string) => {
    if (action === 'delete') {
      setShowDeleteDialog(true);
      return;
    }
    if (action === 'activate') {
      handleBulkStatus('active');
      return;
    }
    if (action === 'deactivate') {
      handleBulkStatus('inactive');
      return;
    }
    if (action === 'make_admin' || action === 'make_user' || action === 'make_super_admin') {
      setRoleToAssign(action === 'make_admin' ? 'organization_admin' : action === 'make_super_admin' ? 'super_admin' : 'user');
      setShowRoleDialog(true);
      return;
    }
    console.log(`Performing bulk action: ${action} on users:`, selectedUsers);
  };

  const handleBulkStatus = async (status: string) => {
    setIsLoading(true);
    try {
      await Promise.all(selectedUsers.map(id => usersApi.updateUserStatus(id, status)));
      toast({
        title: `Users ${status === 'active' ? 'activated' : 'deactivated'}`,
        description: `Updated status for ${selectedUsers.length} user(s).`
      });
      onClearSelection();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status for selected users.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkRole = async () => {
    setIsLoading(true);
    try {
      await Promise.all(selectedUsers.map(id => userRolesApi.assignSystemRole(id, roleToAssign)));
      toast({
        title: "Roles assigned",
        description: `Assigned role to ${selectedUsers.length} user(s).`
      });
      setShowRoleDialog(false);
      onClearSelection();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error: unknown) {
      let message = "Failed to assign role to selected users.";
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        const msg = ((error as { message: string }).message).toLowerCase();
        if (msg.includes("user") && msg.includes("does not exist")) {
          message = "One or more users do not exist or were deleted. Please refresh the user list.";
        }
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsLoading(true);
    try {
      await Promise.all(selectedUsers.map(id => usersApi.deleteUser(id)));
      toast({
        title: "Users deleted",
        description: `Deleted ${selectedUsers.length} user(s).`
      });
      setShowDeleteDialog(false);
      onClearSelection();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete selected users.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
              <DropdownMenuItem onClick={() => handleBulkAction('make_super_admin')}>
                Assign Super Admin Role
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction('make_admin')}>
                Assign Org Admin Role
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

          <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')} disabled={isLoading}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Users
          </Button>
        </div>
      </div>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Users</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedCount} user{selectedCount !== 1 ? 's' : ''}</span>? This action cannot be undone and all selected users will lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : `Delete ${selectedCount} User${selectedCount !== 1 ? 's' : ''}`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Assign Role to Users</AlertDialogTitle>
            <AlertDialogDescription>
              Select a role to assign to <span className="font-semibold">{selectedCount} user{selectedCount !== 1 ? 's' : ''}</span>. If a user does not exist, you will see an error.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <select
              className="border rounded px-2 py-1 w-full"
              value={roleToAssign}
              onChange={e => setRoleToAssign(e.target.value as 'super_admin' | 'organization_admin' | 'user')}
              disabled={isLoading}
            >
              <option value="super_admin">Super Admin</option>
              <option value="organization_admin">Org Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkRole} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Assigning..." : `Assign Role`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
