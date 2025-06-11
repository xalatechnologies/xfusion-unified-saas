import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { databaseApi } from '@/lib/database';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      lg: string;
      xl: string;
    };
  };
  spacing: {
    unit: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

interface ThemeContextType {
  theme: ThemeConfig | null;
  setTheme: (theme: ThemeConfig) => void;
  loading: boolean;
  refreshTheme: () => Promise<void>;
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#3B82F6",
    secondary: "#6B7280",
    accent: "#8B5CF6",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: "#111827",
    textSecondary: "#6B7280"
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: {
      base: "16px",
      lg: "18px",
      xl: "20px"
    }
  },
  spacing: {
    unit: "0.25rem"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig | null>(defaultTheme);
  const [loading, setLoading] = useState(true);

  const applyThemeToCSS = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--color-primary', themeConfig.colors.primary);
    root.style.setProperty('--color-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--color-accent', themeConfig.colors.accent);
    root.style.setProperty('--color-background', themeConfig.colors.background);
    root.style.setProperty('--color-surface', themeConfig.colors.surface);
    root.style.setProperty('--color-text', themeConfig.colors.text);
    root.style.setProperty('--color-text-secondary', themeConfig.colors.textSecondary);
    
    // Apply typography variables
    root.style.setProperty('--font-family', themeConfig.typography.fontFamily);
    root.style.setProperty('--font-size-base', themeConfig.typography.fontSize.base);
    root.style.setProperty('--font-size-lg', themeConfig.typography.fontSize.lg);
    root.style.setProperty('--font-size-xl', themeConfig.typography.fontSize.xl);
    
    // Apply spacing variables
    root.style.setProperty('--spacing-unit', themeConfig.spacing.unit);
    
    // Apply border radius variables
    root.style.setProperty('--border-radius-sm', themeConfig.borderRadius.sm);
    root.style.setProperty('--border-radius-md', themeConfig.borderRadius.md);
    root.style.setProperty('--border-radius-lg', themeConfig.borderRadius.lg);
    
    // Apply shadow variables
    root.style.setProperty('--shadow-sm', themeConfig.shadows.sm);
    root.style.setProperty('--shadow-md', themeConfig.shadows.md);
    root.style.setProperty('--shadow-lg', themeConfig.shadows.lg);
  };

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    applyThemeToCSS(newTheme);
  };

  const refreshTheme = useCallback(async () => {
    try {
      setLoading(true);
      const activeTheme = await databaseApi.getActiveTheme();
      if (activeTheme && activeTheme.theme_config) {
        // Safely parse the theme config with type assertion
        const themeConfig = activeTheme.theme_config as unknown as ThemeConfig;
        setTheme(themeConfig);
      } else {
        setTheme(defaultTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      setTheme(defaultTheme);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTheme();
  }, [refreshTheme]);

  useEffect(() => {
    if (theme) {
      applyThemeToCSS(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
