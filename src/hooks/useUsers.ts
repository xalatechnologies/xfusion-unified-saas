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
export function useUsers(options: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: {
    status?: string;
    role?: string;
    organization?: string;
    dateRange?: string;
    search?: string;
  };
} = {}) {
  return useQuery({
    queryKey: ["users", options],
    queryFn: () => databaseApi.getUsers(options),
    placeholderData: (prev) => prev,
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
