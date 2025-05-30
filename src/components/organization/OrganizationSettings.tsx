
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrganizationSettingsForm } from "@/hooks/useOrganizationSettingsForm";
import { OrganizationBasicInfo } from "./OrganizationBasicInfo";
import { OrganizationContactInfo } from "./OrganizationContactInfo";
import { OrganizationLanguageSettings } from "./OrganizationLanguageSettings";

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
        <div className="text-lg">Loading organization settings...</div>
      </div>
    );
  }

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <OrganizationBasicInfo
            formData={{
              name: formData.name,
              website: formData.website,
              address: formData.address,
            }}
            onFormDataChange={updateFormData}
          />

          <OrganizationContactInfo
            formData={{
              email: formData.email,
              phone: formData.phone,
              fax: formData.fax,
            }}
            onFormDataChange={updateFormData}
          />

          <OrganizationLanguageSettings
            defaultLanguage={formData.defaultLanguage}
            onLanguageChange={(language) => updateFormData({ defaultLanguage: language })}
          />
          
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
