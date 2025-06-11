import { Sidebar } from "@/components/shared/Sidebar";
import { OrganizationAdminSidebarHeader } from "./OrganizationAdminSidebarHeader";
import { OrganizationAdminSidebarNavigation } from "./OrganizationAdminSidebarNavigation";
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";

export function OrganizationAdminSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <OrganizationAdminSidebarHeader />
      <OrganizationAdminSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
}
