import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAccessibility } from "@/contexts/AccessibilityContext"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => {
  const { accessibilityMode } = useAccessibility();
  const accessibilityClasses = accessibilityMode
    ? "min-w-[44px] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
    : "";
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-primary)] bg-[var(--color-surface)] ring-offset-[var(--color-background)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:text-[var(--color-surface)] font-family-[var(--font-family)]",
        accessibilityClasses,
        className
      )}
      role={accessibilityMode ? "checkbox" : undefined}
      aria-checked={accessibilityMode ? (checked === 'indeterminate' ? 'mixed' : !!checked) : undefined}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
