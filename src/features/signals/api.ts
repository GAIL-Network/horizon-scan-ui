import { apiFetch } from "@/api/fetcher";
import { Signal } from "./models";
import { SignalDTO } from "./dtos";
import { parseSignalDTO } from "./adapters/parsers";

export async function get({ id }: { id: string }): Promise<Signal> {
  const dto = await apiFetch<SignalDTO>("horizonScan", `/signals/${id}`, {
    method: "GET",
  });
  return parseSignalDTO(dto);
}
