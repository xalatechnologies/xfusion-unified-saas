export { Button, buttonVariants } from '../ui/button';
export * from '../ui/button';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Accessibility: Warn if icon-only button is missing aria-label
    if (
      process.env.NODE_ENV === "development" &&
      size === "icon" &&
      !props["aria-label"]
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Button] Icon-only buttons must have an aria-label for accessibility."
      );
    }
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
    );
  }
); 