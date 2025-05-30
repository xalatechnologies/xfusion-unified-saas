
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Mail, MoreHorizontal, Shield, Crown } from "lucide-react";
import { useState } from "react";

interface OrganizationMembersProps {
  organizationId: string;
}

const mockMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    avatar: "",
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Manager",
    status: "Active",
    avatar: "",
    joinDate: "2024-02-10"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Member",
    status: "Pending",
    avatar: "",
    joinDate: "2024-03-01"
  }
];

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "Manager":
        return <Shield className="w-4 h-4 text-blue-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
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
              {mockMembers.length}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage roles and permissions for organization members
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={`border ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </Badge>
                  <Badge className={`border ${getStatusBadgeColor(member.status)}`}>
                    {member.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-600" />
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
