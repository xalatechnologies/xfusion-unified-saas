
import React from "react";
import { SearchResult } from "@/lib/database/search";
import { SearchResultItem } from "./SearchResultItem";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onResultClick: (result: SearchResult) => void;
  selectedIndex: number;
}

export const SearchResults = ({ 
  results, 
  isLoading, 
  query, 
  onResultClick, 
  selectedIndex 
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
        <div className="p-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Searching...</span>
        </div>
      </div>
    );
  }

  if (!query.trim() || results.length === 0) {
    if (query.trim() && results.length === 0) {
      return (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          <div className="p-4 text-center">
            <span className="text-sm text-gray-500">No results found for "{query}"</span>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs text-gray-500 px-2 py-1 mb-1">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </div>
        {results.map((result, index) => (
          <SearchResultItem
            key={`${result.entity_type}-${result.entity_id}`}
            result={result}
            onClick={() => onResultClick(result)}
            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};
