import { UserApi } from "../auth/dtos";
import { User } from "../auth/models";
import { ObligationApiMock, ObligationMock } from "../obligations/models";
import { ChangeEventApiMock, ChangeEventMock } from "../change-events/models";

export type ImpactAssessmentApi = {
  id: string;
  title: string;
  description: string;
  provenance: string;
  why_matters: string;
  obligations: ObligationApiMock[];
  change_events: ChangeEventApiMock[];
  owner: UserApi;
  status: "open" | "closed";
};

export type ImpactAssessment = Omit<
  ImpactAssessmentApi,
  "why_matters" | "obligations" | "change_events" | "owner"
> & {
  whyMatters: string;
  obligations: ObligationMock[];
  changeEvents: ChangeEventMock[];
  owner: User;
};
