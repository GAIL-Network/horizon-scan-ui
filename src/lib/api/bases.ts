// src/lib/api/bases.ts
export const API_BASES = {
  compliance: (
    process.env.NEXT_PUBLIC_COMPLIANCE_LIVE_API_BASE_URL ?? ""
  ).replace(/\/$/, ""),

  horizonScan: (
    process.env.NEXT_PUBLIC_HORIZON_SCAN_API_BASE_URL ?? ""
  ).replace(/\/$/, ""),
} as const;

export type ApiBaseKey = keyof typeof API_BASES;
