import { z } from "zod";

export const ImpactAssessmentObligationInputSchema = z.object({
  id: z.uuid(),
  text: z.string(),
});

export type ImpactAssessmentObligation = z.infer<
  typeof ImpactAssessmentObligationInputSchema
>;

export const ImpactAssessmentInputSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    description: z.string(),
    provenance: z.string(),
    why_matters: z.string(),
    obligations: z.array(ImpactAssessmentObligationInputSchema),
  })
  .strict();

export type ImpactAssessmentInput = z.infer<typeof ImpactAssessmentInputSchema>;

export const ImpactAssessmentSchema = ImpactAssessmentInputSchema.transform(
  (ia) => ({
    id: ia.id,
    title: ia.title,
    description: ia.description,
    provenance: ia.provenance,
    whyMatters: ia.why_matters,
    obligations: ia.obligations,
  }),
);

export type ImpactAssessment = z.infer<typeof ImpactAssessmentSchema>;
