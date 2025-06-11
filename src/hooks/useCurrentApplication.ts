import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { getApplicationByRoute } from "@/lib/config/applications";

export const useCurrentApplication = () => {
  const location = useLocation();
  
  const currentApp = useMemo(() => {
    return getApplicationByRoute(location.pathname);
  }, [location.pathname]);

  return {
    currentApp,
    isInSaasAdmin: currentApp?.id === 'saas-admin',
    isInOrganizationAdmin: currentApp?.id === 'organization-admin',
    isInSupplyMantix: currentApp?.id === 'supplymantix'
  };
}; 