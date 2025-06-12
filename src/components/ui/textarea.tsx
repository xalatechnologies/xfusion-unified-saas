import * as React from "react"

import { cn } from "@/lib/utils"
import { useAccessibility } from "@/contexts/AccessibilityContext"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    const { accessibilityMode } = useAccessibility()
    const accessibilityClasses = accessibilityMode
      ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 min-w-[44px] min-h-[44px]"
      : ""
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] ring-offset-[var(--color-background)] placeholder:text-[var(--color-muted)] disabled:cursor-not-allowed disabled:opacity-50 font-family-[var(--font-family)]",
          accessibilityClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
