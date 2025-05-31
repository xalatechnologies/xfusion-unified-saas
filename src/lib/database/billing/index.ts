
import { subscriptionsApi } from "./subscriptions";
import { billingInformationApi } from "./billing-information";
import { invoicesApi } from "./invoices";

export const billingApi = {
  // Subscription management
  ...subscriptionsApi,
  
  // Billing information
  ...billingInformationApi,
  
  // Invoices
  ...invoicesApi,
};
