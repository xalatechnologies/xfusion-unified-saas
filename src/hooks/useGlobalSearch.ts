
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchApi, SearchResult } from "@/lib/database/search";

export const useGlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const currentAnalyticsIdRef = useRef<string | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchApi.globalSearch(searchQuery);
      setResults(searchResults);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);
  }, [performSearch]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      setIsOpen(true);
      debouncedSearch(newQuery);
    } else {
      setIsOpen(false);
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [debouncedSearch]);

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
  }, [navigate]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
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
        break;
    }
  }, [isOpen, results, selectedIndex, handleResultClick]);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

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
    handleQueryChange,
    handleResultClick,
    handleKeyDown,
    handleClickOutside
  };
};
