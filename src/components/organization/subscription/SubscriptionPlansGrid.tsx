
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
    memberCount,
    dataType: typeof subscriptionTemplates,
    isArray: Array.isArray(subscriptionTemplates)
  });

  if (templatesLoading) {
    console.log("Templates are loading...");
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

  // More detailed logging
  console.log("Raw subscription templates data:", subscriptionTemplates);
  console.log("Templates array check:", {
    isNull: subscriptionTemplates === null,
    isUndefined: subscriptionTemplates === undefined,
    length: subscriptionTemplates?.length,
    firstItem: subscriptionTemplates?.[0]
  });

  if (!subscriptionTemplates || subscriptionTemplates.length === 0) {
    console.warn("No subscription templates found. Detailed data:", {
      data: subscriptionTemplates,
      type: typeof subscriptionTemplates,
      isArray: Array.isArray(subscriptionTemplates),
      keys: subscriptionTemplates ? Object.keys(subscriptionTemplates) : 'N/A'
    });
    
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 text-left">Available Plans</h3>
        <div className="text-center text-gray-500">
          <p>No subscription plans available</p>
          <p className="text-sm mt-2">Debug: Templates count = {subscriptionTemplates?.length || 0}</p>
          <p className="text-xs mt-1">Check console for detailed API debugging</p>
          <p className="text-xs mt-1">Data type: {typeof subscriptionTemplates}</p>
          <p className="text-xs mt-1">Is Array: {Array.isArray(subscriptionTemplates) ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }

  // Filter out trial plans from the available templates
  const availableTemplates = subscriptionTemplates.filter(plan => plan.plan_id !== 'trial');
  
  console.log("Filtered templates (excluding trial):", availableTemplates);
  console.log("Final templates to render:", availableTemplates.map(t => ({ 
    id: t.id, 
    plan_id: t.plan_id, 
    plan_name: t.plan_name 
  })));

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
