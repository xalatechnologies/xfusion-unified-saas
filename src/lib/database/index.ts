
import { organizationsApi } from "./organizations";
import { billingApi } from "./billing";
import { workOrdersApi } from "./work-orders";
import { assetsApi } from "./assets";
import { inventoryApi } from "./inventory";
import { procurementApi } from "./procurement";
import { proceduresApi } from "./procedures";
import { usersApi } from "./users";
import { userRolesApi } from "./user-roles";
import { globalThemeApi } from "./global-theme";
import { globalTranslationsApi } from "./global-translations";
import { documentationApi } from "./documentation";
import { organizationThemesApi } from "./organization-themes";
import { searchApi } from "./search";

export const databaseApi = {
  // Organizations
  ...organizationsApi,
  
  // Billing & Subscriptions
  ...billingApi,
  
  // Work Orders & Chat
  ...workOrdersApi,
  
  // Assets
  ...assetsApi,
  
  // Inventory
  ...inventoryApi,
  
  // Procurement
  ...procurementApi,
  
  // Procedures
  ...proceduresApi,
  
  // Users & Tenants
  ...usersApi,
  
  // User Roles
  ...userRolesApi,
  
  // Global Theme Management
  ...globalThemeApi,
  
  // Global Translations
  ...globalTranslationsApi,
  
  // Documentation
  ...documentationApi,
  
  // Organization Themes
  ...organizationThemesApi,
  
  // Search
  ...searchApi,
};
