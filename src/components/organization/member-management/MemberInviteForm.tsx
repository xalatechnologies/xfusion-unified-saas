
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, AlertTriangle, Users } from "lucide-react";
import { useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits";
import type { Database } from "@/integrations/supabase/types";

type OrganizationRole = Database["public"]["Enums"]["organization_role"];

const roles: { value: OrganizationRole; label: string; description: string }[] = [
  { 
    value: "admin", 
    label: "Admin", 
    description: "Full system access and user management" 
  },
  { 
    value: "operations_manager", 
    label: "Operations Manager", 
    description: "Manage work orders and assign resources" 
  },
  { 
    value: "maintenance_manager", 
    label: "Maintenance Manager", 
    description: "Create maintenance plans and manage procedures" 
  },
  { 
    value: "engineer", 
    label: "Engineer", 
    description: "Create procedures and technical documentation" 
  },
  { 
    value: "technician", 
    label: "Technician", 
    description: "Execute work orders and update task status" 
  },
  { 
    value: "requester", 
    label: "Requester", 
    description: "Submit work requests and track status" 
  },
  { 
    value: "client", 
    label: "Client", 
    description: "View assigned work and submit requests" 
  },
  { 
    value: "viewer", 
    label: "Viewer", 
    description: "Read-only access to dashboards and reports" 
  },
];

interface MemberInviteFormProps {
  organizationId: string;
}

export const MemberInviteForm = ({ organizationId }: MemberInviteFormProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OrganizationRole>("viewer");
  const { toast } = useToast();

  const inviteMutation = useInviteOrganizationMember();
  const subscriptionLimits = useSubscriptionLimits(organizationId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriptionLimits.canAddMember) {
      toast({
        title: "Member Limit Reached",
        description: `Your ${subscriptionLimits.currentPlan} plan allows up to ${subscriptionLimits.maxUsers} members. Please upgrade to add more team members.`,
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the invitation.",
        variant: "destructive",
      });
      return;
    }

    try {
      await inviteMutation.mutateAsync({
        organizationId,
        email: email.trim(),
        role,
      });

      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${email}`,
      });

      setEmail("");
      setRole("viewer");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-sm border-0 bg-gray-50/30">
      <CardHeader className="pb-4 text-left">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
          Invite Team Member
        </CardTitle>
        <p className="text-sm text-muted-foreground text-left">
          Send an invitation to add a new member to your organization
        </p>
        
        {/* Subscription Status */}
        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">
            {subscriptionLimits.memberCount} of {subscriptionLimits.maxUsers === -1 ? 'unlimited' : subscriptionLimits.maxUsers} members used
          </span>
          {subscriptionLimits.maxUsers !== -1 && (
            <span className="text-blue-600">
              ({subscriptionLimits.remainingSlots} slots remaining)
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Limit Warning */}
        {subscriptionLimits.isAtLimit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-red-900">Member Limit Reached</h4>
                <p className="text-xs text-red-700 mt-1">
                  Your {subscriptionLimits.currentPlan} plan allows up to {subscriptionLimits.maxUsers} members. 
                  Please upgrade your subscription to invite more team members.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-left block">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={subscriptionLimits.isAtLimit}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground text-left">
              An invitation email will be sent to this address
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-left block">Role</Label>
            <Select value={role} onValueChange={(value: OrganizationRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((roleOption) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    <div className="text-left">
                      <div className="font-medium">{roleOption.label}</div>
                      <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground text-left">
              Choose the appropriate role based on their responsibilities
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={inviteMutation.isPending || subscriptionLimits.isAtLimit}
          >
            {inviteMutation.isPending ? "Sending Invitation..." : "Send Invitation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
