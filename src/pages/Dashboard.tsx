
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Open Work Orders",
      value: "12",
      change: "+2 from yesterday",
      color: "text-orange-600"
    },
    {
      title: "Low Stock Items",
      value: "7",
      change: "3 critical",
      color: "text-red-600"
    },
    {
      title: "Upcoming PM",
      value: "15",
      change: "Next 7 days",
      color: "text-blue-600"
    },
    {
      title: "Active Assets",
      value: "143",
      change: "All systems operational",
      color: "text-green-600"
    }
  ];

  const recentWorkOrders = [
    {
      id: "#5489",
      title: "Forklift - Hydraulics Non-Start",
      assignee: "Mary Kavanagh",
      status: "On Hold",
      priority: "High"
    },
    {
      id: "#5495",
      title: "Daily Site Walk",
      assignee: "Mary Kavanagh", 
      status: "Open",
      priority: "Medium"
    },
    {
      id: "#5488",
      title: "OSHA Compliance - Daily Site Walk",
      assignee: "Chris Manning",
      status: "On Hold",
      priority: "Medium"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Overview of your operations and recent activity</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Link to="/dashboard/work-orders/create">Create Work Order</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs ${stat.color} mt-1`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Work Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWorkOrders.map((wo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-600">{wo.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          wo.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {wo.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mt-1">{wo.title}</p>
                      <p className="text-xs text-gray-500">Assigned to {wo.assignee}</p>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      wo.status === 'On Hold' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {wo.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/dashboard/work-orders">
                  <Button variant="outline" className="w-full">
                    View All Work Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/dashboard/work-orders/create">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <span className="text-2xl">🔧</span>
                    <span>New Work Order</span>
                  </Button>
                </Link>
                <Link to="/dashboard/requests/create">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <span className="text-2xl">📝</span>
                    <span>New Request</span>
                  </Button>
                </Link>
                <Link to="/dashboard/purchase-orders/create">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <span className="text-2xl">💰</span>
                    <span>New PO</span>
                  </Button>
                </Link>
                <Link to="/dashboard/assets/create">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <span className="text-2xl">🏭</span>
                    <span>Add Asset</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
