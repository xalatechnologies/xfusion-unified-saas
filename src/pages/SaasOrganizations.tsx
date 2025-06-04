
import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Users, CreditCard, Calendar, Search, Plus, MoreHorizontal, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function SaasOrganizations() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with real data
  const organizationStats = {
    total: 156,
    active: 142,
    trial: 14,
    conversionRate: 91.0
  };

  const organizations = [
    { id: 1, name: "Acme Corporation", email: "admin@acme.com", plan: "Enterprise", status: "active", users: 50, created: "2024-01-15", revenue: 2999 },
    { id: 2, name: "TechCorp Solutions", email: "contact@techcorp.com", plan: "Professional", status: "active", users: 25, created: "2024-01-10", revenue: 999 },
    { id: 3, name: "Startup Innovations", email: "hello@startup.io", plan: "Basic", status: "trial", users: 5, created: "2024-02-01", revenue: 0 },
    { id: 4, name: "Global Enterprises", email: "info@global.com", plan: "Enterprise", status: "active", users: 75, created: "2023-12-20", revenue: 2999 },
  ];

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SaasAdminLayout>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <PageHeader
          icon={Building2}
          title="Organization Management"
          subtitle="Monitor and manage all organizations across your platform"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Total Organizations</p>
                  <p className="text-3xl font-bold text-gray-900">{organizationStats.total}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-gray-900">{organizationStats.active}</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Trial Organizations</p>
                  <p className="text-3xl font-bold text-gray-900">{organizationStats.trial}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{organizationStats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Plans Overview */}
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
                  <span>Active Organizations:</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Trial Organizations:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Users:</span>
                  <span className="font-medium">5-10</span>
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
                  <span>Active Organizations:</span>
                  <span className="font-medium">67</span>
                </div>
                <div className="flex justify-between">
                  <span>Trial Organizations:</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Users:</span>
                  <span className="font-medium">15-30</span>
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
                  <span>Active Organizations:</span>
                  <span className="font-medium">52</span>
                </div>
                <div className="flex justify-between">
                  <span>Trial Organizations:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Users:</span>
                  <span className="font-medium">50+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organizations Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-xl text-left">All Organizations</CardTitle>
                <CardDescription className="text-left">
                  Manage organizations, their subscriptions, and member access
                </CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Organization
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search organizations by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Organizations Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Organization</TableHead>
                    <TableHead className="text-left">Plan</TableHead>
                    <TableHead className="text-left">Status</TableHead>
                    <TableHead className="text-left">Users</TableHead>
                    <TableHead className="text-left">Revenue</TableHead>
                    <TableHead className="text-left">Created</TableHead>
                    <TableHead className="w-[70px] text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="text-left">
                        <div>
                          <div className="font-medium text-gray-900">{org.name}</div>
                          <div className="text-sm text-gray-500">{org.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge variant="outline">{org.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge 
                          variant={org.status === 'active' ? 'default' : 'secondary'}
                        >
                          {org.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{org.users}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-green-600 text-left">
                        ${org.revenue > 0 ? org.revenue.toLocaleString() : '0'}/mo
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 text-left">{org.created}</TableCell>
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
