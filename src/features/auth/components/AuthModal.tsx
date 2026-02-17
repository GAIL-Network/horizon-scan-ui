// src/features/auth/components/AuthModal.tsx
"use client";

import { Modal } from "@/components/Modal";
import { useAuthModal } from "@/features/context/AuthModalContext";
import { LoginForm } from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { LoginCredentials, RegisteredUser, RegistrationInput } from "../models";
import { ModalBody, ModalHeader } from "@/components/ModalParts";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useNewUser } from "../hooks/useNewUser";
import { useUser } from "../hooks/useUser";

export function AuthModal() {
  const { isOpen, mode, close } = useAuthModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { actions: userActions } = useUser();
  const { actions: newUserActions } = useNewUser();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (
    credentials: LoginCredentials,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      await userActions.login(credentials);
      router.replace("/command-center");
      close();
      return true;
    } catch (error) {
      toast.error("There was an error.");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (user: RegistrationInput): Promise<void> => {
    setIsLoading(true);
    const promise = newUserActions.createNewUser(user);

    toast.promise(promise, {
      loading: "Creating account…",
      success: "Account created 🎉",
      error: (err) =>
        err instanceof Error ? err.message : "There was an error.",
    });
    try {
      await promise;
      const credentials: LoginCredentials = {
        email: user.email,
        password: user.password,
      };
      try {
        await userActions.login(credentials);
        router.replace("/");
      } catch (err) {
        console.error("Auto-login after register failed", err);
        router.replace("/auth/login");
      }
    } finally {
      setIsLoading(false);
      close();
    }
  };

  return (
    <Modal
      isShow={isOpen}
      onClose={close}
    >
      {mode === "login" && (
        <>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <LoginForm
              onSubmit={handleLogin}
              disabled={isLoading}
            />
          </ModalBody>
        </>
      )}
      {mode === "register" && (
        <>
          <ModalHeader>Registration</ModalHeader>
          <ModalBody>
            <RegistrationForm
              onSubmit={handleRegister}
              disabled={isLoading}
            />
          </ModalBody>
        </>
      )}
    </Modal>
  );
}
