
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Shield, Users, Wrench, Eye, UserCheck } from "lucide-react";

export const RolePermissions = () => {
  return (
    <Card className="shadow-sm border-0 bg-gray-50/30">
      <CardHeader className="pb-4 text-left">
        <CardTitle className="text-lg font-medium text-gray-900 text-left">
          Role Permissions
        </CardTitle>
        <p className="text-sm text-muted-foreground text-left">
          Understanding what each role can do in your organization
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                  <Crown className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Owner</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Full organization control
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Delete organization
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Transfer ownership
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  All admin permissions
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Admin</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Full organization access
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Manage all settings
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Invite/remove members
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Billing management
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Operations Manager</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Manage work orders
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  View reports
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Manage inventory
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Limited settings access
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                  <Eye className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Viewer</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  View work orders
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  View assigned tasks
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  Basic reporting
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  Profile management
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
