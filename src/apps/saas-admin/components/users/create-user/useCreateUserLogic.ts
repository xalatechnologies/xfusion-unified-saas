
import { useState } from "react";
import { useCreateUser } from "@/hooks/useUsers";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { databaseApi } from "@/lib/database";
import { CreateUserForm } from "./createUserSchema";

export function useCreateUserLogic() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createUserMutation = useCreateUser();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (data: CreateUserForm) => {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to create users.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Creating user with data:", data);
      
      // Get the current user's tenant ID using the new function
      const tenantId = await databaseApi.getCurrentUserTenantId();
      
      if (!tenantId) {
        throw new Error("Could not determine tenant ID");
      }
      
      // Create the user record in the database
      await createUserMutation.mutateAsync({
        email: data.email,
        tenant_id: tenantId
      });
      
      toast({
        title: "User created successfully",
        description: `${data.firstName} ${data.lastName} has been created and will receive a welcome email.`
      });
      
      return true; // Success
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error creating user",
        description: "There was an error creating the user. Please try again.",
        variant: "destructive"
      });
      return false; // Failure
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
}
