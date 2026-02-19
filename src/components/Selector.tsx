import { cn } from "@/lib/utils";
import { useMemo } from "react";

export type SelectItem<V = unknown> = {
  id: string | number;
  value: V;
  label: string;
};

export type SelectorProps<T extends SelectItem> = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "onChange" | "value"
> & {
  value: T | null;
  options: readonly T[];
  onChange: (item: T) => void;
};

export function Selector<T extends SelectItem>({
  className,
  value,
  options,
  onChange,
  ...rest
}: SelectorProps<T>) {
  // Build id → option map once
  const optionMap = useMemo(() => {
    const map = new Map<string, T>();
    for (const opt of options) {
      map.set(String(opt.id), opt);
    }
    return map;
  }, [options]);

  return (
    <select
      value={value ? String(value.id) : ""}
      onChange={(e) => {
        const selected = optionMap.get(e.target.value);
        if (selected) onChange(selected);
      }}
      className={cn("rounded border px-2 py-1 text-sm", className)}
      {...rest}
    >
      {options.map((opt) => (
        <option
          key={opt.id}
          value={opt.id}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}
