import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Variants:
// - default: Design system primary
// - primary: Blue (bg-blue-600 hover:bg-blue-700 text-white)
// - gradient: Gradient blue-indigo (bg-gradient-to-r from-blue-600 to-indigo-600 ...)
// - whiteBlur: White/blurred (bg-white/20 backdrop-blur-sm ...)
// - destructive, outline, secondary, ghost, link: as before
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-primary)_90%,white_10%)] border-none",
        primary: "bg-blue-600 hover:bg-blue-700 text-white border-none",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-none",
        whiteBlur: "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white transition-all duration-200",
        destructive:
          "bg-[var(--color-error)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-error)_90%,white_10%)] border-none",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_80%,white_20%)] border-none",
        ghost: "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)] border-none",
        link: "bg-transparent text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-accent)] border-none",
      },
      size: {
        default: "h-10 px-4 py-2 text-[var(--font-size-md)]",
        sm: "h-9 rounded-[var(--radius-sm)] px-3 text-[var(--font-size-sm)]",
        lg: "h-11 rounded-[var(--radius-lg)] px-8 text-[var(--font-size-lg)]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          "rounded-[var(--radius-md)] font-family-[var(--font-family)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
