import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button.variants";
import type { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}
