import React from "react";
import { SidebarProvider } from "@/components/shared/Sidebar";
import { AppSidebar } from "@/apps/supplymantix/components/Layout/AppSidebar";
import { TopBar } from "@/components/shared/Layout/TopBar";

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
        </div>
      </div>
    </SidebarProvider>
  );
};
