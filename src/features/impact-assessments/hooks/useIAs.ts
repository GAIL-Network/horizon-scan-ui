import { useCallback, useMemo, useState } from "react";
import { ImpactAssessment } from "../models";

export function useIAs() {
  const [state, setState] = useState<ImpactAssessment[]>([]);

  const refresh = useCallback(async (): Promise<ImpactAssessment[]> => {
    const ias: ImpactAssessment[] = [
      {
        id: "1",
        title:
          "New Residency Verification Requirements under Spain-UK Double Taxation Agreement",
        description:
          "The recent update to the Spain-UK Double Taxation Agreement introduces stringent residency verification requirements for individuals claiming tax residency in Spain. Effective immediately, individuals must physically reside in Spain for at least 256 days per calendar year to qualify as residents under the DTA. To substantiate this residency claim, individuals are required to provide daily evidence of their presence in Spain. This includes submitting daily transaction records from Greegs Grocery and daily photographs of themselves walking their dog in a public location, both with verifiable date, time, and location data. These changes are designed to prevent abuse of tax treaty benefits and ensure accurate residency claims.",
      },
    ];
    setState(ias);
    return ias;
  }, []);

  const actions = useMemo(() => ({ refresh, set: setState }), []);

  return { state, actions };
}
