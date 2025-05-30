
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const WorkOrders = () => {
  const workOrders = [
    {
      id: "#5489",
      title: "Forklift - Hydraulics Non-Start",
      description: "Forklift will turn on, but hydraulics are unresponsive",
      assignee: "Mary Kavanagh",
      status: "On Hold",
      priority: "High",
      dueDate: "Today by 1:30 PM",
      asset: "Forklift Fleet #7 - GP15-35ICN - Compact LPG",
      location: "General"
    },
    {
      id: "#5495", 
      title: "Daily Site Walk",
      description: "Daily safety inspection and maintenance check",
      assignee: "Mary Kavanagh",
      status: "Open", 
      priority: "Medium",
      dueDate: "Tomorrow",
      asset: "General Facility",
      location: "Site Wide"
    },
    {
      id: "#5488",
      title: "OSHA Compliance - Daily Site Walk", 
      description: "Regulatory compliance inspection",
      assignee: "Chris Manning",
      status: "On Hold",
      priority: "Medium", 
      dueDate: "This Week",
      asset: "Safety Equipment",
      location: "All Areas"
    },
    {
      id: "#5486",
      title: "Compressor Inspection",
      description: "Quarterly maintenance inspection",
      assignee: "Dylan Manning", 
      status: "In Progress",
      priority: "Medium",
      dueDate: "Next Week",
      asset: "Air Compressor Unit 1",
      location: "Maintenance Bay"
    },
    {
      id: "#5485",
      title: "Wrapper Cleaning",
      description: "Deep cleaning of packaging equipment",
      assignee: "Dylan Manning",
      status: "In Progress", 
      priority: "Low",
      dueDate: "Next Month",
      asset: "Packaging Line 2",
      location: "Production Floor"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-700";
      case "On Hold": return "bg-orange-100 text-orange-700";
      case "In Progress": return "bg-yellow-100 text-yellow-700";
      case "Done": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

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
                  <SelectItem value="mary">Mary Kavanagh</SelectItem>
                  <SelectItem value="chris">Chris Manning</SelectItem>
                  <SelectItem value="dylan">Dylan Manning</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="hold">On Hold</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                + Add Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Orders List */}
        <div className="space-y-4">
          {workOrders.map((wo, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg font-semibold text-blue-600">{wo.id}</span>
                      <Badge className={getPriorityColor(wo.priority)}>
                        {wo.priority}
                      </Badge>
                      <Badge className={getStatusColor(wo.status)}>
                        {wo.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {wo.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{wo.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-500">Due Date:</span>
                        <p>{wo.dueDate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Assigned To:</span>
                        <p>{wo.assignee}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Asset:</span>
                        <p>{wo.asset}</p>
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

        {/* Pagination placeholder */}
        <div className="flex items-center justify-center py-4">
          <p className="text-gray-500">Showing 5 of 22 work orders</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkOrders;
