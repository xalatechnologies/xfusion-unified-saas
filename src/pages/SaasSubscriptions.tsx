
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { SubscriptionsOverview } from "@/apps/saas-admin/components/subscriptions/SubscriptionsOverview";

export default function SaasSubscriptions() {
  return (
    <SaasAdminLayout>
      <SubscriptionsOverview />
    </SaasAdminLayout>
  );
}
