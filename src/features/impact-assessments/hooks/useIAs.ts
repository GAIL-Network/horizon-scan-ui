import { useState } from "react";

export function useIAs() {
  const [state, setState] = useState<unknown[]>([]);

  const actions = {};

  return { state, actions };
}
