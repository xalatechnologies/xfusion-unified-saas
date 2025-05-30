
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Crown, Zap, Building, Users, AlertTriangle } from "lucide-react";
import { useSubscriptions, useCreateSubscription } from "@/hooks/useBilling";
import { useOrganizationMembers } from "@/hooks/useOrganizations";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "per month",
    icon: Zap,
    maxUsers: 5,
    features: [
      "Up to 5 team members",
      "Up to 100 work orders per month",
      "Basic asset management",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$99",
    period: "per month",
    icon: Crown,
    maxUsers: 25,
    features: [
      "Up to 25 team members",
      "Unlimited work orders",
      "Advanced asset management",
      "Priority support",
      "Custom procedures",
      "Reporting & analytics",
      "API access",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$299",
    period: "per month",
    icon: Building,
    maxUsers: -1, // unlimited
    features: [
      "Unlimited team members",
      "Everything in Professional",
      "Advanced integrations",
      "Dedicated support",
      "Custom branding",
      "SSO authentication",
      "Advanced compliance",
    ],
  },
];

interface OrganizationSubscriptionProps {
  organizationId: string;
}

export const OrganizationSubscription = ({ organizationId }: OrganizationSubscriptionProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const { data: subscriptions, isLoading } = useSubscriptions(organizationId);
  const { data: members } = useOrganizationMembers(organizationId);
  const createSubscription = useCreateSubscription();
  
  const currentSubscription = subscriptions?.[0];
  const currentPlan = plans.find(p => p.id === currentSubscription?.plan_id);
  const memberCount = members?.length || 0;

  const handlePlanChange = async (planId: string) => {
    const selectedPlan = plans.find(p => p.id === planId);
    if (!selectedPlan) return;

    // Check if downgrading would exceed user limit
    if (selectedPlan.maxUsers !== -1 && memberCount > selectedPlan.maxUsers) {
      toast({
        title: "Cannot Downgrade",
        description: `You have ${memberCount} members, but the ${selectedPlan.name} plan only allows ${selectedPlan.maxUsers}. Please remove members first.`,
        variant: "destructive",
      });
      return;
    }

    try {
      await createSubscription.mutateAsync({
        organization_id: organizationId,
        plan_id: planId,
        plan_name: selectedPlan.name,
        price_monthly: parseFloat(selectedPlan.price.replace('$', '')),
        status: 'active',
        billing_cycle: 'monthly',
      });

      toast({
        title: "Plan Change Requested",
        description: `Your subscription will be updated to ${selectedPlan.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    }
  };

  const getButtonText = (plan: typeof plans[0]) => {
    if (!currentPlan) return "Select Plan";
    if (plan.id === currentPlan.id) return "Current Plan";
    
    const currentPlanIndex = plans.findIndex(p => p.id === currentPlan.id);
    const newPlanIndex = plans.findIndex(p => p.id === plan.id);
    
    if (newPlanIndex > currentPlanIndex) return "Upgrade";
    if (newPlanIndex < currentPlanIndex) return "Downgrade";
    return "Select Plan";
  };

  const canSelectPlan = (plan: typeof plans[0]) => {
    if (plan.id === currentPlan?.id) return false;
    if (plan.maxUsers !== -1 && memberCount > plan.maxUsers) return false;
    return true;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading subscription...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      {currentSubscription && currentPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-left">Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <currentPlan.icon className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{currentSubscription.plan_name}</h3>
                  <p className="text-gray-600">
                    Active since {new Date(currentSubscription.created_at || '').toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {memberCount} of {currentPlan.maxUsers === -1 ? 'unlimited' : currentPlan.maxUsers} members
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${currentSubscription.price_monthly || 0}
                </p>
                <p className="text-gray-600">per month</p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  {currentSubscription.status}
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button variant="outline">Manage Billing</Button>
              <Button variant="outline">Download Invoice</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Limit Warning */}
      {currentPlan && currentPlan.maxUsers !== -1 && memberCount >= currentPlan.maxUsers * 0.8 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-orange-900">Approaching User Limit</h4>
                <p className="text-xs text-orange-700 mt-1">
                  You're using {memberCount} of {currentPlan.maxUsers} available members. 
                  {memberCount >= currentPlan.maxUsers 
                    ? " You've reached your limit and cannot add more members."
                    : " Consider upgrading to add more team members."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.id === currentSubscription?.plan_id;
            const canSelect = canSelectPlan(plan);
            const buttonText = getButtonText(plan);
            const isOverLimit = plan.maxUsers !== -1 && memberCount > plan.maxUsers;
            
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${isCurrentPlan ? 'bg-blue-50 border-blue-200' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <Icon className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period.split(' ')[1]}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {plan.maxUsers === -1 ? 'Unlimited' : `Up to ${plan.maxUsers}`} members
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {isOverLimit && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-red-700 text-left">
                          You have {memberCount} members, but this plan only allows {plan.maxUsers}. 
                          Remove {memberCount - plan.maxUsers} member(s) to downgrade.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className={`w-full ${
                      isCurrentPlan 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                        : canSelect
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-600'
                    }`}
                    disabled={!canSelect || createSubscription.isPending}
                    onClick={() => canSelect && handlePlanChange(plan.id)}
                  >
                    {createSubscription.isPending ? 'Processing...' : buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
