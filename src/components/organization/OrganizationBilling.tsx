
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Download, Calendar, DollarSign } from "lucide-react";

const mockInvoices = [
  { id: "INV-2024-01", date: "2024-01-01", amount: "$99.00", status: "paid" },
  { id: "INV-2023-12", date: "2023-12-01", amount: "$99.00", status: "paid" },
  { id: "INV-2023-11", date: "2023-11-01", amount: "$99.00", status: "paid" },
  { id: "INV-2023-10", date: "2023-10-01", amount: "$99.00", status: "paid" },
];

export const OrganizationBilling = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">No outstanding balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 1, 2024</div>
            <p className="text-xs text-muted-foreground">$99.00 due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">•••• 4242</div>
            <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Payment Method
            <Button variant="outline" onClick={handleUpdatePayment}>
              Update Payment Method
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <CreditCard className="w-8 h-8 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2025</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Primary</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
