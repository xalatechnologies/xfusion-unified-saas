import { useState } from "react";
import { useSubscriptionTemplates } from "@/hooks/useBilling";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from "@/components/shared/Table/DataTable";
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Package, DollarSign, TrendingUp, Calendar } from "lucide-react";

export function SubscriptionsOverview() {
  const { data: subscriptionTemplates, isLoading } = useSubscriptionTemplates();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = subscriptionTemplates?.filter(template =>
    template.plan_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Subscriptions</h3>
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

  const totalPlans = subscriptionTemplates?.length || 0;
  const avgMonthlyPrice = subscriptionTemplates?.reduce((sum, plan) => sum + (plan.price_monthly || 0), 0) / (totalPlans || 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Subscription Plans</h3>
          <p className="text-sm text-gray-600">Manage subscription templates and pricing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{totalPlans}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Monthly Price</p>
                <p className="text-2xl font-bold text-gray-900">${avgMonthlyPrice.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
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
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={
              <tr>
                <th>Plan Name</th>
                <th>Monthly Price</th>
                <th>Yearly Price</th>
                <th>Max Users</th>
                <th>Status</th>
                <th className="w-[70px]">Actions</th>
              </tr>
            }
          >
            {filteredTemplates.map((plan) => (
              <tr key={plan.id}>
                <td className="font-medium">{plan.plan_name}</td>
                <td>${plan.price_monthly || 0}</td>
                <td>${plan.price_yearly || 0}</td>
                <td>{plan.max_users === -1 ? 'Unlimited' : plan.max_users}</td>
                <td>
                  <Badge variant={plan.status === 'template' ? 'default' : 'secondary'}>
                    {plan.status}
                  </Badge>
                </td>
                <td>
                  <Button variant="ghost" size="sm">
                    Edit
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
