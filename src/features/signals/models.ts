import { z } from "zod";
import { SignalSchema } from "./adapters/parsers";

/* =======================
   Domain enums (single source)
   ======================= */

export const SIGNAL_OBJECT_TYPES = ["Change Event", "Trend Alert"] as const;

export const SIGNAL_TYPES = [
  "Amendment",
  "Judgment",
  "Ruling",
  "Opinion",
] as const;

export const SIGNAL_TEMPORAL_STATUSES = [
  "Pending",
  "Trending",
  "Ending",
] as const;

export const SIGNAL_RISK_RAG = ["Red", "Amber", "Green"] as const;

/* =======================
   Domain types
   ======================= */

export type SignalObjectType = (typeof SIGNAL_OBJECT_TYPES)[number];

export type SignalType = (typeof SIGNAL_TYPES)[number];

export type SignalTemporalStatus = (typeof SIGNAL_TEMPORAL_STATUSES)[number];

/**
 * Domain model
 * (derived — no duplication)
 */
export type Signal = z.infer<typeof SignalSchema>;

export type SignalApiMock = {
  id: string;
  title: string;
  created_at: string;
};

export type SignalMock = Omit<SignalApiMock, "created_at"> & {
  createdAt: Date;
};
