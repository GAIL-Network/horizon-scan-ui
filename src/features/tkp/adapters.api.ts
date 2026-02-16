import { Tkp, TkpApi } from "./models";

export function apiToTkp(api: TkpApi): Tkp {
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

    createdAt: new Date(api.created_at),
    updatedAt: new Date(api.updated_at),
  };
}

export function tkpToApi(tkp: Tkp): TkpApi {
  return {
    id: tkp.id,
    name: tkp.name,

    jurisdiction: tkp.jurisdiction,
    regulators: tkp.regulators,

    description: tkp.description,
    primary_anchor: tkp.primaryAnchor,

    scope_in: tkp.scopeIn,
    scope_out: tkp.scopeOut,

    key_dependency_topic_ids: tkp.keyDependencyTopicIds,

    tracked_instruments: tkp.trackedInstruments,
    documents: tkp.documents,

    definitions: tkp.definitions,
    taxonomy: tkp.taxonomy,

    normative_statements: tkp.normativeStatements.map((ns) => ({
      id: ns.id,
      text: ns.text,
      strength: ns.strength === "mustNot" ? "must_not" : ns.strength,
      source_document_ids: ns.sourceDocumentIds,
      notes: ns.notes,
    })),

    process_models: tkp.processModels?.map((pm) => ({
      id: pm.id,
      name: pm.name,
      trigger: pm.trigger,
      roles: pm.roles,
      steps: pm.steps,
    })),

    owner: tkp.owner,

    created_at: tkp.createdAt.toISOString(),
    updated_at: tkp.updatedAt.toISOString(),
  };
}
