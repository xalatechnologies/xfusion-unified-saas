
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react";
import { useBillingInformation, useInvoices, useOrganizationSubscription } from "@/hooks/useBilling";

interface OrganizationBillingProps {
  organizationId: string;
}

export const OrganizationBilling = ({ organizationId }: OrganizationBillingProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const { data: billingInfo, isLoading: billingLoading } = useBillingInformation(organizationId);
  const { data: invoices, isLoading: invoicesLoading } = useInvoices(organizationId);
  const { data: orgSubscription } = useOrganizationSubscription(organizationId);
  
  const primaryBilling = billingInfo?.find(info => info.is_primary) || billingInfo?.[0];
  const subscription = orgSubscription?.subscriptions;

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId}`,
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment Method",
      description: "Redirecting to secure payment portal...",
    });
  };

  if (billingLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-left">Loading billing information...</div>
        </CardContent>
      </Card>
    );
  }

  const totalOutstanding = invoices?.reduce((sum, invoice) => 
    sum + (invoice.amount_due - (invoice.amount_paid || 0)), 0) || 0;

  const nextInvoice = invoices?.find(invoice => invoice.status === 'pending');
  
  // Calculate next billing date and amount from subscription
  const nextBillingDate = orgSubscription?.current_period_end ? 
    new Date(orgSubscription.current_period_end) : null;
  
  const nextBillingAmount = subscription ? 
    (orgSubscription?.billing_cycle === 'yearly' ? subscription.price_yearly : subscription.price_monthly) : 0;

  return (
    <div className="space-y-6 text-left">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {totalOutstanding === 0 ? "No outstanding balance" : "Outstanding balance"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextBillingDate ? 
                nextBillingDate.toLocaleDateString() : 
                "No upcoming billing"
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {nextBillingDate && nextBillingAmount ? 
                `$${nextBillingAmount} due (${orgSubscription?.billing_cycle || 'monthly'})` : 
                "No active subscription"
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {primaryBilling?.card_last_four ? 
                `•••• ${primaryBilling.card_last_four}` : 
                "Not set"
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {primaryBilling?.card_brand ? 
                `${primaryBilling.card_brand} ending in ${primaryBilling.card_last_four}` :
                "No payment method"
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Subscription Info */}
      {orgSubscription && subscription && (
        <Card>
          <CardHeader className="text-left">
            <CardTitle className="text-left">Current Subscription</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="text-left">
                <h3 className="font-semibold text-lg text-left">{subscription.plan_name}</h3>
                <p className="text-gray-600 text-left">
                  Billing cycle: {orgSubscription.billing_cycle}
                </p>
                <p className="text-sm text-gray-500 text-left">
                  Period: {new Date(orgSubscription.current_period_start).toLocaleDateString()} - {new Date(orgSubscription.current_period_end).toLocaleDateString()}
                </p>
                {orgSubscription.status === 'trialing' && orgSubscription.trial_end && (
                  <p className="text-sm text-orange-600 mt-1 text-left">
                    Trial ends: {new Date(orgSubscription.trial_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${orgSubscription.billing_cycle === 'yearly' ? subscription.price_yearly : subscription.price_monthly}
                </p>
                <p className="text-gray-600">per {orgSubscription.billing_cycle === 'yearly' ? 'year' : 'month'}</p>
                <Badge className={`mt-1 ${
                  orgSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                  orgSubscription.status === 'trialing' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {orgSubscription.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {primaryBilling && (
        <Card>
          <CardHeader className="text-left">
            <CardTitle className="flex items-center justify-between text-left">
              Payment Method
              <Button variant="outline" onClick={handleUpdatePayment}>
                Update Payment Method
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div className="flex-1 text-left">
                <p className="font-medium text-left">
                  {primaryBilling.card_brand} ending in {primaryBilling.card_last_four}
                </p>
                <p className="text-sm text-gray-600 text-left">
                  Expires {primaryBilling.card_exp_month}/{primaryBilling.card_exp_year}
                </p>
              </div>
              {primaryBilling.is_primary && (
                <Badge className="bg-green-100 text-green-800">Primary</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="text-left">
          <CardTitle className="text-left">Billing History</CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          {invoicesLoading ? (
            <div className="text-left py-4">Loading invoices...</div>
          ) : (
            <div className="space-y-4">
              {invoices?.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-left">
                      <p className="font-medium text-left">{invoice.invoice_number}</p>
                      <p className="text-sm text-gray-600 text-left">
                        {new Date(invoice.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount_due}</p>
                      <Badge className={
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {invoice.status}
                      </Badge>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.invoice_number)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
              {(!invoices || invoices.length === 0) && (
                <div className="text-left py-8 text-gray-500">
                  No invoices found.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
