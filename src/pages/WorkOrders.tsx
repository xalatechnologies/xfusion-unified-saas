
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { useWorkOrders } from "@/hooks/useWorkOrders";
import { ModulePlaceholder } from "@/components/ModulePlaceholder";

export default function WorkOrders() {
  const { data: workOrders, isLoading } = useWorkOrders();

  return (
    <DashboardLayout>
      <ModulePlaceholder 
        title="Work Orders" 
        description="Manage maintenance work orders and tasks"
        icon="wrench"
        comingSoon={true}
      />
    </DashboardLayout>
  );
}
