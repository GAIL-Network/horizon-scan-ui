import { useEffect } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { FormField } from "@/components/FormField";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
  isDisabled?: boolean;
  isShowErrors: boolean;
};

const passwordSchema = z.string();
// TODO
// .min(12, "Password must be at least 12 characters")
// .regex(/[A-Z]/, "Password must contain an uppercase letter")
// .regex(/[a-z]/, "Password must contain a lowercase letter")
// .regex(/[0-9]/, "Password must contain a number")
// .regex(/[^\w\s]/, "Password must contain a special character")
function validate(password: string): string | null {
  const result = passwordSchema.safeParse(password);
  return result.success ? null : result.error.issues[0].message;
}

export function PasswordFormField({
  value,
  onChange,
  onValidityChange,
  isDisabled = false,
  isShowErrors,
}: Props) {
  const error = validate(value);
  const isValid = error === null;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <FormField
      label="Password"
      error={isShowErrors ? (error ?? undefined) : undefined}
    >
      <input
        className={cn(
          "w-full rounded border p-2",
          isShowErrors && error && "border-red-500",
        )}
        name="password"
        type="password"
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormField>
  );
}
