import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  Palette,
  BookText,
  Globe,
  FileText,
  Shield,
  Zap,
  Languages,
} from "lucide-react";
import React from "react";

export interface SaasAdminMenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

export const saasAdminSidebarMenuItems: SaasAdminMenuItem[] = [
  { title: "Dashboard", url: "/saas-admin", icon: LayoutDashboard },
  { title: "Users", url: "/saas-admin/users", icon: Users },
  { title: "Organizations", url: "/saas-admin/organizations", icon: Building2 },
  { title: "Subscriptions", url: "/saas-admin/subscriptions", icon: CreditCard },
  { title: "Billing", url: "/saas-admin/billing", icon: Receipt },
  { title: "Analytics", url: "/saas-admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/saas-admin/settings", icon: Settings },
  { title: "Themes", url: "/saas-admin/themes", icon: Palette },
  { title: "Translations", url: "/saas-admin/translations", icon: Languages },
  { title: "Documentation", url: "/saas-admin/documentation", icon: BookText },
];

export const saasAdminGroupedItems = {
  Platform: [saasAdminSidebarMenuItems[0], saasAdminSidebarMenuItems[1], saasAdminSidebarMenuItems[2]],
  Business: [saasAdminSidebarMenuItems[3], saasAdminSidebarMenuItems[4], saasAdminSidebarMenuItems[5]],
  System: [saasAdminSidebarMenuItems[6], saasAdminSidebarMenuItems[7], saasAdminSidebarMenuItems[8], saasAdminSidebarMenuItems[9]],
}; 