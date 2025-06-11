import { Sidebar } from "@/components/ui/sidebar";
import { SaasAdminSidebarHeader } from "./SaasAdminSidebarHeader";
import { SaasAdminSidebarNavigation } from "./SaasAdminSidebarNavigation";
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";

export function SaasAdminSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <SaasAdminSidebarHeader />
      <SaasAdminSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
} 