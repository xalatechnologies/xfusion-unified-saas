
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchApi, SearchResult } from "@/lib/database/search";
import { useSearchHistory } from "./useSearchHistory";

export const useGlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [entityTypes, setEntityTypes] = useState<string[]>([
    'organizations', 'users', 'subscriptions', 'documentation'
  ]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const currentAnalyticsIdRef = useRef<string | null>(null);
  
  const { 
    recentSearches, 
    addToHistory, 
    clearHistory, 
    removeFromHistory 
  } = useSearchHistory();

  const performSearch = useCallback(async (searchQuery: string, types: string[] = entityTypes) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      setShowShortcuts(false);
      return;
    }

    setIsLoading(true);
    setShowShortcuts(false);
    
    try {
      const searchResults = await searchApi.globalSearch(searchQuery, types);
      setResults(searchResults);
      setSelectedIndex(-1);
      
      // Add to search history
      addToHistory(searchQuery);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [entityTypes, addToHistory]);

  const debouncedSearch = useCallback((searchQuery: string, types: string[] = entityTypes) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery, types);
    }, 300);
  }, [performSearch, entityTypes]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      setIsOpen(true);
      debouncedSearch(newQuery, entityTypes);
    } else {
      setIsOpen(false);
      setResults([]);
      setSelectedIndex(-1);
      setShowShortcuts(false);
    }
  }, [debouncedSearch, entityTypes]);

  const handleEntityTypesChange = useCallback((types: string[]) => {
    setEntityTypes(types);
    if (query.trim()) {
      debouncedSearch(query, types);
    }
  }, [query, debouncedSearch]);

  const handleResultClick = useCallback((result: SearchResult) => {
    // Log the click if we have an analytics ID
    if (currentAnalyticsIdRef.current) {
      searchApi.logSearchClick(
        currentAnalyticsIdRef.current,
        result.entity_id,
        result.entity_type
      );
    }

    // Navigate to the result
    navigate(result.url);
    
    // Close search
    setQuery("");
    setIsOpen(false);
    setResults([]);
    setSelectedIndex(-1);
    setShowShortcuts(false);
  }, [navigate]);

  const handleRecentSearchClick = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(true);
    performSearch(searchQuery, entityTypes);
  }, [performSearch, entityTypes]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (results.length > 0) {
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (results.length > 0) {
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setQuery("");
        setIsOpen(false);
        setResults([]);
        setSelectedIndex(-1);
        setShowShortcuts(false);
        break;
      case '?':
        if (!query.trim()) {
          event.preventDefault();
          setShowShortcuts(true);
        }
        break;
    }
  }, [isOpen, results, selectedIndex, handleResultClick, query]);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setShowShortcuts(false);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsOpen(true);
    if (!query.trim() && recentSearches.length > 0) {
      // Show recent searches when focused with empty query
      setShowShortcuts(false);
    } else if (!query.trim()) {
      setShowShortcuts(true);
    }
  }, [query, recentSearches.length]);

  // Focus search with Cmd+K
  const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
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
  };
};
