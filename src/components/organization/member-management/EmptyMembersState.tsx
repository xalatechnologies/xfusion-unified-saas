
import { Users } from "lucide-react";

export const EmptyMembersState = () => {
  return (
    <div className="text-center py-8">
      <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-500">No members found</p>
      <p className="text-sm text-muted-foreground">Invite members to get started</p>
    </div>
  );
};
