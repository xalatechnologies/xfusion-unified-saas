
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        
        {/* Organization Switcher */}
        <Select defaultValue="acme-corp">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="acme-corp">Acme Corporation</SelectItem>
            <SelectItem value="beta-inc">Beta Industries</SelectItem>
            <SelectItem value="gamma-llc">Gamma LLC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-lg mx-8">
        <Input
          type="search"
          placeholder="Search work orders, assets, procedures..."
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
