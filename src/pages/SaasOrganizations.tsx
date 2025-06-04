
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { OrganizationsOverview } from "@/apps/saas-admin/components/organizations/OrganizationsOverview";

export default function SaasOrganizations() {
  return (
    <SaasAdminLayout>
      <OrganizationsOverview />
    </SaasAdminLayout>
  );
}
