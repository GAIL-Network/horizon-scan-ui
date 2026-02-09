"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Signal } from "../models";
import { getSignal } from "../api";

type Props = { id: string };

export function useSignal({ id }: Props) {
  const [state, setState] = useState<Signal | null>(null);

  const refreshSignal = useCallback(async ({ id }: { id: string }) => {
    setState(await getSignal({ id }));
  }, []);

  useEffect(() => {
    if (id === "") return;
    refreshSignal({ id });
  }, [id, refreshSignal]);

  const actions = useMemo(() => ({ refreshSignal }), [refreshSignal]);

  return { state, actions };
}
