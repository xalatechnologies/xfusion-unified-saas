
export interface Application {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  baseRoute: string;
  enabled: boolean;
  requiredRole?: string;
}

export const applications: Application[] = [
  {
    id: 'saas-admin',
    name: 'saas-admin',
    displayName: 'SAAS Admin',
    description: 'Manage organizations, users, and system settings across all applications',
    icon: 'Crown',
    baseRoute: '/saas',
    enabled: true,
    requiredRole: 'super_admin'
  },
  {
    id: 'organization-admin',
    name: 'organization-admin',
    displayName: 'Organization Admin',
    description: 'Manage your organization settings, members, and billing',
    icon: 'Building2',
    baseRoute: '/org-admin',
    enabled: true,
    requiredRole: 'organization_admin'
  },
  {
    id: 'supplymantix',
    name: 'supplymantix',
    displayName: 'SupplyMantix',
    description: 'Maintenance and supply-chain operations platform',
    icon: 'Wrench',
    baseRoute: '/dashboard',
    enabled: true,
    requiredRole: 'user'
  }
];

export const getApplicationById = (id: string): Application | undefined => {
  return applications.find(app => app.id === id);
};

export const getApplicationByRoute = (route: string): Application | undefined => {
  return applications.find(app => route.startsWith(app.baseRoute));
};
