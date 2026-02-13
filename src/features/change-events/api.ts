import { apiFetch } from "@/api/fetcher";
import { ChangeEvent, ChangeEventApi } from "./models";
import { apiToChangeEvent } from "./adapters/adapters.api";

export async function getChangeEvent({
  id,
}: {
  id: string;
}): Promise<ChangeEvent> {
  const dto = await apiFetch<ChangeEventApi>("horizonScan", `/signals/${id}`, {
    method: "GET",
  });
  return apiToChangeEvent(dto);
}

export async function listChangeEvents(): Promise<ChangeEvent[]> {
  const response = await apiFetch<ChangeEventApi[]>("horizonScan", "/signals", {
    method: "GET",
  });
  const changeEvents = response.map((dto) => apiToChangeEvent(dto));
  return changeEvents;
}
