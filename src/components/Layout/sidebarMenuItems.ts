
import { 
  Users, 
  Building2, 
  CreditCard, 
  Wrench, 
  DollarSign, 
  FileText, 
  Factory, 
  Package, 
  ClipboardList, 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  MessageSquare 
} from "lucide-react";

export const menuItems = [
  {
    title: "Work Orders",
    url: "/dashboard/work-orders",
    icon: Wrench,
    group: "Operations"
  },
  {
    title: "Purchase Orders",
    url: "/dashboard/purchase-orders",
    icon: DollarSign,
    group: "Operations"
  },
  {
    title: "Requests",
    url: "/dashboard/requests",
    icon: FileText,
    group: "Operations"
  },
  {
    title: "Assets",
    url: "/dashboard/assets",
    icon: Factory,
    group: "Resources"
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
    group: "Resources"
  },
  {
    title: "Procedures",
    url: "/dashboard/procedures",
    icon: ClipboardList,
    group: "Resources"
  },
  {
    title: "Meters",
    url: "/dashboard/meters",
    icon: BarChart3,
    group: "Resources"
  },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: MapPin,
    group: "Resources"
  },
  {
    title: "Reporting",
    url: "/dashboard/reporting",
    icon: TrendingUp,
    group: "Analytics"
  },
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: Users,
    group: "Administration"
  },
  {
    title: "Organization",
    url: "/dashboard/organization", 
    icon: Building2,
    group: "Administration"
  },
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: CreditCard,
    group: "Administration"
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
    group: "Communication"
  }
];

export const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof menuItems>);
