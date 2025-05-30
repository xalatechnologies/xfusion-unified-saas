
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWorkOrders } from "@/hooks/useDatabase";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const WorkOrders = () => {
  const { data: workOrders, isLoading, error } = useWorkOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-700";
      case "on_hold": return "bg-orange-100 text-orange-700";
      case "in_progress": return "bg-yellow-100 text-yellow-700";
      case "completed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "on_hold": return "On Hold";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date";
    try {
      return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading work orders...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-red-600">Error Loading Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {error instanceof Error ? error.message : "Failed to load work orders. Please try again."}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Make sure you're authenticated and have the proper permissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
            <p className="text-gray-600">Manage and track maintenance work orders</p>
          </div>
          <Link to="/dashboard/work-orders/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Work Order
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Input
                placeholder="Search Work Orders..."
                className="max-w-sm"
              />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Assigned To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                + Add Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Orders List */}
        {!workOrders || workOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Work Orders Found</h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first work order.
              </p>
              <Link to="/dashboard/work-orders/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Work Order
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {workOrders.map((wo) => (
              <Card key={wo.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-lg font-semibold text-blue-600">
                          #{wo.id.slice(0, 8)}
                        </span>
                        <Badge className={getStatusColor(wo.status)}>
                          {formatStatus(wo.status)}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {wo.title}
                      </h3>
                      {wo.description && (
                        <p className="text-gray-600 mb-3">{wo.description}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Due Date:</span>
                          <p>{formatDate(wo.due_date)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Assigned To:</span>
                          <p>{wo.users?.email || "Unassigned"}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Asset:</span>
                          <p>{wo.assets?.name || "No asset specified"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination placeholder */}
        {workOrders && workOrders.length > 0 && (
          <div className="flex items-center justify-center py-4">
            <p className="text-gray-500">Showing {workOrders.length} work orders</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WorkOrders;
