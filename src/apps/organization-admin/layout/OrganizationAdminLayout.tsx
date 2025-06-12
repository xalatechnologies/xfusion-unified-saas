import React from "react";
import { SidebarProvider } from "@/components/shared/Sidebar";
import { OrganizationAdminSidebar } from "@/apps/organization-admin/components/Layout/OrganizationAdminSidebar";
import { TopBar } from "@/components/shared/Layout/TopBar";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

interface OrganizationAdminLayoutProps {
  children: React.ReactNode;
}

export const OrganizationAdminLayout = ({ children }: OrganizationAdminLayoutProps) => {
  return (
    <AccessibilityProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <OrganizationAdminSidebar />
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
