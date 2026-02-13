import { apiToUser } from "../auth/adapters/adapters.api";
import {
  ImpactAssessment,
  ImpactAssessmentApi,
} from "../impact-assessments/models";
import { apiToObligation } from "../obligations/adapters/adapters.api";
import { apiToChangeEventMock } from "../change-events/adapters/adapters.api";

export function apiToImpactAssessment(
  api: ImpactAssessmentApi,
): ImpactAssessment {
  const { why_matters, obligations, change_events, owner, ...rest } = api;
  return {
    ...rest,
    whyMatters: why_matters,
    obligations: obligations.map((obligation) => apiToObligation(obligation)),
    changeEvents: change_events.map((change_event) =>
      apiToChangeEventMock(change_event),
    ),
    owner: apiToUser(owner),
  };
}
