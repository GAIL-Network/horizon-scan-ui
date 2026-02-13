import { SignalApiMock, SignalMock } from "../models";

export function apiToSignal(api: SignalApiMock): SignalMock {
  const { created_at, ...rest } = { ...api };
  return {
    ...rest,
    createdAt: new Date(created_at),
  };
}
