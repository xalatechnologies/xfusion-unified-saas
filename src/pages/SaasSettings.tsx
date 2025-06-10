
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Database, Mail, Globe, Bell, Zap } from "lucide-react";

export default function SaasSettings() {
  return (
    <SaasAdminLayout>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <PageHeader
          icon={Settings}
          title="System Settings"
          subtitle="Configure platform-wide settings, security, and system preferences"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />

        {/* System Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-left">
                <Globe className="w-5 h-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription className="text-left">Basic platform configuration and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name" className="text-left block">Platform Name</Label>
                <Input id="platform-name" defaultValue="XFusion" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email" className="text-left block">Support Email</Label>
                <Input id="support-email" defaultValue="support@xfusion.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-url" className="text-left block">Company Website</Label>
                <Input id="company-url" defaultValue="https://xfusion.com" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500 text-left">Temporarily disable platform access</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-left">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription className="text-left">Authentication and security configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500 text-left">Require 2FA for all admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Session Timeout</Label>
                  <p className="text-sm text-gray-500 text-left">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-duration" className="text-left block">Session Duration (hours)</Label>
                <Input id="session-duration" type="number" defaultValue="8" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Password Complexity</Label>
                  <p className="text-sm text-gray-500 text-left">Enforce strong password requirements</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-left">
                <Mail className="w-5 h-5" />
                <span>Email Configuration</span>
              </CardTitle>
              <CardDescription className="text-left">SMTP settings and email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host" className="text-left block">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.sendgrid.net" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port" className="text-left block">SMTP Port</Label>
                <Input id="smtp-port" type="number" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email" className="text-left block">From Email</Label>
                <Input id="from-email" defaultValue="noreply@xfusion.com" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Email Verification Required</Label>
                  <p className="text-sm text-gray-500 text-left">Require email verification for new users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="w-full">
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-left">
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription className="text-left">Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">New User Registration</Label>
                  <p className="text-sm text-gray-500 text-left">Notify admins of new sign-ups</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Failed Payment Alerts</Label>
                  <p className="text-sm text-gray-500 text-left">Alert when payments fail</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">System Health Monitoring</Label>
                  <p className="text-sm text-gray-500 text-left">Alerts for system issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <Label className="text-left block">Weekly Usage Reports</Label>
                  <p className="text-sm text-gray-500 text-left">Send usage summaries to admins</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status & Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-left">
              <Database className="w-5 h-5" />
              <span>System Status & Performance</span>
            </CardTitle>
            <CardDescription className="text-left">Monitor system health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">245ms</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
                <div className="text-xs text-gray-500 mt-1">Last 24 hours</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">98.5%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">API requests</div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h4 className="font-medium text-left">System Actions</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Database
                </Button>
                <Button variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  System Maintenance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Settings */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </div>
    </SaasAdminLayout>
  );
}
