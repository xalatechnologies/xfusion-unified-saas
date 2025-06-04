
import { Sidebar } from "@/components/ui/sidebar";
import { OrganizationAdminSidebarHeader } from "./OrganizationAdminSidebarHeader";
import { OrganizationAdminSidebarNavigation } from "./OrganizationAdminSidebarNavigation";
import { AppSidebarFooter } from "./SidebarFooter";

export function OrganizationAdminSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <OrganizationAdminSidebarHeader />
      <OrganizationAdminSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
}
