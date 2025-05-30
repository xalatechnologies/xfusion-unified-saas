
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Globe, MapPin } from "lucide-react";

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="org-name" className="text-sm font-medium text-gray-700 flex items-center text-left">
            <Building className="w-4 h-4 mr-2 text-gray-500" />
            Organization Name *
          </Label>
          <Input
            id="org-name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            placeholder="Enter your organization name"
            className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-muted-foreground text-left">
            This name will be displayed across the platform
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website" className="text-sm font-medium text-gray-700 flex items-center text-left">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            Website
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => onFormDataChange({ website: e.target.value })}
            placeholder="https://your-company.com"
            className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-muted-foreground text-left">
            Your organization's website URL
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center text-left">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          Address
        </Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onFormDataChange({ address: e.target.value })}
          placeholder="Enter your organization's physical address"
          rows={3}
          className="resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-muted-foreground text-left">
          Complete mailing address for your organization
        </p>
      </div>
    </div>
  );
};
