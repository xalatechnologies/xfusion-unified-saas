
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OrganizationBasicInfoProps {
  formData: {
    name: string;
    website: string;
    address: string;
  };
  onFormDataChange: (updates: Partial<{ name: string; website: string; address: string }>) => void;
}

export const OrganizationBasicInfo = ({ formData, onFormDataChange }: OrganizationBasicInfoProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input
            id="org-name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            placeholder="Enter organization name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => onFormDataChange({ website: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onFormDataChange({ address: e.target.value })}
          placeholder="Enter organization address"
          rows={3}
        />
      </div>
    </>
  );
};
