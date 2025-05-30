
import { CheckCircle, AlertTriangle } from "lucide-react";

interface InviteFormStatusProps {
  isSuccess: boolean;
  isAtLimit: boolean;
  currentPlan: string;
  maxUsers: number;
}

export const InviteFormStatus = ({ isSuccess, isAtLimit, currentPlan, maxUsers }: InviteFormStatusProps) => {
  if (isSuccess) {
    return (
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-900">Invitation sent successfully!</span>
        </div>
      </div>
    );
  }

  if (isAtLimit) {
    return (
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <div>
            <span className="text-sm font-medium text-red-900">Member limit reached</span>
            <p className="text-xs text-red-700 mt-1">
              Your {currentPlan} plan allows up to {maxUsers} members. Upgrade to add more.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
