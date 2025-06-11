import React from "react";
import type { Subscription } from "@/types/Subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Zap, Building } from "lucide-react";

interface CurrentSubscriptionCardProps {
  orgSubscription: Subscription;
  memberCount: number;
}

const getIconForPlan = (planId: string) => {
  switch (planId) {
    case 'basic':
      return Zap;
    case 'professional':
      return Crown;
    case 'enterprise':
      return Building;
    default:
      return Zap;
  }
};

export const CurrentSubscriptionCard = ({ orgSubscription, memberCount }: CurrentSubscriptionCardProps) => {
  // Add null checks for subscription data
  if (!orgSubscription || !orgSubscription.subscriptions) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No subscription information available
          </div>
        </CardContent>
      </Card>
    );
  }

  const subscription = orgSubscription.subscriptions;
  const Icon = getIconForPlan(subscription?.plan_id || 'basic');

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
              <h3 className="font-semibold text-lg">{subscription?.plan_name || 'Unknown Plan'}</h3>
              <p className="text-gray-600">
                Active since {orgSubscription.created_at ? new Date(orgSubscription.created_at).toLocaleDateString() : 'Unknown'}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {memberCount} of {subscription?.max_users === -1 ? 'unlimited' : subscription?.max_users || 0} members
                </span>
              </div>
              {orgSubscription.current_period_end && (
                <p className="text-xs text-gray-500 mt-1">
                  Next billing: {new Date(orgSubscription.current_period_end).toLocaleDateString()}
                </p>
              )}
              {orgSubscription.trial_end && orgSubscription.status === 'trialing' && (
                <p className="text-xs text-orange-600 mt-1">
                  Trial ends: {new Date(orgSubscription.trial_end).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              ${subscription?.price_monthly || 0}
            </p>
            <p className="text-gray-600">per month</p>
            <Badge className={`mt-1 ${
              orgSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
              orgSubscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {orgSubscription.status || 'Unknown'}
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
