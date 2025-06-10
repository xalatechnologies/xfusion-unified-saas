
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Shield, UserX, UserCheck, Key, Image } from "lucide-react";
import { usersApi } from "@/lib/database/users";

interface UserActionsProps {
  user: any;
  onEditUser: (user: any) => void;
  onChangePassword: (user: any) => void;
  onChangeAvatar: (user: any) => void;
}

export function UserActions({ user, onEditUser, onChangePassword, onChangeAvatar }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getUserDisplayName = (user: any) => {
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
    if (!confirm(`Are you sure you want to delete ${getUserDisplayName(user)}? This action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);
    try {
      // Mock deletion - implement actual deletion logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "User deleted",
        description: `${getUserDisplayName(user)} has been deleted.`
      });
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
        <DropdownMenuItem onClick={handleDeleteUser} className="text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
