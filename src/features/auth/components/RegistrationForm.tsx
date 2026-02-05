"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import Form, { type FormProps } from "@/components/Form";

import { RegisteredUser, RegistrationInput } from "@/features/auth/models";
import { mapFormDataToUserCreate } from "../adapters/mappers";

import { EmailFormField } from "@/components/EmailFormField";
import { PasswordFormField } from "@/components/PasswordFormField";
import { FormRow } from "@/components/FormRow";
import { SubmitButton } from "@/components/SubmitButton";

interface Props extends Omit<FormProps, "onSubmit"> {
  className?: string;
  disabled: boolean;
  onSubmit: (userCreate: RegistrationInput) => Promise<RegisteredUser>;
}

export type RegistrationFormData = {
  email: string;
  password: string;
};

const INITIAL_FORM_DATA: RegistrationFormData = {
  email: "",
  password: "",
};

export default function RegistrationForm({
  className,
  disabled = false,
  onSubmit,
  ...rest
}: Props) {
  const [formData, setFormData] =
    useState<RegistrationFormData>(INITIAL_FORM_DATA);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const canSubmit = isEmailValid && isPasswordValid && !disabled;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowErrors(true);
    if (!canSubmit) return;

    const userCreate = mapFormDataToUserCreate(formData);
    await onSubmit(userCreate);

    setFormData(INITIAL_FORM_DATA);
    setShowErrors(false);
  };

  return (
    <Form
      {...rest}
      className={cn("flex flex-col gap-y-2", className)}
      onSubmit={handleSubmit}
    >
      <EmailFormField
        value={formData.email}
        onChange={(email) => setFormData((prev) => ({ ...prev, email }))}
        onValidityChange={setIsEmailValid}
        isDisabled={disabled}
        isShowErrors={showErrors}
      />

      <PasswordFormField
        value={formData.password}
        onChange={(password) => setFormData((prev) => ({ ...prev, password }))}
        onValidityChange={setIsPasswordValid}
        isDisabled={disabled}
        isShowErrors={showErrors}
      />

      <FormRow>
        <SubmitButton
          className={cn("col-span-9 col-start-4")}
          disabled={disabled}
        >
          Register
        </SubmitButton>
      </FormRow>
    </Form>
  );
}
