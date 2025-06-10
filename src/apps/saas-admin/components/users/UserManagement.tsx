
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";
import { UserStatsCards } from "./UserStatsCards";
import { UserFilters } from "./UserFilters";
import { UsersTable } from "./UsersTable";
import { CreateUserDialog } from "./CreateUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { ChangeAvatarDialog } from "./ChangeAvatarDialog";
import { UserBulkActions } from "./UserBulkActions";
import { UserExport } from "./UserExport";

export function UserManagement() {
  const { data: users, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [passwordUser, setPasswordUser] = useState<any>(null);
  const [avatarUser, setAvatarUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    status: "all",
    role: "all",
    organization: "all",
    dateRange: "all"
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    // Add more filter logic here based on filters state
    return matchesSearch;
  }) || [];

  const handleUserSelect = (userId: string, selected: boolean) => {
    if (selected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all users across your platform</p>
        </div>
        <div className="flex items-center gap-3">
          <UserExport users={filteredUsers} selectedUsers={selectedUsers} />
          <Button onClick={() => setShowCreateDialog(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <UserStatsCards users={users || []} />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <UserFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <UserBulkActions 
              selectedCount={selectedUsers.length}
              selectedUsers={selectedUsers}
              onClearSelection={() => setSelectedUsers([])}
            />
          )}

          {/* Users Table */}
          <UsersTable
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
            onSelectAll={handleSelectAll}
            onEditUser={setEditingUser}
            onChangePassword={setPasswordUser}
            onChangeAvatar={setAvatarUser}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateUserDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
        />
      )}

      {passwordUser && (
        <ChangePasswordDialog
          user={passwordUser}
          open={!!passwordUser}
          onOpenChange={(open) => !open && setPasswordUser(null)}
        />
      )}

      {avatarUser && (
        <ChangeAvatarDialog
          user={avatarUser}
          open={!!avatarUser}
          onOpenChange={(open) => !open && setAvatarUser(null)}
        />
      )}
    </div>
  );
}
