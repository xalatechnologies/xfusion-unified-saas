import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[var(--font-size-md)] font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-[var(--radius-md)] font-family-[var(--font-family)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-primary)_90%,white_10%)] border-none shadow-[var(--shadow-xs)]",
        primary: "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-primary)_90%,white_10%)] border-none shadow-[var(--shadow-xs)]",
        gradient: "bg-[var(--primary-gradient)] text-[var(--color-surface)] border-none shadow-[var(--shadow-md)] hover:brightness-105",
        whiteBlur: "bg-[var(--color-surface)]/80 backdrop-blur-[var(--blur-md)] border border-[var(--color-border)] text-[var(--color-primary)] shadow-[var(--shadow-xs)] hover:bg-[var(--color-surface)]/90 transition-all duration-200",
        shadowed: "bg-[var(--color-primary)] text-[var(--color-surface)] border-none shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-md)]",
        destructive:
          "bg-[var(--color-error)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-error)_90%,white_10%)] border-none shadow-[var(--shadow-xs)]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)] shadow-[var(--shadow-xs)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-surface)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_80%,white_20%)] border-none shadow-[var(--shadow-xs)]",
        ghost: "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)] border-none shadow-none",
        link: "bg-transparent text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-accent)] border-none shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2 text-[var(--font-size-md)] min-w-[44px] min-h-[44px]",
        sm: "h-9 rounded-[var(--radius-sm)] px-3 text-[var(--font-size-sm)] min-w-[44px] min-h-[44px]",
        lg: "h-11 rounded-[var(--radius-lg)] px-8 text-[var(--font-size-lg)] min-w-[44px] min-h-[44px]",
        icon: "h-10 w-10 p-0 min-w-[44px] min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { buttonVariants } 