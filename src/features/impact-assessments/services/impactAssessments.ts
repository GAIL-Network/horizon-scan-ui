import { ImpactAssessment } from "../models";
import { mockImpactAssessments } from "../mocks/impactAssessments";
import { apiToImpactAssessment } from "@/features/adapters/adapters.api";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCK_IA === "true";

export async function fetchImpactAssessments(): Promise<ImpactAssessment[]> {
  if (USE_MOCKS) {
    return mockImpactAssessments.map((ia) => apiToImpactAssessment(ia));
  }

  // later: real API
  // const res = await fetch("/api/impact-assessments");
  // return ImpactAssessmentSchema.array().parse(await res.json());

  throw new Error("Real API not implemented yet");
}
