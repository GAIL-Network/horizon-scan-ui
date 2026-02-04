// src/lib/api/fetcher.ts
const COMPLIANCE_LIVE_API_BASE_URL = (
  process.env.NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL ?? ""
).replace(/\/$/, "");

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${COMPLIANCE_LIVE_API_BASE_URL}${normalizePath(path)}`;

  const headers: HeadersInit = {
    ...(options.body && typeof options.body === "string"
      ? { "Content-Type": "application/json" }
      : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    credentials: "include",
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
