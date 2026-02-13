import { apiToUser } from "../auth/adapters/adapters.api";
import {
  ImpactAssessment,
  ImpactAssessmentApi,
} from "../impact-assessments/models";
import { apiToObligation } from "../obligations/adapters/adapters.api";
import { apiToSignal } from "../signals/adapters/adapters.api";

export function apiToImpactAssessment(
  api: ImpactAssessmentApi,
): ImpactAssessment {
  const { why_matters, obligations, signals, owner, ...rest } = api;
  return {
    ...rest,
    whyMatters: why_matters,
    obligations: obligations.map((obligation) => apiToObligation(obligation)),
    signals: signals.map((signal) => apiToSignal(signal)),
    owner: apiToUser(owner),
  };
}
