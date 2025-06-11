import React from "react";
import { TopBar } from "@/components/shared/Layout/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/apps/supplymantix/components/Layout/AppSidebar';

interface SaasAdminLayoutProps {
  children: React.ReactNode;
}

export const SaasAdminLayout = ({ children }: SaasAdminLayoutProps) => {
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
