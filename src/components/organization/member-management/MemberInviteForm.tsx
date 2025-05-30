
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, Shield, Loader2 } from "lucide-react";
import { useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useAuthState } from "@/hooks/useAuthState";
import { getAvailableRoles } from "./memberUtils";
import type { Database } from "@/integrations/supabase/types";

interface MemberInviteFormProps {
  organizationId: string;
}

interface InviteFormData {
  email: string;
  role: Database["public"]["Enums"]["organization_role"];
}

export const MemberInviteForm = ({ organizationId }: MemberInviteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthState();
  const inviteMutation = useInviteOrganizationMember();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<InviteFormData>({
    defaultValues: {
      role: "viewer"
    }
  });

  const selectedRole = watch("role");
  const availableRoles = getAvailableRoles();

  const onSubmit = async (data: InviteFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await inviteMutation.mutateAsync({
        organization_id: organizationId,
        invited_email: data.email,
        role: data.role,
        invited_by: user.id,
      });
      
      reset();
    } catch (error) {
      console.error("Error inviting member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm border-0 bg-blue-50/50">
      <CardHeader className="pb-4 text-left">
        <CardTitle className="text-lg font-medium text-blue-900 flex items-center text-left">
          <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
          Invite New Member
        </CardTitle>
        <p className="text-sm text-blue-700 text-left">
          Send an invitation to add a new member to your organization
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center text-left">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-600 text-left">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-gray-700 flex items-center text-left">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                Role
              </Label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setValue("role", value as Database["public"]["Enums"]["organization_role"])}
              >
                <SelectTrigger id="role" className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting || inviteMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {(isSubmitting || inviteMutation.isPending) ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
