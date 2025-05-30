
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const ModulePlaceholder = ({ title, description, icon, features }: ModulePlaceholderProps) => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">{description}</p>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                This module is currently under development. Here's what you can expect:
              </p>
              <ul className="text-left space-y-2 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Request Early Access
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
