
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
  MessageSquare,
  Zap 
} from "lucide-react";

const menuItems = [
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
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
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
    <Sidebar className="border-r-0 bg-white shadow-lg">
      <SidebarHeader className="h-16 p-4 border-b border-gray-100 bg-white flex items-center">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              SupplyMantix
            </span>
            <div className="text-xs text-gray-500 font-medium tracking-wide">Enterprise</div>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6 bg-white">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group} className="mb-8">
            <SidebarGroupLabel className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-4 px-2">
              {group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const Icon = item.icon;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        className={`
                          relative group h-11 px-3 rounded-xl transition-all duration-300 ease-out
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 shadow-sm' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center space-x-3 w-full">
                          <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                            ${isActive 
                              ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-md shadow-blue-500/30' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700'
                            }
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm tracking-wide">{item.title}</span>
                          {isActive && (
                            <div className="absolute right-3 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm shadow-blue-400/50"></div>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-white opacity-90"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-700 tracking-wide">System Status</div>
            <div className="text-xs text-emerald-600 font-medium">All systems operational</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-3">
          © 2024 SupplyMantix
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
