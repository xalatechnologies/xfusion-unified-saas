
import { organizationsApi } from "./organizations";
import { billingApi } from "./billing";
import { workOrdersApi } from "./work-orders";
import { assetsApi } from "./assets";
import { inventoryApi } from "./inventory";
import { procurementApi } from "./procurement";
import { proceduresApi } from "./procedures";
import { usersApi } from "./users";

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
};
