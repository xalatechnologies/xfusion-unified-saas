import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, X } from "lucide-react";
import { UserStatsCards } from "./UserStatsCards";
import { UserFilters } from "./UserFilters";
import { UsersTable } from "./UsersTable";
import { CreateUserDialog } from "./CreateUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { ChangeAvatarDialog } from "./ChangeAvatarDialog";
import { UserBulkActions } from "./UserBulkActions";
import { UserExport } from "./UserExport";
import type { User } from "@/types/User";
import type { UserFilters as UserFiltersType } from "./UserFilters";

export function UserManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [avatarUser, setAvatarUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<UserFiltersType>({
    status: "all",
    role: "all",
    organization: "all",
    dateRange: "all"
  });

  const {
    data: usersData,
    isPending: isLoading,
    isError,
    error
  } = useUsers({
    page,
    pageSize,
    sortBy,
    sortOrder,
    filters: {
      ...filters,
      search: searchTerm
    }
  });

  const users = usersData?.users || [];
  const total = usersData?.total || 0;

  const handleUserSelect = (userId: string, selected: boolean) => {
    if (selected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedUsers(users.map((user) => user.id));
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
          <UserExport users={users} selectedUsers={selectedUsers} />
          <Button onClick={() => setShowCreateDialog(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <UserStatsCards users={users || []} />

      {/* Filters and Search */}
      <Card className="shadow-md border-0 bg-white/90 mb-2">
        <CardContent className="py-6 px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
            <form
              onSubmit={e => e.preventDefault()}
              className="relative w-full md:w-96"
              role="search"
              aria-label="Search users"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-base transition placeholder-gray-400 outline-none"
                style={{ minWidth: 0 }}
                aria-label="Search users"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
            <div className="flex-shrink-0">
              <UserFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <UserExport users={users} selectedUsers={selectedUsers} />
            <Button onClick={() => setShowCreateDialog(true)} className="rounded-full px-5 py-2 text-base font-semibold shadow-sm">
              <UserPlus className="w-5 h-5 mr-2" />
              Create User
            </Button>
          </div>
        </CardContent>
      </Card>
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
        users={users}
        selectedUsers={selectedUsers}
        onUserSelect={handleUserSelect}
        onSelectAll={handleSelectAll}
        onEditUser={setEditingUser}
        onChangePassword={setPasswordUser}
        onChangeAvatar={setAvatarUser}
        filters={filters}
        onFilterChange={setFilters}
        loading={isLoading}
        total={total}
        page={page}
        pageSize={pageSize}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={(column: string) => {
          if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
            setSortBy(column);
            setSortOrder('asc');
          }
        }}
      />

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
