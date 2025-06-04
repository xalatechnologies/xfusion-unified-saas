
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Crown,
  Languages,
  LayoutDashboard,
  Package
} from "lucide-react";

export const saasMenuItems = [
  {
    title: "Dashboard",
    url: "/saas",
    icon: LayoutDashboard,
    group: "Overview"
  },
  {
    title: "Organizations",
    url: "/saas/organizations",
    icon: Building2,
    group: "Management"
  },
  {
    title: "Users",
    url: "/saas/users",
    icon: Users,
    group: "Management"
  },
  {
    title: "Subscriptions",
    url: "/saas/subscriptions",
    icon: Package,
    group: "Billing"
  },
  {
    title: "Billing",
    url: "/saas/billing",
    icon: CreditCard,
    group: "Billing"
  },
  {
    title: "Analytics",
    url: "/saas/analytics",
    icon: BarChart3,
    group: "Insights"
  },
  {
    title: "Translations",
    url: "/saas/translations",
    icon: Languages,
    group: "System"
  },
  {
    title: "Settings",
    url: "/saas/settings",
    icon: Settings,
    group: "System"
  }
];

export const saasgroupedItems = saasMenuItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof saasMenuItems>);
