"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChangeEvent } from "../models";
import { getChangeEvent } from "../api";

type Props = { id: string };

export function useChangeEvent(props: Props | null) {
  const [state, setState] = useState<ChangeEvent | null>(null);

  const id = props?.id;

  const refresh = useCallback(async (id: string) => {
    const changeEvent = await getChangeEvent({ id });
    setState(changeEvent);
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
