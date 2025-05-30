
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, AlertTriangle } from "lucide-react";
import { subscriptionPlans } from "./subscriptionPlans";

interface SubscriptionPlanCardProps {
  plan: typeof subscriptionPlans[0];
  currentPlan?: typeof subscriptionPlans[0];
  memberCount: number;
  isLoading: boolean;
  onPlanSelect: (planId: string) => void;
}

export const SubscriptionPlanCard = ({ 
  plan, 
  currentPlan, 
  memberCount, 
  isLoading, 
  onPlanSelect 
}: SubscriptionPlanCardProps) => {
  const Icon = plan.icon;
  const isCurrentPlan = plan.id === currentPlan?.id;
  const isOverLimit = plan.maxUsers !== -1 && memberCount > plan.maxUsers;
  const canSelect = !isCurrentPlan && !isOverLimit;
  
  const getButtonText = () => {
    if (isCurrentPlan) return "Current Plan";
    if (!currentPlan) return "Select Plan";
    
    const currentPlanIndex = subscriptionPlans.findIndex(p => p.id === currentPlan.id);
    const newPlanIndex = subscriptionPlans.findIndex(p => p.id === plan.id);
    
    if (newPlanIndex > currentPlanIndex) return "Upgrade";
    if (newPlanIndex < currentPlanIndex) return "Downgrade";
    return "Select Plan";
  };

  return (
    <Card className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${isCurrentPlan ? 'bg-blue-50 border-blue-200' : ''}`}>
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
          disabled={!canSelect || isLoading}
          onClick={() => canSelect && onPlanSelect(plan.id)}
        >
          {isLoading ? 'Processing...' : getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};
