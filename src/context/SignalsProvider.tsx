// src/context/SignalsProvider.tsx
"use client";

import { useState } from "react";
import { SignalsContext } from "./SignalsContext";
import { Signal } from "@/features/signals/models";

export function SignalsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Signal[]>([]);

  return (
    <SignalsContext.Provider value={{ state, setState }}>
      {children}
    </SignalsContext.Provider>
  );
}
