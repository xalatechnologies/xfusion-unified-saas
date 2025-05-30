
import { useOrganizationMembers } from "./useOrganizations";
import { useSubscriptions } from "./useBilling";

export const useSubscriptionLimits = (organizationId: string) => {
  const { data: subscriptions } = useSubscriptions(organizationId);
  const { data: members } = useOrganizationMembers(organizationId);
  
  const currentSubscription = subscriptions?.[0];
  const memberCount = members?.length || 0;
  
  const canAddMember = () => {
    if (!currentSubscription) return false;
    if (currentSubscription.max_users === -1) return true; // unlimited
    return memberCount < (currentSubscription.max_users || 0);
  };
  
  const getRemainingSlots = () => {
    if (!currentSubscription || currentSubscription.max_users === -1) return -1; // unlimited
    return Math.max(0, (currentSubscription.max_users || 0) - memberCount);
  };
  
  const isAtLimit = () => {
    if (!currentSubscription || currentSubscription.max_users === -1) return false;
    return memberCount >= (currentSubscription.max_users || 0);
  };
  
  return {
    canAddMember: canAddMember(),
    remainingSlots: getRemainingSlots(),
    isAtLimit: isAtLimit(),
    memberCount,
    maxUsers: currentSubscription?.max_users || 0,
    currentPlan: currentSubscription?.plan_name || 'Unknown',
    currentSubscription,
  };
};
