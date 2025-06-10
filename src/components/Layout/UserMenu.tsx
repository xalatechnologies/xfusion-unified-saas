
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const UserMenu = () => {
  const { user } = useAuth();
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    const email = user.email;
    return email.charAt(0).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email || 'User';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-primary/20">
          <Avatar className="h-9 w-9 ring-2 ring-background shadow-md">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={getUserDisplayName()} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
            <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt={getUserDisplayName()} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none text-foreground truncate">
                {getUserDisplayName()}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user?.email}
              </p>
              <Badge variant="outline" className="text-xs w-fit mt-1">
                Super Admin
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2.5 cursor-pointer hover:bg-muted/50 rounded-md focus:bg-muted/50 transition-colors">
          <div className="p-1.5 rounded-md bg-blue-100 text-blue-600">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Profile</span>
            <span className="text-xs text-muted-foreground">Manage your account</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2.5 cursor-pointer hover:bg-muted/50 rounded-md focus:bg-muted/50 transition-colors">
          <div className="p-1.5 rounded-md bg-gray-100 text-gray-600">
            <Settings className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Settings</span>
            <span className="text-xs text-muted-foreground">Preferences & configuration</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-3 py-2.5 cursor-pointer hover:bg-red-50 rounded-md focus:bg-red-50 text-red-600 transition-colors"
        >
          <div className="p-1.5 rounded-md bg-red-100 text-red-600">
            <LogOut className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Sign out</span>
            <span className="text-xs text-red-500/70">End your session</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
