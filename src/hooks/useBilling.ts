import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { billingApi } from "@/lib/database/billing";

// Current Subscription (the one the organization is actually on)
export const useCurrentSubscription = (organizationId: string) => {
  return useQuery({
    queryKey: ["current-subscription", organizationId],
    queryFn: () => billingApi.getCurrentSubscription(organizationId),
    enabled: !!organizationId,
  });
};

// All subscriptions for an organization (historical)
export const useSubscriptions = (organizationId: string) => {
  return useQuery({
    queryKey: ["subscriptions", organizationId],
    queryFn: () => billingApi.getSubscriptions(organizationId),
    enabled: !!organizationId,
  });
};

// Available subscription templates/plans
export const useSubscriptionTemplates = () => {
  return useQuery({
    queryKey: ["subscription-templates"],
    queryFn: () => billingApi.getSubscriptionTemplates(),
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: billingApi.createSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["current-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      billingApi.updateSubscription(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["current-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: billingApi.cancelSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["current-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// Billing Information
export const useBillingInformation = (organizationId: string) => {
  return useQuery({
    queryKey: ["billing-information", organizationId],
    queryFn: () => billingApi.getBillingInformation(organizationId),
    enabled: !!organizationId,
  });
};

export const useCreateBillingInformation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: billingApi.createBillingInformation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["billing-information", data.organization_id] });
    },
  });
};

// Invoices
export const useInvoices = (organizationId: string) => {
  return useQuery({
    queryKey: ["invoices", organizationId],
    queryFn: () => billingApi.getInvoices(organizationId),
    enabled: !!organizationId,
  });
};
