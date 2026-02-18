import { apiToDate } from "@/lib/datetime";
import { RP, RPApi } from "./models";

export function apiToRP(api: RPApi): RP {
  return {
    id: api.id,
    name: api.name,

    jurisdiction: api.jurisdiction,
    regulators: api.regulators,

    description: api.description,
    primaryAnchor: api.primary_anchor,

    scopeIn: api.scope_in,
    scopeOut: api.scope_out,

    keyDependencyTopicIds: api.key_dependency_topic_ids,

    trackedInstruments: api.tracked_instruments,
    documents: api.documents,

    definitions: api.definitions,
    taxonomy: api.taxonomy,

    normativeStatements:
      api.normative_statements?.map((ns) => ({
        id: ns.id,
        text: ns.text,
        strength: ns.strength === "must_not" ? "mustNot" : ns.strength,
        sourceDocumentIds: ns.source_document_ids,
        notes: ns.notes,
      })) ?? [],

    processModels: api.process_models?.map((pm) => ({
      id: pm.id,
      name: pm.name,
      trigger: pm.trigger,
      roles: pm.roles,
      steps: pm.steps,
    })),

    owner: api.owner,

    createdAt: apiToDate(api.created_at),
    updatedAt: apiToDate(api.updated_at),
  };
}

export function RPToApi(rp: RP): RPApi {
  return {
    id: rp.id,
    name: rp.name,

    jurisdiction: rp.jurisdiction,
    regulators: rp.regulators,

    description: rp.description,
    primary_anchor: rp.primaryAnchor,

    scope_in: rp.scopeIn,
    scope_out: rp.scopeOut,

    key_dependency_topic_ids: rp.keyDependencyTopicIds,

    tracked_instruments: rp.trackedInstruments,
    documents: rp.documents,

    definitions: rp.definitions,
    taxonomy: rp.taxonomy,

    normative_statements: rp.normativeStatements.map((ns) => ({
      id: ns.id,
      text: ns.text,
      strength: ns.strength === "mustNot" ? "must_not" : ns.strength,
      source_document_ids: ns.sourceDocumentIds,
      notes: ns.notes,
    })),

    process_models: rp.processModels?.map((pm) => ({
      id: pm.id,
      name: pm.name,
      trigger: pm.trigger,
      roles: pm.roles,
      steps: pm.steps,
    })),

    owner: rp.owner,

    created_at: rp.createdAt.toISOString(),
    updated_at: rp.updatedAt.toISOString(),
  };
}
