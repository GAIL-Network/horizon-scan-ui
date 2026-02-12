import { Suspense } from "react";
import NewImpactAssessmentClient from "./NewImpactAssessmentClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <NewImpactAssessmentClient />
    </Suspense>
  );
}
