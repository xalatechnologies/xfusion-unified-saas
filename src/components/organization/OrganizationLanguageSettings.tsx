
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Globe } from "lucide-react";

interface OrganizationLanguageSettingsProps {
  defaultLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "fr", label: "French", flag: "🇫🇷" },
  { value: "no", label: "Norwegian", flag: "🇳🇴" },
];

export const OrganizationLanguageSettings = ({ defaultLanguage, onLanguageChange }: OrganizationLanguageSettingsProps) => {
  const selectedLanguage = languages.find(lang => lang.value === defaultLanguage);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
          <Globe className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-left">
          <h4 className="text-sm font-medium text-blue-900 text-left">Language Settings</h4>
          <p className="text-xs text-blue-700 text-left">
            This will be the default language for all organization members and system communications.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="default-language" className="text-sm font-medium text-gray-700 flex items-center text-left">
          <Languages className="w-4 h-4 mr-2 text-gray-500" />
          Default Language
        </Label>
        <Select
          value={defaultLanguage}
          onValueChange={onLanguageChange}
        >
          <SelectTrigger id="default-language" className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <SelectValue placeholder="Select a language">
              {selectedLanguage && (
                <div className="flex items-center space-x-2">
                  <span>{selectedLanguage.flag}</span>
                  <span>{selectedLanguage.label}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                <div className="flex items-center space-x-2">
                  <span>{language.flag}</span>
                  <span>{language.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground text-left">
          Choose the primary language for your organization's interface and communications
        </p>
      </div>
    </div>
  );
};
