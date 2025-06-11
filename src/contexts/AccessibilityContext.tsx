import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccessibilityContextType {
  accessibilityMode: boolean;
  toggleAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const toggleAccessibility = () => setAccessibilityMode((prev) => !prev);

  return (
    <AccessibilityContext.Provider value={{ accessibilityMode, toggleAccessibility }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within an AccessibilityProvider");
  return context;
} 