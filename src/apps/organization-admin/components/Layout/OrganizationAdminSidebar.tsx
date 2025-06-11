import { Sidebar } from "@/components/shared/Sidebar";
import { OrganizationAdminSidebarHeader } from "./OrganizationAdminSidebarHeader";
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";
import { OrganizationAdminSidebarNavigation } from "./OrganizationAdminSidebarNavigation";

export function OrganizationAdminSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <OrganizationAdminSidebarHeader />
      <OrganizationAdminSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
}
