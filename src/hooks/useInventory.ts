
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";

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
