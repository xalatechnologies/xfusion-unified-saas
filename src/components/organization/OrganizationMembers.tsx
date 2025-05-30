
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
import { useOrganizationMembers, useInviteOrganizationMember } from "@/hooks/useDatabase";

interface OrganizationMembersProps {
  organizationId: string;
}

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState("");
  
  const { data: members, isLoading } = useOrganizationMembers(organizationId);
  const inviteMember = useInviteOrganizationMember();

  const handleInvite = async () => {
    if (inviteEmail) {
      try {
        await inviteMember.mutateAsync({
          organization_id: organizationId,
          user_id: null, // Will be set when user accepts invitation
          role: "member",
          status: "pending",
        });
        
        toast({
          title: "Invitation Sent",
          description: `Invitation sent to ${inviteEmail}`,
        });
        setInviteEmail("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send invitation",
          variant: "destructive",
        });
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "manager": return "bg-blue-100 text-blue-800";
      case "technician": return "bg-green-100 text-green-800";
      case "member": return "bg-purple-100 text-purple-800";
      case "viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter email address to invite"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button 
              onClick={handleInvite} 
              variant="outline"
              disabled={inviteMember.isPending}
            >
              <Mail className="w-4 h-4 mr-2" />
              {inviteMember.isPending ? "Sending..." : "Send Invite"}
            </Button>
          </div>

          <div className="space-y-4">
            {members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.users?.email?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.users?.email || "Unknown User"}</p>
                    <p className="text-sm text-gray-600">{member.users?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
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
                      <DropdownMenuItem>Resend Invite</DropdownMenuItem>
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
