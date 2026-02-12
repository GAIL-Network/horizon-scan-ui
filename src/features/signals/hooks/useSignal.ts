"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Signal } from "../models";
import { getSignal } from "../api";

type Props = { id: string };

export function useSignal(props: Props | null) {
  const [state, setState] = useState<Signal | null>(null);

  const id = props?.id;

  const refresh = useCallback(async (id: string) => {
    const signal = await getSignal({ id });
    setState(signal);
  }, []);

  useEffect(() => {
    if (!id) {
      setState(null);
      return;
    }

    refresh(id);
  }, [id, refresh]);

  const actions = useMemo(
    () => ({
      refresh,
    }),
    [refresh],
  );

  return { state, actions };
}
