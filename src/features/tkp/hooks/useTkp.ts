import { useEffect, useState } from "react";
import { Tkp, TkpApi } from "../models";
import { apiToTkp } from "../adapters.api";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_TKP === "true";

type Props = {
  id: string;
};

type State = {
  data?: Tkp;
  loading: boolean;
  error?: string;
};

export function useTkp({ id }: Props) {
  const [state, setState] = useState<State>({
    data: undefined,
    loading: true,
  });

  async function loadFromApi(): Promise<Tkp> {
    const res = await fetch(`/api/tkps/${id}`);
    if (!res.ok) throw new Error("Failed to fetch TKP");

    const json: TkpApi = await res.json();
    return apiToTkp(json);
  }

  async function loadFromMock(): Promise<Tkp> {
    const mod = await import("@/features/tkp/mock/tkps");
    const found = mod.mockTkps.find((t: Tkp) => t.id === id);

    if (!found) throw new Error("Mock TKP not found");

    return found;
  }

  async function load() {
    try {
      setState((s) => ({ ...s, loading: true, error: undefined }));

      const tkp = USE_MOCK ? await loadFromMock() : await loadFromApi();

      setState({
        data: tkp,
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
