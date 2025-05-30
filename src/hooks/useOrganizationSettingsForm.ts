
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOrganizations, useUpdateOrganization } from "@/hooks/useOrganizations";

interface OrganizationFormData {
  name: string;
  website: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
  defaultLanguage: string;
}

export const useOrganizationSettingsForm = (organizationId: string) => {
  const { toast } = useToast();
  const { data: organizations } = useOrganizations();
  const updateOrganization = useUpdateOrganization();
  
  const currentOrganization = organizations?.find(org => org.id === organizationId);
  
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: "",
    website: "",
    address: "",
    email: "",
    phone: "",
    fax: "",
    defaultLanguage: "en",
  });

  useEffect(() => {
    if (currentOrganization) {
      console.log("Loading organization data:", currentOrganization);
      setFormData({
        name: currentOrganization.name || "",
        website: currentOrganization.website || "",
        address: currentOrganization.address || "",
        email: currentOrganization.contact_email || "",
        phone: currentOrganization.contact_phone || "",
        fax: currentOrganization.contact_fax || "",
        defaultLanguage: currentOrganization.default_language || "en",
      });
    }
  }, [currentOrganization]);

  const handleSave = async () => {
    if (!organizationId) {
      toast({
        title: "Error",
        description: "No organization ID found. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Saving organization data:", {
        id: organizationId,
        updates: {
          name: formData.name,
          website: formData.website,
          address: formData.address,
          contact_email: formData.email,
          contact_phone: formData.phone,
          contact_fax: formData.fax,
          default_language: formData.defaultLanguage,
        },
      });

      const result = await updateOrganization.mutateAsync({
        id: organizationId,
        updates: {
          name: formData.name,
          website: formData.website,
          address: formData.address,
          contact_email: formData.email,
          contact_phone: formData.phone,
          contact_fax: formData.fax,
          default_language: formData.defaultLanguage,
        },
      });
      
      console.log("Update result:", result);
      
      toast({
        title: "Settings Updated",
        description: "Your organization settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error updating organization:", error);
      toast({
        title: "Error",
        description: "Failed to update organization settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    setFormData,
    handleSave,
    currentOrganization,
    isLoading: updateOrganization.isPending,
  };
};
