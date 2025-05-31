
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, MoreHorizontal, Loader2, Edit, Trash2, Crown, Zap, Building } from "lucide-react";
import { useOrganizationMembers } from "@/hooks/useOrganizations";
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits";
import { EditMemberDialog } from "./EditMemberDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import { 
  getRoleIcon, 
  getRoleIconColor, 
  getRoleBadgeColor, 
  getStatusBadgeColor, 
  formatDate, 
  formatRoleName 
} from "./memberUtils";
import type { Database } from "@/integrations/supabase/types";

type OrganizationMember = {
  id: string;
  organization_id: string;
  user_id: string | null;
  invited_email: string | null;
  role: Database["public"]["Enums"]["organization_role"];
  status: string;
  joined_at: string | null;
  invited_at: string | null;
  users: { id: string; email: string } | null;
};

interface MembersListProps {
  organizationId: string;
}

const getIconForPlan = (planId: string) => {
  switch (planId) {
    case 'basic':
      return Zap;
    case 'professional':
      return Crown;
    case 'enterprise':
      return Building;
    default:
      return Zap;
  }
};

export const MembersList = ({ organizationId }: MembersListProps) => {
  const { data: members, isLoading: membersLoading } = useOrganizationMembers(organizationId);
  const { 
    memberCount, 
    maxUsers, 
    currentPlan, 
    currentSubscription,
    isAtLimit,
    remainingSlots 
  } = useSubscriptionLimits(organizationId);
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [removingMember, setRemovingMember] = useState<OrganizationMember | null>(null);

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

  const Icon = getIconForPlan(currentSubscription?.subscriptions?.plan_id || 'basic');

  return (
    <>
      {/* Subscription Info Card */}
      {currentSubscription && (
        <Card className="shadow-sm border-0 bg-blue-50/50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{currentPlan} Plan</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {memberCount} of {maxUsers === -1 ? 'unlimited' : maxUsers} members
                    </span>
                    {!isAtLimit && maxUsers !== -1 && (
                      <Badge variant="secondary" className="text-xs">
                        {remainingSlots} slots remaining
                      </Badge>
                    )}
                    {isAtLimit && (
                      <Badge variant="destructive" className="text-xs">
                        At member limit
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${
                  currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                  currentSubscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {currentSubscription.status || 'Unknown'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4 text-left">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center text-left">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Organization Members
            <Badge variant="secondary" className="ml-2">
              {members?.length || 0}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground text-left">
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
                  {members.map((member) => {
                    const RoleIcon = getRoleIcon(member.role);
                    const roleIconColor = getRoleIconColor(member.role);
                    
                    return (
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
                                <RoleIcon className={`w-4 h-4 ${roleIconColor}`} />
                              </div>
                              {member.status === 'pending' && (
                                <span className="text-xs text-muted-foreground">Invitation pending</span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`border ${getRoleBadgeColor(member.role)}`}>
                            {formatRoleName(member.role)}
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingMember(member)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setRemovingMember(member)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

      <EditMemberDialog
        member={editingMember}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
      />

      <RemoveMemberDialog
        member={removingMember}
        isOpen={!!removingMember}
        onClose={() => setRemovingMember(null)}
      />
    </>
  );
};
