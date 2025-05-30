
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, MoreHorizontal, Loader2 } from "lucide-react";
import { useOrganizationMembers } from "@/hooks/useOrganizations";
import { 
  getRoleIcon, 
  getRoleIconColor, 
  getRoleBadgeColor, 
  getStatusBadgeColor, 
  formatDate, 
  formatRoleName 
} from "./memberUtils";

interface MembersListProps {
  organizationId: string;
}

export const MembersList = ({ organizationId }: MembersListProps) => {
  const { data: members, isLoading: membersLoading } = useOrganizationMembers(organizationId);

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
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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
  );
};
