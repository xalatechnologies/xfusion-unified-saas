import React from "react";
import { SearchResult } from "@/lib/database/search";
import { SearchResultItem } from "./SearchResultItem";
import { RecentSearches } from "./RecentSearches";
import { SearchShortcuts } from "./SearchShortcuts";
import { Loader2 } from "lucide-react";
import { SearchEmpty } from "./SearchEmpty";
import { SearchLoading } from "./SearchLoading";

interface RecentSearch {
  query: string;
  timestamp: Date;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onResultClick: (result: SearchResult) => void;
  selectedIndex: number;
  recentSearches?: RecentSearch[];
  showShortcuts?: boolean;
  onRecentSearchClick?: (query: string) => void;
  onClearHistory?: () => void;
  onRemoveFromHistory?: (query: string) => void;
}

export const SearchResults = ({ 
  results, 
  isLoading, 
  query, 
  onResultClick, 
  selectedIndex,
  recentSearches = [],
  showShortcuts = false,
  onRecentSearchClick,
  onClearHistory,
  onRemoveFromHistory
}: SearchResultsProps) => {
  // Show shortcuts when query is empty and showShortcuts is true
  if (showShortcuts && !query.trim()) {
    return <SearchShortcuts />;
  }

  // Show recent searches when query is empty and there are recent searches
  if (!query.trim() && recentSearches.length > 0 && onRecentSearchClick && onClearHistory && onRemoveFromHistory) {
    return (
      <RecentSearches
        recentSearches={recentSearches}
        onSearchSelect={onRecentSearchClick}
        onClearRecent={onRemoveFromHistory}
        onClearAll={onClearHistory}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
        <SearchLoading />
      </div>
    );
  }

  if (!query.trim() || results.length === 0) {
    if (query.trim() && results.length === 0) {
      return (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          <SearchEmpty query={query} />
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
