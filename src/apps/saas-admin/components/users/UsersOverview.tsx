import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { DataTable } from "@/components/shared/Table/DataTable";
import { Badge } from "@/components/shared/Badge";
import { Search, Plus, Users, UserCheck, UserX, Clock } from "lucide-react";
import { format } from "date-fns";
import type { User } from "@/types/User";

export function UsersOverview() {
  const { data: users, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = Array.isArray(users)
    ? (users as User[]).filter((user) =>
        user && typeof user.email === 'string' && user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Users</h3>
        </div>
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

  const totalUsers = Array.isArray(users) ? users.length : 0;
  const recentUsers = Array.isArray(users)
    ? (users as User[]).filter((user) => {
        if (!user.created_at) return false;
        const createdDate = new Date(user.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdDate > weekAgo;
      }).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Users</h3>
          <p className="text-sm text-gray-600">Manage all users across organizations</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New This Week</p>
                <p className="text-2xl font-bold text-gray-900">{recentUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserX className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive Users</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={
              <tr>
                <th>Email</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th className="w-[70px]">Actions</th>
              </tr>
            }
          >
            {filteredUsers
              .filter((user) => user && user.id && user.email && user.created_at)
              .map((user: User) => (
                <tr key={user.id}>
                  <td className="font-medium">{user.email}</td>
                  <td>-</td>
                  <td>
                    <Badge variant="default">Active</Badge>
                  </td>
                  <td>{format(new Date(user.created_at!), 'MMM dd, yyyy')}</td>
                  <td>-</td>
                  <td>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </DataTable>
        </CardContent>
      </Card>
    </div>
  );
}
