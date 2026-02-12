import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button.variants";
import type { VariantProps } from "class-variance-authority";

type CVAVariants = VariantProps<typeof buttonVariants>;
type ButtonVariant = CVAVariants["variant"];
type ButtonVariantWithAlias = ButtonVariant | "primary";

function normalizeVariant(
  variant: ButtonVariantWithAlias | undefined,
): ButtonVariant {
  return variant === "primary" ? "default" : variant;
}

export interface ButtonProps
  extends
    Omit<React.ComponentPropsWithoutRef<"button">, "color">,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  variant?: ButtonVariantWithAlias;
}

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
      className={cn(
        buttonVariants({ variant: normalizeVariant(variant), size }),
        className,
      )}
    />
  );
}
