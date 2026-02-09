import { apiFetch } from "@/api/fetcher";
import { Signal } from "./models";
import { SignalDTO } from "./dtos";
import { parseSignalDTO } from "./adapters/parsers";

export async function getSignal({ id }: { id: string }): Promise<Signal> {
  const dto = await apiFetch<SignalDTO>("horizonScan", `/signals/${id}`, {
    method: "GET",
  });
  return parseSignalDTO(dto);
}

export async function listSignals(): Promise<Signal[]> {
  const response = await apiFetch<SignalDTO[]>("horizonScan", "/signals", {
    method: "GET",
  });
  const signals = response.map((dto) => parseSignalDTO(dto));
  return signals;
}
