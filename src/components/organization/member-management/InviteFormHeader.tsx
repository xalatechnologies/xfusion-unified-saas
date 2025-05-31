
import { UserPlus } from "lucide-react";

export const InviteFormHeader = () => {
  return (
    <div className="flex items-center space-x-3 mb-6 text-left">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
        <UserPlus className="w-5 h-5 text-blue-600" />
      </div>
      <div className="text-left">
        <h2 className="text-xl font-semibold text-gray-900 text-left">Invite Team Member</h2>
        <p className="text-sm text-gray-600 text-left">Add a new member to your organization</p>
      </div>
    </div>
  );
};
