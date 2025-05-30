
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, AlertTriangle, Users, Info, CheckCircle } from "lucide-react";
import { useInviteOrganizationMember } from "@/hooks/useOrganizations";
import { useSubscriptionLimits } from "@/hooks/useSubscriptionLimits";
import type { Database } from "@/integrations/supabase/types";

type OrganizationRole = Database["public"]["Enums"]["organization_role"];

const roles: { value: OrganizationRole; label: string; description: string; color: string }[] = [
  { 
    value: "admin", 
    label: "Admin", 
    description: "Complete system control and user management",
    color: "text-red-600"
  },
  { 
    value: "operations_manager", 
    label: "Operations Manager", 
    description: "Oversee work orders and resource allocation",
    color: "text-purple-600"
  },
  { 
    value: "maintenance_manager", 
    label: "Maintenance Manager", 
    description: "Plan maintenance schedules and procedures",
    color: "text-blue-600"
  },
  { 
    value: "engineer", 
    label: "Engineer", 
    description: "Create technical documentation and procedures",
    color: "text-green-600"
  },
  { 
    value: "technician", 
    label: "Technician", 
    description: "Execute work orders and update progress",
    color: "text-orange-600"
  },
  { 
    value: "requester", 
    label: "Requester", 
    description: "Submit work requests and monitor status",
    color: "text-yellow-600"
  },
  { 
    value: "client", 
    label: "Client", 
    description: "View assigned work and submit requests",
    color: "text-indigo-600"
  },
  { 
    value: "viewer", 
    label: "Viewer", 
    description: "Read-only access to reports and dashboards",
    color: "text-gray-600"
  },
];

interface MemberInviteFormProps {
  organizationId: string;
}

export const MemberInviteForm = ({ organizationId }: MemberInviteFormProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<OrganizationRole>("viewer");
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const inviteMutation = useInviteOrganizationMember();
  const subscriptionLimits = useSubscriptionLimits(organizationId);

  const selectedRole = roles.find(r => r.value === role);

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
        organization_id: organizationId,
        invited_email: email.trim(),
        role,
        invited_by: "current-user-id", // This should come from auth context
      });

      setIsSuccess(true);
      toast({
        title: "Invitation Sent Successfully!",
        description: `${email} will receive an invitation to join your team`,
      });

      // Reset form after success
      setTimeout(() => {
        setEmail("");
        setRole("viewer");
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Failed to Send Invitation",
        description: "Please check the email address and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-600">
                {subscriptionLimits.memberCount} of {subscriptionLimits.maxUsers === -1 ? 'unlimited' : subscriptionLimits.maxUsers} members
              </span>
              {subscriptionLimits.maxUsers !== -1 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {subscriptionLimits.remainingSlots} slots remaining
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Form */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <UserPlus className="w-6 h-6 mr-3 text-blue-600" />
            Invite New Team Member
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Add a new member to your organization and assign them the appropriate role
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Limit Warning */}
          {subscriptionLimits.isAtLimit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Member Limit Reached</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Your {subscriptionLimits.currentPlan} plan allows up to {subscriptionLimits.maxUsers} members. 
                    Upgrade your subscription to invite more team members.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="text-sm font-semibold text-green-900">Invitation Sent!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The team member will receive an email with instructions to join.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={subscriptionLimits.isAtLimit || inviteMutation.isPending}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                They'll receive an email invitation to join your team
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label htmlFor="role" className="text-sm font-medium text-gray-900">
                Role & Permissions *
              </Label>
              <Select value={role} onValueChange={(value: OrganizationRole) => setRole(value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {roles.map((roleOption) => (
                    <SelectItem 
                      key={roleOption.value} 
                      value={roleOption.value}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="py-2">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${roleOption.color}`}>
                            {roleOption.label}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {roleOption.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Selected Role Preview */}
              {selectedRole && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Selected Role:</span>
                    <span className={`text-sm font-medium ${selectedRole.color}`}>
                      {selectedRole.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedRole.description}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                disabled={inviteMutation.isPending || subscriptionLimits.isAtLimit || !email.trim()}
              >
                {inviteMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Invitation...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Send Invitation</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">What happens next?</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• The invitee receives an email with a secure invitation link</li>
                  <li>• They create an account or sign in if they already have one</li>
                  <li>• They automatically join your team with the assigned role</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
