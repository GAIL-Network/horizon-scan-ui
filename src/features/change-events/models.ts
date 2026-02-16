import { components } from "@/api/openapi-horizon-scan";
import { Obligation } from "../obligations/models";

type schemas = components["schemas"];

export type ChangeEventApi = schemas["SignalInDB"];

export type ChangeEvent = Omit<
  ChangeEventApi,
  | "event_type"
  | "updated_at"
  | "object_type"
  | "normalized_status"
  | "signal_metadata"
  | "description"
  | "created_at"
  | "obligations"
  | "readinessScore"
  | "source"
  | "sources"
  | "tags"
  | "temporal"
  | "type"
> & {
  description: string;
  eventType: ChangeEventType;
  createdAt: Date;
  normalizedStatus: string;
  readinessScore: number | null;
  objectType: ChangeEventObjectType;
  obligations: Obligation[];
  riskRag: ChangeEventRiskRagType;
  signalMetadata: Record<string, unknown>;
  source: string;
  sources: Record<string, string>[];
  tags: string[];
  temporalStatus: ChangeEventTemporalStatus;
  updatedAt: Date;
  whyMatters: string;
  provenance: string;
};

/* =======================
   Domain enums (single source)
   ======================= */

export const CHANGE_EVENT_OBJECT_TYPES = [
  "Change Event",
  "Trend Alert",
] as const;

export const CHANGE_EVENT_TYPES = [
  "Amendment",
  "Judgment",
  "Ruling",
  "Opinion",
] as const;

export const CHANGE_EVENT_TEMPORAL_STATUSES = [
  "Pending",
  "Trending",
  "Ending",
] as const;

export const CHANGE_EVENT_RISK_RAG = ["Red", "Amber", "Green"] as const;

/* =======================
   Domain types
   ======================= */

export type ChangeEventObjectType = (typeof CHANGE_EVENT_OBJECT_TYPES)[number];

export type ChangeEventType = (typeof CHANGE_EVENT_TYPES)[number];

export type ChangeEventTemporalStatus =
  (typeof CHANGE_EVENT_TEMPORAL_STATUSES)[number];

export type ChangeEventRiskRagType = (typeof CHANGE_EVENT_RISK_RAG)[number];

export type ChangeEventApiMock = {
  id: string;
  title: string;
  created_at: string;
};

export type ChangeEventMock = Omit<ChangeEventApiMock, "created_at"> & {
  createdAt: Date;
};
