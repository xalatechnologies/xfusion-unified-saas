
import { useState, useCallback, useEffect } from "react";

interface RecentSearch {
  query: string;
  timestamp: Date;
}

const STORAGE_KEY = 'xfusion-search-history';
const MAX_RECENT_SEARCHES = 10;

export const useSearchHistory = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const searches = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setRecentSearches(searches);
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Save recent searches to localStorage
  const saveToStorage = useCallback((searches: RecentSearch[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, []);

  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches(prev => {
      // Remove existing query if it exists
      const filtered = prev.filter(search => search.query !== query);
      
      // Add new search at the beginning
      const newSearches = [
        { query, timestamp: new Date() },
        ...filtered
      ].slice(0, MAX_RECENT_SEARCHES);

      saveToStorage(newSearches);
      return newSearches;
    });
  }, [saveToStorage]);

  const clearHistory = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeFromHistory = useCallback((query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search.query !== query);
      saveToStorage(filtered);
      return filtered;
    });
  }, [saveToStorage]);

  return {
    recentSearches,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};
