import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { DataTable } from "@/components/shared/Table/DataTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, TrendingUp, DollarSign, Calendar, Package, Plus, MoreHorizontal } from "lucide-react";

export default function SaasSubscriptions() {
  // Mock data - replace with real data
  const subscriptionStats = {
    totalRevenue: 485600,
    activeSubscriptions: 342,
    churnRate: 2.4,
    avgRevenue: 1420
  };

  const subscriptions = [
    { id: 1, org: "Acme Corp", plan: "Enterprise", status: "active", mrr: 2999, nextBilling: "2024-02-15", users: 50 },
    { id: 2, org: "TechCorp", plan: "Professional", status: "active", mrr: 999, nextBilling: "2024-02-12", users: 25 },
    { id: 3, org: "Startup Inc", plan: "Basic", status: "trial", mrr: 0, nextBilling: "2024-02-10", users: 5 },
  ];

  return (
    <SaasAdminLayout>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <PageHeader
          icon={CreditCard}
          title="Subscription Management"
          subtitle="Monitor subscription plans, billing cycles, and revenue metrics"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />

        {/* Revenue Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Total MRR</p>
                  <p className="text-3xl font-bold text-gray-900">${subscriptionStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-gray-900">{subscriptionStats.activeSubscriptions}</p>
                  <p className="text-sm text-blue-600 mt-1">+8 this month</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Average Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${subscriptionStats.avgRevenue}</p>
                  <p className="text-sm text-purple-600 mt-1">per customer</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{subscriptionStats.churnRate}%</p>
                  <p className="text-sm text-orange-600 mt-1">monthly</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Plans Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-lg text-left">Basic Plan</CardTitle>
              <CardDescription className="text-left">Perfect for small teams getting started</CardDescription>
              <div className="text-3xl font-bold text-blue-600 text-left">$29/mo</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Subscriptions:</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="font-medium text-green-600">$2,581</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-lg text-left">Professional Plan</CardTitle>
              <CardDescription className="text-left">Advanced features for growing businesses</CardDescription>
              <div className="text-3xl font-bold text-purple-600 text-left">$99/mo</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Subscriptions:</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="font-medium text-green-600">$15,444</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-lg text-left">Enterprise Plan</CardTitle>
              <CardDescription className="text-left">Full-featured solution for large organizations</CardDescription>
              <div className="text-3xl font-bold text-orange-600 text-left">$299/mo</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Subscriptions:</span>
                  <span className="font-medium">97</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Revenue:</span>
                  <span className="font-medium text-green-600">$29,003</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Subscriptions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-xl text-left">Active Subscriptions</CardTitle>
                <CardDescription className="text-left">
                  Monitor all subscription details, billing cycles, and customer information
                </CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Subscription
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Organization</TableHead>
                    <TableHead className="text-left">Plan</TableHead>
                    <TableHead className="text-left">Status</TableHead>
                    <TableHead className="text-left">MRR</TableHead>
                    <TableHead className="text-left">Users</TableHead>
                    <TableHead className="text-left">Next Billing</TableHead>
                    <TableHead className="w-[70px] text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium text-left">{sub.org}</TableCell>
                      <TableCell className="text-left">
                        <Badge variant="outline">{sub.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge 
                          variant={sub.status === 'active' ? 'default' : 'secondary'}
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-600 text-left">
                        ${sub.mrr > 0 ? sub.mrr.toLocaleString() : '0'}
                      </TableCell>
                      <TableCell className="text-left">{sub.users}</TableCell>
                      <TableCell className="text-sm text-gray-500 text-left">{sub.nextBilling}</TableCell>
                      <TableCell className="text-left">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SaasAdminLayout>
  );
}
