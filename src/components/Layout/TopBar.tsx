
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, User, LogOut, Settings, Command, HelpCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { ApplicationSwitcher } from "@/shared/components/ApplicationSwitcher";
import { SearchResults } from "@/components/search/SearchResults";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef, useEffect } from "react";

export const TopBar = () => {
  const { user } = useAuth();
  const { signOut } = useAuthActions();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const {
    query,
    results,
    isLoading,
    isOpen,
    selectedIndex,
    handleQueryChange,
    handleResultClick,
    handleKeyDown,
    handleClickOutside
  } = useGlobalSearch();

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the hook with real-time updates
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDownEvent);
      return () => {
        document.removeEventListener('keydown', handleKeyDownEvent);
      };
    }
  }, [isOpen, handleKeyDown]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutsideEvent = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideEvent);
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideEvent);
      };
    }
  }, [isOpen, handleClickOutside]);

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0">
            <ApplicationSwitcher />
          </div>
          
          <div ref={searchRef} className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations, users, subscriptions..."
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  className="pl-10 pr-16 w-full focus-visible:ring-2 focus-visible:ring-primary/20 border-muted-foreground/20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Badge variant="secondary" className="text-xs font-normal px-1.5 py-0.5">
                    <Command className="h-3 w-3 mr-1" />
                    K
                  </Badge>
                </div>
              </div>
            </form>
            
            <SearchResults
              results={results}
              isLoading={isLoading}
              query={query}
              onResultClick={handleResultClick}
              selectedIndex={selectedIndex}
            />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted/50 transition-colors">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Documentation</p>
              </TooltipContent>
            </Tooltip>

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

            <div className="h-6 w-px bg-border mx-2" />

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
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};
