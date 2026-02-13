import { apiFetch } from "@/api/fetcher";
import { ChangeEvent } from "./models";
import { ChangeEventDTO } from "./dtos";
import { apiToChangeEvent } from "./adapters/adapters.api";

export async function getChangeEvent({
  id,
}: {
  id: string;
}): Promise<ChangeEvent> {
  const dto = await apiFetch<ChangeEventDTO>("horizonScan", `/signals/${id}`, {
    method: "GET",
  });
  return apiToChangeEvent(dto);
}

export async function listChangeEvents(): Promise<ChangeEvent[]> {
  const response = await apiFetch<ChangeEventDTO[]>("horizonScan", "/signals", {
    method: "GET",
  });
  const changeEvents = response.map((dto) => apiToChangeEvent(dto));
  return changeEvents;
}
