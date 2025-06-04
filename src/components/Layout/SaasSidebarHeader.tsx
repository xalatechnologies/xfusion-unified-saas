
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Crown } from "lucide-react";

export function SaasSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="hover:bg-transparent">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-md">
              <Crown className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none text-left">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SupplyMantix
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                SAAS Admin
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
