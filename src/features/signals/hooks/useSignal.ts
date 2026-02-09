"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Signal } from "../models";
import { get } from "../api";

type Props = { id: string };

export function useSignal({ id }: Props) {
  const [state, setState] = useState<Signal | null>(null);

  const getSignal = useCallback(async ({ id }: { id: string }) => {
    setState(await get({ id }));
  }, []);

  useEffect(() => {
    if (id === "") return;
    getSignal({ id });
  }, [id, getSignal]);

  const actions = useMemo(() => ({ getSignal }), [getSignal]);

  return { state, actions };
}
