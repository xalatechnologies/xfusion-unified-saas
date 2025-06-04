
import { useOrganizations, useOrganizationMembers } from "@/hooks/useOrganizations";
import { useOrganizationSubscription } from "@/hooks/useBilling";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, TrendingUp, Activity, UserCheck, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock data for charts - replace with real data later
const activityData = [
  { month: "Jan", users: 12, workOrders: 45 },
  { month: "Feb", users: 15, workOrders: 52 },
  { month: "Mar", users: 18, workOrders: 61 },
  { month: "Apr", users: 22, workOrders: 58 },
  { month: "May", users: 25, workOrders: 67 },
  { month: "Jun", users: 28, workOrders: 73 },
];

const chartConfig = {
  users: {
    label: "Active Users",
    color: "#3b82f6",
  },
  workOrders: {
    label: "Work Orders",
    color: "#10b981",
  },
};

interface OrganizationDashboardProps {
  organizationId: string;
}

export function OrganizationDashboard({ organizationId }: OrganizationDashboardProps) {
  const { data: organizations } = useOrganizations();
  const { data: members } = useOrganizationMembers(organizationId);
  const { data: subscription } = useOrganizationSubscription(organizationId);

  const currentOrganization = organizations?.find(org => org.id === organizationId);
  const totalMembers = members?.length || 0;
  const activeMembers = members?.filter(m => m.status === 'active').length || 0;
  const pendingInvites = members?.filter(m => m.status === 'pending').length || 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="pb-4">
        <PageHeader
          icon={Activity}
          title="Organization Dashboard"
          subtitle={`Welcome back! Here's what's happening with ${currentOrganization?.name || 'your organization'}`}
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{totalMembers}</p>
                <p className="text-xs text-green-600 mt-1">
                  {activeMembers} active
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{activeMembers}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Online this week
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                <p className="text-3xl font-bold text-gray-900">{pendingInvites}</p>
                <p className="text-xs text-orange-600 mt-1">
                  Awaiting response
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Current Plan</p>
                <p className="text-xl font-bold text-gray-900">
                  {subscription?.subscriptions?.plan_name || 'Free'}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Active subscription
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <TrendingUp className="w-5 h-5" />
              Activity Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke={chartConfig.users.color}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Work Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Activity className="w-5 h-5" />
              Work Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="workOrders" 
                    fill={chartConfig.workOrders.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <Users className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-left">New member joined</p>
                  <p className="text-sm text-gray-600 text-left">John Doe accepted the invitation</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <CreditCard className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-left">Subscription renewed</p>
                  <p className="text-sm text-gray-600 text-left">Monthly plan auto-renewed successfully</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium text-left">Invitation pending</p>
                  <p className="text-sm text-gray-600 text-left">jane@company.com hasn't responded yet</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
