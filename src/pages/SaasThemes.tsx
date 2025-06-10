
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaasDashboardLayout } from "@/components/Layout/SaasDashboardLayout";
import { databaseApi } from "@/lib/database";
import { useTheme, type ThemeConfig } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

export default function SaasThemes() {
  const { theme, refreshTheme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTheme, setActiveTheme] = useState<any>(null);

  // Local state for theme editing
  const [editedTheme, setEditedTheme] = useState<ThemeConfig | null>(null);

  useEffect(() => {
    if (theme) {
      setEditedTheme(theme);
    }
  }, [theme]);

  const handleSaveTheme = async () => {
    if (!editedTheme) return;

    try {
      setLoading(true);

      // Convert ThemeConfig to a plain object for database storage
      const themeData = JSON.parse(JSON.stringify(editedTheme));

      if (activeTheme) {
        await databaseApi.updateTheme(activeTheme.id, {
          theme_config: themeData
        });
      } else {
        const newTheme = await databaseApi.createTheme({
          name: "custom",
          theme_config: themeData,
          is_active: true
        });
        setActiveTheme(newTheme);
      }

      await refreshTheme();
      
      toast({
        title: "Theme saved",
        description: "Global theme has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving theme:', error);
      toast({
        title: "Error",
        description: "Failed to save theme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (colorKey: string, value: string) => {
    if (!editedTheme) return;
    
    setEditedTheme({
      ...editedTheme,
      colors: {
        ...editedTheme.colors,
        [colorKey]: value
      }
    });
  };

  if (!editedTheme) {
    return (
      <SaasDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div>Loading theme...</div>
        </div>
      </SaasDashboardLayout>
    );
  }

  return (
    <SaasDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Theme Management</h1>
          <p className="text-muted-foreground">
            Configure the global design system that applies across all organizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(editedTheme.colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id={key}
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={handleSaveTheme} 
                disabled={loading}
                className="w-full mt-6"
              >
                {loading ? "Saving..." : "Save Global Theme"}
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 p-4 border rounded-lg">
                <div 
                  className="h-8 rounded"
                  style={{ backgroundColor: editedTheme.colors.primary }}
                >
                  <span className="text-white p-2">Primary Color</span>
                </div>
                <div 
                  className="h-8 rounded"
                  style={{ backgroundColor: editedTheme.colors.secondary }}
                >
                  <span className="text-white p-2">Secondary Color</span>
                </div>
                <div 
                  className="h-8 rounded"
                  style={{ backgroundColor: editedTheme.colors.accent }}
                >
                  <span className="text-white p-2">Accent Color</span>
                </div>
                <div 
                  className="p-4 rounded"
                  style={{ 
                    backgroundColor: editedTheme.colors.surface,
                    color: editedTheme.colors.text
                  }}
                >
                  <h3 style={{ fontFamily: editedTheme.typography.fontFamily }}>
                    Sample Text
                  </h3>
                  <p style={{ 
                    fontFamily: editedTheme.typography.fontFamily,
                    color: editedTheme.colors.textSecondary 
                  }}>
                    This is how text will appear with the current theme settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SaasDashboardLayout>
  );
}
