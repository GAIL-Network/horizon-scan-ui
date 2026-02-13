import {
  ChangeEvent,
  ChangeEventApi,
  ChangeEventApiMock,
  ChangeEventMock,
} from "../models";

export function apiToChangeEvent(api: ChangeEventApi): ChangeEvent {
  const {
    description,
    type,
    created_at,
    normalized_status,
    obligations,
    object_type,
    readinessScore,
    riskRag,
    signal_metadata,
    source,
    sources,
    tags,
    temporal,
    updated_at,
    ...rest
  } = { ...api };
  return {
    ...rest,
    description: description == null ? "" : description,
    eventType: type,
    createdAt: new Date(created_at),
    normalizedStatus: normalized_status,
    readinessScore: readinessScore === undefined ? null : readinessScore,
    objectType: object_type,
    obligations: obligations ? obligations : [],
    signalMetadata: signal_metadata ? signal_metadata : {},
    source: source ? source : "",
    sources: sources ? sources : [],
    riskRag,
    tags: tags ? tags : [],
    temporalStatus: temporal,
    updatedAt: new Date(updated_at),
  };
}

export function apiToChangeEventMock(api: ChangeEventApiMock): ChangeEventMock {
  const { created_at, ...rest } = { ...api };
  return {
    ...rest,
    createdAt: new Date(created_at),
  };
}
