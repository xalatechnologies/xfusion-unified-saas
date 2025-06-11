
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { SaasDashboard as SaasDashboardComponent } from "@/apps/saas-admin/components/SaasDashboard";

export default function SaasDashboard() {
  return (
    <SaasAdminLayout>
      <SaasDashboardComponent />
    </SaasAdminLayout>
  );
}
