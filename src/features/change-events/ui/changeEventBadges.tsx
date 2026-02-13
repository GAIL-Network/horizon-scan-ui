import { cn } from "@/lib/utils";
import { EnumBadge } from "@/components/EnumBadge";
import {
  OBJECT_TYPE_STYLES,
  RISK_RAG_STYLES,
  CHANGE_EVENT_TYPE_STYLES,
  TEMPORAL_STATUS_STYLES,
} from "./changeEventBadgeStyles";

import {
  CHANGE_EVENT_OBJECT_TYPES,
  CHANGE_EVENT_RISK_RAG,
  CHANGE_EVENT_TYPES,
  CHANGE_EVENT_TEMPORAL_STATUSES,
} from "@/features/change-events/models";

/* ---------- Object type ---------- */

export function ObjectTypeBadge({
  value,
  className,
}: {
  value: (typeof CHANGE_EVENT_OBJECT_TYPES)[number];
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

/* ---------- Change Event type ---------- */

export function ChangeEventTypeBadge({
  value,
  className,
}: {
  value: (typeof CHANGE_EVENT_TYPES)[number];
  className?: string;
}) {
  return (
    <EnumBadge
      value={value}
      className={cn(CHANGE_EVENT_TYPE_STYLES[value], className)}
      title={`Change Event type: ${value}`}
    />
  );
}

/* ---------- Temporal status ---------- */

export function TemporalStatusBadge({
  value,
  className,
}: {
  value: (typeof CHANGE_EVENT_TEMPORAL_STATUSES)[number];
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
  value: (typeof CHANGE_EVENT_RISK_RAG)[number];
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
