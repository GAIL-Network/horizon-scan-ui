"use client";

import { useEffect, useState } from "react";
import { Tkp, TkpApi } from "../models";
import { apiToTkp } from "../adapters.api";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_TKP === "true";

type State = {
  data?: Tkp[];
  loading: boolean;
  error?: string;
};

export function useTkps() {
  const [state, setState] = useState<State>({
    data: undefined,
    loading: true,
  });

  async function loadFromApi(): Promise<Tkp[]> {
    const res = await fetch("/api/tkps");
    if (!res.ok) throw new Error("Failed to fetch TKPs");

    const json: TkpApi[] = await res.json();
    return json.map(apiToTkp);
  }

  async function loadFromMock(): Promise<Tkp[]> {
    const mod = await import("@/features/tkp/mock/tkps");
    return mod.mockTkps;
  }

  async function load() {
    try {
      setState((s) => ({ ...s, loading: true, error: undefined }));

      const data = USE_MOCK ? await loadFromMock() : await loadFromApi();

      setState({
        data,
        loading: false,
        error: undefined,
      });
    } catch (err: any) {
      setState({
        data: undefined,
        loading: false,
        error: err?.message ?? "Failed to load TKPs",
      });
    }
  }

  useEffect(() => {
    load();
  }, []);

  const actions = {
    refresh: load,
  };

  return { state: state.data, meta: state, actions };
}
