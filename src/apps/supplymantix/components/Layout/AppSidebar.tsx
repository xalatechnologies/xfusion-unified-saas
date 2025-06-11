import { Sidebar } from "@/components/ui/sidebar";
import { AppSidebarHeader } from './AppSidebarHeader';
import { AppSidebarFooter } from "@/components/shared/Layout/SidebarFooter";
import { AppSidebarNavigation } from "./AppSidebarNavigation";

const AppSidebar = () => {
  return (
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <AppSidebarHeader />
      <AppSidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export { AppSidebar };
