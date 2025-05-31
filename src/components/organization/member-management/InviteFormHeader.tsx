
import { UserPlus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export const InviteFormHeader = () => {
  return (
    <PageHeader
      icon={UserPlus}
      title="Invite Team Member"
      subtitle="Add a new member to your organization"
    />
  );
};
