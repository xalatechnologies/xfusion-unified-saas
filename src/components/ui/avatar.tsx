import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  // Responsive: Avatar uses h-10 w-10 by default, but can be resized with className (e.g., sm:h-8 w-8, md:h-12 w-12, lg:h-16 w-16)
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full font-family-[var(--font-family)]",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// Enhanced AvatarImage with robust fallback on error
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);
  // Accessibility: Warn if AvatarImage is missing alt
  if (
    process.env.NODE_ENV === "development" &&
    (!('alt' in props) || !props.alt)
  ) {
     
    console.warn(
      "[AvatarImage] AvatarImage should have an alt attribute for accessibility."
    );
  }
  if (!props.src || hasError) return null;
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-[var(--color-muted)] font-family-[var(--font-family)]",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
