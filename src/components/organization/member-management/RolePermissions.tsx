
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Info } from "lucide-react";
import { getRoleIcon, getRoleIconColor } from "./memberUtils";

const rolePermissions = [
  {
    role: "admin",
    permissions: ["Full system access", "Manage all users", "Configure organization settings", "Access billing", "Delete organization"]
  },
  {
    role: "operations_manager", 
    permissions: ["Manage work orders", "Assign resources", "View reports", "Manage teams", "Access scheduling"]
  },
  {
    role: "maintenance_manager",
    permissions: ["Create maintenance plans", "Schedule PM tasks", "Manage procedures", "Assign technicians", "Track compliance"]
  },
  {
    role: "engineer",
    permissions: ["Create procedures", "Design workflows", "Technical documentation", "System configuration", "Quality control"]
  },
  {
    role: "technician", 
    permissions: ["Execute work orders", "Update task status", "Record time", "Access mobile app", "View procedures"]
  },
  {
    role: "requester",
    permissions: ["Submit work requests", "Track request status", "View assigned work", "Basic reporting", "Request approvals"]
  },
  {
    role: "client",
    permissions: ["View assigned work", "Submit requests", "Track progress", "Access reports", "Limited system access"]
  },
  {
    role: "viewer",
    permissions: ["Read-only access", "View dashboards", "Basic reports", "No editing rights", "Limited data access"]
  }
];

export const RolePermissions = () => {
  return (
    <Card className="shadow-sm border-0 bg-gray-50/30">
      <CardHeader className="pb-4 text-left">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center text-left">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Role Permissions Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground text-left">
          Understanding what each role can do within your organization
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-sm font-medium text-blue-900 text-left">Permission Hierarchy</h4>
              <p className="text-xs text-blue-700 mt-1 text-left">
                Roles are organized from highest to lowest access level. Higher roles typically inherit permissions from lower roles.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rolePermissions.map(({ role, permissions }) => {
            const RoleIcon = getRoleIcon(role);
            const iconColor = getRoleIconColor(role);
            const roleName = role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

            return (
              <Card key={role} className="h-full bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <RoleIcon className={`w-5 h-5 ${iconColor}`} />
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      {roleName}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {permissions.map((permission, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs text-gray-600 leading-relaxed text-left">
                          {permission}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
