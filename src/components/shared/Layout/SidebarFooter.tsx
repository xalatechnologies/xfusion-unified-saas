import { SidebarFooter } from '@/components/ui/sidebar';

export function AppSidebarFooter(props: React.ComponentProps<typeof SidebarFooter>) {
  return (
    <SidebarFooter className="p-4 border-t border-gray-100 bg-white" {...props}>
      {/* Add any custom content or children here if needed */}
      {props.children}
    </SidebarFooter>
  );
}
