import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Card variants:
// - default: Standard card
// - blue, green, purple, orange: Left border color
// - dashed: Dashed border
// - shadow: Extra shadow
// - gradient: Gradient background
// - soft: Soft shadow
// - glass: Glass-like background
// - layered: Layered background
const cardVariants = cva(
  "rounded-[var(--radius-lg)] border border-[var(--card-border,var(--color-border))] bg-[var(--card,var(--color-surface))] text-[var(--color-text)] shadow-[var(--card-shadow,var(--shadow-xs))] font-family-[var(--font-family)] max-w-full w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto",
  {
    variants: {
      variant: {
        default: "",
        blue: "border-l-4 border-l-[var(--color-primary)]",
        green: "border-l-4 border-l-[var(--color-success)]",
        purple: "border-l-4 border-l-[#a78bfa]",
        orange: "border-l-4 border-l-[var(--color-accent)]",
        red: "border-l-4 border-l-[var(--color-error)]",
        dashed: "border-dashed border-2 border-[var(--color-border)]",
        shadow: "shadow-[var(--shadow-lg)]",
        soft: "shadow-[var(--shadow-md)] bg-[var(--color-surface)]/80",
        gradient: "bg-[var(--primary-gradient)] text-[var(--color-surface)] border-none shadow-[var(--shadow-md)]",
        glass: "bg-[var(--color-surface)]/60 backdrop-blur-[var(--blur-md)] border border-[var(--color-border)] shadow-[var(--shadow-xs)]",
        layered: "bg-[var(--color-surface)] shadow-[var(--shadow-xs)] before:content-[''] before:absolute before:inset-0 before:rounded-[var(--radius-lg)] before:bg-[var(--color-primary)]/5 before:-z-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-[var(--color-text)] font-family-[var(--font-family)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-muted)] font-family-[var(--font-family)]", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 sm:p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 sm:p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
