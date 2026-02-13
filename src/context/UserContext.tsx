// src/context/UserContext.ts
import { createContext } from "react";
import type { LoginCredentials, User } from "@/features/auth/models";

export interface UserContextValue {
  user: User | null;
  actions: {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout(): void;
  };
}

export const UserContext = createContext<UserContextValue | null>(null);
