// src/context/SignalsContext.ts
import { Signal } from "@/features/signals/models";
import { createContext } from "react";

export type SignalsContextValue = {
  state: Signal[];
  setState: React.Dispatch<React.SetStateAction<Signal[]>>;
};

export const SignalsContext = createContext<SignalsContextValue | null>(null);
