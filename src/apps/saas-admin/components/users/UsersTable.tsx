import { DataTable } from "@/components/shared/Table/DataTable";
import { DataTableToolbar } from "@/components/shared/Table/DataTableToolbar";
import { Checkbox } from "@/components/shared/Checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shared/Avatar";
import { Badge } from "@/components/shared/Badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, User as UserIcon, Shield, UserCheck, UserX, Filter } from "lucide-react";
import { format } from "date-fns";
import { UserActions } from "./UserActions";
import React from "react";

interface UsersTableProps {
  users: any[];
  selectedUsers: string[];
  onUserSelect: (userId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onEditUser: (user: any) => void;
  onChangePassword: (user: any) => void;
  onChangeAvatar: (user: any) => void;
  loading?: boolean;
  filters?: { status: string; role: string; organization: string; dateRange: string };
  onFilterChange?: (filters: { status: string; role: string; organization: string; dateRange: string }) => void;
}

const statusIcons = {
  active: <UserCheck className="w-4 h-4 mr-1 text-green-600" />,
  inactive: <UserX className="w-4 h-4 mr-1 text-gray-400" />,
  pending: <Info className="w-4 h-4 mr-1 text-yellow-600" />,
  suspended: <Shield className="w-4 h-4 mr-1 text-red-600" />,
};

const roleIcons = {
  super_admin: <Shield className="w-4 h-4 mr-1 text-red-600" />,
  organization_admin: <UserIcon className="w-4 h-4 mr-1 text-blue-600" />,
  user: <UserIcon className="w-4 h-4 mr-1 text-gray-500" />,
};

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
];
const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "super_admin", label: "Super Admin" },
  { value: "organization_admin", label: "Org Admin" },
  { value: "user", label: "User" },
];

