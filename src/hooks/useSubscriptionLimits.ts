
import { useOrganizationMembers } from "./useOrganizations";
import { useSubscriptions } from "./useBilling";

const plans = [
  { id: "basic", maxUsers: 5 },
  { id: "professional", maxUsers: 25 },
  { id: "enterprise", maxUsers: -1 }, // unlimited
];

export const useSubscriptionLimits = (organizationId: string) => {
  const { data: subscriptions } = useSubscriptions(organizationId);
  const { data: members } = useOrganizationMembers(organizationId);
  
  const currentSubscription = subscriptions?.[0];
  const currentPlan = plans.find(p => p.id === currentSubscription?.plan_id);
  const memberCount = members?.length || 0;
  
  const canAddMember = () => {
    if (!currentPlan) return false;
    if (currentPlan.maxUsers === -1) return true; // unlimited
    return memberCount < currentPlan.maxUsers;
  };
  
  const getRemainingSlots = () => {
    if (!currentPlan || currentPlan.maxUsers === -1) return -1; // unlimited
    return Math.max(0, currentPlan.maxUsers - memberCount);
  };
  
  const isAtLimit = () => {
    if (!currentPlan || currentPlan.maxUsers === -1) return false;
    return memberCount >= currentPlan.maxUsers;
  };
  
  return {
    canAddMember: canAddMember(),
    remainingSlots: getRemainingSlots(),
    isAtLimit: isAtLimit(),
    memberCount,
    maxUsers: currentPlan?.maxUsers || 0,
    currentPlan: currentSubscription?.plan_name || 'Unknown',
  };
};
