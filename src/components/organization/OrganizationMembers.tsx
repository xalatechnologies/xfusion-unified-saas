import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganizationMembers, useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useAuthState } from "@/hooks/useAuthState";
import { databaseApi } from "@/lib/database";

interface OrganizationMembersProps {
  organizationId: string;
}

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuthState();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"viewer" | "admin" | "engineer" | "technician">("viewer");
  const [isInviting, setIsInviting] = useState(false);
  
  const { data: members, isLoading } = useOrganizationMembers(organizationId);

  const handleInvite = async () => {
    if (!inviteEmail || !user) return;

    setIsInviting(true);
    try {
      // Create the invitation record
      const invitation = await databaseApi.inviteOrganizationMember({
        organization_id: organizationId,
        invited_email: inviteEmail,
        role: inviteRole,
        invited_by: user.id,
      });

      // Send the invitation email
      await databaseApi.sendInvitationEmail({
        email: inviteEmail,
        organizationName: invitation.organizations?.name || "Your Organization",
        inviterName: user.email || "Someone",
        role: inviteRole,
        invitationToken: invitation.invitation_token,
      });
      
      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${inviteEmail}`,
      });
      
      setInviteEmail("");
      setInviteRole("viewer");
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner": return "bg-purple-100 text-purple-800";
      case "admin": return "bg-red-100 text-red-800";
      case "operations_manager": return "bg-blue-100 text-blue-800";
      case "maintenance_manager": return "bg-indigo-100 text-indigo-800";
      case "engineer": return "bg-green-100 text-green-800";
      case "technician": return "bg-teal-100 text-teal-800";
      case "requester": return "bg-orange-100 text-orange-800";
      case "client": return "bg-pink-100 text-pink-800";
      case "viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "operations_manager": return "Operations Manager";
      case "maintenance_manager": return "Maintenance Manager";
      default: return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading members...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Team Members
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter email address to invite"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleInvite} 
                variant="outline"
                disabled={isInviting || !inviteEmail}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isInviting ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {(member.users?.email || member.invited_email)?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {member.users?.email || member.invited_email || "Unknown User"}
                    </p>
                    {member.status === "pending" && (
                      <p className="text-sm text-amber-600">Pending invitation</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getRoleColor(member.role)}>
                    {getRoleDisplayName(member.role)}
                  </Badge>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      {member.status === "pending" && (
                        <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            {(!members || members.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No members found. Invite your first team member!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
