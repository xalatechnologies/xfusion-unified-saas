import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 font-family-[var(--font-family)]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-primary)_80%,white_20%)]",
        secondary:
          "border-transparent bg-[var(--color-secondary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_80%,white_20%)]",
        destructive:
          "border-transparent bg-[var(--color-error)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-error)_80%,white_20%)]",
        outline: "text-[var(--color-text)] border-[var(--color-border)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, role = 'status', ...props }: BadgeProps) {
  // ARIA: role='status' by default for status badges. Override if needed.
  return (
    <div className={cn(badgeVariants({ variant }), className)} role={role} {...props} />
  )
}

export { Badge, badgeVariants }
