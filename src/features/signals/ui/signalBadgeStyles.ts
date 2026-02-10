import {
  SIGNAL_OBJECT_TYPES,
  SIGNAL_RISK_RAG,
  SIGNAL_TYPES,
  SIGNAL_TEMPORAL_STATUSES,
} from "@/features/signals/models";

/* ---------- Object type ---------- */

export const OBJECT_TYPE_STYLES: Record<
  (typeof SIGNAL_OBJECT_TYPES)[number],
  string
> = {
  "Change Event": "bg-blue-50 text-blue-700",
  "Trend Alert": "bg-purple-50 text-purple-700",
};

/* ---------- Signal type ---------- */

export const SIGNAL_TYPE_STYLES: Record<(typeof SIGNAL_TYPES)[number], string> =
  {
    Amendment: "bg-amber-50 text-amber-700",
    Judgment: "bg-red-50 text-red-700",
    Ruling: "bg-indigo-50 text-indigo-700",
    Opinion: "bg-slate-100 text-slate-700",
  };

/* ---------- Temporal status ---------- */

export const TEMPORAL_STATUS_STYLES: Record<
  (typeof SIGNAL_TEMPORAL_STATUSES)[number],
  string
> = {
  Pending: "bg-slate-100 text-slate-700",
  Trending: "bg-green-50 text-green-700",
  Ending: "bg-orange-50 text-orange-700",
};

/* ---------- Risk RAG ---------- */

export const RISK_RAG_STYLES: Record<(typeof SIGNAL_RISK_RAG)[number], string> =
  {
    Red: "bg-red-50 text-red-700",
    Amber: "bg-amber-50 text-amber-700",
    Green: "bg-green-50 text-green-700",
  };
