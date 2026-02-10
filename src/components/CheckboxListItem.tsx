import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxListItemProps extends Omit<
  React.ComponentPropsWithoutRef<"li">,
  "onChange"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function CheckboxListItem({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  children,
  ...rest
}: CheckboxListItemProps) {
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false,
  );

  const value = isControlled ? checked : internalChecked;

  function toggle() {
    if (disabled) return;

    const next = !value;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  }

  return (
    <li
      role="checkbox"
      aria-checked={value}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
      className={cn(
        "flex cursor-pointer items-center gap-3 border-t border-r border-l border-gray-300 p-2",
        "first:rounded-tl first:rounded-tr",
        "last:rounded-br last:rounded-bl last:border-b",
        "focus:ring-2 focus:ring-slate-400 focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...rest}
    >
      <input
        type="checkbox"
        checked={value}
        readOnly
        tabIndex={-1}
        className="h-4 w-4"
      />

      <div className="flex-1">{children}</div>
    </li>
  );
}
