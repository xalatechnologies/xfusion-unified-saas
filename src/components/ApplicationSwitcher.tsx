
import React from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings, Building, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const ApplicationSwitcher = () => {
  const { systemRole, loading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading || systemRole !== 'super_admin') {
    return null;
  }

  const currentApp = location.pathname.startsWith('/saas-admin') 
    ? 'SAAS Admin' 
    : location.pathname.startsWith('/org-admin')
    ? 'Org Admin'
    : 'SupplyMantix';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentApp}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <Building className="h-4 w-4" />
          SupplyMantix
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/org-admin')}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Organization Admin
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/saas-admin')}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          SAAS Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
