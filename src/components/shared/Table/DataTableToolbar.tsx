import * as React from 'react';

interface DataTableToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared DataTableToolbar for search, filters, actions, etc.
 */
export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 bg-white border-b border-gray-100 shadow-sm rounded-t-xl ${className || ''}`}
      role="toolbar"
      aria-label="Table controls"
    >
      {children}
    </div>
  );
}; 