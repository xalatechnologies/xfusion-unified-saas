
import { OrganizationAdminLayout } from "@/apps/organization-admin/layout/OrganizationAdminLayout";
import { OrganizationSettings } from "@/components/organization/OrganizationSettings";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Loader2 } from "lucide-react";

export default function OrganizationAdminSettings() {
  const { data: organizations, isLoading } = useOrganizations();
  const currentOrganization = organizations?.[0];

  if (isLoading) {
    return (
      <OrganizationAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-lg">Loading organization...</span>
          </div>
        </div>
      </OrganizationAdminLayout>
    );
  }

  if (!currentOrganization) {
    return (
      <OrganizationAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">No organization found</div>
        </div>
      </OrganizationAdminLayout>
    );
  }

  return (
    <OrganizationAdminLayout>
      <OrganizationSettings organizationId={currentOrganization.id} />
    </OrganizationAdminLayout>
  );
}
