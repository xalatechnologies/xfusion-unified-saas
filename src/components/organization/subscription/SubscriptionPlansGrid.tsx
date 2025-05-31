
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
  const { data: subscriptionTemplates, isLoading: templatesLoading, error } = useSubscriptionTemplates();

  console.log("SubscriptionPlansGrid:", { subscriptionTemplates, templatesLoading, error });

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

  if (error) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-red-500">
          Error loading subscription plans: {error.message}
        </div>
      </div>
    );
  }

  if (!subscriptionTemplates || subscriptionTemplates.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-gray-500">
          <p>No subscription plans available</p>
          <p className="text-sm mt-2">Debug: Templates count = {subscriptionTemplates?.length || 0}</p>
        </div>
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
