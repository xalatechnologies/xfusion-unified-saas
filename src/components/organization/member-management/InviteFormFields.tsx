
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type OrganizationRole = Database["public"]["Enums"]["organization_role"];

const roles: { value: OrganizationRole; label: string; color: string }[] = [
  { value: "admin", label: "Admin", color: "text-red-600" },
  { value: "operations_manager", label: "Operations Manager", color: "text-purple-600" },
  { value: "maintenance_manager", label: "Maintenance Manager", color: "text-blue-600" },
  { value: "engineer", label: "Engineer", color: "text-green-600" },
  { value: "technician", label: "Technician", color: "text-orange-600" },
  { value: "requester", label: "Requester", color: "text-yellow-600" },
  { value: "client", label: "Client", color: "text-indigo-600" },
  { value: "viewer", label: "Viewer", color: "text-gray-600" },
];

interface InviteFormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  role: OrganizationRole;
  setRole: (role: OrganizationRole) => void;
  disabled: boolean;
}

export const InviteFormFields = ({ email, setEmail, role, setRole, disabled }: InviteFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-900">
          Email Address
        </Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="email"
            type="email"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-10"
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="role" className="text-sm font-medium text-gray-900">
          Role
        </Label>
        <Select value={role} onValueChange={(value: OrganizationRole) => setRole(value)}>
          <SelectTrigger className="h-10 mt-1">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            {roles.map((roleOption) => (
              <SelectItem 
                key={roleOption.value} 
                value={roleOption.value}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <span className={`font-medium ${roleOption.color}`}>
                  {roleOption.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
