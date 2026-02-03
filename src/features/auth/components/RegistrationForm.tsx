"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import Form, { type FormProps } from "@/components/Form";
import type { FormErrors } from "@/types/form-errors";
import { FormField } from "@/components/FormField";

import { NewRegisteredUser, UserCreate } from "@/features/auth/models";
import { mapFormDataToUserCreate } from "../adapters/mappers";

interface Props extends Omit<FormProps, "onSubmit"> {
  className?: string;
  disabled: boolean;
  onSubmit: (useCreate: UserCreate) => Promise<NewRegisteredUser>;
  labelClassName?: string;
  inputClassName?: string;
}

export type RegistrationFormData = {
  email: string;
  password: string;
};

const INITIAL_REGISTRATION_FORM_DATA = { email: "", password: "" };

function validateForm(
  formData: RegistrationFormData,
): FormErrors<RegistrationFormData> {
  const formErrors: FormErrors<RegistrationFormData> = {};
  if (!formData.email) {
    formErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    formErrors.email = "Enter a valid email address";
  }

  if (!formData.password) {
    formErrors.password = "Password is required";
  } else {
    if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 12 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      formErrors.password = "Password must contain an uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      formErrors.password = "Password must contain a lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      formErrors.password = "Password must contain a number";
    } else if (!/[^\w\s]/.test(formData.password)) {
      formErrors.password = "Password must contain a special character";
    }
  }

  return formErrors;
}

export default function RegistrationForm({
  className,
  labelClassName,
  inputClassName,
  disabled = false,
  onSubmit,
  ...rest
}: Props) {
  const [formData, setFormData] = useState<RegistrationFormData>(
    INITIAL_REGISTRATION_FORM_DATA,
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors<RegistrationFormData>>({});

  const resetForm = () => {
    setFormData(INITIAL_REGISTRATION_FORM_DATA);
  };

  const handleChange = (patch: Partial<RegistrationFormData>) => {
    setFormData({ ...formData, ...patch });

    if (!hasSubmitted) return;

    setErrors(validateForm(formData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled) return;

    setHasSubmitted(true);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userCreate = mapFormDataToUserCreate(formData);
    await onSubmit(userCreate);
    setHasSubmitted(false);
    resetForm();
    setErrors({});
  };

  return (
    <Form
      {...rest}
      className={cn("flex flex-col gap-y-2", className)}
      onSubmit={handleSubmit}
    >
      <FormField
        label="Email"
        error={errors.email}
        labelClassName={labelClassName}
      >
        <input
          className={cn(
            "w-full rounded border p-2",
            errors.email && "border-red-500",
            inputClassName,
          )}
          name="email"
          type="email"
          value={formData.email}
          disabled={disabled}
          onChange={(e) => handleChange({ email: e.target.value })}
        />
      </FormField>

      <FormField
        label="Password"
        error={errors.password}
        labelClassName={labelClassName}
      >
        <input
          className={cn(
            "w-full rounded border p-2",
            errors.password && "border-red-500",
            inputClassName,
          )}
          name="password"
          type="password"
          value={formData.password}
          disabled={disabled}
          onChange={(e) => handleChange({ password: e.target.value })}
        />
      </FormField>
    </Form>
  );
}
