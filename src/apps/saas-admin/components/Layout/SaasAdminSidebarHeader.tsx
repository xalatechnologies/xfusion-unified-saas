import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Crown } from "lucide-react";

export function SaasAdminSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="hover:bg-transparent">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
              <Crown className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none text-left">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                XFusion
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                SaaS Admin
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
} 