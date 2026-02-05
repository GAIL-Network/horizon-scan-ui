// src/context/UserContext.ts
import { createContext } from "react";
import type { LoginCredentials, CurrentUser } from "@/features/auth/models";

export interface UserContextValue {
  user: CurrentUser | null;
  actions: {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout(): void;
  };
}

export const UserContext = createContext<UserContextValue | null>(null);
