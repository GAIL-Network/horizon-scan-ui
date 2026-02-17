"use client";

import { useEffect, useState } from "react";
import { RP, RPApi } from "../models";
import { apiToRP } from "../adapters.api";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_RP === "true";

type State = {
  data?: RP[];
  loading: boolean;
  error?: string;
};

export function useRPs() {
  const [state, setState] = useState<State>({
    data: undefined,
    loading: true,
  });

  async function loadFromApi(): Promise<RP[]> {
    const res = await fetch("/api/regulatory-programmes");
    if (!res.ok) throw new Error("Failed to fetch Regulatory Programmes");

    const json: RPApi[] = await res.json();
    return json.map(apiToRP);
  }

  async function loadFromMock(): Promise<RP[]> {
    const mod =
      await import("@/features/regulatory-programmes/mock/regulatory-programmes");
    return mod.mockRPs;
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
        error: err?.message ?? "Failed to load Regulatory Programmes",
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
