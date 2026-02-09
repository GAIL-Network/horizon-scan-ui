// src/lib/api/fetcher.ts
import { authToken } from "@/features/auth/authToken";
import { API_BASES, type ApiBaseKey } from "@/lib/api/bases";

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function apiFetch<T = unknown>(
  base: ApiBaseKey,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = API_BASES[base];

  if (!baseUrl) {
    throw new Error(`API base URL not configured for "${base}"`);
  }

  const url = `${baseUrl}${normalizePath(path)}`;

  const headers = new Headers(options.headers);

  // JSON body handling
  if (options.body && typeof options.body === "string") {
    headers.set("Content-Type", "application/json");
  }

  // Auth header injection
  if (authToken.isSet()) {
    headers.set("Authorization", `Bearer ${authToken.get()}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}
