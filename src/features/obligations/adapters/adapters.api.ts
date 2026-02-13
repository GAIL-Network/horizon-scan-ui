import { ObligationApiMock, ObligationMock } from "../models";

export function apiToObligation(api: ObligationApiMock): ObligationMock {
  const { ...rest } = api;
  return { ...rest };
}
