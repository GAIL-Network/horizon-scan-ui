import { EnumBadge } from "@/components/EnumBadge";
import {
  OBJECT_TYPE_STYLES,
  RISK_RAG_STYLES,
  SIGNAL_TYPE_STYLES,
  TEMPORAL_STATUS_STYLES,
} from "./signalBadgeStyles";

import {
  SIGNAL_OBJECT_TYPES,
  SIGNAL_RISK_RAG,
  SIGNAL_TYPES,
  SIGNAL_TEMPORAL_STATUSES,
} from "@/features/signals/models";

/* ---------- Object type ---------- */

export function ObjectTypeBadge({
  value,
}: {
  value: (typeof SIGNAL_OBJECT_TYPES)[number];
}) {
  return (
    <EnumBadge
      value={value}
      className={OBJECT_TYPE_STYLES[value]}
      title={`Object type: ${value}`}
    />
  );
}

/* ---------- Signal type ---------- */

export function SignalTypeBadge({
  value,
}: {
  value: (typeof SIGNAL_TYPES)[number];
}) {
  return (
    <EnumBadge
      value={value}
      className={SIGNAL_TYPE_STYLES[value]}
      title={`Signal type: ${value}`}
    />
  );
}

/* ---------- Temporal status ---------- */

export function TemporalStatusBadge({
  value,
}: {
  value: (typeof SIGNAL_TEMPORAL_STATUSES)[number];
}) {
  return (
    <EnumBadge
      value={value}
      className={TEMPORAL_STATUS_STYLES[value]}
      title={`Temporal status: ${value}`}
    />
  );
}

/* ---------- Risk RAG ---------- */

export function RiskRagBadge({
  value,
}: {
  value: (typeof SIGNAL_RISK_RAG)[number];
}) {
  return (
    <EnumBadge
      value={value}
      className={RISK_RAG_STYLES[value]}
      title={`Risk level: ${value}`}
    />
  );
}
