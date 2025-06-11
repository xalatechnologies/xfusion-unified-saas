
import {
  LayoutDashboard,
  Users,
  Settings,
  Palette,
  CreditCard,
  BarChart3,
  Plug,
  Shield,
  FileText,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

export const organizationAdminMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/org-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    url: "/org-admin/members",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/org-admin/settings",
    icon: Settings,
  },
  {
    title: "Branding",
    url: "/org-admin/branding",
    icon: Palette,
  },
  {
    title: "Subscription",
    url: "/org-admin/subscription",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    url: "/org-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Integrations",
    url: "/org-admin/integrations",
    icon: Plug,
  },
  {
    title: "Security",
    url: "/org-admin/security",
    icon: Shield,
  },
  {
    title: "Reports",
    url: "/org-admin/reports",
    icon: FileText,
  },
];

export const orgAdminGroupedItems = {
  "Overview": [
    organizationAdminMenuItems[0], // Dashboard
  ],
  "Management": [
    organizationAdminMenuItems[1], // Members
    organizationAdminMenuItems[2], // Settings
    organizationAdminMenuItems[3], // Branding
  ],
  "Business": [
    organizationAdminMenuItems[4], // Subscription
    organizationAdminMenuItems[5], // Analytics
    organizationAdminMenuItems[8], // Reports
  ],
  "System": [
    organizationAdminMenuItems[6], // Integrations
    organizationAdminMenuItems[7], // Security
  ],
};
