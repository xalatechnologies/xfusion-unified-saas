import { AppDashboardLayout } from "@/apps/supplymantix/components/Layout/AppDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { OrganizationSettings } from "@/components/organization/OrganizationSettings";
import { OrganizationBranding } from "@/components/organization/OrganizationBranding";
import { OrganizationSubscription } from "@/components/organization/OrganizationSubscription";
import { OrganizationBilling } from "@/components/organization/OrganizationBilling";
import { OrganizationMembers } from "@/components/organization/OrganizationMembers";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Building2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function Organization() {
  const { t } = useLanguage();
  const { data: organizations, isLoading } = useOrganizations();
  
  // For now, use the first organization. In a real app, this would come from user context
  const currentOrganization = organizations?.[0];

  if (isLoading) {
    return (
      <AppDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-lg">Loading organization...</span>
          </div>
        </div>
      </AppDashboardLayout>
    );
  }

  if (!currentOrganization) {
    return (
      <AppDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">No organization found</div>
        </div>
      </AppDashboardLayout>
    );
  }

  return (
    <AppDashboardLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="pb-4">
          <PageHeader
            icon={Building2}
            title={t("organization.title")}
            subtitle={t("organization.description")}
            titleClassName="text-3xl font-bold text-gray-900"
            subtitleClassName="text-gray-600 mt-1"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="settings" className="w-full space-y-6">
          <div className="border-b border-gray-200 bg-white rounded-t-lg">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-12 p-1">
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                {t("organization.tabs.settings")}
              </TabsTrigger>
              <TabsTrigger 
                value="branding"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                {t("organization.tabs.branding")}
              </TabsTrigger>
              <TabsTrigger 
                value="members"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                {t("organization.tabs.members")}
              </TabsTrigger>
              <TabsTrigger 
                value="subscription"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                {t("organization.tabs.subscription")}
              </TabsTrigger>
              <TabsTrigger 
                value="billing"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                {t("organization.tabs.billing")}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white rounded-b-lg border border-t-0 border-gray-200 min-h-[600px]">
            <TabsContent value="settings" className="mt-0 p-0">
              <OrganizationSettings organizationId={currentOrganization.id} />
            </TabsContent>

            <TabsContent value="branding" className="mt-0 p-6">
              <OrganizationBranding organizationId={currentOrganization.id} />
            </TabsContent>

            <TabsContent value="members" className="mt-0 p-6">
              <OrganizationMembers organizationId={currentOrganization.id} />
            </TabsContent>

            <TabsContent value="subscription" className="mt-0 p-6">
              <OrganizationSubscription organizationId={currentOrganization.id} />
            </TabsContent>

            <TabsContent value="billing" className="mt-0 p-6">
              <OrganizationBilling organizationId={currentOrganization.id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppDashboardLayout>
  );
}
