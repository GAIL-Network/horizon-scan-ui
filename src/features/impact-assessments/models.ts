import { z } from "zod";

export const ImpactAssessmentSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
});

export type ImpactAssessment = z.infer<typeof ImpactAssessmentSchema>;
