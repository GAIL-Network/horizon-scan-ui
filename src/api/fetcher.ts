// src/lib/api/fetcher.ts
import { authToken } from "@/features/auth/authToken";
import { API_BASES, type ApiBaseKey } from "@/lib/api/bases";

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function buildUrl(
  baseUrl: string,
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(`${baseUrl}${normalizePath(path)}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export async function apiFetch<T = unknown>(
  base: ApiBaseKey,
  path: string,
  options: RequestInit & {
    query?: Record<string, string | number | boolean | undefined>;
  } = {},
): Promise<T> {
  const baseUrl = API_BASES[base];

  if (!baseUrl) {
    throw new Error(`API base URL not configured for "${base}"`);
  }

  const url = buildUrl(baseUrl, path, options.query);

  const headers = new Headers(options.headers);

  if (options.body && typeof options.body === "string") {
    headers.set("Content-Type", "application/json");
  }

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
