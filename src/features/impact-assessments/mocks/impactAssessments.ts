import { ImpactAssessmentApi } from "../models";

export const mockImpactAssessments: ImpactAssessmentApi[] = [
  {
    id: "c4f1a2e7-9b3d-4f8a-8c6e-2a9f7b1d3e45",
    status: "open",
    title:
      "New Residency Verification Requirements under Spain-UK Double Taxation Agreement",
    description:
      "The recent update to the Spain-UK Double Taxation Agreement introduces stringent residency verification requirements for individuals claiming tax residency in Spain. Effective immediately, individuals must physically reside in Spain for at least 256 days per calendar year to qualify as residents under the DTA. To substantiate this residency claim, individuals are required to provide daily evidence of their presence in Spain. This includes submitting daily transaction records from Greegs Grocery and daily photographs of themselves walking their dog in a public location, both with verifiable date, time, and location data.",
    provenance:
      "Bilateral tax treaty update published by Spanish and UK tax authorities",
    why_matters:
      "The change significantly raises the evidentiary burden for individuals claiming Spanish tax residency, increasing compliance costs and the risk of disputes or loss of treaty benefits.",
    owner: {
      id: "1a2b3c4d-1111-4aaa-bbbb-1234567890ab",
      email: "regulatory.lead@company.com",
      isActive: true,
      isVerified: true,
      createdAt: "2023-06-12T08:15:00Z",
      organisation: null,
    },
    change_events: [
      {
        id: "a2f3b1c4-7e8d-4c6a-9f12-1b3c4d5e6f7a",
        title: "Spain–UK DTA amended to tighten residency requirements",
        created_at: "2025-01-12T09:32:00Z",
      },
      {
        id: "d91c7e2f-6b5a-4c3e-8f9a-2b4d5c6e7f8a",
        title: "Spanish tax authority announces increased residency audits",
        created_at: "2025-01-18T14:05:00Z",
      },
    ],
    obligations: [
      {
        id: "6a9e2c2f-5c6b-4b94-9e7b-8c1e8f0b0f5a",
        text: "Maintain contemporaneous evidence of physical presence",
      },
      {
        id: "d5f3b2c1-3e4f-4f9a-b0f1-2e8c4b6f7a91",
        text: "Submit supporting documentation upon request by tax authorities",
      },
      {
        id: "9f3c7c2e-8b1a-4f6e-9c6f-1c8e3b4a2f0d",
        text: "Review existing residency determinations for compliance",
      },
    ],
  },

  {
    id: "8e6d3c2b-1f4a-4b9d-a7c8-5e2f9d3a6b10",
    status: "open",
    title:
      "New Residency Verification Requirements under Spain-UK Double Taxation Agreement",
    description:
      "Further official guidance clarifies documentation standards and audit expectations relating to the updated residency verification framework under the Spain–UK DTA.",
    provenance:
      "Official guidance issued following amendments to the Spain–UK DTA",
    why_matters:
      "Failure to comply could result in denial of treaty relief, double taxation, and potential penalties.",
    owner: {
      id: "1a2b3c4d-1111-4aaa-bbbb-1234567890ab",
      email: "regulatory.lead@company.com",
      isActive: true,
      isVerified: true,
      createdAt: "2023-06-12T08:15:00Z",
      organisation: null,
    },
    change_events: [
      {
        id: "c7b2d9f1-4e6a-4a5c-8d3e-9f1a2b3c4d5e",
        title: "HMRC issues guidance on Spain–UK residency documentation",
        created_at: "2025-01-22T10:15:00Z",
      },
    ],
    obligations: [
      {
        id: "2b1f5e7c-1a6b-4f88-b1f2-4e3d8c9a0b6e",
        text: "Assess current residency positions",
      },
      {
        id: "c8f3d2b4-9a6e-4c5b-8f3e-1d9b7a0c6f5e",
        text: "Implement processes to collect daily evidence",
      },
      {
        id: "a7e3b4c2-0f1e-4a8b-9c2d-6e5f1b8a3c4d",
        text: "Engage tax advisors to reassess exposure",
      },
    ],
  },

  {
    id: "3a9d5f2e-7c4b-4e8a-9d1f-6b2c8e5a7f90",
    status: "closed",
    title:
      "Clarification of Tax Residency Criteria under UK-Spain Double Taxation Agreement",
    description:
      "The recent update to the Spain–United Kingdom Double Taxation Agreement (DTA) involves a clarification of the criteria used to determine tax residency status for individuals...",
    provenance:
      "Interpretative clarification published by competent authorities under the DTA",
    why_matters:
      "Ambiguity in residency determinations can lead to conflicting tax obligations and enforcement actions in both jurisdictions.",
    owner: {
      id: "7e9a2b1c-2222-4bbb-cccc-abcdef123456",
      email: "tax.policy@company.com",
      isActive: true,
      isVerified: true,
      createdAt: "2022-11-03T13:40:00Z",
      organisation: null,
    },
    change_events: [
      {
        id: "9d1c6b5a-4f3e-4b8a-a2f7-3c5d6e8f9b1a",
        title: "Competent authorities clarify DTA tie-breaker rules",
        created_at: "2024-12-03T08:40:00Z",
      },
    ],
    obligations: [
      {
        id: "e3f8a9b4-1c7d-4f6a-b5e9-2a7c6d1f0b8e",
        text: "Re-evaluate dual-residency cases",
      },
      {
        id: "1c6b9f5d-4e8a-4c2f-9d7e-3a0b8e6f5c2d",
        text: "Update internal tax guidance",
      },
      {
        id: "7b9c4a6e-0f2d-4c1a-9e8b-5d3f6a1c2b4e",
        text: "Ensure consistent application of tie-breaker rules",
      },
    ],
  },

  {
    id: "4a7b8c9e-1f3a-4e2d-9a7b-8c9e1f3a4e2d",
    status: "open",
    title: "Impact Assessment: GMP Deviations in Sterile Manufacturing",
    description:
      "This impact assessment evaluates the regulatory and operational implications of repeated GMP deviations identified in the aseptic filling line...",
    provenance: "Internal quality investigations and deviation reports",
    why_matters:
      "Unresolved GMP deviations in sterile manufacturing can directly impact patient safety and lead to severe regulatory sanctions.",
    owner: {
      id: "9f3c2b1a-3333-4ccc-dddd-fedcba654321",
      email: "quality.lead@company.com",
      isActive: true,
      isVerified: true,
      createdAt: "2021-04-19T09:00:00Z",
      organisation: null,
    },
    change_events: [
      {
        id: "f4e2d9c7-6b5a-4a1e-9c3f-2d8e7b6a5c4f",
        title: "Repeated GMP deviations recorded in aseptic filling line",
        created_at: "2024-11-03T07:45:00Z",
      },
    ],
    obligations: [
      {
        id: "4c2f9b7a-3e5d-4a8c-b6f1-0e9d8a7c5b2f",
        text: "Initiate and document CAPAs",
      },
      {
        id: "b8f1a6d2-7c9e-4f5a-8e3c-2d0b4c9f1a6e",
        text: "Assess impact on released and in-process batches",
      },
      {
        id: "5a6c3f9e-1b8d-4e2a-9f7c-0d5b4a8e6c3f",
        text: "Prepare for potential regulatory inspection findings",
      },
    ],
  },

  {
    id: "9c2d1f84-6b0a-4eaa-b3d9-2f7c1e8a6b0a",
    status: "open",
    title: "Impact Assessment: Data Integrity Risks in GxP IT Systems",
    description:
      "This assessment analyzes the impact of identified data integrity vulnerabilities within computerized systems supporting GxP activities...",
    provenance: "IT audits and data integrity risk assessments",
    why_matters:
      "Data integrity failures undermine trust in quality decisions and are a frequent trigger for critical regulatory findings.",
    owner: {
      id: "c1d2e3f4-4444-4ddd-eeee-112233445566",
      email: "it.compliance@company.com",
      isActive: true,
      isVerified: true,
      createdAt: "2020-09-07T16:25:00Z",
      organisation: null,
    },
    change_events: [
      {
        id: "7c1b5e9d-3a2f-4c8e-b6a9-5d7f3c1e2b4a",
        title: "Critical audit trail gaps identified in LIMS",
        created_at: "2024-10-14T11:20:00Z",
      },
    ],
    obligations: [
      {
        id: "9b2c6f7e-3d4a-4c1b-a8e5-0f6d1b9c7a2e",
        text: "Remediate audit trail and access control gaps",
      },
      {
        id: "f3a2e6b1-7c8d-4e5f-9b0c-1d6a7c8e5f3a",
        text: "Strengthen validation and change management",
      },
      {
        id: "e6f5b7a8-2d4c-4b1a-9c0e-3f1d7a6b8c5e",
        text: "Train users on data integrity expectations",
      },
    ],
  },
];
