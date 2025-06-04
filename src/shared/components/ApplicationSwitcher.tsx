
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Crown, Wrench, ChevronDown } from "lucide-react";
import { applications } from "../config/applications";
import { useCurrentApplication } from "../hooks/useCurrentApplication";

const iconMap = {
  Crown,
  Wrench
};

export const ApplicationSwitcher = () => {
  const navigate = useNavigate();
  const { currentApp } = useCurrentApplication();
  
  const handleApplicationSwitch = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      navigate(app.baseRoute);
    }
  };

  if (!currentApp) return null;

  const CurrentIcon = iconMap[currentApp.icon as keyof typeof iconMap] || Crown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white">
              <CurrentIcon className="w-4 h-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{currentApp.displayName}</p>
              <p className="text-xs text-gray-500">Switch Application</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Applications</p>
        </div>
        <DropdownMenuSeparator />
        {applications.filter(app => app.enabled).map((app) => {
          const Icon = iconMap[app.icon as keyof typeof iconMap] || Crown;
          const isActive = currentApp.id === app.id;
          
          return (
            <DropdownMenuItem
              key={app.id}
              onClick={() => handleApplicationSwitch(app.id)}
              className={`flex items-center space-x-3 p-3 cursor-pointer ${
                isActive ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{app.displayName}</p>
                <p className="text-xs text-gray-500">{app.description}</p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
