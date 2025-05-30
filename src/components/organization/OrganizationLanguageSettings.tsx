
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationLanguageSettingsProps {
  defaultLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const OrganizationLanguageSettings = ({ defaultLanguage, onLanguageChange }: OrganizationLanguageSettingsProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="default-language">Default Language</Label>
      <Select
        value={defaultLanguage}
        onValueChange={onLanguageChange}
      >
        <SelectTrigger id="default-language">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="no">Norwegian</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
