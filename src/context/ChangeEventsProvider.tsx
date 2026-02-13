// src/context/ChangeEventsProvider.tsx
"use client";

import { useState } from "react";
import { ChangeEventsContext } from "./ChangeEventsContext";
import { ChangeEvent } from "@/features/change-events/models";

export function ChangeEventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ChangeEvent[]>([]);

  return (
    <ChangeEventsContext.Provider value={{ state, setState }}>
      {children}
    </ChangeEventsContext.Provider>
  );
}
