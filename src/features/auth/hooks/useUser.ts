import type { LoginCredentials } from "@/features/auth/models";
import { useContext, useEffect, useState } from "react";
import { getMe, loginUser } from "../api";
import { UserContext } from "@/context/UserContext";
import { authToken } from "../authToken";

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("Must be inside UserProvider");
  const { user, setUser } = ctx;

  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    setLoading(true);
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials: LoginCredentials): Promise<void> {
    const loginResponse = await loginUser(credentials);
    authToken.set(loginResponse.accessToken);
  }

  function logout() {
    authToken.clear();
    setUser(null);
  }

  const actions = {
    login,
    logout,
    fetchMe,
  };

  useEffect(() => {
    if (!authToken.get()) {
      setLoading(false);
      return;
    }

    if (user) {
      setLoading(false);
      return;
    }

    fetchMe();
  }, []);

  return { user, actions, loading };
}
