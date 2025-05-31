
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

  console.log("SubscriptionPlansGrid render:", { 
    subscriptionTemplates, 
    templatesLoading, 
    error, 
    currentSubscription,
    memberCount 
  });

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
    console.error("Subscription templates error:", error);
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-red-500">
          <p>Error loading subscription plans: {error.message}</p>
          <p className="text-sm mt-2">Check console for details</p>
        </div>
      </div>
    );
  }

  if (!subscriptionTemplates || subscriptionTemplates.length === 0) {
    console.warn("No subscription templates found. Data:", subscriptionTemplates);
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-gray-500">
          <p>No subscription plans available</p>
          <p className="text-sm mt-2">Debug: Templates count = {subscriptionTemplates?.length || 0}</p>
          <p className="text-xs mt-1">Check console for API details</p>
        </div>
      </div>
    );
  }

  // Filter out trial plans from the available templates
  const availableTemplates = subscriptionTemplates.filter(plan => plan.plan_id !== 'trial');

  console.log("Rendering subscription templates:", availableTemplates);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {availableTemplates.map((plan) => (
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
