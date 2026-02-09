import { z } from "zod";

import type { Signal } from "../models";
import type { SignalDTO } from "../dtos";
import {
  SIGNAL_OBJECT_TYPES,
  SIGNAL_TYPES,
  SIGNAL_TEMPORAL_STATUSES,
} from "../models";

export const SignalDTOSchema: z.ZodType<SignalDTO> = z
  .object({
    id: z.uuid(),
    title: z.string(),
    object_type: z.enum(SIGNAL_OBJECT_TYPES),
    type: z.enum(SIGNAL_TYPES),
    temporal: z.enum(SIGNAL_TEMPORAL_STATUSES),
    normalized_status: z.string(),
    sop: z.string(),
    certainty: z.number(),
    magnitude: z.number(),
    riskRag: z.enum(["Red", "Amber", "Green"]),
    readinessScore: z.number().optional().nullable(),
    description: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    sources: z.array(z.record(z.string(), z.string())).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
    obligations: z.array(z.string()).optional().nullable(),
    signal_metadata: z.record(z.string(), z.unknown()).optional().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .strict();

export const SignalSchema = SignalDTOSchema.transform((d) => ({
  id: d.id,
  title: d.title,
  objectType: d.object_type,
  type: d.type,
  temporal: d.temporal,
  normalizedStatus: d.normalized_status,
  sop: d.sop,
  certainty: d.certainty,
  magnitude: d.magnitude,
  riskRag: d.riskRag,
  readinessScore: d.readinessScore,
  description: d.description,
  source: d.source,
  sources: d.sources ?? [],
  tags: d.tags ?? [],
  obligations: d.obligations ?? [],
  signalMetadata: d.signal_metadata ?? {},
  createdAt: new Date(d.created_at),
  updatedAt: new Date(d.updated_at),
}));

export function parseSignalDTO(signalDto: SignalDTO) {
  return SignalSchema.parse(signalDto);
}

export function serializeSignal(signal: Signal): SignalDTO {
  return {
    id: signal.id,
    title: signal.title,
    object_type: signal.objectType,
    type: signal.type,
    temporal: signal.temporal,
    normalized_status: signal.normalizedStatus,
    sop: signal.sop,
    certainty: signal.certainty,
    magnitude: signal.magnitude,
    riskRag: signal.riskRag,
    readinessScore: signal.readinessScore ?? null,
    description: signal.description ?? null,
    source: signal.source ?? null,
    sources: signal.sources.length ? signal.sources : null,
    tags: signal.tags.length ? signal.tags : null,
    obligations: signal.obligations.length ? signal.obligations : null,
    signal_metadata: Object.keys(signal.signalMetadata).length
      ? signal.signalMetadata
      : null,
    created_at: signal.createdAt.toISOString(),
    updated_at: signal.updatedAt.toISOString(),
  };
}
