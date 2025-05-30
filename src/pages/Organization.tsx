import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { OrganizationSettings } from "@/components/organization/OrganizationSettings";
import { OrganizationBranding } from "@/components/organization/OrganizationBranding";
import { OrganizationSubscription } from "@/components/organization/OrganizationSubscription";
import { OrganizationBilling } from "@/components/organization/OrganizationBilling";
import { OrganizationMembers } from "@/components/organization/OrganizationMembers";
import { useOrganizations } from "@/hooks/useOrganizations";

export default function Organization() {
  const { t } = useLanguage();
  const { data: organizations, isLoading } = useOrganizations();
  
  // For now, use the first organization. In a real app, this would come from user context
  const currentOrganization = organizations?.[0];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading organization...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentOrganization) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">No organization found</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("organization.title")}
          </h1>
          <p className="text-gray-600">
            {t("organization.description")}
          </p>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="settings">{t("organization.tabs.settings")}</TabsTrigger>
            <TabsTrigger value="branding">{t("organization.tabs.branding")}</TabsTrigger>
            <TabsTrigger value="members">{t("organization.tabs.members")}</TabsTrigger>
            <TabsTrigger value="subscription">{t("organization.tabs.subscription")}</TabsTrigger>
            <TabsTrigger value="billing">{t("organization.tabs.billing")}</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <OrganizationSettings organizationId={currentOrganization.id} />
          </TabsContent>

          <TabsContent value="branding">
            <OrganizationBranding organizationId={currentOrganization.id} />
          </TabsContent>

          <TabsContent value="members">
            <OrganizationMembers organizationId={currentOrganization.id} />
          </TabsContent>

          <TabsContent value="subscription">
            <OrganizationSubscription organizationId={currentOrganization.id} />
          </TabsContent>

          <TabsContent value="billing">
            <OrganizationBilling organizationId={currentOrganization.id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
