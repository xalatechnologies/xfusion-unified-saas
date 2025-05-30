import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Crown, Zap, Building } from "lucide-react";
import { useSubscriptions, useCreateSubscription } from "@/hooks/useBilling";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "per month",
    icon: Zap,
    features: [
      "Up to 10 work orders per month",
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
    features: [
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
    features: [
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
  const createSubscription = useCreateSubscription();
  
  const currentSubscription = subscriptions?.[0]; // Get the active subscription

  const handleUpgrade = async (planId: string) => {
    const selectedPlan = plans.find(p => p.id === planId);
    if (!selectedPlan) return;

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
      {currentSubscription && (
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">{currentSubscription.plan_name}</h3>
                  <p className="text-gray-600">
                    Active since {new Date(currentSubscription.created_at || '').toLocaleDateString()}
                  </p>
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

      <div>
        <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.id === currentSubscription?.plan_id;
            
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
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
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${isCurrentPlan ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={isCurrentPlan || createSubscription.isPending}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {isCurrentPlan ? 'Current Plan' : createSubscription.isPending ? 'Processing...' : 'Upgrade'}
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
