import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";

// Organization Subscriptions
export const useOrganizationSubscription = (organizationId: string) => {
  return useQuery({
    queryKey: ["organization-subscription", organizationId],
    queryFn: () => databaseApi.getOrganizationSubscription(organizationId),
    enabled: !!organizationId,
  });
};

export const useSubscriptionTemplates = () => {
  return useQuery({
    queryKey: ["subscription-templates"],
    queryFn: () => databaseApi.getSubscriptionTemplates(),
  });
};

export const useCreateOrganizationSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createOrganizationSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateOrganizationSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Record<string, unknown> }) => 
      databaseApi.updateOrganizationSubscription(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useCancelOrganizationSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.cancelOrganizationSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organization-subscription", data.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// Billing Information
export const useBillingInformation = (organizationId: string) => {
  return useQuery({
    queryKey: ["billing-information", organizationId],
    queryFn: () => databaseApi.getBillingInformation(organizationId),
    enabled: !!organizationId,
  });
};

export const useCreateBillingInformation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createBillingInformation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["billing-information", data.organization_id] });
    },
  });
};

// Invoices
export const useInvoices = (organizationId: string) => {
  return useQuery({
    queryKey: ["invoices", organizationId],
    queryFn: () => databaseApi.getInvoices(organizationId),
    enabled: !!organizationId,
  });
};
