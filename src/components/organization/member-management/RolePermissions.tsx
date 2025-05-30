
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Shield, Users } from "lucide-react";

export const RolePermissions = () => {
  return (
    <Card className="shadow-sm border-0 bg-gray-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900">
          Role Permissions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Understanding what each role can do in your organization
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-gray-900">Owner</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full organization control</li>
              <li>• Delete organization</li>
              <li>• Transfer ownership</li>
              <li>• All admin permissions</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-gray-900">Admin</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full organization access</li>
              <li>• Manage all settings</li>
              <li>• Invite/remove members</li>
              <li>• Billing management</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Operations Manager</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Manage work orders</li>
              <li>• View reports</li>
              <li>• Manage inventory</li>
              <li>• Limited settings access</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h4 className="font-medium text-gray-900">Viewer</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• View work orders</li>
              <li>• View assigned tasks</li>
              <li>• Basic reporting</li>
              <li>• Profile management</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
