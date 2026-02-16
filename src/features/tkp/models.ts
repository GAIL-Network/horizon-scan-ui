export type TkpApi = {
  id: string;
  name: string;

  jurisdiction: string;
  regulators: string[];

  description?: string;
  primary_anchor?: string;

  scope_in: string[];
  scope_out: string[];

  key_dependency_topic_ids?: string[];

  tracked_instruments: TkpTrackedInstrumentApi[];
  documents: TkpDocumentApi[];

  definitions?: TkpDefinitionApi[];
  taxonomy?: Record<string, string[]>;

  normative_statements: TkpNormativeStatementApi[];
  process_models?: TkpProcessModelApi[];

  owner?: string;

  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
};

export type TkpTrackedInstrumentApi = {
  id: string;
  name: string;
  description?: string;
};

export type TkpDocumentApi = {
  id: string;
  title: string;
  type?: string;
  url?: string;
};

export type TkpDefinitionApi = {
  term: string;
  meaning: string;
};

export type TkpNormativeStatementApi = {
  id: string;
  text: string;

  strength: "must" | "must_not" | "should" | "may" | "constraint" | "note";

  source_document_ids?: string[];
  notes?: string;
};

export type TkpProcessStepApi = {
  id?: string;
  name: string;
  description?: string;
};

export type TkpProcessModelApi = {
  id: string;
  name: string;

  trigger?: string;
  roles?: string[];

  steps: TkpProcessStepApi[];
};

export type Tkp = {
  id: string;
  name: string;

  jurisdiction: string;
  regulators: string[];

  description?: string;
  primaryAnchor?: string;

  scopeIn: string[];
  scopeOut: string[];

  keyDependencyTopicIds?: string[];

  trackedInstruments: TkpTrackedInstrument[];
  documents: TkpDocument[];

  definitions?: TkpDefinition[];
  taxonomy?: TkpTaxonomy;

  normativeStatements: TkpNormativeStatement[];
  processModels?: TkpProcessModel[];

  owner?: string;

  createdAt: Date;
  updatedAt: Date;
};

export type TkpTrackedInstrument = {
  id: string;
  name: string;
  description?: string;
};

export type TkpDocument = {
  id: string;
  title: string;
  type?: string; // pdf, html, guidance, policy etc
  url?: string;
};

export type TkpDefinition = {
  term: string;
  meaning: string;
};

export type TkpTaxonomy = Record<string, string[]>;
// {
//   Actor: ["authorised person", "approver"],
//   Channel: ["web", "email"]
// }

export type TkpNormativeStatement = {
  id: string;
  text: string;

  strength: "must" | "mustNot" | "should" | "may" | "constraint" | "note";

  sourceDocumentIds?: string[];
  notes?: string;
};

export type TkpProcessStep = {
  id?: string;
  name: string;
  description?: string;
};

export type TkpProcessModel = {
  id: string;
  name: string;

  trigger?: string;
  roles?: string[];

  steps: TkpProcessStep[];
};
