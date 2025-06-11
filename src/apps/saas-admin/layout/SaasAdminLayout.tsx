import React from "react";
import { TopBar } from "@/components/shared/Layout/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SaasAdminSidebar } from '../components/Layout/SaasAdminSidebar';
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

interface SaasAdminLayoutProps {
  children: React.ReactNode;
}

export const SaasAdminLayout = ({ children }: SaasAdminLayoutProps) => {
  return (
    <AccessibilityProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <SaasAdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AccessibilityProvider>
  );
};
