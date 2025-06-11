import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 font-family-[var(--font-family)]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-primary)_80%,white_20%)]",
        secondary: "border-transparent bg-[var(--color-secondary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_80%,white_20%)]",
        destructive: "border-transparent bg-[var(--color-error)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-error)_80%,white_20%)]",
        outline: "text-[var(--color-text)] border-[var(--color-border)] bg-transparent",
        success: "border-transparent bg-[var(--color-success)] text-[var(--color-surface)]",
        warning: "border-transparent bg-[var(--color-warning)] text-[var(--color-accent-text)]",
        info: "border-transparent bg-[var(--color-info)] text-[var(--color-surface)]",
        accent: "border-transparent bg-[var(--color-accent)] text-[var(--color-accent-text)]",
        muted: "border-transparent bg-[var(--color-muted)] text-[var(--color-surface)]",
        card: "border-[var(--color-card-border)] bg-[var(--color-card)] text-[var(--color-text)]",
      },
      shape: {
        rounded: "rounded-[var(--radius-md)]",
        pill: "rounded-[var(--radius-full)]",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "pill",
    },
  }
)

// Badge is not intended to be interactive/clickable by default. If used as a button or link, min-w-[44px] min-h-[44px] should be applied for accessibility.
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, role = 'status', ...props }: BadgeProps) {
  // ARIA: role='status' by default for status badges. Override if needed.
  // Accessibility: Warn if Badge is used as a button or link without min-w-[44px] min-h-[44px]
  if (
    process.env.NODE_ENV === "development" &&
    ((props as any).as === 'button' || (props as any).as === 'a')
  ) {
    const classStr = className || '';
    if (!classStr.includes('min-w-[44px]') || !classStr.includes('min-h-[44px]')) {
       
      console.warn(
        '[Badge] Interactive badges (button or link) must have min-w-[44px] min-h-[44px] for accessibility.'
      );
    }
  }
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} role={role} {...props} />
  )
}

export { Badge, badgeVariants }
