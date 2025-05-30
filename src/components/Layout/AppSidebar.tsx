
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
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl">
      <SidebarHeader className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-transparent">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              SupplyMantix
            </span>
            <div className="text-xs text-slate-400 font-medium tracking-wide">Enterprise</div>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6 bg-gradient-to-b from-transparent to-slate-950/30">
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group} className="mb-8">
            <SidebarGroupLabel className="text-slate-300 uppercase text-xs font-bold tracking-widest mb-4 px-2 opacity-80">
              {group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const Icon = item.icon;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        className={`
                          relative group h-12 px-3 rounded-xl transition-all duration-300 ease-out
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-transparent border border-blue-500/30 text-blue-300 shadow-lg shadow-blue-500/10' 
                            : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/30 hover:border hover:border-slate-600/30'
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center space-x-3 w-full">
                          <div className={`
                            w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                            ${isActive 
                              ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-md shadow-blue-500/30' 
                              : 'bg-slate-700/60 text-slate-400 group-hover:bg-slate-600/70 group-hover:text-slate-200 group-hover:shadow-sm'
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
      
      <SidebarFooter className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-transparent">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-600/30 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-white opacity-90"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-200 tracking-wide">System Status</div>
            <div className="text-xs text-emerald-400 font-medium">All systems operational</div>
          </div>
        </div>
        <div className="text-xs text-slate-500 text-center mt-3 opacity-70">
          © 2024 SupplyMantix
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
