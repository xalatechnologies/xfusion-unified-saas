
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";

export function OrganizationAdminSidebarHeader() {
  const { data: organizations } = useOrganizations();
  const currentOrganization = organizations?.[0]; // In real app, this would come from context

  return (
    <SidebarHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="hover:bg-transparent">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
              <Building2 className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none text-left">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {currentOrganization?.name || "Organization"}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Admin Dashboard
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
