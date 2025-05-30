
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "User Management",
    url: "/dashboard/users",
    icon: "👥",
    group: "Administration"
  },
  {
    title: "Organization",
    url: "/dashboard/organization", 
    icon: "🏢",
    group: "Administration"
  },
  {
    title: "Subscriptions",
    url: "/dashboard/subscriptions",
    icon: "💳",
    group: "Administration"
  },
  {
    title: "Work Orders",
    url: "/dashboard/work-orders",
    icon: "🔧",
    group: "Operations"
  },
  {
    title: "Purchase Orders",
    url: "/dashboard/purchase-orders",
    icon: "💰",
    group: "Operations"
  },
  {
    title: "Requests",
    url: "/dashboard/requests",
    icon: "📝",
    group: "Operations"
  },
  {
    title: "Assets",
    url: "/dashboard/assets",
    icon: "🏭",
    group: "Resources"
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: "📦",
    group: "Resources"
  },
  {
    title: "Procedures",
    url: "/dashboard/procedures",
    icon: "📋",
    group: "Resources"
  },
  {
    title: "Meters",
    url: "/dashboard/meters",
    icon: "📊",
    group: "Resources"
  },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: "📍",
    group: "Resources"
  },
  {
    title: "Reporting",
    url: "/dashboard/reporting",
    icon: "📈",
    group: "Analytics"
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: "💬",
    group: "Communication"
  }
];

const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof menuItems>);

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">X</div>
          <span className="text-xl font-semibold text-gray-900">SupplyMantix</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel className="text-gray-500 uppercase text-xs font-semibold tracking-wide">
              {group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url} className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          © 2024 SupplyMantix
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
