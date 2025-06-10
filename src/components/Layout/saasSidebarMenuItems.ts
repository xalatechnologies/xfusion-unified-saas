
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Palette, 
  Languages, 
  FileText, 
  Settings 
} from "lucide-react";

export interface SaasMenuItem {
  title: string;
  url: string;
  icon: any;
}

export const saasSidebarMenuItems = [
  {
    title: "Dashboard",
    url: "/saas-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/saas-admin/users",
    icon: Users,
  },
  {
    title: "Organizations",
    url: "/saas-admin/organizations",
    icon: Building,
  },
  {
    title: "Subscriptions",
    url: "/saas-admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Billing",
    url: "/saas-admin/billing",
    icon: Receipt,
  },
  {
    title: "Analytics",
    url: "/saas-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Theme Management",
    url: "/saas-admin/themes",
    icon: Palette,
  },
  {
    title: "Global Translations",
    url: "/saas-admin/translations",
    icon: Languages,
  },
  {
    title: "Documentation",
    url: "/saas-admin/documentation",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/saas-admin/settings",
    icon: Settings,
  },
];

// Export flat menu items for easy access
export const saasMenuItems = saasSidebarMenuItems;

// Group menu items by category for organized sidebar display
export const saasgroupedItems = {
  "Platform": [
    {
      title: "Dashboard",
      url: "/saas-admin",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/saas-admin/analytics",
      icon: BarChart3,
    },
  ],
  "Management": [
    {
      title: "Users",
      url: "/saas-admin/users",
      icon: Users,
    },
    {
      title: "Organizations",
      url: "/saas-admin/organizations",
      icon: Building,
    },
    {
      title: "Subscriptions",
      url: "/saas-admin/subscriptions",
      icon: CreditCard,
    },
    {
      title: "Billing",
      url: "/saas-admin/billing",
      icon: Receipt,
    },
  ],
  "Global Design": [
    {
      title: "Theme Management",
      url: "/saas-admin/themes",
      icon: Palette,
    },
    {
      title: "Global Translations",
      url: "/saas-admin/translations",
      icon: Languages,
    },
  ],
  "System": [
    {
      title: "Documentation",
      url: "/saas-admin/documentation",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/saas-admin/settings",
      icon: Settings,
    },
  ],
};
