
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Printer } from "lucide-react";

interface OrganizationContactInfoProps {
  formData: {
    email: string;
    phone: string;
    fax: string;
  };
  onFormDataChange: (updates: Partial<{ email: string; phone: string; fax: string }>) => void;
}

export const OrganizationContactInfo = ({ formData, onFormDataChange }: OrganizationContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center text-left">
          <Mail className="w-4 h-4 mr-2 text-gray-500" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ email: e.target.value })}
          placeholder="contact@company.com"
          className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-muted-foreground text-left">
          Primary contact email
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center text-left">
          <Phone className="w-4 h-4 mr-2 text-gray-500" />
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormDataChange({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
          className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-muted-foreground text-left">
          Main business phone
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fax" className="text-sm font-medium text-gray-700 flex items-center text-left">
          <Printer className="w-4 h-4 mr-2 text-gray-500" />
          Fax Number
        </Label>
        <Input
          id="fax"
          type="tel"
          value={formData.fax}
          onChange={(e) => onFormDataChange({ fax: e.target.value })}
          placeholder="+1 (555) 123-4568"
          className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-muted-foreground text-left">
          Fax number (optional)
        </p>
      </div>
    </div>
  );
};
