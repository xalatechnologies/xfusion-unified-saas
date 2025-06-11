import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

interface FilterPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared FilterPopover for all filter UIs.
 */
export const FilterPopover: React.FC<FilterPopoverProps> = ({ trigger, children, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={`w-80 ${className || ''}`}>{children}</PopoverContent>
    </Popover>
  );
}; 