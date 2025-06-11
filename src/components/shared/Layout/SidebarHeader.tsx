import { Link } from "react-router-dom";
import { SidebarHeader as BaseSidebarHeader } from "@/components/shared/Sidebar";
import { Zap } from "lucide-react";

export function AppSidebarHeader() {
  return (
    <BaseSidebarHeader className="h-16 p-4 border-b border-gray-100 bg-white flex items-center">
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
    </BaseSidebarHeader>
  );
}
