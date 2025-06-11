import { Sidebar } from "@/components/ui/sidebar";
import { SaasSidebarHeader } from "./SaasSidebarHeader";
import { SaasSidebarNavigation } from "./SaasSidebarNavigation";
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";

export function SaasSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <SaasSidebarHeader />
      <SaasSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
}
