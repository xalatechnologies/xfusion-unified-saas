import { DashboardLayout } from "@/apps/supplymantix/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Wrench, Package, Zap } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Open Work Orders",
      value: "12",
      change: "+2 from yesterday",
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      icon: Wrench,
      trend: "up"
    },
    {
      title: "Low Stock Items",
      value: "7",
      change: "3 critical",
      color: "text-red-700",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      iconBg: "bg-red-500",
      icon: AlertTriangle,
      trend: "down"
    },
    {
      title: "Upcoming PM",
      value: "15",
      change: "Next 7 days",
      color: "text-indigo-700",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-500",
      icon: Clock,
      trend: "up"
    },
    {
      title: "Active Assets",
      value: "143",
      change: "All systems operational",
      color: "text-emerald-700",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500",
      icon: CheckCircle2,
      trend: "stable"
    }
  ];

  const recentWorkOrders = [
    {
      id: "#5489",
      title: "Forklift - Hydraulics Non-Start",
      assignee: "Mary Kavanagh",
      status: "On Hold",
      priority: "High",
      dueDate: "Today",
      avatar: "MK"
    },
    {
      id: "#5495",
      title: "Daily Site Walk",
      assignee: "Mary Kavanagh", 
      status: "Open",
      priority: "Medium",
      dueDate: "Tomorrow",
      avatar: "MK"
    },
    {
      id: "#5488",
      title: "OSHA Compliance - Daily Site Walk",
      assignee: "Chris Manning",
      status: "On Hold",
      priority: "Medium",
      dueDate: "This Week",
      avatar: "CM"
    }
  ];

  const quickActions = [
    { title: "New Work Order", icon: "🔧", route: "/dashboard/work-orders/create", color: "bg-blue-500 hover:bg-blue-600" },
    { title: "New Request", icon: "📝", route: "/dashboard/requests/create", color: "bg-emerald-500 hover:bg-emerald-600" },
    { title: "New PO", icon: "💰", route: "/dashboard/purchase-orders/create", color: "bg-indigo-500 hover:bg-indigo-600" },
    { title: "Add Asset", icon: "🏭", route: "/dashboard/assets/create", color: "bg-slate-500 hover:bg-slate-600" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On Hold': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with consistent gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
              <p className="text-blue-100 text-lg">Here's what's happening with your operations today</p>
            </div>
            <div className="hidden md:block">
              <Button className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white transition-all duration-200">
                <Link to="/dashboard/work-orders/create">Create Work Order</Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
            <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Consistent Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute inset-0 ${stat.bgColor}`}></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg} shadow-sm`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-emerald-600" />}
                  {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-700 mb-2">{stat.title}</div>
                <p className={`text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Work Orders with consistent styling */}
          <Card className="lg:col-span-2 border border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">Recent Work Orders</CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {recentWorkOrders.length} active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {recentWorkOrders.map((wo, index) => (
                <div key={index} className="group p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-bold text-blue-700">{wo.id}</span>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(wo.priority)}`}></div>
                        <Badge className={`text-xs ${getStatusColor(wo.status)} border`}>
                          {wo.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {wo.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                            {wo.avatar}
                          </div>
                          <span>{wo.assignee}</span>
                        </div>
                        <span>•</span>
                        <span>Due {wo.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Link to="/dashboard/work-orders">
                  <Button variant="outline" className="w-full hover:bg-blue-50 hover:border-blue-300 border-slate-300">
                    View All Work Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions with consistent styling */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.route}>
                    <Button 
                      variant="outline" 
                      className="w-full h-16 flex items-center justify-start space-x-4 p-4 hover:shadow-sm transition-all duration-200 border-slate-300 hover:border-slate-400 group"
                    >
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">{action.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline with consistent styling */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { time: "2 minutes ago", action: "Work Order #5489 status changed to On Hold", user: "Mary Kavanagh", type: "warning" },
                { time: "15 minutes ago", action: "New purchase order created for hydraulic parts", user: "System", type: "info" },
                { time: "1 hour ago", action: "Asset inspection completed for Forklift Fleet #7", user: "Chris Manning", type: "success" },
                { time: "3 hours ago", action: "Low stock alert triggered for safety equipment", user: "System", type: "warning" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-emerald-500' : 
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900">{activity.action}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">by {activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
