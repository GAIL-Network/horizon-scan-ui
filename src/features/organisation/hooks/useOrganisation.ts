import { useState } from "react";
import { Organisation } from "../models";

export function useOrganisation(id: string) {
  const [state, setState] = useState<Organisation | null>(null);

  const actions = {};

  return { state, actions };
}
