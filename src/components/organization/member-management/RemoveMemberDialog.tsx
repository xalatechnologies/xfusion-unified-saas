
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRemoveOrganizationMember } from "@/hooks/useOrganizations";
import type { Database } from "@/integrations/supabase/types";

type OrganizationMember = {
  id: string;
  organization_id: string;
  user_id: string | null;
  invited_email: string | null;
  role: Database["public"]["Enums"]["organization_role"];
  status: string;
  users: { id: string; email: string } | null;
};

interface RemoveMemberDialogProps {
  member: OrganizationMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RemoveMemberDialog = ({ member, isOpen, onClose }: RemoveMemberDialogProps) => {
  const removeMemberMutation = useRemoveOrganizationMember();

  const handleRemove = async () => {
    if (!member) return;

    try {
      await removeMemberMutation.mutateAsync(member.id);
      onClose();
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  if (!member) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">Remove Member</AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            <div className="flex items-center space-x-3 mt-4 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {member.users?.email?.substring(0, 2).toUpperCase() || 
                   member.invited_email?.substring(0, 2).toUpperCase() || '??'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">
                  {member.users?.email || member.invited_email}
                </div>
              </div>
            </div>
            Are you sure you want to remove this member from the organization? This action cannot be undone and they will lose access to all organization resources.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700"
            disabled={removeMemberMutation.isPending}
          >
            {removeMemberMutation.isPending ? "Removing..." : "Remove Member"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
