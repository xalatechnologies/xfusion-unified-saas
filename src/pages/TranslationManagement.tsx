
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Language, TranslationKeys } from "@/types/i18n";
import { Search, Download, Upload, Save } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

const TranslationManagement = () => {
  const { t, language, updateTranslation } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [currentTranslations, setCurrentTranslations] = useState(translations[selectedLanguage]);

  useEffect(() => {
    // Load custom translations from localStorage if they exist
    const customTranslations = localStorage.getItem(`translations_${selectedLanguage}`);
    if (customTranslations) {
      try {
        const parsed = JSON.parse(customTranslations);
        setCurrentTranslations({ ...translations[selectedLanguage], ...parsed });
      } catch (error) {
        console.error('Failed to parse custom translations:', error);
        setCurrentTranslations(translations[selectedLanguage]);
      }
    } else {
      setCurrentTranslations(translations[selectedLanguage]);
    }
  }, [selectedLanguage]);

  const categories = [
    { value: "all", label: t('admin.translations.all') },
    { value: "nav", label: "Navigation" },
    { value: "auth", label: "Authentication" },
    { value: "landing", label: "Landing Page" },
    { value: "admin", label: "Admin Panel" },
    { value: "common", label: "Common" },
  ];

  const filteredTranslations = Object.entries(currentTranslations)
    .filter(([key, value]) => {
      const stringValue = String(value);
      const matchesSearch = key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || key.startsWith(categoryFilter + ".");
      return matchesSearch && matchesCategory;
    });

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key);
    setEditValue(value);
  };

  const handleSave = () => {
    if (editingKey) {
      // Update the current translations state
      const updatedTranslations = {
        ...currentTranslations,
        [editingKey]: editValue
      };
      setCurrentTranslations(updatedTranslations);

      // Save custom translations to localStorage
      const existingCustom = localStorage.getItem(`translations_${selectedLanguage}`);
      let customTranslations = {};
      if (existingCustom) {
        try {
          customTranslations = JSON.parse(existingCustom);
        } catch (error) {
          console.error('Failed to parse existing custom translations:', error);
        }
      }

      const newCustomTranslations = {
        ...customTranslations,
        [editingKey]: editValue
      };

      localStorage.setItem(`translations_${selectedLanguage}`, JSON.stringify(newCustomTranslations));

      // Update the language context if we're editing the current language
      if (selectedLanguage === language && updateTranslation) {
        updateTranslation(editingKey as keyof TranslationKeys, editValue);
      }

      toast.success(t('admin.translations.updated'));
      setEditingKey(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const exportTranslations = () => {
    const data = JSON.stringify(currentTranslations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translations-${selectedLanguage}.json`;
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.translations.title')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.translations.subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.translations')}</CardTitle>
            <CardDescription>
              Manage and customize translations for your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Controls */}
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
                <Button variant="outline" size="sm" onClick={exportTranslations}>
                  <Download className="w-4 h-4 mr-2" />
                  {t('admin.translations.export')}
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('admin.translations.import')}
                </Button>
              </div>
            </div>

            {/* Translation List */}
            <div className="border rounded-lg">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
                <div className="col-span-4">{t('admin.translations.key')}</div>
                <div className="col-span-6">{t('admin.translations.value')}</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredTranslations.map(([key, value]) => {
                  const stringValue = String(value);
                  return (
                    <div key={key} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                      <div className="col-span-4">
                        <div className="flex flex-col gap-1">
                          <code className="text-sm font-mono text-blue-600">{key}</code>
                          <Badge variant="outline" className="w-fit">
                            {key.split('.')[0]}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-6">
                        {editingKey === key ? (
                          <Textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="min-h-[60px]"
                            autoFocus
                          />
                        ) : (
                          <div className="text-sm leading-relaxed min-h-[60px] flex items-center">
                            {stringValue}
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 flex gap-2 justify-center">
                        {editingKey === key ? (
                          <>
                            <Button size="sm" onClick={handleSave}>
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel}>
                              {t('common.cancel')}
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEdit(key, stringValue)}
                          >
                            {t('common.edit')}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TranslationManagement;
