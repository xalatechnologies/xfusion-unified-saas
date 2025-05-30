
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Mail, MoreHorizontal, Shield, Crown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useOrganizationMembers, useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface OrganizationMembersProps {
  organizationId: string;
}

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "manager" | "member">("member");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { data: members, isLoading: membersLoading } = useOrganizationMembers(organizationId);
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
      setInviteRole("member");
      
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "admin":
        return <Shield className="w-4 h-4 text-red-600" />;
      case "manager":
        return <Shield className="w-4 h-4 text-blue-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (membersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-lg">Loading members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Invite New Member */}
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
              <Select value={inviteRole} onValueChange={(value: "admin" | "manager" | "member") => setInviteRole(value)}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
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

      {/* Current Members */}
      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Organization Members
            <Badge variant="secondary" className="ml-2">
              {members?.length || 0}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage roles and permissions for organization members
          </p>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                              {member.users?.email?.substring(0, 2).toUpperCase() || 
                               member.invited_email?.substring(0, 2).toUpperCase() || '??'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {member.users?.email || member.invited_email}
                              </span>
                              {getRoleIcon(member.role)}
                            </div>
                            {member.status === 'pending' && (
                              <span className="text-xs text-muted-foreground">Invitation pending</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border ${getRoleBadgeColor(member.role)}`}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border ${getStatusBadgeColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.joined_at ? formatDate(member.joined_at) : 
                         member.invited_at ? `Invited ${formatDate(member.invited_at)}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No members found</p>
              <p className="text-sm text-muted-foreground">Invite members to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions */}
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
                <h4 className="font-medium text-gray-900">Manager</h4>
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
                <h4 className="font-medium text-gray-900">Member</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create work orders</li>
                <li>• View assigned tasks</li>
                <li>• Basic reporting</li>
                <li>• Profile management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
