import { useCallback, useContext, useEffect, useMemo } from "react";
import { ChangeEvent } from "../models";
import { ChangeEventsContext } from "@/context/ChangeEventsContext";
import { listChangeEvents } from "../api";

export function useChangeEvents() {
  const ctx = useContext(ChangeEventsContext);
  if (!ctx) {
    throw new Error(
      "useChangeEvents must be used inside <ChangeEventsProvider>",
    );
  }

  const { state, setState } = ctx;

  const refreshChangeEvents = useCallback(async () => {
    setState(await listChangeEvents());
  }, [setState]);

  const setChangeEvents = useCallback(
    (changeEvents: ChangeEvent[]): void => {
      setState(changeEvents);
    },
    [setState],
  );

  useEffect(() => {
    refreshChangeEvents();
  }, [refreshChangeEvents]);

  const actions = useMemo(
    () => ({
      refreshChangeEvents: refreshChangeEvents,
      setChangeEvents: setChangeEvents,
    }),
    [refreshChangeEvents, setChangeEvents],
  );

  return {
    state,
    actions,
  };
}
