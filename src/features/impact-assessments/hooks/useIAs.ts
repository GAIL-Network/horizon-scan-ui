import { useCallback, useMemo, useState } from "react";
import { ImpactAssessment } from "../models";

export function useIAs() {
  const [state, setState] = useState<ImpactAssessment[]>([]);

  const refresh = useCallback(async (): Promise<ImpactAssessment[]> => {
    const ias: ImpactAssessment[] = [
      {
        id: "1",
        title: "Impact assessment 1",
        description: "Impact assessment description",
      },
    ];
    setState(ias);
    return ias;
  }, []);

  const actions = useMemo(() => ({ refresh, set: setState }), []);

  return { state, actions };
}
