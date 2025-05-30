
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from "@/integrations/supabase/types";

interface MemberInviteFormProps {
  organizationId: string;
}

export const MemberInviteForm = ({ organizationId }: MemberInviteFormProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Database["public"]["Enums"]["organization_role"]>("viewer");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const inviteMutation = useInviteOrganizationMember();

  const handleInvite = async () => {
    if (!inviteEmail || !user) return;

    try {
      await inviteMutation.mutateAsync({
        organization_id: organizationId,
        invited_email: inviteEmail,
        role: inviteRole,
        invited_by: user.id,
      });
      
      setInviteEmail("");
      setInviteRole("viewer");
      
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${inviteEmail}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-sm border-0 bg-gray-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
          Invite New Member
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Send an invitation to add new members to your organization
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="invite-email"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="member@example.com"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <Select value={inviteRole} onValueChange={(value: Database["public"]["Enums"]["organization_role"]) => setInviteRole(value)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="maintenance_manager">Maintenance Manager</SelectItem>
                <SelectItem value="operations_manager">Operations Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button 
              className="w-full h-10 bg-blue-600 hover:bg-blue-700"
              onClick={handleInvite}
              disabled={!inviteEmail || inviteMutation.isPending}
            >
              {inviteMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Send Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
