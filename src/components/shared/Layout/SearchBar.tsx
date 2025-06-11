import { Search, Command } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchResults } from "@/components/search/SearchResults";
import { SearchFilters } from "@/components/search/SearchFilters";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { useRef, useEffect } from "react";

export const SearchBar = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    query,
    results,
    isLoading,
    isOpen,
    selectedIndex,
    entityTypes,
    recentSearches,
    showShortcuts,
    handleQueryChange,
    handleResultClick,
    handleKeyDown,
    handleClickOutside,
    handleEntityTypesChange,
    handleRecentSearchClick,
    handleSearchFocus,
    clearHistory,
    removeFromHistory
  } = useGlobalSearch();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the hook with real-time updates
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDownEvent);
      return () => {
        document.removeEventListener('keydown', handleKeyDownEvent);
      };
    }
  }, [isOpen, handleKeyDown]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutsideEvent = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideEvent);
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideEvent);
      };
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div className="flex-1 max-w-4xl">
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations, users, subscriptions..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={handleSearchFocus}
              className="pl-10 pr-16 w-full focus-visible:ring-2 focus-visible:ring-primary/20 border-muted-foreground/20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary" className="text-xs font-normal px-1.5 py-0.5">
                <Command className="h-3 w-3 mr-1" />
                K
              </Badge>
            </div>
          </div>
        </form>
        {isOpen && (query.trim() || recentSearches.length > 0 || showShortcuts) && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2">
            <SearchResults
              results={results}
              isLoading={isLoading}
              query={query}
              onResultClick={handleResultClick}
              selectedIndex={selectedIndex}
              recentSearches={recentSearches}
              showShortcuts={showShortcuts}
              onRecentSearchClick={handleRecentSearchClick}
              onClearHistory={clearHistory}
              onRemoveFromHistory={removeFromHistory}
            />
          </div>
        )}
        {query.trim() && (
          <div className="absolute top-full left-0 right-0 z-40 mt-2">
            <SearchFilters
              selectedTypes={entityTypes}
              onTypesChange={handleEntityTypesChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
