
import React from "react";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentSearch {
  query: string;
  timestamp: Date;
}

interface RecentSearchesProps {
  recentSearches: RecentSearch[];
  onSearchSelect: (query: string) => void;
  onClearRecent: (query: string) => void;
  onClearAll: () => void;
}

export const RecentSearches = ({ 
  recentSearches, 
  onSearchSelect, 
  onClearRecent, 
  onClearAll 
}: RecentSearchesProps) => {
  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            Recent searches
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        </div>
        
        <div className="space-y-1">
          {recentSearches.slice(0, 5).map((search, index) => (
            <div 
              key={index}
              className="flex items-center justify-between group hover:bg-gray-50 rounded px-2 py-1"
            >
              <button
                onClick={() => onSearchSelect(search.query)}
                className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900"
              >
                {search.query}
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onClearRecent(search.query)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
