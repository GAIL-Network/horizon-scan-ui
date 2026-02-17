export type RPApi = {
  id: string;
  name: string;

  jurisdiction: string;
  regulators: string[];

  description?: string;
  primary_anchor?: string;

  scope_in: string[];
  scope_out: string[];

  key_dependency_topic_ids?: string[];

  tracked_instruments: RPTrackedInstrumentApi[];
  documents: RPDocumentApi[];

  definitions?: RPDefinitionApi[];
  taxonomy?: Record<string, string[]>;

  normative_statements: RPNormativeStatementApi[];
  process_models?: RPProcessModelApi[];

  owner?: string;

  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
};

export type RPTrackedInstrumentApi = {
  id: string;
  name: string;
  description?: string;
};

export type RPDocumentApi = {
  id: string;
  title: string;
  type?: string;
  url?: string;
};

export type RPDefinitionApi = {
  term: string;
  meaning: string;
};

export type RPNormativeStatementApi = {
  id: string;
  text: string;

  strength: "must" | "must_not" | "should" | "may" | "constraint" | "note";

  source_document_ids?: string[];
  notes?: string;
};

export type RPProcessStepApi = {
  id?: string;
  name: string;
  description?: string;
};

export type RPProcessModelApi = {
  id: string;
  name: string;

  trigger?: string;
  roles?: string[];

  steps: RPProcessStepApi[];
};

export type RP = {
  id: string;
  name: string;

  jurisdiction: string;
  regulators: string[];

  description?: string;
  primaryAnchor?: string;

  scopeIn: string[];
  scopeOut: string[];

  keyDependencyTopicIds?: string[];

  trackedInstruments: RPTrackedInstrument[];
  documents: RPDocument[];

  definitions?: RPDefinition[];
  taxonomy?: RPTaxonomy;

  normativeStatements: RPNormativeStatement[];
  processModels?: RPProcessModel[];

  owner?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type RPTrackedInstrument = {
  id: string;
  name: string;
  description?: string;
};

export type RPDocument = {
  id: string;
  title: string;
  type?: string; // pdf, html, guidance, policy etc
  url?: string;
};

export type RPDefinition = {
  term: string;
  meaning: string;
};

export type RPTaxonomy = Record<string, string[]>;
// {
//   Actor: ["authorised person", "approver"],
//   Channel: ["web", "email"]
// }

export type RPNormativeStatement = {
  id: string;
  text: string;

  strength: "must" | "mustNot" | "should" | "may" | "constraint" | "note";

  sourceDocumentIds?: string[];
  notes?: string;
};

export type RPProcessStep = {
  id?: string;
  name: string;
  description?: string;
};

export type RPProcessModel = {
  id: string;
  name: string;

  trigger?: string;
  roles?: string[];

  steps: RPProcessStep[];
};
