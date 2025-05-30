
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, TranslationKeys } from '@/types/i18n';
import { translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof TranslationKeys) => string;
  updateTranslation: (key: keyof TranslationKeys, value: string) => void;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const [customTranslations, setCustomTranslations] = useState<Partial<TranslationKeys>>({});

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'no' as Language, name: 'Norsk', flag: '🇳🇴' },
  ];

  useEffect(() => {
    // Load custom translations from localStorage when language changes
    const customTranslationsData = localStorage.getItem(`translations_${language}`);
    if (customTranslationsData) {
      try {
        const parsed = JSON.parse(customTranslationsData);
        setCustomTranslations(parsed);
      } catch (error) {
        console.error('Failed to parse custom translations:', error);
        setCustomTranslations({});
      }
    } else {
      setCustomTranslations({});
    }
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const updateTranslation = (key: keyof TranslationKeys, value: string) => {
    setCustomTranslations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const t = (key: keyof TranslationKeys): string => {
    // First check custom translations, then fall back to default translations
    return customTranslations[key] || translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    updateTranslation,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
