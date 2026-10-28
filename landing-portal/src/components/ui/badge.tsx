import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium leading-5", {
  variants: {
    variant: {
      default: "bg-paper text-ink",
      brand: "bg-peach text-brand",
      lemon: "bg-lemon text-ink",
      outline: "border border-line bg-panel text-muted",
      danger: "bg-danger/10 text-danger",
      dark: "bg-deep text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;
function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
