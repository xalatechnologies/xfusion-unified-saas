
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Crown, Building } from "lucide-react";
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits";

interface SubscriptionInfoCardProps {
  organizationId: string;
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

export const SubscriptionInfoCard = ({ organizationId }: SubscriptionInfoCardProps) => {
  const { 
    memberCount, 
    maxUsers, 
    currentPlan, 
    currentSubscription,
    isAtLimit,
    remainingSlots 
  } = useSubscriptionLimits(organizationId);

  if (!currentSubscription) {
    return null;
  }

  const Icon = getIconForPlan(currentSubscription?.subscriptions?.plan_id || 'basic');

  return (
    <Card className="shadow-sm border-0 bg-blue-50/50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-left">
          <div className="flex items-center space-x-3 text-left">
            <Icon className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900 text-left">{currentPlan} Plan</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 text-left">
                <Users className="w-4 h-4" />
                <span>
                  {memberCount} of {maxUsers === -1 ? 'unlimited' : maxUsers} members
                </span>
                {!isAtLimit && maxUsers !== -1 && (
                  <Badge variant="secondary" className="text-xs">
                    {remainingSlots} slots remaining
                  </Badge>
                )}
                {isAtLimit && (
                  <Badge variant="destructive" className="text-xs">
                    At member limit
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${
              currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
              currentSubscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {currentSubscription.status || 'Unknown'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
