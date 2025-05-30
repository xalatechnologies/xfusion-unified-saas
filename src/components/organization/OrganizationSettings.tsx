
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOrganizations, useUpdateOrganization } from "@/hooks/useOrganizations";

interface OrganizationSettingsProps {
  organizationId: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  fax?: string;
}

export const OrganizationSettings = ({ organizationId }: OrganizationSettingsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const { data: organizations } = useOrganizations();
  const updateOrganization = useUpdateOrganization();
  
  const currentOrganization = organizations?.find(org => org.id === organizationId);
  
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    address: "",
    email: "",
    phone: "",
    fax: "",
  });

  // Update form data when organization data loads
  useEffect(() => {
    if (currentOrganization) {
      const contact = currentOrganization.contact as ContactInfo | null;
      
      setFormData({
        name: currentOrganization.name || "",
        website: currentOrganization.website || "",
        address: currentOrganization.address || "",
        email: contact?.email || "",
        phone: contact?.phone || "",
        fax: contact?.fax || "",
      });
    }
  }, [currentOrganization]);

  const handleSave = async () => {
    try {
      await updateOrganization.mutateAsync({
        id: organizationId,
        updates: {
          name: formData.name,
          website: formData.website,
          address: formData.address,
          contact: {
            email: formData.email,
            phone: formData.phone,
            fax: formData.fax,
          },
        },
      });
      
      toast({
        title: "Settings Updated",
        description: "Your organization settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update organization settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter organization name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fax">Fax</Label>
              <Input
                id="fax"
                type="tel"
                value={formData.fax}
                onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                placeholder="+1 (555) 123-4568"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter organization address"
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={updateOrganization.isPending}
          >
            {updateOrganization.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
