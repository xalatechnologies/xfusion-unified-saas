import React from "react";
import { SidebarProvider } from "@/components/shared/Sidebar";
import { TopBar } from "@/components/shared/Layout/TopBar";
import { SaasSidebar } from "./SaasSidebar";

interface SaasDashboardLayoutProps {
  children: React.ReactNode;
}

export const SaasDashboardLayout = ({ children }: SaasDashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <SaasSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
