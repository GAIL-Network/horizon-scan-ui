import { cn } from "@/lib/utils";
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
  className,
}: {
  value: (typeof SIGNAL_OBJECT_TYPES)[number];
  className?: string;
}) {
  return (
    <EnumBadge
      value={value}
      className={cn(OBJECT_TYPE_STYLES[value], className)}
      title={`Object type: ${value}`}
    />
  );
}

/* ---------- Signal type ---------- */

export function SignalTypeBadge({
  value,
  className,
}: {
  value: (typeof SIGNAL_TYPES)[number];
  className?: string;
}) {
  return (
    <EnumBadge
      value={value}
      className={cn(SIGNAL_TYPE_STYLES[value], className)}
      title={`Signal type: ${value}`}
    />
  );
}

/* ---------- Temporal status ---------- */

export function TemporalStatusBadge({
  value,
  className,
}: {
  value: (typeof SIGNAL_TEMPORAL_STATUSES)[number];
  className?: string;
}) {
  return (
    <EnumBadge
      value={value}
      className={cn(TEMPORAL_STATUS_STYLES[value], className)}
      title={`Temporal status: ${value}`}
    />
  );
}

/* ---------- Risk RAG ---------- */

export function RiskRagBadge({
  value,
  className,
}: {
  value: (typeof SIGNAL_RISK_RAG)[number];
  className?: string;
}) {
  return (
    <EnumBadge
      value={value}
      className={cn(RISK_RAG_STYLES[value], className)}
      title={`Risk level: ${value}`}
    />
  );
}
