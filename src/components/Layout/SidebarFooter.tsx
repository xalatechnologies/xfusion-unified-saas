
import { SidebarFooter as BaseSidebarFooter } from "@/components/ui/sidebar";

export function AppSidebarFooter() {
  return (
    <BaseSidebarFooter className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
          <div className="w-2 h-2 rounded-full bg-white opacity-90"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-700 tracking-wide">System Status</div>
          <div className="text-xs text-emerald-600 font-medium">All systems operational</div>
        </div>
      </div>
    </BaseSidebarFooter>
  );
}
