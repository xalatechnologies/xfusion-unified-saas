
import { MemberInviteForm } from "./member-management/MemberInviteForm";
import { MembersList } from "./member-management/MembersList";
import { RolePermissions } from "./member-management/RolePermissions";

interface OrganizationMembersProps {
  organizationId: string;
}

export const OrganizationMembers = ({ organizationId }: OrganizationMembersProps) => {
  return (
    <div className="space-y-6">
      <MemberInviteForm organizationId={organizationId} />
      <MembersList organizationId={organizationId} />
      <RolePermissions />
    </div>
  );
};
