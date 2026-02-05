"use client";

import { useRouter } from "next/navigation";

import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginCredentials } from "@/features/auth/models";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { Panel } from "@/components/Panel";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { actions: userActions } = useUser();

  const handleSubmit = async (
    credentials: LoginCredentials,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userActions.login(credentials);
      router.replace("/command-center"); // replace avoids back button to login
      return true;
    } catch (error) {
      toast.error("There was an error.");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Panel>
        <Header className="mb-0 flex">Login</Header>
      </Panel>
      <LoginForm
        disabled={isLoading}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
