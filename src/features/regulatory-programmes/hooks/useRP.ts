import { useEffect, useState } from "react";
import { RP, RPApi } from "../models";
import { apiToRP } from "../adapters.api";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_RP === "true";

type Props = {
  id: string;
};

type State = {
  data?: RP;
  loading: boolean;
  error?: string;
};

export function useRP({ id }: Props) {
  const [state, setState] = useState<State>({
    data: undefined,
    loading: true,
  });

  async function loadFromApi(): Promise<RP> {
    const res = await fetch(`/api/regulatory-programmes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch RP");

    const json: RPApi = await res.json();
    return apiToRP(json);
  }

  async function loadFromMock(): Promise<RP> {
    const mod =
      await import("@/features/regulatory-programmes/mock/regulatory-programmes");
    const found = mod.mockRPs.find((t: RP) => t.id === id);

    if (!found) throw new Error("Mock RP not found");

    return found;
  }

  async function load() {
    try {
      setState((s) => ({ ...s, loading: true, error: undefined }));

      const rp = USE_MOCK ? await loadFromMock() : await loadFromApi();

      setState({
        data: rp,
        loading: false,
        error: undefined,
      });
    } catch (err: any) {
      setState({
        data: undefined,
        loading: false,
        error: err?.message ?? "Unknown error",
      });
    }
  }

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  const actions = {
    refresh: load,
  };

  return { state, actions };
}
