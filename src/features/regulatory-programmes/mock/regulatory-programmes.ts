// /mock/regulatory-programmes.ts
import { RP } from "../models";

export const mockRPs: RP[] = [
  {
    id: "adf320c9-cb1d-4c13-8c10-99bb517a83e5",
    name: "UK Crypto Promotions (COBS 4.12A)",

    jurisdiction: "UK",
    regulators: ["FCA", "HM Treasury"],

    description:
      "Rules governing how qualifying cryptoassets can be marketed to UK retail customers, including risk warnings, incentives ban, and consumer journey protections.",

    primaryAnchor:
      "COBS 4.12A Promotion of Restricted Mass Market Investments (as applied to cryptoassets)",

    scopeIn: [
      "Financial promotions for qualifying cryptoassets",
      "Marketing to UK retail customers",
      "Authorised firms communicating or approving promotions",
      "MLR-registered crypto firms relying on Article 73ZA",
    ],

    scopeOut: [
      "Non-UK promotions",
      "Non-qualifying cryptoassets",
      "General conduct regulation outside promotions journey",
    ],

    keyDependencyTopicIds: ["UK.FinProms.S21Gateway"],

    trackedInstruments: [
      {
        id: "PS23_6",
        name: "PS23/6 Financial promotion rules for cryptoassets",
        description:
          "FCA policy statement introducing crypto financial promotion regime",
      },
      {
        id: "FG23_3",
        name: "FG23/3 Cryptoasset financial promotions guidance",
      },
      {
        id: "COBS_4_12A",
        name: "COBS 4.12A RMMI rules",
      },
    ],

    documents: [
      {
        id: "DOC1",
        title: "PS23/6 Financial promotion rules for cryptoassets",
        type: "policy",
        url: "https://www.fca.org.uk/publications/policy-statements/ps23-6",
      },
      {
        id: "DOC2",
        title: "FG23/3 Cryptoasset financial promotions guidance",
        type: "guidance",
        url: "https://www.fca.org.uk/publications/finalised-guidance/fg23-3",
      },
      {
        id: "DOC3",
        title: "FCA Good and Poor Practice Crypto Promotions",
        type: "guidance",
      },
    ],

    definitions: [
      {
        term: "Qualifying cryptoasset",
        meaning:
          "Cryptoassets that fall within the UK financial promotions regime for retail marketing.",
      },
      {
        term: "Direct Offer Financial Promotion",
        meaning:
          "A promotion containing a mechanism allowing a consumer to immediately take steps to invest.",
      },
    ],

    taxonomy: {
      Actor: [
        "authorised person",
        "approver",
        "MLR-registered crypto firm",
        "unauthorised issuer",
      ],
      Channel: ["web", "mobile", "social media", "email", "paid ads"],
      PromoType: ["brand", "front-end", "DOFP"],
      Controls: [
        "risk warning",
        "cooling-off period",
        "appropriateness test",
        "client categorisation",
      ],
    },

    normativeStatements: [
      {
        id: "UKCRYPTO.NS01",
        text: "A firm must only communicate a qualifying cryptoasset financial promotion via a lawful route.",
        strength: "must",
      },
      {
        id: "UKCRYPTO.NS04",
        text: "A qualifying cryptoasset promotion must not include incentives to invest.",
        strength: "mustNot",
      },
      {
        id: "UKCRYPTO.NS06",
        text: "A cryptoasset promotion must include the prescribed crypto risk warning.",
        strength: "must",
      },
      {
        id: "UKCRYPTO.NS09",
        text: "For direct-offer promotions, the firm must apply a 24-hour cooling-off period for first-time investors.",
        strength: "must",
      },
    ],

    processModels: [
      {
        id: "UKCRYPTO.PM01",
        name: "Design and approve crypto promotion",

        trigger: "Marketing wants to publish crypto promotion",

        roles: ["Marketing", "Compliance", "Legal", "Product"],

        steps: [
          {
            id: "step1",
            name: "Check financial promotion perimeter",
            description:
              "Confirm asset qualifies and promotion is in scope of UK regime.",
          },
          {
            id: "step2",
            name: "Confirm lawful route",
            description:
              "Ensure promotion is issued or approved by authorised firm or valid exemption.",
          },
          {
            id: "step3",
            name: "Add required risk warnings",
          },
          {
            id: "step4",
            name: "Apply DOFP journey controls if applicable",
          },
          {
            id: "step5",
            name: "Record and monitor promotion",
          },
        ],
      },
    ],

    owner: "Compliance",

    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-10-21T09:00:00Z"),
  },

  {
    id: "b7b8c4e1-5f1c-4e63-9b7a-0f1a92f3c221",
    name: "UK Section 21 Approver Gateway",

    jurisdiction: "UK",
    regulators: ["FCA", "HM Treasury"],

    description:
      "Regime requiring authorised firms to obtain FCA permission before approving financial promotions for unauthorised persons, including ongoing monitoring and reporting obligations.",

    primaryAnchor:
      "PS23/13 FCA policy statement introducing the Section 21 approver gateway",

    scopeIn: [
      "Authorised firms approving promotions for unauthorised persons",
      "Permission to approve financial promotions",
      "Ongoing monitoring and reporting of approved promotions",
      "Crypto and high-risk investment promotion approvals",
    ],

    scopeOut: [
      "General financial promotion content rules (COBS/MCOB/etc)",
      "Approvals for group companies or appointed representatives where exempt",
    ],

    trackedInstruments: [
      {
        id: "PS23_13",
        name: "PS23/13 Approver gateway policy statement",
      },
      {
        id: "FCA_APPLYING",
        name: "FCA Applying to approve financial promotions guidance",
      },
      {
        id: "FCA_APPROVING",
        name: "FCA Approving financial promotions guidance",
      },
      {
        id: "SUP_REFERENCES",
        name: "SUP 6A and SUP 16 reporting references",
      },
    ],

    documents: [
      {
        id: "DOC_B1",
        title: "PS23/13 Approver Gateway Policy Statement",
        type: "policy",
        url: "https://www.fca.org.uk/publications/policy-statements/ps23-13",
      },
      {
        id: "DOC_B2",
        title: "Applying to approve financial promotions",
        type: "guidance",
        url: "https://www.fca.org.uk/firms/financial-promotions/apply-approve",
      },
      {
        id: "DOC_B3",
        title: "Approving financial promotions",
        type: "guidance",
        url: "https://www.fca.org.uk/firms/financial-promotions/approving",
      },
    ],

    definitions: [
      {
        term: "S21 approver",
        meaning:
          "An authorised firm approving a financial promotion for communication by an unauthorised person.",
      },
      {
        term: "Approver permission",
        meaning:
          "FCA permission required from February 2024 for firms approving promotions for unauthorised persons.",
      },
      {
        term: "Notifiable concern",
        meaning:
          "Concern about a promotion or issuer that could cause consumer harm or raise integrity concerns.",
      },
    ],

    taxonomy: {
      ApprovalScenario: [
        "third-party unauthorised approval",
        "group company approval",
        "appointed representative approval",
        "own promotion distribution",
      ],
      PermissionLifecycle: [
        "applied",
        "granted",
        "refused",
        "limited_scope",
        "transitional",
      ],
      Reporting: [
        "bi-annual reporting",
        "7-day crypto notification",
        "notifiable concern notification",
      ],
      ProductFlags: [
        "qualifying cryptoasset",
        "retail mass market ban product",
      ],
    },

    normativeStatements: [
      {
        id: "UKS21.NS01",
        text: "Firms must obtain FCA approver permission before approving financial promotions for unauthorised persons unless an exemption applies.",
        strength: "must",
      },
      {
        id: "UKS21.NS02",
        text: "Firms may approve promotions without permission where the approval falls wholly within gateway exemptions.",
        strength: "may",
      },
      {
        id: "UKS21.NS03",
        text: "Firms must not approve promotions for unauthorised persons without permission where no exemption applies.",
        strength: "mustNot",
      },
      {
        id: "UKS21.NS06",
        text: "Approver firms must ensure promotions are clear, fair and not misleading and must monitor them on an ongoing basis.",
        strength: "must",
      },
      {
        id: "UKS21.NS08",
        text: "Firms must notify the FCA within 7 days when approving a promotion for a qualifying cryptoasset.",
        strength: "must",
      },
    ],

    processModels: [
      {
        id: "UKS21.PM01",
        name: "Approver gateway compliance lifecycle",

        trigger: "Firm intends to approve a financial promotion",

        roles: [
          "Compliance",
          "Legal",
          "Approvals team",
          "SMF holder",
          "Monitoring",
        ],

        steps: [
          {
            id: "step1",
            name: "Check exemption status",
            description:
              "Determine whether approval falls within group or AR exemption.",
          },
          {
            id: "step2",
            name: "Confirm approver permission",
            description:
              "Verify FCA approver permission covers this promotion type.",
          },
          {
            id: "step3",
            name: "Conduct promotion review",
            description: "Assess content for fairness, clarity and compliance.",
          },
          {
            id: "step4",
            name: "Approve and record",
            description:
              "Record approval decision, version and supporting evidence.",
          },
          {
            id: "step5",
            name: "Notify FCA if required",
          },
          {
            id: "step6",
            name: "Ongoing monitoring",
            description:
              "Monitor approved promotions and withdraw if concerns arise.",
          },
        ],
      },
    ],

    owner: "Compliance",

    createdAt: new Date("2024-02-07T09:00:00Z"),
    updatedAt: new Date("2025-10-20T09:00:00Z"),
  },

  {
    id: "c1e9b2a7-7c9a-4e8f-b9d3-2d71a4c1f901",
    name: "UK Consumer Duty",

    jurisdiction: "UK",
    regulators: ["FCA"],

    description:
      "Cross-cutting FCA regime requiring firms to deliver good outcomes for retail customers across products, communications, pricing and support.",

    primaryAnchor: "PRIN 2A Consumer Duty",

    scopeIn: [
      "All retail customer products and services",
      "Product design and approval processes",
      "Customer communications and disclosures",
      "Ongoing product monitoring and fair value assessments",
      "Customer support and complaints handling",
    ],

    scopeOut: [
      "Wholesale-only business with no retail impact",
      "Unregulated activities outside FCA perimeter",
    ],

    trackedInstruments: [
      {
        id: "PS22_9",
        name: "PS22/9 Consumer Duty Policy Statement",
      },
      {
        id: "FG22_5",
        name: "FG22/5 Finalised Consumer Duty Guidance",
      },
      {
        id: "PRIN_2A",
        name: "PRIN 2A Consumer Duty rules",
      },
    ],

    documents: [
      {
        id: "DOC_CD1",
        title: "PS22/9 Consumer Duty",
        type: "policy",
        url: "https://www.fca.org.uk/publications/policy-statements/ps22-9",
      },
      {
        id: "DOC_CD2",
        title: "FG22/5 Consumer Duty Finalised Guidance",
        type: "guidance",
      },
      {
        id: "DOC_CD3",
        title: "Consumer Duty Implementation Plan Guidance",
        type: "guidance",
      },
    ],

    definitions: [
      {
        term: "Consumer Duty",
        meaning:
          "FCA regime requiring firms to act to deliver good outcomes for retail customers.",
      },
      {
        term: "Good outcomes",
        meaning:
          "Customers receive fair value, clear communications and appropriate support across product lifecycle.",
      },
      {
        term: "Fair value",
        meaning:
          "Price paid by customers must be reasonable relative to benefits received.",
      },
    ],

    taxonomy: {
      Outcome: [
        "products_and_services",
        "price_and_value",
        "consumer_understanding",
        "consumer_support",
      ],
      Lifecycle: [
        "product_design",
        "distribution",
        "onboarding",
        "servicing",
        "offboarding",
      ],
      ControlType: [
        "fair_value_assessment",
        "customer_testing",
        "monitoring_metrics",
        "board_reporting",
      ],
    },

    normativeStatements: [
      {
        id: "CD.NS01",
        text: "Firms must act to deliver good outcomes for retail customers.",
        strength: "must",
      },
      {
        id: "CD.NS02",
        text: "Firms must ensure products and services are designed to meet the needs of identified customer groups.",
        strength: "must",
      },
      {
        id: "CD.NS03",
        text: "Firms must ensure communications support customer understanding and informed decision-making.",
        strength: "must",
      },
      {
        id: "CD.NS04",
        text: "Firms must regularly assess fair value and take action where value is not delivered.",
        strength: "must",
      },
      {
        id: "CD.NS05",
        text: "Firms should monitor customer outcomes using appropriate metrics and MI.",
        strength: "should",
      },
    ],

    processModels: [
      {
        id: "CD.PM01",
        name: "Consumer Duty product lifecycle oversight",

        trigger: "New or existing retail product",

        roles: [
          "Product",
          "Compliance",
          "Risk",
          "Customer Operations",
          "Board",
        ],

        steps: [
          {
            id: "step1",
            name: "Define target market",
          },
          {
            id: "step2",
            name: "Assess product design and value",
          },
          {
            id: "step3",
            name: "Approve product through governance",
          },
          {
            id: "step4",
            name: "Monitor customer outcomes",
          },
          {
            id: "step5",
            name: "Report MI to senior management",
          },
          {
            id: "step6",
            name: "Remediate poor outcomes",
          },
        ],
      },
    ],

    owner: "Compliance",

    createdAt: new Date("2023-07-31T09:00:00Z"),
    updatedAt: new Date("2025-01-15T10:00:00Z"),
  },

  {
    id: "e6c2c8f1-3a4c-4b1d-9c6a-8f2e5a9d1101",
    name: "EU Markets in Crypto-Assets Regulation (MiCA)",

    jurisdiction: "EU",
    regulators: [
      "European Commission",
      "ESMA",
      "EBA",
      "National Competent Authorities",
    ],

    description:
      "EU-wide regulatory framework for cryptoasset issuance, trading platforms and service providers, introducing licensing, disclosure, governance and consumer protection requirements.",

    primaryAnchor:
      "Regulation (EU) 2023/1114 Markets in Crypto-Assets Regulation (MiCA)",

    scopeIn: [
      "Cryptoasset service providers operating in the EU",
      "Crypto trading platforms and exchanges",
      "Stablecoin issuance (ARTs and EMTs)",
      "Crypto custody and brokerage services",
      "Public offerings of cryptoassets in the EU",
    ],

    scopeOut: [
      "Decentralised protocols without identifiable issuer",
      "NFTs where genuinely unique and non-fungible",
      "Traditional financial instruments already regulated under MiFID",
    ],

    trackedInstruments: [
      {
        id: "MICA_REG",
        name: "EU Regulation 2023/1114 MiCA",
      },
      {
        id: "ESMA_RTS",
        name: "ESMA MiCA Regulatory Technical Standards",
      },
      {
        id: "EBA_STABLECOIN",
        name: "EBA Stablecoin guidance",
      },
    ],

    documents: [
      {
        id: "DOC_MICA1",
        title: "MiCA Regulation Official Text",
        type: "law",
        url: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj",
      },
      {
        id: "DOC_MICA2",
        title: "ESMA MiCA Consultation Papers",
        type: "consultation",
      },
      {
        id: "DOC_MICA3",
        title: "EBA Stablecoin Supervisory Expectations",
        type: "guidance",
      },
    ],

    definitions: [
      {
        term: "Cryptoasset Service Provider (CASP)",
        meaning:
          "Entity providing cryptoasset custody, exchange, brokerage or related services within the EU.",
      },
      {
        term: "Asset-Referenced Token (ART)",
        meaning:
          "Stablecoin referencing multiple assets including currencies or commodities.",
      },
      {
        term: "E-Money Token (EMT)",
        meaning: "Stablecoin referencing a single fiat currency.",
      },
    ],

    taxonomy: {
      EntityType: [
        "exchange",
        "custodian",
        "broker",
        "issuer",
        "stablecoin_issuer",
      ],
      ObligationArea: [
        "authorisation",
        "disclosure",
        "capital_requirements",
        "governance",
        "consumer_protection",
        "market_abuse",
      ],
      TokenType: ["utility_token", "ART", "EMT", "other_cryptoasset"],
    },

    normativeStatements: [
      {
        id: "MICA.NS01",
        text: "Cryptoasset service providers must obtain authorisation before operating within the EU.",
        strength: "must",
      },
      {
        id: "MICA.NS02",
        text: "Issuers of cryptoassets must publish an approved cryptoasset whitepaper before public offering.",
        strength: "must",
      },
      {
        id: "MICA.NS03",
        text: "Stablecoin issuers must maintain sufficient reserves and governance arrangements.",
        strength: "must",
      },
      {
        id: "MICA.NS04",
        text: "Firms must implement market abuse monitoring for cryptoasset trading activity.",
        strength: "must",
      },
      {
        id: "MICA.NS05",
        text: "Firms should maintain effective complaints handling and customer protection processes.",
        strength: "should",
      },
    ],

    processModels: [
      {
        id: "MICA.PM01",
        name: "CASP authorisation and",
        trigger: "Firm intends to operate crypto services in EU",

        roles: ["Legal", "Compliance", "Risk", "Regulatory Affairs"],

        steps: [
          {
            id: "step1",
            name: "Determine licence requirements",
          },
          {
            id: "step2",
            name: "Prepare authorisation application",
          },
          {
            id: "step3",
            name: "Submit to national regulator",
          },
          {
            id: "step4",
            name: "Implement governance and controls",
          },
          {
            id: "step5",
            name: "Ongoing regulatory reporting",
          },
        ],
      },
    ],

    owner: "Regulatory Compliance",

    createdAt: new Date("2024-06-30T09:00:00Z"),
    updatedAt: new Date("2025-02-01T09:00:00Z"),
  },
];
