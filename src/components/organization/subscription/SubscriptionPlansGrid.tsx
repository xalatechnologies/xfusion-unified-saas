
import { SubscriptionPlanCard } from "./SubscriptionPlanCard";
import { useSubscriptionTemplates } from "@/hooks/useBilling";

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
  const { data: subscriptionTemplates, isLoading: templatesLoading } = useSubscriptionTemplates();

  if (templatesLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!subscriptionTemplates || subscriptionTemplates.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-gray-500">No subscription plans available</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionTemplates.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            currentPlan={currentSubscription}
            memberCount={memberCount}
            isLoading={isLoading}
            onPlanSelect={onPlanSelect}
          />
        ))}
      </div>
    </div>
  );
};
