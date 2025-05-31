
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
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

interface MembersTableProps {
  members: OrganizationMember[];
}

export const MembersTable = ({ members }: MembersTableProps) => {
  const [editingMember, setEditingMember] = useState<OrganizationMember | null>(null);
  const [removingMember, setRemovingMember] = useState<OrganizationMember | null>(null);

  return (
    <>
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
