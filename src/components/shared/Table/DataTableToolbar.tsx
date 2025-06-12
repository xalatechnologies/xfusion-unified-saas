import * as React from 'react';
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface DataTableToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared DataTableToolbar for search, filters, actions, etc.
 */
export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ children, className }) => {
  const { accessibilityMode } = useAccessibility();
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 bg-white border-b border-gray-100 shadow-sm rounded-t-xl ${className || ''}`}
      {...(accessibilityMode ? { role: 'toolbar', 'aria-label': 'Table controls' } : {})}
    >
      {children}
    </div>
  );
}; 