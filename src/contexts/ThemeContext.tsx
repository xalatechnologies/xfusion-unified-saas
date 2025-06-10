
import React, { createContext, useContext, useEffect, useState } from 'react';
import { databaseApi } from '@/lib/database';

interface ThemeConfig {
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
  themeConfig: ThemeConfig | null;
  loading: boolean;
  refreshTheme: () => Promise<void>;
  applyTheme: (config: ThemeConfig) => void;
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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const applyTheme = (config: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply colors as CSS custom properties
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--color-background', config.colors.background);
    root.style.setProperty('--color-surface', config.colors.surface);
    root.style.setProperty('--color-text', config.colors.text);
    root.style.setProperty('--color-text-secondary', config.colors.textSecondary);
    
    // Apply typography
    root.style.setProperty('--font-family', config.typography.fontFamily);
    root.style.setProperty('--font-size-base', config.typography.fontSize.base);
    root.style.setProperty('--font-size-lg', config.typography.fontSize.lg);
    root.style.setProperty('--font-size-xl', config.typography.fontSize.xl);
    
    // Apply spacing
    root.style.setProperty('--spacing-unit', config.spacing.unit);
    
    // Apply border radius
    root.style.setProperty('--radius-sm', config.borderRadius.sm);
    root.style.setProperty('--radius-md', config.borderRadius.md);
    root.style.setProperty('--radius-lg', config.borderRadius.lg);
    
    // Apply shadows
    root.style.setProperty('--shadow-sm', config.shadows.sm);
    root.style.setProperty('--shadow-md', config.shadows.md);
    root.style.setProperty('--shadow-lg', config.shadows.lg);
    
    setThemeConfig(config);
  };

  const refreshTheme = async () => {
    try {
      setLoading(true);
      const activeTheme = await databaseApi.getActiveTheme();
      
      if (activeTheme && activeTheme.theme_config) {
        const config = activeTheme.theme_config as ThemeConfig;
        applyTheme(config);
      } else {
        applyTheme(defaultTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      applyTheme(defaultTheme);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeConfig, loading, refreshTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
