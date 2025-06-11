import { Sidebar } from "@/components/shared/Sidebar";
import { SaasSidebarHeader } from "./SaasSidebarHeader";
import { SaasSidebarNavigation } from "./SaasSidebarNavigation";
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <SaasSidebarHeader />
      <SaasSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
}
