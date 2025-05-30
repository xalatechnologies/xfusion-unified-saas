
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
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SidebarHeader className="p-6 border-b border-slate-800/50">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              SupplyMantix
            </span>
            <div className="text-xs text-slate-400 font-medium">Enterprise</div>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group} className="mb-6">
            <SidebarGroupLabel className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-3 px-3">
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
                          relative group h-11 px-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 text-blue-400' 
                            : 'text-slate-300 hover:text-white'
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center space-x-3 w-full">
                          <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                            ${isActive 
                              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                              : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-300'
                            }
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm">{item.title}</span>
                          {isActive && (
                            <div className="absolute right-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
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
      
      <SidebarFooter className="p-4 border-t border-slate-800/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-300">System Status</div>
            <div className="text-xs text-emerald-400">All systems operational</div>
          </div>
        </div>
        <div className="text-xs text-slate-500 text-center mt-3">
          © 2024 SupplyMantix
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
