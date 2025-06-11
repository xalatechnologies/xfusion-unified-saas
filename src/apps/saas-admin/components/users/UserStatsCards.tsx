import { Card, CardContent } from "@/components/shared/Card";
import type { User } from "@/types/User";
import { Users, UserCheck, UserX, Clock, Shield, AlertTriangle } from "lucide-react";

interface UserStatsCardsProps {
  users: User[];
}

export function UserStatsCards({ users }: UserStatsCardsProps) {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length || totalUsers; // Mock data
  const inactiveUsers = users.filter(u => u.status === 'inactive').length || 0;
  
  // Calculate recent users (last 7 days)
  const recentUsers = users.filter(user => {
    const createdDate = new Date(user.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate > weekAgo;
  }).length;

  const superAdmins = Math.floor(totalUsers * 0.05); // Mock: ~5% super admins
  const pendingUsers = Math.floor(totalUsers * 0.1); // Mock: ~10% pending

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-l-blue-500"
    },
    {
      title: "Active Users",
      value: activeUsers.toLocaleString(),
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-l-green-500"
    },
    {
      title: "New This Week",
      value: recentUsers.toString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-l-orange-500"
    },
    {
      title: "Super Admins",
      value: superAdmins.toString(),
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-l-purple-500"
    },
    {
      title: "Pending Approval",
      value: pendingUsers.toString(),
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-l-yellow-500"
    },
    {
      title: "Inactive Users",
      value: inactiveUsers.toString(),
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-l-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={`border-l-4 ${stat.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
