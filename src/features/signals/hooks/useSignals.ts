import { useCallback, useContext, useEffect, useMemo } from "react";
import { Signal } from "../models";
import { SignalsContext } from "@/context/SignalsContext";
import { listSignals } from "../api";

export function useSignals() {
  const ctx = useContext(SignalsContext);
  if (!ctx) {
    throw new Error("useSignals must be used inside <SignalsProvider>");
  }

  const { state, setState } = ctx;

  const refreshSignals = useCallback(async () => {
    setState(await listSignals());
  }, [setState]);

  const setSignals = useCallback(
    (signals: Signal[]): void => {
      setState(signals);
    },
    [setState],
  );

  useEffect(() => {
    refreshSignals();
  }, [refreshSignals]);

  const actions = useMemo(
    () => ({ refreshSignals, setSignals }),
    [refreshSignals, setSignals],
  );

  return {
    state,
    actions,
  };
}
