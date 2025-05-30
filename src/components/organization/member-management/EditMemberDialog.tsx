
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUpdateOrganizationMember } from "@/hooks/useOrganizations";
import { getAvailableRoles, getRoleIcon, getRoleIconColor } from "./memberUtils";
import type { Database } from "@/integrations/supabase/types";

type OrganizationMember = {
  id: string;
  organization_id: string;
  user_id: string | null;
  invited_email: string | null;
  role: Database["public"]["Enums"]["organization_role"];
  status: string;
  users: { id: string; email: string } | null;
};

interface EditMemberDialogProps {
  member: OrganizationMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditMemberDialog = ({ member, isOpen, onClose }: EditMemberDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(member?.role || "viewer");
  const updateMemberMutation = useUpdateOrganizationMember();

  const handleSave = async () => {
    if (!member) return;

    try {
      await updateMemberMutation.mutateAsync({
        memberId: member.id,
        updates: {
          role: selectedRole as Database["public"]["Enums"]["organization_role"],
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  if (!member) return null;

  const availableRoles = getAvailableRoles();
  const RoleIcon = getRoleIcon(selectedRole);
  const roleIconColor = getRoleIconColor(selectedRole);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Edit Member</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Member Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {member.users?.email?.substring(0, 2).toUpperCase() || 
                 member.invited_email?.substring(0, 2).toUpperCase() || '??'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">
                {member.users?.email || member.invited_email}
              </div>
              <Badge className={`mt-1 ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700 flex items-center text-left">
              <RoleIcon className={`w-4 h-4 mr-2 ${roleIconColor}`} />
              Role
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={updateMemberMutation.isPending}
          >
            {updateMemberMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
