
import { useState, useEffect } from 'react';
import { databaseApi } from '@/lib/database';

interface Translation {
  id: string;
  translation_key: string;
  language: string;
  value: string;
  category: string | null;
  is_custom: boolean | null;
}

export const useGlobalTranslations = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const loadTranslations = async () => {
    try {
      setLoading(true);
      const [translationsData, languagesData, categoriesData] = await Promise.all([
        databaseApi.getAllTranslations(),
        databaseApi.getLanguages(),
        databaseApi.getCategories()
      ]);
      
      setTranslations(translationsData);
      setLanguages(languagesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTranslation = (key: string, language: string = 'en'): string => {
    const translation = translations.find(
      t => t.translation_key === key && t.language === language
    );
    return translation?.value || key;
  };

  const getTranslationsByLanguage = (language: string) => {
    return translations.filter(t => t.language === language);
  };

  const getTranslationsByCategory = (category: string) => {
    return translations.filter(t => t.category === category);
  };

  useEffect(() => {
    loadTranslations();
  }, []);

  return {
    translations,
    loading,
    languages,
    categories,
    getTranslation,
    getTranslationsByLanguage,
    getTranslationsByCategory,
    refreshTranslations: loadTranslations
  };
};
