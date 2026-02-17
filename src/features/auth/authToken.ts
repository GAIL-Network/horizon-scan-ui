// src/features/auth/authToken.ts

const STORAGE_KEY = "access_token";

let accessToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

export const authToken = {
  set(token: string) {
    accessToken = token;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, token);
    }
  },

  get(): string | null {
    if (accessToken) return accessToken;

    if (typeof window !== "undefined") {
      accessToken = localStorage.getItem(STORAGE_KEY);
    }

    return accessToken;
  },

  clear() {
    accessToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  isSet(): boolean {
    return this.get() !== null;
  },
};