export function UsersTable({
  users,
  selectedUsers,
  onUserSelect,
  onSelectAll,
  onEditUser,
  onChangePassword,
  onChangeAvatar,
  loading = false,
  filters = { status: "all", role: "all", organization: "all", dateRange: "all" },
  onFilterChange,
}: UsersTableProps) {
  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  const getUserInitials = (user: any) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  const getUserDisplayName = (user: any) => {
    if (user.first_name || user.last_name) {
      return `${user.first_name || ""} ${user.last_name || ""}`.trim();
    }
    return user.email;
  };

  const getStatusBadge = (status: string = "active") => {
    const variants = {
      active: { variant: "default" as const, label: "Active" },
      inactive: { variant: "secondary" as const, label: "Inactive" },
      pending: { variant: "outline" as const, label: "Pending" },
      suspended: { variant: "destructive" as const, label: "Suspended" },
    };
    const config = variants[status as keyof typeof variants] || variants.active;
    return (
      <Badge
        variant={config.variant}
        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        style={{ minWidth: 90, justifyContent: "center" }}
        aria-label={config.label}
      >
        {statusIcons[status as keyof typeof statusIcons]}
        {config.label}
      </Badge>
    );
  };

  const getRoleBadge = (role: string = "user") => {
    const variants = {
      super_admin: { variant: "destructive" as const, label: "Super Admin" },
      organization_admin: { variant: "default" as const, label: "Org Admin" },
      user: { variant: "secondary" as const, label: "User" },
    };
    const config = variants[role as keyof typeof variants] || variants.user;
    return (
      <Badge
        variant={config.variant}
        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        style={{ minWidth: 110, justifyContent: "center" }}
        aria-label={config.label}
      >
        {roleIcons[role as keyof typeof roleIcons]}
        {config.label}
      </Badge>
    );
  };

  // Skeleton loader rows
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <DataTableToolbar>
          <div className="flex flex-wrap gap-2" aria-label="Quick filters">
            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span className="text-base font-semibold text-gray-900">Filters:</span>
            </div>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                  ${filters.status === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                onClick={() => onFilterChange && onFilterChange({ ...filters, status: opt.value })}
                aria-pressed={filters.status === opt.value}
              >
                {opt.label}
              </button>
            ))}
            {roleOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                  ${filters.role === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                onClick={() => onFilterChange && onFilterChange({ ...filters, role: opt.value })}
                aria-pressed={filters.role === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </DataTableToolbar>
        <DataTable
          columns={
            <tr>
              {[...Array(8)].map((_, i) => (
                <th key={i} className="py-4 px-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </th>
              ))}
            </tr>
          }
        >
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              {[...Array(8)].map((_, j) => (
                <td key={j} className="py-5 px-6">
                  <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </DataTable>
      </div>
    );
  }

  // Empty state
  if (!users.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <DataTableToolbar>
          <div className="flex flex-wrap gap-2" aria-label="Quick filters">
            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span className="text-base font-semibold text-gray-900">Filters:</span>
            </div>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                  ${filters.status === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                onClick={() => onFilterChange && onFilterChange({ ...filters, status: opt.value })}
                aria-pressed={filters.status === opt.value}
              >
                {opt.label}
              </button>
            ))}
            {roleOptions.map((opt) => (
              <button
                key={opt.value}
                className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                  ${filters.role === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                onClick={() => onFilterChange && onFilterChange({ ...filters, role: opt.value })}
                aria-pressed={filters.role === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </DataTableToolbar>
        <DataTable
          columns={
            <tr>
              {[...Array(8)].map((_, i) => (
                <th key={i} className="py-4 px-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </th>
              ))}
            </tr>
          }
        >
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              {[...Array(8)].map((_, j) => (
                <td key={j} className="py-5 px-6">
                  <div className="h-5 bg-gray-100 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </DataTable>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <DataTableToolbar>
        <div className="flex flex-wrap gap-2" aria-label="Quick filters">
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-blue-700" aria-hidden="true" />
            <span className="text-base font-semibold text-gray-900">Filters:</span>
          </div>
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                ${filters.status === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
              onClick={() => onFilterChange && onFilterChange({ ...filters, status: opt.value })}
              aria-pressed={filters.status === opt.value}
            >
              {opt.label}
            </button>
          ))}
          {roleOptions.map((opt) => (
            <button
              key={opt.value}
              className={`px-3 py-1 rounded-full border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition
                ${filters.role === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
              onClick={() => onFilterChange && onFilterChange({ ...filters, role: opt.value })}
              aria-pressed={filters.role === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </DataTableToolbar>
      <DataTable
        columns={
          <tr>
            <th className="w-14 text-base font-semibold text-gray-900" aria-label="Select all users">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
                aria-label="Select all users"
              />
            </th>
            <th className="text-base font-semibold text-gray-900">User</th>
            <th className="text-base font-semibold text-gray-900">System Role</th>
            <th className="text-base font-semibold text-gray-900">Status</th>
            <th className="text-base font-semibold text-gray-900">Organizations</th>
            <th className="text-base font-semibold text-gray-900">Created</th>
            <th className="text-base font-semibold text-gray-900">Last Login</th>
            <th className="w-14 text-base font-semibold text-gray-900">Actions</th>
          </tr>
        }
      >
        {users.map((user) => {
          const isSelected = selectedUsers.includes(user.id);
          return (
            <tr
              key={user.id}
              role="row"
              aria-checked={isSelected}
              tabIndex={0}
              className={`transition cursor-pointer group focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 ${
                isSelected ? "bg-blue-100/60" : "hover:bg-blue-50"
              }`}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("button, a, [role='button']")) return;
                onUserSelect(user.id, !isSelected);
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  onUserSelect(user.id, !isSelected);
                }
              }}
            >
              <td className="py-4 px-6 align-middle">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => onUserSelect(user.id, !!checked)}
                  aria-label={`Select user ${getUserDisplayName(user)}`}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                />
              </td>
              <td className="py-4 px-6 align-middle">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-white group-hover:border-blue-400 transition">
                      <AvatarImage src={user.avatar_url || ""} alt={getUserDisplayName(user)} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white text-lg border-2 border-white shadow">
                        {getUserInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 block w-3 h-3 rounded-full border-2 border-white bg-green-500" aria-label="Online"></span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-base flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{getUserDisplayName(user)}</span>
                          </TooltipTrigger>
                          <TooltipContent side="top">{user.email}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-xs text-gray-400">ID: {user.id.slice(0, 8)}...</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 align-middle">{getRoleBadge(user.systemRole)}</td>
              <td className="py-4 px-6 align-middle">{getStatusBadge(user.status)}</td>
              <td className="py-4 px-6 align-middle">
                <span className="text-base text-gray-700">—</span>
              </td>
              <td className="py-4 px-6 align-middle">
                <span className="text-base text-gray-700">
                  {user.created_at ? format(new Date(user.created_at), "MMM dd, yyyy") : "—"}
                </span>
              </td>
              <td className="py-4 px-6 align-middle">
                <span className="text-base text-gray-700">—</span>
              </td>
              <td className="py-4 px-6 align-middle">
                <UserActions
                  user={user}
                  onEditUser={onEditUser}
                  onChangePassword={onChangePassword}
                  onChangeAvatar={onChangeAvatar}
                />
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
