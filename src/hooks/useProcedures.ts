
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";

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
