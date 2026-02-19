import createClient from "openapi-fetch";
import type { paths } from "./openapi";
import { authToken } from "@/features/auth/authToken";
import { API_BASES, type ApiBaseKey } from "@/lib/api/bases";

const clients: Partial<
  Record<ApiBaseKey, ReturnType<typeof createClient<paths>>>
> = {};

export function getClient(base: ApiBaseKey) {
  if (!clients[base]) {
    clients[base] = createClient<paths>({
      baseUrl: API_BASES[base],
      headers: {
        "Content-Type": "application/json",
      },

      fetch: (async (input, init) => {
        const headers = new Headers(init?.headers);

        if (authToken.isSet()) {
          headers.set("Authorization", `Bearer ${authToken.get()}`);
        }

        const res = await fetch(input, { ...init, headers });

        if (!res.ok) {
          let message = res.statusText;

          try {
            const data = await res.json();
            message = data?.detail || data?.message || JSON.stringify(data);
          } catch {
            message = await res.text();
          }

          throw new Error(message || res.statusText);
        }

        return res;
      }) as typeof fetch,
    });
  }

  return clients[base]!;
}
