
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSubscriptions, useCreateSubscription } from "@/hooks/useBilling";
import { useOrganizationMembers } from "@/hooks/useOrganizations";
import { CurrentSubscriptionCard } from "./subscription/CurrentSubscriptionCard";
import { UserLimitWarning } from "./subscription/UserLimitWarning";
import { SubscriptionPlansGrid } from "./subscription/SubscriptionPlansGrid";
import { subscriptionPlans } from "./subscription/subscriptionPlans";

interface OrganizationSubscriptionProps {
  organizationId: string;
}

export const OrganizationSubscription = ({ organizationId }: OrganizationSubscriptionProps) => {
  const { toast } = useToast();
  
  const { data: subscriptions, isLoading } = useSubscriptions(organizationId);
  const { data: members } = useOrganizationMembers(organizationId);
  const createSubscription = useCreateSubscription();
  
  // Get the active subscription (status = 'active')
  const currentSubscription = subscriptions?.find(sub => sub.status === 'active') || subscriptions?.[0];
  const memberCount = members?.length || 0;

  const handlePlanChange = async (planId: string) => {
    const selectedPlan = subscriptionPlans.find(p => p.id === planId);
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
      // Cancel current subscription first if it exists
      if (currentSubscription && currentSubscription.status === 'active') {
        // In a real app, you'd cancel the current subscription via Stripe API
        console.log('Cancelling current subscription:', currentSubscription.id);
      }

      // Create new subscription
      await createSubscription.mutateAsync({
        organization_id: organizationId,
        plan_id: planId,
        plan_name: selectedPlan.name,
        price_monthly: parseFloat(selectedPlan.price.replace('$', '')),
        status: 'active',
        billing_cycle: 'monthly',
        max_users: selectedPlan.maxUsers,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        features: {
          workOrders: selectedPlan.id === 'basic' ? 100 : -1,
          assetManagement: selectedPlan.id !== 'basic',
          customProcedures: selectedPlan.id !== 'basic',
          apiAccess: selectedPlan.id !== 'basic',
          prioritySupport: selectedPlan.id !== 'basic',
          customBranding: selectedPlan.id === 'enterprise',
          ssoAuth: selectedPlan.id === 'enterprise',
        },
      });

      toast({
        title: "Subscription Updated",
        description: `Your subscription has been updated to ${selectedPlan.name}`,
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
        <CurrentSubscriptionCard 
          subscription={currentSubscription} 
          memberCount={memberCount} 
        />
      )}

      <UserLimitWarning 
        subscription={currentSubscription} 
        memberCount={memberCount} 
      />

      <SubscriptionPlansGrid
        currentSubscription={currentSubscription}
        memberCount={memberCount}
        isLoading={createSubscription.isPending}
        onPlanSelect={handlePlanChange}
      />
    </div>
  );
};
