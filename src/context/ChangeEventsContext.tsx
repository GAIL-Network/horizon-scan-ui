// src/context/ChangeEventsContext.ts
import { ChangeEvent } from "@/features/change-events/models";
import { createContext } from "react";

export type ChangeEventsContextValue = {
  state: ChangeEvent[];
  setState: React.Dispatch<React.SetStateAction<ChangeEvent[]>>;
};

export const ChangeEventsContext =
  createContext<ChangeEventsContextValue | null>(null);
