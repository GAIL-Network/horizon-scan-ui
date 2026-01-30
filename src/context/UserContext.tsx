"use client";

import { createContext, useContext, useState } from "react";

// Mocking this until the openapi.json is generated
// TODO
export type User = { id: number };

type UserContextValue = {
  user?: User;
  actions: {
    setUser: (user?: User) => void;
    logout: () => void;
  };
};

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();

  const actions = {
    setUser,
    logout: () => setUser(undefined),
  };

  return (
    <UserContext.Provider value={{ user, actions }}>
      {children}
    </UserContext.Provider>
  );
}
