
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { databaseApi } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { Palette, Save, RotateCcw } from "lucide-react";

const SaasThemes = () => {
  const { themeConfig, applyTheme, refreshTheme } = useTheme();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [localTheme, setLocalTheme] = useState(themeConfig);

  const handleColorChange = (colorKey: string, value: string) => {
    if (!localTheme) return;
    
    const updatedTheme = {
      ...localTheme,
      colors: {
        ...localTheme.colors,
        [colorKey]: value
      }
    };
    setLocalTheme(updatedTheme);
    applyTheme(updatedTheme);
  };

  const handleSaveTheme = async () => {
    if (!localTheme) return;
    
    try {
      setSaving(true);
      
      // Create a new theme or update existing
      await databaseApi.createTheme({
        name: `Custom Theme ${new Date().toLocaleDateString()}`,
        theme_config: localTheme,
        is_active: true
      });
      
      await refreshTheme();
      
      toast({
        title: "Theme Saved",
        description: "Your theme has been saved and applied globally.",
      });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        title: "Error",
        description: "Failed to save theme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetTheme = async () => {
    try {
      await refreshTheme();
      setLocalTheme(themeConfig);
      toast({
        title: "Theme Reset",
        description: "Theme has been reset to the active global theme.",
      });
    } catch (error) {
      console.error('Error resetting theme:', error);
    }
  };

  if (!localTheme) {
    return <div>Loading theme...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Theme Management</h1>
          <p className="text-muted-foreground">
            Manage the global design system that applies across all applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetTheme}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveTheme} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Theme"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Palette
            </CardTitle>
            <CardDescription>
              Define the primary colors used throughout the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="primary"
                    type="color"
                    value={localTheme.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={localTheme.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondary">Secondary Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="secondary"
                    type="color"
                    value={localTheme.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={localTheme.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accent">Accent Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="accent"
                    type="color"
                    value={localTheme.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={localTheme.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="background">Background Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="background"
                    type="color"
                    value={localTheme.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={localTheme.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              See how your theme looks with common UI elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border" style={{ backgroundColor: localTheme.colors.surface }}>
              <Button 
                className="mb-2 mr-2"
                style={{ backgroundColor: localTheme.colors.primary }}
              >
                Primary Button
              </Button>
              <Button 
                variant="outline" 
                className="mb-2"
                style={{ borderColor: localTheme.colors.secondary }}
              >
                Secondary Button
              </Button>
              <div 
                className="p-3 rounded mt-3"
                style={{ backgroundColor: localTheme.colors.background }}
              >
                <p style={{ color: localTheme.colors.text }}>
                  This is sample text in the primary color.
                </p>
                <p style={{ color: localTheme.colors.textSecondary }}>
                  This is sample text in the secondary color.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Typography & Spacing</CardTitle>
          <CardDescription>
            Configure typography and spacing settings
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input
              id="fontFamily"
              value={localTheme.typography.fontFamily}
              onChange={(e) => setLocalTheme({
                ...localTheme,
                typography: {
                  ...localTheme.typography,
                  fontFamily: e.target.value
                }
              })}
            />
          </div>
          
          <div>
            <Label htmlFor="baseFontSize">Base Font Size</Label>
            <Input
              id="baseFontSize"
              value={localTheme.typography.fontSize.base}
              onChange={(e) => setLocalTheme({
                ...localTheme,
                typography: {
                  ...localTheme.typography,
                  fontSize: {
                    ...localTheme.typography.fontSize,
                    base: e.target.value
                  }
                }
              })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaasThemes;
