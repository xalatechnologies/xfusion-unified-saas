
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrganizationSettingsForm } from "@/hooks/useOrganizationSettingsForm";
import { OrganizationBasicInfo } from "./OrganizationBasicInfo";
import { OrganizationContactInfo } from "./OrganizationContactInfo";
import { OrganizationLanguageSettings } from "./OrganizationLanguageSettings";
import { Building2, Save, Loader2 } from "lucide-react";

interface OrganizationSettingsProps {
  organizationId: string;
}

export const OrganizationSettings = ({ organizationId }: OrganizationSettingsProps) => {
  const {
    formData,
    setFormData,
    handleSave,
    currentOrganization,
    isLoading,
  } = useOrganizationSettingsForm(organizationId);

  if (!currentOrganization) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-lg">Loading organization settings...</span>
        </div>
      </div>
    );
  }

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Organization Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your organization's basic information and preferences
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-900">
            Basic Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your organization's core details and public information
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <OrganizationBasicInfo
            formData={{
              name: formData.name,
              website: formData.website,
              address: formData.address,
            }}
            onFormDataChange={updateFormData}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-900">
            Contact Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Provide contact details for your organization
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <OrganizationContactInfo
            formData={{
              email: formData.email,
              phone: formData.phone,
              fax: formData.fax,
            }}
            onFormDataChange={updateFormData}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-900">
            Language & Localization
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set your organization's default language and regional preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <OrganizationLanguageSettings
            defaultLanguage={formData.defaultLanguage}
            onLanguageChange={(language) => updateFormData({ defaultLanguage: language })}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-6 border-t bg-gray-50/50 -mx-6 px-6 py-4 rounded-b-lg">
        <div className="text-sm text-muted-foreground">
          Changes will be saved immediately and applied to all organization members.
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
