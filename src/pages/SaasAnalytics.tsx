
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Download, Calendar, Target } from "lucide-react";

export default function SaasAnalytics() {
  // Mock data - replace with real analytics data
  const analyticsData = {
    totalUsers: 2847,
    activeUsers: 2134,
    revenue: 485600,
    growth: 18.2,
    conversionRate: 3.4,
    churnRate: 2.1
  };

  return (
    <SaasAdminLayout>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <PageHeader
          icon={BarChart3}
          title="Advanced Analytics"
          subtitle="Deep dive into platform metrics, user behavior, and business performance"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${analyticsData.revenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{analyticsData.growth}%</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
                  <div className="flex items-center mt-1">
                    <Target className="w-4 h-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">Target: 4%</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.churnRate}%</p>
                  <div className="flex items-center mt-1">
                    <Activity className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-sm text-orange-600">Monthly</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Revenue Trends</CardTitle>
              <CardDescription className="text-left">Monthly recurring revenue and growth patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue Chart Placeholder</p>
                  <p className="text-sm text-gray-400">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">User Growth</CardTitle>
              <CardDescription className="text-left">User acquisition and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">User Growth Chart Placeholder</p>
                  <p className="text-sm text-gray-400">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Feature Usage</CardTitle>
              <CardDescription className="text-left">Most popular platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Work Orders</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Inventory</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">72%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Procedures</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Procurement</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Geographic Distribution</CardTitle>
              <CardDescription className="text-left">Users by region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">North America</span>
                <Badge variant="outline">45%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Europe</span>
                <Badge variant="outline">32%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Asia Pacific</span>
                <Badge variant="outline">18%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Other</span>
                <Badge variant="outline">5%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Performance Metrics</CardTitle>
              <CardDescription className="text-left">System health indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-green-700">Uptime</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">245ms</div>
                <div className="text-sm text-blue-700">Avg Response</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                <div className="text-sm text-purple-700">User Satisfaction</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-xl text-left">Generate Reports</CardTitle>
                <CardDescription className="text-left">
                  Export detailed analytics reports for stakeholders and compliance
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-dashed">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Usage Report</p>
                  <p className="text-sm text-gray-500">Platform usage analytics</p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">Revenue Report</p>
                  <p className="text-sm text-gray-500">Financial performance data</p>
                </CardContent>
              </Card>
              
              <Card className="border-dashed">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium">User Report</p>
                  <p className="text-sm text-gray-500">User behavior insights</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </SaasAdminLayout>
  );
}
