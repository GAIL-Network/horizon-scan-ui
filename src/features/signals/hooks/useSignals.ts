import { useCallback, useContext, useMemo } from "react";
import { Signal } from "../models";
import { SignalsContext } from "@/context/SignalsContext";

export function useSignals() {
  const ctx = useContext(SignalsContext);
  if (!ctx) {
    throw new Error("useSignals must be used inside <SignalsProvider>");
  }

  const { state, setState } = ctx;

  const setSignals = useCallback(
    (signals: Signal[]): void => {
      setState(signals);
    },
    [setState],
  );

  const actions = useMemo(() => ({ setSignals }), [setSignals]);

  return {
    state,
    actions,
  };
}
