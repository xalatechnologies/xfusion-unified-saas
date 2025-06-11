import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { TopBar } from "@/components/Layout/TopBar";
import { TestNotifications } from "@/components/notifications/TestNotifications";

interface SupplyMantixLayoutProps {
  children: React.ReactNode;
}

export const SupplyMantixLayout = ({ children }: SupplyMantixLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
          <TestNotifications />
        </div>
      </div>
    </SidebarProvider>
  );
};
