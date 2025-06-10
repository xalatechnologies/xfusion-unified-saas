
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Edit, Trash2, Shield, UserX, UserCheck } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UsersTableProps {
  users: any[];
  selectedUsers: string[];
  onUserSelect: (userId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onEditUser: (user: any) => void;
}

export function UsersTable({ users, selectedUsers, onUserSelect, onSelectAll, onEditUser }: UsersTableProps) {
  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const getStatusBadge = (status: string = 'active') => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' },
      pending: { variant: 'outline' as const, label: 'Pending' },
      suspended: { variant: 'destructive' as const, label: 'Suspended' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: string = 'user') => {
    const variants = {
      super_admin: { variant: 'destructive' as const, label: 'Super Admin' },
      organization_admin: { variant: 'default' as const, label: 'Org Admin' },
      user: { variant: 'secondary' as const, label: 'User' }
    };
    
    const config = variants[role as keyof typeof variants] || variants.user;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>System Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Organizations</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) => onUserSelect(user.id, !!checked)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.email} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {getUserInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getRoleBadge('user')} {/* Mock role - would come from user_roles join */}
              </TableCell>
              <TableCell>
                {getStatusBadge('active')} {/* Mock status */}
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">1 organization</span> {/* Mock data */}
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {format(new Date(user.created_at), 'MMM dd, yyyy')}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">2 days ago</span> {/* Mock data */}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="w-4 h-4 mr-2" />
                      Manage Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Activate User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-orange-600">
                      <UserX className="w-4 h-4 mr-2" />
                      Suspend User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
