
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface UserLimitWarningProps {
  subscription: any;
  memberCount: number;
}

export const UserLimitWarning = ({ subscription, memberCount }: UserLimitWarningProps) => {
  if (!subscription || subscription.max_users === -1) return null;
  
  const warningThreshold = (subscription.max_users || 0) * 0.8;
  const shouldShowWarning = memberCount >= warningThreshold;
  
  if (!shouldShowWarning) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <h4 className="text-sm font-medium text-orange-900">Approaching User Limit</h4>
            <p className="text-xs text-orange-700 mt-1">
              You're using {memberCount} of {subscription.max_users} available members. 
              {memberCount >= (subscription.max_users || 0)
                ? " You've reached your limit and cannot add more members."
                : " Consider upgrading to add more team members."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
