import { components } from "@/api/openapi-horizon-scan";

type schemas = components["schemas"];

export type SignalDTO = schemas["SignalInDB"];
