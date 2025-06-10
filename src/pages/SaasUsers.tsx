
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { UserManagement } from "@/apps/saas-admin/components/users/UserManagement";

export default function SaasUsers() {
  return (
    <SaasAdminLayout>
      <UserManagement />
    </SaasAdminLayout>
  );
}
