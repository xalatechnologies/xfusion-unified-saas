import * as React from 'react';

interface DataTableProps {
  columns: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Enhanced, Apple-inspired DataTable base component.
 * - Zebra striping, sticky header shadow, soft card shadow, row hover/selection, responsive, accessible.
 * - Use with DataTableToolbar for a premium experience.
 */
export const DataTable: React.FC<DataTableProps> = ({ columns, children, className, ariaLabel }) => {
  // Sticky header shadow effect
  const tableRef = React.useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        setScrolled(tableRef.current.scrollTop > 0);
      }
    };
    const node = tableRef.current;
    if (node) node.addEventListener('scroll', handleScroll);
    return () => node && node.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={tableRef}
      className={`relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white shadow-lg overflow-x-auto transition-all ${className || ''}`}
      style={{ minWidth: 0 }}
    >
      <table
        className="min-w-full text-sm align-middle"
        aria-label={ariaLabel || 'Data table'}
        role="table"
      >
        <thead
          className={`sticky top-0 z-10 bg-white/95 border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-md' : ''}`}
        >
          {columns}
        </thead>
        <tbody>
          {React.Children.map(children, (row, i) =>
            React.isValidElement(row)
              ? React.cloneElement(row as React.ReactElement, {
                  className: `transition group ${i % 2 === 1 ? 'bg-gray-50/80' : 'bg-white'} hover:bg-blue-50/60 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2` +
                    (row.props.className ? ' ' + row.props.className : ''),
                  tabIndex: row.props.tabIndex ?? 0,
                  role: row.props.role ?? 'row',
                })
              : row
          )}
        </tbody>
      </table>
    </div>
  );
};

// Style tokens (for easy theming):
// - Card: rounded-2xl, shadow-lg, border-gray-200, bg-gradient-to-br
// - Header: sticky, bg-white/95, border-b, shadow-md
// - Row: zebra (bg-gray-50/80), hover:bg-blue-50/60, focus-within:ring-blue-500
// - Cell: py-4 px-6, text-base

// (Old DataTable removed; see enhanced version below) 