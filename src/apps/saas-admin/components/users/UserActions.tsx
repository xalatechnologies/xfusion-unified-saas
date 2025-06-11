import { useState } from "react";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Shield, UserX, UserCheck, Key, Image } from "lucide-react";
import { usersApi } from "@/lib/database/users";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface User {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  status?: string;
  system_role?: string;
}

interface UserActionsProps {
  user: User;
  onEditUser: (user: User) => void;
  onChangePassword: (user: User) => void;
  onChangeAvatar: (user: User) => void;
}

export function UserActions({ user, onEditUser, onChangePassword, onChangeAvatar }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getUserDisplayName = (user: User) => {
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user?.email || "User";
  };

  const handleActivateUser = async () => {
    setIsLoading(true);
    try {
      await usersApi.updateUserStatus(user.id, 'active');
      toast({
        title: "User activated",
        description: `${getUserDisplayName(user)} has been activated.`
      });
    } catch (error) {
      console.error("Error activating user:", error);
      toast({
        title: "Error",
        description: "Failed to activate user.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspendUser = async () => {
    setIsLoading(true);
    try {
      await usersApi.updateUserStatus(user.id, 'suspended');
      toast({
        title: "User suspended",
        description: `${getUserDisplayName(user)} has been suspended.`
      });
    } catch (error) {
      console.error("Error suspending user:", error);
      toast({
        title: "Error",
        description: "Failed to suspend user.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await usersApi.deleteUser(user.id);
      toast({
        title: "User deleted",
        description: `${getUserDisplayName(user)} has been deleted.`
      });
      setShowDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isLoading}>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onEditUser(user)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangePassword(user)}>
            <Key className="w-4 h-4 mr-2" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChangeAvatar(user)}>
            <Image className="w-4 h-4 mr-2" />
            Change Avatar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="w-4 h-4 mr-2" />
            Manage Roles
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleActivateUser}>
            <UserCheck className="w-4 h-4 mr-2" />
            Activate User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSuspendUser} className="text-orange-600">
            <UserX className="w-4 h-4 mr-2" />
            Suspend User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{getUserDisplayName(user)}</span>? This action cannot be undone and the user will lose all access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
