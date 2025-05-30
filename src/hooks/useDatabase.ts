
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

// Work Orders
export const useWorkOrders = () => {
  return useQuery({
    queryKey: ["work-orders"],
    queryFn: databaseApi.getWorkOrders,
  });
};

export const useCreateWorkOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createWorkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
};

export const useUpdateWorkOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Tables["work_orders"]["Update"] }) =>
      databaseApi.updateWorkOrder(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-orders"] });
    },
  });
};

// Assets
export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: databaseApi.getAssets,
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};

// Inventory Items
export const useInventoryItems = () => {
  return useQuery({
    queryKey: ["inventory-items"],
    queryFn: databaseApi.getInventoryItems,
  });
};

export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createInventoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
    },
  });
};

// Purchase Orders
export const usePurchaseOrders = () => {
  return useQuery({
    queryKey: ["purchase-orders"],
    queryFn: databaseApi.getPurchaseOrders,
  });
};

export const useCreatePurchaseOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createPurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
    },
  });
};

// Procedures
export const useProcedures = () => {
  return useQuery({
    queryKey: ["procedures"],
    queryFn: databaseApi.getProcedures,
  });
};

export const useCreateProcedure = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedures"] });
    },
  });
};

// Chat Messages
export const useChatMessages = (workOrderId: string) => {
  return useQuery({
    queryKey: ["chat-messages", workOrderId],
    queryFn: () => databaseApi.getChatMessages(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useCreateChatMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createChatMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", data.work_order_id] });
    },
  });
};

// Tenants
export const useTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: databaseApi.getTenants,
  });
};

export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });
};

// Users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: databaseApi.getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
