
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TranslationRowProps {
  translationKey: string;
  value: string;
  onSave: (key: string, value: string) => void;
}

export const TranslationRow = ({ translationKey, value, onSave }: TranslationRowProps) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  const handleSave = () => {
    onSave(translationKey, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
      <div className="col-span-4">
        <div className="flex flex-col gap-1">
          <code className="text-sm font-mono text-blue-600">{translationKey}</code>
          <Badge variant="outline" className="w-fit">
            {translationKey.split('.')[0]}
          </Badge>
        </div>
      </div>
      <div className="col-span-6">
        {isEditing ? (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="min-h-[60px]"
            autoFocus
          />
        ) : (
          <div className="text-sm leading-relaxed min-h-[60px] flex items-center">
            {value}
          </div>
        )}
      </div>
      <div className="col-span-2 flex gap-2 justify-center">
        {isEditing ? (
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
            onClick={handleEdit}
          >
            {t('common.edit')}
          </Button>
        )}
      </div>
    </div>
  );
};
