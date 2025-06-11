import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseApi } from "@/lib/database";
import type { User } from "@/types/User";

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
export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: databaseApi.getUsers,
  });
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: databaseApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User created successfully, invalidating users query");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};
