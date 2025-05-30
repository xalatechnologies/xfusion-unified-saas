
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ email: e.target.value })}
          placeholder="contact@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormDataChange({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fax">Fax</Label>
        <Input
          id="fax"
          type="tel"
          value={formData.fax}
          onChange={(e) => onFormDataChange({ fax: e.target.value })}
          placeholder="+1 (555) 123-4568"
        />
      </div>
    </div>
  );
};
