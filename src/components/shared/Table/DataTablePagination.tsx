import * as React from 'react';
import { Button } from '../Button';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../Select';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

/**
 * Shared DataTablePagination for all tables.
 * TODO: Add first/last, ellipsis, mobile, etc.
 */
export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className
}) => {
  return (
    <nav className={`flex items-center justify-between gap-4 px-6 py-3 border-t border-gray-100 bg-white rounded-b-xl ${className || ''}`} aria-label="Pagination">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">Prev</Button>
        <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">Next</Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <Select value={String(pageSize)} onValueChange={v => onPageSizeChange?.(Number(v))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map(size => (
              <SelectItem key={size} value={String(size)}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}; 