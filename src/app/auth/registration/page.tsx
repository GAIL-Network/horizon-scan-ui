"use client";

import { useState } from "react";
import { toast } from "sonner";

import { RegisteredUser, RegistrationInput } from "@/features/auth/models";
import { useNewUser } from "@/features/auth/hooks/useNewUser";
import RegistrationForm from "@/features/auth/components/RegistrationForm";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";

export default function Registration() {
  const { actions: newUserActions } = useNewUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    user: RegistrationInput,
  ): Promise<RegisteredUser> => {
    setIsLoading(true);
    const promise = newUserActions.createNewUser(user);

    toast.promise(promise, {
      loading: "Creating account…",
      success: "Account created 🎉",
      error: (err) =>
        err instanceof Error ? err.message : "There was an error.",
    });
    try {
      const result = await promise;
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Create an account</Header>
      </Panel>
      <RegistrationForm
        disabled={isLoading}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
