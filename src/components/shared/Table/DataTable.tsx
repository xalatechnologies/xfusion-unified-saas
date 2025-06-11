import * as React from 'react';

interface DataTableProps {
  columns: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared DataTable base component.
 * TODO: Add advanced features (toolbar, pagination, sorting, etc.)
 */
export const DataTable: React.FC<DataTableProps> = ({ columns, children, className }) => {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto ${className || ''}`}>
      <table className="min-w-full text-sm align-middle">
        <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
          {columns}
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}; 