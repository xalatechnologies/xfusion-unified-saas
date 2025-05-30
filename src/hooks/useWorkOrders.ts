
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
