
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const OrganizationSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    name: "SupplyMantix Corporation",
    description: "Leading maintenance and supply chain solutions provider",
    timezone: "America/New_York",
    language: "en",
    emailNotifications: true,
    slackIntegration: false,
    autoApproval: false,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    toast({
      title: "Settings Updated",
      description: "Organization settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("organization.settings.general")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="org-description">Description</Label>
            <Textarea
              id="org-description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Input
                id="language"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications & Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="slack-integration">Slack Integration</Label>
              <p className="text-sm text-gray-600">Send notifications to Slack channels</p>
            </div>
            <Switch
              id="slack-integration"
              checked={settings.slackIntegration}
              onCheckedChange={(checked) => setSettings({ ...settings, slackIntegration: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-approval">Auto-approve Requests</Label>
              <p className="text-sm text-gray-600">Automatically approve requests under $500</p>
            </div>
            <Switch
              id="auto-approval"
              checked={settings.autoApproval}
              onCheckedChange={(checked) => setSettings({ ...settings, autoApproval: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </Button>
      </div>
    </div>
  );
};
