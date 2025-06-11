import { SaasAdminLayout } from "@/apps/saas-admin/layout/SaasAdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { DataTable } from "@/components/shared/Table/DataTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Receipt, AlertCircle, CheckCircle, Clock, Download, MoreHorizontal } from "lucide-react";

export default function SaasBilling() {
  // Mock data - replace with real data
  const billingStats = {
    totalRevenue: 125400,
    pendingInvoices: 15,
    overdueAmount: 8500,
    collectionRate: 96.8
  };

  const recentInvoices = [
    { id: "INV-001", org: "Acme Corp", amount: 2999, status: "paid", dueDate: "2024-01-15", paidDate: "2024-01-14" },
    { id: "INV-002", org: "TechCorp", amount: 999, status: "pending", dueDate: "2024-02-15", paidDate: null },
    { id: "INV-003", org: "Startup Inc", amount: 299, status: "overdue", dueDate: "2024-01-10", paidDate: null },
  ];

  return (
    <SaasAdminLayout>
      <div className="w-full space-y-8">
        {/* Page Header */}
        <PageHeader
          icon={Receipt}
          title="Billing & Payments"
          subtitle="Manage invoicing, payment tracking, and financial reconciliation"
          titleClassName="text-3xl font-bold text-gray-900 text-left"
          subtitleClassName="text-gray-600 mt-1 text-left"
        />

        {/* Billing Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${billingStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">This month</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card variant="orange">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                  <p className="text-3xl font-bold text-gray-900">{billingStats.pendingInvoices}</p>
                  <p className="text-sm text-orange-600 mt-1">Awaiting payment</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card variant="red">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                  <p className="text-3xl font-bold text-gray-900">${billingStats.overdueAmount.toLocaleString()}</p>
                  <p className="text-sm text-red-600 mt-1">Requires attention</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card variant="blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{billingStats.collectionRate}%</p>
                  <p className="text-sm text-blue-600 mt-1">Success rate</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods & Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Payment Configuration</CardTitle>
              <CardDescription className="text-left">Manage payment gateways and billing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Stripe</p>
                    <p className="text-sm text-gray-500">Primary payment processor</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-gray-500">Alternative payment method</p>
                  </div>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-left">Billing Automation</CardTitle>
              <CardDescription className="text-left">Configure automated billing and reminder settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Auto-invoice generation</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment reminders</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Failed payment retry</span>
                  <Badge variant="default">3 attempts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dunning management</span>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-xl text-left">Recent Invoices</CardTitle>
                <CardDescription className="text-left">
                  Track payment status and manage billing for all customers
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Invoice
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Invoice ID</TableHead>
                    <TableHead className="text-left">Organization</TableHead>
                    <TableHead className="text-left">Amount</TableHead>
                    <TableHead className="text-left">Status</TableHead>
                    <TableHead className="text-left">Due Date</TableHead>
                    <TableHead className="text-left">Paid Date</TableHead>
                    <TableHead className="w-[70px] text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-sm text-left">{invoice.id}</TableCell>
                      <TableCell className="font-medium text-left">{invoice.org}</TableCell>
                      <TableCell className="font-medium text-left">${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-left">
                        <Badge 
                          variant={
                            invoice.status === 'paid' ? 'default' : 
                            invoice.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 text-left">{invoice.dueDate}</TableCell>
                      <TableCell className="text-sm text-gray-500 text-left">
                        {invoice.paidDate || '-'}
                      </TableCell>
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
