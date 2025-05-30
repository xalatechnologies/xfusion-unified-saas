
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";

// Subscriptions
export const useSubscriptions = (organizationId: string) => {
  return useQuery({
    queryKey: ["subscriptions", organizationId],
    queryFn: () => databaseApi.getSubscriptions(organizationId),
    enabled: !!organizationId,
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions", data.organization_id] });
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
