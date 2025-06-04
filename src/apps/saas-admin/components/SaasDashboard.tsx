
import { useLanguage } from "@/contexts/LanguageContext";
import { useOrganizations } from "@/hooks/useOrganizations";
import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, CreditCard, TrendingUp, Activity, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for charts - replace with real data later
const revenueData = [
  { month: "Jan", revenue: 8400, subscriptions: 20 },
  { month: "Feb", revenue: 9200, subscriptions: 23 },
  { month: "Mar", revenue: 11800, subscriptions: 28 },
  { month: "Apr", revenue: 12400, subscriptions: 31 },
  { month: "May", revenue: 14200, subscriptions: 35 },
  { month: "Jun", revenue: 15600, subscriptions: 38 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "#10b981",
  },
};

export function SaasDashboard() {
  const { t } = useLanguage();
  const { data: organizations, isLoading: orgsLoading } = useOrganizations();
  const { data: users, isLoading: usersLoading } = useUsers();

  const totalOrgs = organizations?.length || 0;
  const totalUsers = users?.length || 0;
  const activeSubscriptions = 45; // Mock data
  const monthlyRevenue = 15600; // Mock data

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="pb-4">
        <PageHeader
          icon={Activity}
          title="SAAS Analytics Dashboard"
          subtitle="Monitor your platform's performance and growth metrics"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Total Organizations</p>
                <p className="text-3xl font-bold text-gray-900">{totalOrgs}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-gray-900">{activeSubscriptions}</p>
                <p className="text-xs text-green-600 mt-1">+15% from last month</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+22% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <TrendingUp className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={chartConfig.revenue.color}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Subscription Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <CreditCard className="w-5 h-5" />
              Subscription Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="subscriptions" 
                    fill={chartConfig.subscriptions.color}
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
          <CardTitle className="text-left">Recent Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-left">New organization registered</p>
                  <p className="text-sm text-gray-600 text-left">Acme Corp joined the platform</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <CreditCard className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-left">Subscription upgraded</p>
                  <p className="text-sm text-gray-600 text-left">TechStart Inc upgraded to Enterprise plan</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 text-left">
                <Users className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <p className="font-medium text-left">Bulk user invite</p>
                  <p className="text-sm text-gray-600 text-left">Global Solutions invited 15 new users</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
