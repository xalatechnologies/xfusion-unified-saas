
import { OrganizationAdminLayout } from "@/apps/organization-admin/layout/OrganizationAdminLayout";
import { OrganizationDashboard } from "@/apps/organization-admin/components/OrganizationDashboard";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Loader2 } from "lucide-react";

export default function OrganizationAdmin() {
  const { data: organizations, isLoading } = useOrganizations();
  
  // For now, use the first organization. In a real app, this would come from user context
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
      <OrganizationDashboard organizationId={currentOrganization.id} />
    </OrganizationAdminLayout>
  );
}
