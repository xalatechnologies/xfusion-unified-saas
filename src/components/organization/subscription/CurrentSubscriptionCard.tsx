
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { subscriptionPlans } from "./subscriptionPlans";

interface CurrentSubscriptionCardProps {
  subscription: any;
  memberCount: number;
}

export const CurrentSubscriptionCard = ({ subscription, memberCount }: CurrentSubscriptionCardProps) => {
  const currentPlan = subscriptionPlans.find(p => p.id === subscription.plan_id);
  
  if (!currentPlan) return null;

  const Icon = currentPlan.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Current Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">{subscription.plan_name}</h3>
              <p className="text-gray-600">
                Active since {new Date(subscription.created_at || '').toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {memberCount} of {subscription.max_users === -1 ? 'unlimited' : subscription.max_users} members
                </span>
              </div>
              {subscription.current_period_end && (
                <p className="text-xs text-gray-500 mt-1">
                  Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              ${subscription.price_monthly || 0}
            </p>
            <p className="text-gray-600">per month</p>
            <Badge className={`mt-1 ${
              subscription.status === 'active' ? 'bg-green-100 text-green-800' :
              subscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {subscription.status}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button variant="outline">Manage Billing</Button>
          <Button variant="outline">Download Invoice</Button>
        </div>
      </CardContent>
    </Card>
  );
};
