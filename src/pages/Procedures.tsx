
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Procedures = () => {
  const procedures = [
    {
      id: 1,
      title: "Compressor Daily Inspection",
      category: "Inspection",
      fields: "3 fields",
      icon: "🔧"
    },
    {
      id: 2, 
      title: "Compressor Monthly Inspection",
      category: "Inspection", 
      fields: "6 fields",
      icon: "🔧"
    },
    {
      id: 3,
      title: "Compressor Quarterly Maintenance",
      category: "Inspection",
      fields: "11 fields", 
      icon: "🔧"
    },
    {
      id: 4,
      title: "Compressor Weekly Maintenance", 
      category: "Inspection",
      fields: "7 fields",
      icon: "🔧"
    },
    {
      id: 5,
      title: "Daily Scale Calibration",
      category: "Calibration",
      fields: "4 fields",
      icon: "⚖️"
    },
    {
      id: 6,
      title: "Daily Site Safety Walk Inspection",
      category: "Safety",
      fields: "5 fields", 
      icon: "👷"
    },
    {
      id: 7,
      title: "Forklift Daily Inspection",
      category: "Safety",
      fields: "8 fields",
      icon: "🚛" 
    },
    {
      id: 8,
      title: "Forklift Malfunction",
      category: "Reactive Maintenance",
      fields: "1 field",
      icon: "🚛"
    },
    {
      id: 9,
      title: "Forklift Monthly Inspection", 
      category: "Safety",
      fields: "10 fields",
      icon: "🚛"
    },
    {
      id: 10,
      title: "Forklift Quarterly Maintenance",
      category: "Safety", 
      fields: "7 fields",
      icon: "🚛"
    },
    {
      id: 11,
      title: "Forklift Weekly Maintenance",
      category: "Safety",
      fields: "5 fields",
      icon: "🚛"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Inspection": return "bg-blue-100 text-blue-700";
      case "Safety": return "bg-green-100 text-green-700";
      case "Calibration": return "bg-purple-100 text-purple-700";
      case "Reactive Maintenance": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Procedure Library</h1>
            <p className="text-gray-600">Manage standardized procedures and checklists</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              Import Templates
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Procedure
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Input
                placeholder="Search Procedure Templates..."
                className="max-w-sm"
              />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="calibration">Calibration</SelectItem>
                  <SelectItem value="reactive">Reactive Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  <SelectItem value="compressor">Compressor</SelectItem>
                  <SelectItem value="forklift">Forklift</SelectItem>
                  <SelectItem value="scales">Scales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Templates Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((procedure) => (
              <Card key={procedure.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{procedure.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {procedure.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(procedure.category)}>
                          {procedure.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{procedure.fields}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      •••
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Procedure Detail */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🔧</span>
              <span>Compressor Daily Inspection</span>
              <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-blue-700">
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Fields</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safety Reminder</span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="text-green-600">Yes</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">No</Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">N/A</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Visual Inspection</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>☐ Check belt guards and covers are securely in place</p>
                  <p>☐ Release ambient pressure</p>
                  <p>☐ Check for air leaks</p>
                  <p>☐ Check for frayed wires and loose connections</p>
                  <p>☐ Ensure belt guards and covers are securely in place</p>
                  <p>☐ Ensure compressor and receiver to 50 psi</p>
                  <p>☐ Leaks or other issues?</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Overall Inspection</h4>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-green-600">Pass</Button>
                  <Button variant="ghost" size="sm" className="text-yellow-600">Fail</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">Fail</Button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Procedure
              </Button>
              <Button variant="outline">
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Procedures;
