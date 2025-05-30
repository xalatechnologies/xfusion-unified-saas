
import { subscriptionPlans } from "./subscriptionPlans";
import { SubscriptionPlanCard } from "./SubscriptionPlanCard";

interface SubscriptionPlansGridProps {
  currentSubscription?: any;
  memberCount: number;
  isLoading: boolean;
  onPlanSelect: (planId: string) => void;
}

export const SubscriptionPlansGrid = ({ 
  currentSubscription, 
  memberCount, 
  isLoading, 
  onPlanSelect 
}: SubscriptionPlansGridProps) => {
  const currentPlan = subscriptionPlans.find(p => p.id === currentSubscription?.plan_id);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            currentPlan={currentPlan}
            memberCount={memberCount}
            isLoading={isLoading}
            onPlanSelect={onPlanSelect}
          />
        ))}
      </div>
    </div>
  );
};
