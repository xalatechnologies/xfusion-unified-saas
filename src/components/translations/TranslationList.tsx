
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationRow } from "./TranslationRow";

interface TranslationListProps {
  filteredTranslations: [string, string][];
  onSave: (key: string, value: string) => void;
}

export const TranslationList = ({ filteredTranslations, onSave }: TranslationListProps) => {
  const { t } = useLanguage();

  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 font-medium">
        <div className="col-span-4">{t('admin.translations.key')}</div>
        <div className="col-span-6">{t('admin.translations.value')}</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredTranslations.map(([key, value]) => (
          <TranslationRow
            key={key}
            translationKey={key}
            value={value}
            onSave={onSave}
          />
        ))}
      </div>
    </div>
  );
};
