
import { DashboardLayout } from "@/components/Layout/SaasDashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationSettings } from "@/components/organization/OrganizationSettings";
import { OrganizationBranding } from "@/components/organization/OrganizationBranding";
import { OrganizationSubscription } from "@/components/organization/OrganizationSubscription";
import { OrganizationBilling } from "@/components/organization/OrganizationBilling";
import { OrganizationMembers } from "@/components/organization/OrganizationMembers";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Building2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function SaasDashboard() {
  const { t } = useLanguage();
  const { data: organizations, isLoading } = useOrganizations();
  
  // For now, use the first organization. In a real app, this would come from user context
  const currentOrganization = organizations?.[0];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-lg">Loading SAAS dashboard...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentOrganization) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">No organization found</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="pb-4">
          <PageHeader
            icon={Building2}
            title="SAAS Administration"
            subtitle="Manage organizations, subscriptions, users and system settings"
            titleClassName="text-3xl font-bold text-gray-900"
            subtitleClassName="text-gray-600 mt-1"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="organizations" className="w-full space-y-6">
          <div className="border-b border-gray-200 bg-white rounded-t-lg">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-12 p-1">
              <TabsTrigger 
                value="organizations" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                Organizations
              </TabsTrigger>
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="subscriptions"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="billing"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                Billing
              </TabsTrigger>
              <TabsTrigger 
                value="system"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent"
              >
                System
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white rounded-b-lg border border-t-0 border-gray-200 min-h-[600px]">
            <TabsContent value="organizations" className="mt-0 p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Organizations Management</h3>
                <p className="text-gray-600">View and manage all organizations in the system</p>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-0 p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Users Management</h3>
                <p className="text-gray-600">View and manage all users across organizations</p>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-0 p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Subscriptions Overview</h3>
                <p className="text-gray-600">Monitor and manage all subscription plans and billing</p>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Global Billing</h3>
                <p className="text-gray-600">Overview of all billing activities and revenue</p>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-0 p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Manage translations, system configuration and settings</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
