
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

interface UserActionsProps {
  user: any;
  onEditUser: (user: any) => void;
  onChangePassword: (user: any) => void;
  onChangeAvatar: (user: any) => void;
}

export function UserActions({ user, onEditUser, onChangePassword, onChangeAvatar }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleActivateUser = async () => {
    setIsLoading(true);
    try {
      // Mock API call - implement actual activation logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "User activated",
        description: `${user.email} has been activated.`
      });
    } catch (error) {
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
      // Mock API call - implement actual suspension logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "User suspended",
        description: `${user.email} has been suspended.`
      });
    } catch (error) {
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
    if (!confirm(`Are you sure you want to delete ${user.email}? This action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - implement actual deletion logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "User deleted",
        description: `${user.email} has been deleted.`
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
