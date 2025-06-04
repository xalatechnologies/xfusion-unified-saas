
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { UsersOverview } from "@/apps/saas-admin/components/users/UsersOverview";

export default function SaasUsers() {
  return (
    <SaasAdminLayout>
      <UsersOverview />
    </SaasAdminLayout>
  );
}
