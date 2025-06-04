
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { SystemOverview } from "@/apps/saas-admin/components/system/SystemOverview";

export default function SaasSettings() {
  return (
    <SaasAdminLayout>
      <SystemOverview />
    </SaasAdminLayout>
  );
}
