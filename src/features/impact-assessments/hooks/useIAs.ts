import { useCallback, useMemo, useState } from "react";
import { fetchImpactAssessments } from "../services/impactAssessments";
import { ImpactAssessment } from "../models";

export function useIAs() {
  const [state, setState] = useState<ImpactAssessment[]>([]);

  const refresh = useCallback(async () => {
    const ias = await fetchImpactAssessments();
    setState(ias);
    return ias;
  }, []);

  const set = useCallback((ias: ImpactAssessment[]) => {
    setState(ias);
  }, []);

  const actions = useMemo(() => ({ refresh, set }), [refresh, set]);

  return { state, actions };
}
