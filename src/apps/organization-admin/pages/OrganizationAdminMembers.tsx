
import { OrganizationAdminLayout } from "@/apps/organization-admin/layout/OrganizationAdminLayout";
import { OrganizationMembers } from "@/components/organization/OrganizationMembers";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Loader2 } from "lucide-react";

export default function OrganizationAdminMembers() {
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
      <OrganizationMembers organizationId={currentOrganization.id} />
    </OrganizationAdminLayout>
  );
}
