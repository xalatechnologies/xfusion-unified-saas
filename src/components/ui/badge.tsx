import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge-variants"
import { useAccessibility } from "@/contexts/AccessibilityContext"

// Badge is not intended to be interactive/clickable by default. If used as a button or link, min-w-[44px] min-h-[44px] should be applied for accessibility.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  as?: string;
}

function Badge({ className, variant, shape, role = 'status', as, ...props }: BadgeProps) {
  const { accessibilityMode } = useAccessibility();
  // ARIA: role='status' by default for status badges. Override if needed.
  // Accessibility: Warn if Badge is used as a button or link without min-w-[44px] min-h-[44px]
  if (
    process.env.NODE_ENV === "development" &&
    (as === 'button' || as === 'a')
  ) {
    const classStr = className || '';
    if (!classStr.includes('min-w-[44px]') || !classStr.includes('min-h-[44px]')) {
      console.warn(
        '[Badge] Interactive badges (button or link) must have min-w-[44px] min-h-[44px] for accessibility.'
      );
    }
  }
  const accessibilityClasses = accessibilityMode && (as === 'button' || as === 'a')
    ? 'min-w-[44px] min-h-[44px]'
    : '';
  return (
    <div className={cn(badgeVariants({ variant, shape }), accessibilityClasses, className)} role={accessibilityMode ? role : undefined} {...props} />
  )
}

export { Badge }
