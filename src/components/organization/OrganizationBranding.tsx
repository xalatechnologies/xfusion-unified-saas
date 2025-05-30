
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

export const OrganizationBranding = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [branding, setBranding] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    logoUrl: "",
    favicon: "",
  });

  const handleSave = () => {
    toast({
      title: "Branding Updated",
      description: "Organization branding has been saved successfully.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload
      toast({
        title: "Logo Uploaded",
        description: "Logo will be processed and updated shortly.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Logo & Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Organization Logo</Label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {branding.logoUrl ? (
                  <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Upload Logo</span>
                  </Button>
                </Label>
                <p className="text-sm text-gray-600">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Favicon</Label>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                {branding.favicon ? (
                  <img src={branding.favicon} alt="Favicon" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                )}
              </div>
              <Button variant="outline" size="sm">Upload Favicon</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Theme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={branding.primaryColor}
                  onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={branding.secondaryColor}
                  onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                  placeholder="#8b5cf6"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="flex space-x-2">
              <div 
                className="w-16 h-8 rounded"
                style={{ backgroundColor: branding.primaryColor }}
              ></div>
              <div 
                className="w-16 h-8 rounded"
                style={{ backgroundColor: branding.secondaryColor }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Branding
        </Button>
      </div>
    </div>
  );
};
