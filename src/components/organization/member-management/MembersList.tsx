
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Loader2 } from "lucide-react";
import { useOrganizationMembers } from "@/hooks/useOrganizations";
import { SubscriptionInfoCard } from "./SubscriptionInfoCard";
import { MembersTable } from "./MembersTable";
import { EmptyMembersState } from "./EmptyMembersState";

interface MembersListProps {
  organizationId: string;
}

export const MembersList = ({ organizationId }: MembersListProps) => {
  const { data: members, isLoading: membersLoading } = useOrganizationMembers(organizationId);

  if (membersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-lg">Loading members...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SubscriptionInfoCard organizationId={organizationId} />

      <Card className="shadow-sm border-0 bg-gray-50/30">
        <CardHeader className="pb-4 text-left">
          <CardTitle className="text-lg font-medium text-gray-900 flex items-center text-left">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Organization Members
            <Badge variant="secondary" className="ml-2">
              {members?.length || 0}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground text-left">
            Manage roles and permissions for organization members
          </p>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <MembersTable members={members} />
          ) : (
            <EmptyMembersState />
          )}
        </CardContent>
      </Card>
    </>
  );
};
