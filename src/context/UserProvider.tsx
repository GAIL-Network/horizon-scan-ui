// src/context/UserProvider.tsx
"use client";

import { useState } from "react";
import { UserContext } from "./UserContext";
import { LoginCredentials, User } from "@/features/auth/models";
import { authToken } from "@/features/auth/authToken";
import { getMe as getMeApi, loginUser as loginApi } from "@/features/auth/api";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(credentials: LoginCredentials): Promise<void> {
    const loginResponse = await loginApi(credentials);
    authToken.set(loginResponse.accessToken);

    try {
      const me = await getMeApi();
      setUser(me);
    } catch (error) {
      authToken.clear();
      setUser(null);
      throw error;
    }
  }
  function logout() {
    authToken.clear();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, actions: { login, logout } }}>
      {children}
    </UserContext.Provider>
  );
}
