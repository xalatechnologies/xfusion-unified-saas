import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button-variants"

// Variants:
// - default: Design system primary
// - primary: Blue (bg-blue-600 hover:bg-blue-700 text-white)
// - gradient: Gradient blue-indigo (bg-gradient-to-r from-blue-600 to-indigo-600 ...)
// - whiteBlur: White/blurred (bg-white/20 backdrop-blur-sm ...)
// - destructive, outline, secondary, ghost, link: as before

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // Accessibility: Warn if icon-only button is missing aria-label
    if (
      process.env.NODE_ENV === "development" &&
      size === "icon" &&
      !props["aria-label"]
    ) {
       
      console.warn(
        "[Button] Icon-only buttons must have an aria-label for accessibility."
      )
    }
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
