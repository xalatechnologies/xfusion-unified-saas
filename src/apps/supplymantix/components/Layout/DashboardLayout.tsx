
import React from "react";
import { SupplyMantixLayout } from "@/apps/supplymantix/layout/SupplyMantixLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SupplyMantixLayout>
      {children}
    </SupplyMantixLayout>
  );
};
