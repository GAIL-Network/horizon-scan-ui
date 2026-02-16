// src/context/UserContext.ts
import { createContext } from "react";
import type { LoginCredentials, User } from "@/features/auth/models";

export interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextValue | null>(null);
