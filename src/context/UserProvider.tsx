// src/context/UserProvider.tsx
"use client";

import { useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/features/auth/models";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user: state, setUser: setState }}>
      {children}
    </UserContext.Provider>
  );
}
