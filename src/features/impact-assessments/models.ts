import { UserApi } from "../auth/dtos";
import { User } from "../auth/models";
import { ObligationApiMock, ObligationMock } from "../obligations/models";
import { SignalApiMock, SignalMock } from "../signals/models";

export type ImpactAssessmentApi = {
  id: string;
  title: string;
  description: string;
  provenance: string;
  why_matters: string;
  obligations: ObligationApiMock[];
  signals: SignalApiMock[];
  owner: UserApi;
};

export type ImpactAssessment = Omit<
  ImpactAssessmentApi,
  "why_matters" | "obligations" | "signals" | "owner"
> & {
  whyMatters: string;
  obligations: ObligationMock[];
  signals: SignalMock[];
  owner: User;
};
