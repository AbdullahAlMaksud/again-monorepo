import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn("flex min-h-20 w-full resize-y rounded-lg border border-input bg-panel px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/80 focus:border-brand/50 focus:ring-2 focus:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
