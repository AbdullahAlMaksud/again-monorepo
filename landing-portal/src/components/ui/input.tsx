import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-panel px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-brand/50 focus:ring-2 focus:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
