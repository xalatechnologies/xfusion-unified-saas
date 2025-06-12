import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, Palette, Image, FileImage, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface OrganizationBrandingProps {
  organizationId: string;
}

export const OrganizationBranding = ({ organizationId }: OrganizationBrandingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [brandData, setBrandData] = useState({
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    logoUrl: "",
    faviconUrl: "",
  });
  const [enums, setEnums] = useState<{ font_size: string[]; color_token: string[] }>({ font_size: [], color_token: [] });

  // Fetch theme and enums on mount
  useEffect(() => {
    const fetchThemeAndEnums = async () => {
      setIsLoading(true);
      try {
        // Fetch theme
        const themeRes = await fetch(`/functions/v1/theme-get-org?orgId=${organizationId}`);
        const theme = await themeRes.json();
        if (theme.primaryColor || theme.secondaryColor) {
          setBrandData((prev) => ({
            ...prev,
            primaryColor: theme.primaryColor || prev.primaryColor,
            secondaryColor: theme.secondaryColor || prev.secondaryColor,
            logoUrl: theme.logoUrl || prev.logoUrl,
            faviconUrl: theme.faviconUrl || prev.faviconUrl,
          }));
        }
        // Fetch enums
        const enumsRes = await fetch(`/functions/v1/theme-get-enums`);
        const enumsData = await enumsRes.json();
        setEnums(enumsData);
      } catch (e) {
        // handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemeAndEnums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch(`/functions/v1/theme-update-org`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: organizationId, theme_overrides: brandData }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo & Visual Assets */}
      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4 text-left">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center text-left">
            <Image className="w-5 h-5 mr-2 text-blue-600" />
            Logo & Visual Assets
          </CardTitle>
          <p className="text-sm text-muted-foreground text-left">
            Upload your organization's logo and favicon for consistent branding
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Organization Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop your logo here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 2MB (recommended: 200x60px)
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <FileImage className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Favicon</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop your favicon here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  ICO, PNG up to 1MB (recommended: 32x32px)
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <FileImage className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4 text-left">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center text-left">
            <Palette className="w-5 h-5 mr-2 text-blue-600" />
            Color Scheme
          </CardTitle>
          <p className="text-sm text-muted-foreground text-left">
            Define your brand colors for a consistent visual identity
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="primary-color" className="text-sm font-medium text-gray-700">
                Primary Color
              </Label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-10 rounded-md border border-gray-300 shadow-sm"
                  style={{ backgroundColor: brandData.primaryColor }}
                />
                <Input
                  id="primary-color"
                  type="color"
                  value={brandData.primaryColor}
                  onChange={(e) => setBrandData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={brandData.primaryColor}
                  onChange={(e) => setBrandData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  placeholder="#2563eb"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Used for buttons, links, and primary UI elements
              </p>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="secondary-color" className="text-sm font-medium text-gray-700">
                Secondary Color
              </Label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-10 rounded-md border border-gray-300 shadow-sm"
                  style={{ backgroundColor: brandData.secondaryColor }}
                />
                <Input
                  id="secondary-color"
                  type="color"
                  value={brandData.secondaryColor}
                  onChange={(e) => setBrandData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={brandData.secondaryColor}
                  onChange={(e) => setBrandData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  placeholder="#64748b"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Used for secondary elements and accents
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4 text-left">
          <CardTitle className="text-lg font-medium text-gray-900 text-left">
            Brand Preview
          </CardTitle>
          <p className="text-sm text-muted-foreground text-left">
            See how your branding will appear in the application
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">LOGO</span>
              </div>
              <span className="font-semibold text-gray-900">Your Organization</span>
            </div>
            <Separator />
            <div className="flex space-x-3">
              <Button 
                style={{ backgroundColor: brandData.primaryColor }}
                className="text-white hover:opacity-90"
              >
                Primary Button
              </Button>
              <Button 
                variant="outline"
                style={{ 
                  borderColor: brandData.secondaryColor,
                  color: brandData.secondaryColor 
                }}
              >
                Secondary Button
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex items-center justify-between pt-6 border-t bg-gray-50/50 -mx-6 px-6 py-4 rounded-b-lg">
        <div className="text-sm text-muted-foreground">
          Brand changes will be applied across all organization interfaces.
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
              Save Branding
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
