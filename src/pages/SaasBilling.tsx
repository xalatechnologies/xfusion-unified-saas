
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { BillingOverview } from "@/apps/saas-admin/components/billing/BillingOverview";

export default function SaasBilling() {
  return (
    <SaasAdminLayout>
      <BillingOverview />
    </SaasAdminLayout>
  );
}
