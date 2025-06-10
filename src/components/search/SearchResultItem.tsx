import React, { useState } from "react";
import { SearchResult } from "@/lib/database/search";
import { 
  Building2, 
  User, 
  CreditCard, 
  FileText, 
  ChevronRight, 
  Eye 
} from "lucide-react";
import { SearchResultPreview } from "./SearchResultPreview";

interface SearchResultItemProps {
  result: SearchResult;
  onClick: () => void;
  isSelected: boolean;
}

const getEntityIcon = (entityType: string) => {
  switch (entityType) {
    case 'organization':
      return Building2;
    case 'user':
      return User;
    case 'subscription':
      return CreditCard;
    case 'documentation':
      return FileText;
    default:
      return FileText;
  }
};

const getEntityColor = (entityType: string) => {
  switch (entityType) {
    case 'organization':
      return 'text-blue-600 bg-blue-50';
    case 'user':
      return 'text-green-600 bg-green-50';
    case 'subscription':
      return 'text-purple-600 bg-purple-50';
    case 'documentation':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getEntityLabel = (entityType: string) => {
  switch (entityType) {
    case 'organization':
      return 'Organization';
    case 'user':
      return 'User';
    case 'subscription':
      return 'Subscription';
    case 'documentation':
      return 'Documentation';
    default:
      return 'Item';
  }
};

export const SearchResultItem = ({ result, onClick, isSelected }: SearchResultItemProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const Icon = getEntityIcon(result.entity_type);
  const colorClass = getEntityColor(result.entity_type);
  const entityLabel = getEntityLabel(result.entity_type);

  return (
    <>
      <div
        className={`
          flex items-center p-3 rounded-lg cursor-pointer transition-colors
          ${isSelected 
            ? 'bg-blue-50 border-l-4 border-l-blue-500' 
            : 'hover:bg-gray-50'
          }
        `}
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass} mr-3`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900 truncate">
              {result.title}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {entityLabel}
            </span>
          </div>
          {result.subtitle && (
            <div className="text-sm text-gray-600 truncate mt-0.5">
              {result.subtitle}
            </div>
          )}
        </div>
        <button
          type="button"
          className="ml-2 p-1 rounded hover:bg-gray-100 focus:outline-none"
          aria-label="Preview details"
          onClick={e => {
            e.stopPropagation();
            setPreviewOpen(true);
          }}
        >
          <Eye className="w-4 h-4 text-gray-400" />
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
      </div>
      <SearchResultPreview result={result} open={previewOpen} onOpenChange={setPreviewOpen} />
    </>
  );
};
