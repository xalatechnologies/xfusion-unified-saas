
import { Search, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/types/i18n";

interface TranslationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (value: Language) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  onExport: () => void;
}

export const TranslationFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLanguage,
  setSelectedLanguage,
  categoryFilter,
  setCategoryFilter,
  onExport,
}: TranslationFiltersProps) => {
  const { t } = useLanguage();

  const categories = [
    { value: "all", label: t('admin.translations.all') },
    { value: "nav", label: "Navigation" },
    { value: "auth", label: "Authentication" },
    { value: "landing", label: "Landing Page" },
    { value: "admin", label: "Admin Panel" },
    { value: "common", label: "Common" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('admin.translations.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">🇺🇸 English</SelectItem>
          <SelectItem value="fr">🇫🇷 Français</SelectItem>
          <SelectItem value="no">🇳🇴 Norsk</SelectItem>
        </SelectContent>
      </Select>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          {t('admin.translations.export')}
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          {t('admin.translations.import')}
        </Button>
      </div>
    </div>
  );
};
