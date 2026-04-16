import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TemporalTrend {
  week: string;
  countryMentions: number;
  leaderStatements: number;
  escalationScore: number;
  keyEvent: string;
}

export interface NarrativeCluster {
  narrative: string;
  origin: string;
  amplifiedBy: string[];
  opposedBy: string[];
  neutralCoverage: string[];
  propagationSpeed: string;
}

export interface InfluenceNode {
  id: string;
  name: string;
  type: 'Leader' | 'Organization' | 'Country';
  group: number;
}

export interface InfluenceEdge {
  source: string;
  target: string;
  relationType: 'alliance' | 'conflict' | 'economic dependency' | 'policy alignment';
  description: string;
}

export interface InfluenceNetwork {
  nodes: InfluenceNode[];
  edges: InfluenceEdge[];
}

export interface EarlyWarningSignal {
  signalType: string;
  description: string;
  region: string;
  mediaFrequency: number;
  credibilityWeight: number;
  policyMentionWeight: number;
  militaryIndicatorWeight: number;
  weakSignalScore: number;
  confidence: number;
}

export interface ScenarioImpact {
  oilPriceImpact: string;
  supplyChainImpact: string;
  militaryRiskIndex: number;
}

export interface Scenario {
  name: string;
  probability: number;
  description: string;
  impact: ScenarioImpact;
}

export interface ScenarioSimulation {
  triggerEvent: string;
  scenarios: Scenario[];
}

export interface OsintSource {
  sourceName: string;
  sourceType: 'RSS Media' | 'Think Tank' | 'X/Twitter' | 'Reddit' | 'Gov Press Release' | 'Sanctions DB' | 'Military DB' | 'Other';
  signalStrength: number;
  keyFinding: string;
  reliability: number;
  credibilityScore: number;
}

export interface OsintIngestion {
  sources: OsintSource[];
  fusionSummary: string;
  overallConfidence: number;
}

export interface CountryRisk {
  countryCode: string; // ISO 3166-1 alpha-3 (e.g., 'USA', 'CHN', 'RUS')
  countryName: string;
  riskScore: number; // 0.0 to 10.0
}

export interface ConfidenceScore {
  prediction: string;
  confidence: number;
  evidence: {
    newsSources: number;
    leaderStatements: number;
    policyDrafts: number;
  };
}

export interface StrategicPrediction {
  figureName: string;
  country: string;
  role: string;
  analysis: string;
  predictedPlan: string;
  confidenceLevel: number; // 0-100
  potentialImpact: number; // 0-10
}

export interface EventTimeline {
  date: string;
  event: string;
}

export interface StructuredEvent {
  eventType: string;
  actor: string;
  target: string;
  sector: string;
  confidence: number;
  date: string;
  escalationValue: number;
}

export interface EscalationModel {
  score: number;
  stage: string;
  description: string;
}

export interface ActorStrategy {
  actor: string;
  priorities: string[];
  riskTolerance: 'Low' | 'Medium' | 'Medium-High' | 'High';
  responsePattern: string;
  predictedResponse: string;
}

export interface SourceDiversity {
  mediaSources: number;
  governmentSource: number;
  policySource: number;
  militarySource: number;
  interpretation: string;
}

export interface NetworkGraph {
  nodes: { id: string; label: string; type: string; influenceCentrality: number }[];
  edges: { from: string; to: string; relationship: string }[];
  coalitionClusters: string[][];
}

export interface TimeSeriesData {
  week: number;
  mentions: number;
}

export interface WeakSignal {
  description: string;
  confidence: number;
}

export interface NarrativeRealityIndex {
  narrativeIntensity: number;
  policyIntensity: number;
  militaryIntensity: number;
  interpretation: 'PROPAGANDA_FRAMING' | 'QUIET_STRATEGIC_SHIFT' | 'BALANCED';
}

export interface NarrativeSimilarity {
  articleA: string;
  articleB: string;
  similarityScore: number;
  interpretation: 'IDENTICAL' | 'RELATED' | 'DIFFERENT';
}

export interface ActorInfluenceWeight {
  actor: string;
  weight: number;
}

export interface ConfidenceEstimation {
  evidenceStrength: number;
  sourceCredibility: number;
  signalDiversity: number;
  confidenceScore: number;
  interpretation: 'WEAK_EVIDENCE' | 'MODERATE' | 'STRONG';
}

export interface ScenarioProbability {
  scenario: string;
  priorProbability: number;
  posteriorProbability: number;
}

export interface RiskMatrix {
  probability: number;
  impact: number;
  riskScore: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ActorAlignment {
  actorA: string;
  actorB: string;
  similarity: number;
  sharedPositions: string[];
}

export interface EscalationIndex {
  totalEscalationScore: number;
  events: { event: string; score: number }[];
}

export interface ConfidenceModel {
  prediction: string;
  confidence: number;
  evidence: {
    mediaSignals: number;
    policySignals: number;
    militarySignals: number;
  };
}

export interface TemporalMomentum {
  momentumScore: number;
  interpretation: string;
}

export interface MultiFactorThreatScore {
  totalScore: number;
  probability: number;
  impact: number;
  escalation: number;
  actorCapability: number;
  strategicImportance: number;
}

export interface Cluster {
  id: number;
  name: string;
  issues: string[];
}

export type SignalSource = 'GOVERNMENT_POLICY' | 'MILITARY_MOVEMENT' | 'DIPLOMATIC_MEETING' | 'LEADER_SPEECH' | 'MEDIA_REPORT' | 'SOCIAL_MEDIA';

export interface Signal {
  type: 'POLICY' | 'ECONOMIC' | 'MILITARY' | 'DIPLOMATIC';
  source: SignalSource;
  description: string;
  intensity: number; // Base intensity 1-10
  weight: number; // Weight based on source
}

export interface SignalExtractionLayer {
  signals: Signal[];
  summary: string;
}

export interface OsintVerificationMethod {
  methodName: string;
  description: string;
  application: string;
  status: 'Verified' | 'Unverified' | 'In Progress' | 'Not Applicable';
  confidence: number;
}

export interface IntelligenceLogicComponent {
  name: string;
  description: string;
  application: string;
}

export interface IntelligenceLogicLayer {
  layerName: string;
  layerDescription: string;
  components: IntelligenceLogicComponent[];
}

export interface ACHHypothesis {
  id: string;
  name: string;
  description: string;
  inconsistencies: number;
  confidenceLevel: 'High' | 'Moderate' | 'Low';
}

export interface ACHEvidence {
  id: string;
  description: string;
  evaluations: Record<string, '+' | '-' | 'N/A'>;
}

export interface ACHRejectedHypothesis {
  hypothesisId: string;
  reason: string;
}

export interface ACHSensitivityCheck {
  crucialEvidenceId: string;
  wouldConclusionChange: boolean;
  mostSensitiveHypothesisId: string;
}

export interface ACHAnalysis {
  hypotheses: ACHHypothesis[];
  evidence: ACHEvidence[];
  keyAssumptions: string[];
  rejectedHypotheses: ACHRejectedHypothesis[];
  sensitivityCheck: ACHSensitivityCheck;
  finalConclusion: {
    strongestHypothesisId: string;
    confidenceLevel: 'High' | 'Moderate' | 'Low';
    reasoning: string;
  };
}

export interface KeyAssumption {
  assumption: string;
  supportingEvidence: string;
  refutingEvidence: string;
  strength: 'Strong' | 'Weak' | 'Untested';
  actionTaken: 'Keep' | 'Revise' | 'Discard';
}

export interface DevilsAdvocacy {
  originalConclusion: string;
  counterArguments: string[];
}

export interface RedTeamAnalysis {
  adversaryPerspective: string;
  deceptionTactics: string[];
}

export interface WhatIfAnalysis {
  unlikelyScenario: string;
  implications: string[];
  earlyIndicators: string[];
}

export interface IndicatorAndWarning {
  scenario: string;
  indicators: {
    description: string;
    status: 'Observed' | 'Not Observed' | 'Emerging';
  }[];
  alertLevel: 'Low' | 'Elevated' | 'High' | 'Critical';
}

export interface ScenarioAnalysisItem {
  type: 'Best Case' | 'Worst Case' | 'Most Likely' | 'Wild Card';
  description: string;
  keyDrivers: string[];
  indicators: string[];
  implications: string[];
}

export interface CrossImpactMatrix {
  factors: string[];
  matrix: {
    rowFactor: string;
    colFactor: string;
    impact: 'Strengthens' | 'Weakens' | 'No Effect';
  }[];
}

export interface SATAnalysis {
  keyAssumptionsCheck: KeyAssumption[];
  devilsAdvocacy: DevilsAdvocacy;
  redTeamAnalysis: RedTeamAnalysis;
  whatIfAnalysis: WhatIfAnalysis;
  indicatorsAndWarnings: IndicatorAndWarning;
  scenarioAnalysis: ScenarioAnalysisItem[];
  crossImpactMatrix: CrossImpactMatrix;
}

export interface DorkItem {
  query: string;
  purpose: string;
}

export interface DeepDorkCrawl {
  dorks: {
    indonesian: DorkItem[];
    international: DorkItem[];
    advanced: DorkItem[];
  };
  crawlStrategy: string[];
  archivingTools: string[];
  spreadsheetColumns: string[];
}

export interface ThreatAnalysis {
  scanSummary: string;
  signalExtraction: SignalExtractionLayer;
  eventDetection: StructuredEvent[];
  escalationModel: EscalationModel;
  actorStrategies: ActorStrategy[];
  sourceDiversity: SourceDiversity;
  networkGraph: NetworkGraph;
  narrativeRealityIndex: NarrativeRealityIndex;
  timeSeriesData: TimeSeriesData[];
  weakSignals: WeakSignal[];
  confidenceModel: ConfidenceModel;
  multiFactorThreatScore: MultiFactorThreatScore;
  temporalMomentum: TemporalMomentum;
  actorAlignments: ActorAlignment[];
  narrativeSimilarities: NarrativeSimilarity[];
  escalationIndex: EscalationIndex;
  actorInfluenceWeights: ActorInfluenceWeight[];
  confidenceEstimation: ConfidenceEstimation;
  scenarioProbabilities: ScenarioProbability[];
  riskMatrix: RiskMatrix;
  clusters: Cluster[];
  regionalIssues: {
    regionOrCountry: string;
    issue: string;
    stance: string;
    intensityScore: number;
  }[];
  leaderIntents: {
    leaderName: string;
    country: string;
    recentStatement: string;
    inferredIntent: string;
    threatLevel: number;
  }[];
  dialecticalAnalysis: {
    thesis: string;
    antithesis: string;
    synthesis: string;
  };
  threatMatrix: {
    threatName: string;
    probability: number;
    impact: number;
    description: string;
  }[];
  temporalTrends: TemporalTrend[];
  momentumIndex: number;
  narrativeShift: string;
  narrativeClusters: NarrativeCluster[];
  influenceNetwork: InfluenceNetwork;
  earlyWarningSignals: EarlyWarningSignal[];
  scenarioSimulation: ScenarioSimulation;
  osintIngestion: OsintIngestion;
  globalHeatmap: CountryRisk[];
  confidenceScore: ConfidenceScore;
  eventTimeline: EventTimeline[];
  strategicPredictions: StrategicPrediction[];
  osintVerifications: OsintVerificationMethod[];
  intelligenceLogic: IntelligenceLogicLayer[];
  achAnalysis: ACHAnalysis;
  satAnalysis: SATAnalysis;
  deepDorkCrawl: DeepDorkCrawl;
}

export async function analyzeGlobalThreats(topic: string): Promise<ThreatAnalysis> {
  const prompt = `Perform a comprehensive global threat analysis on the topic: "${topic}".
Use Google Search to find the latest news, statements from world leaders, and geopolitical movements related to this topic.

Provide the output strictly as a JSON object inside a markdown code block (e.g., \`\`\`json { ... } \`\`\`). Do not include any other text outside the JSON block.

The JSON object MUST follow this structure:
{
  "scanSummary": "A brief executive summary of the current situation (e.g., 'Berdasarkan dari hasil analisis dan pengumpulan data selama beberapa menit, saya dapat memberikan sebuah pemetaan atau analisis bahwa ada rencana dari negara bagian eropa bersepakat akan memboikot dan meng embargo china untuk menghambat produksi minyak dan lainnya. Data ini saya analisis dari setiap negara eropa yang mengangkat issue ini dan beberapa statment dari pimpinan negara...'). Use Indonesian language.",
  "signalExtraction": {
    "signals": [
      {
        "type": "POLICY",
        "description": "Description of the signal",
        "weight": 0.5
      }
    ],
    "summary": "Summary of signal extraction"
  },
  "eventDetection": [
    {
      "eventType": "trade restriction",
      "actor": "Germany",
      "target": "China",
      "sector": "semiconductor",
      "confidence": 0.67,
      "date": "2026-03-12",
      "escalationValue": 2.0
    }
  ],
  "escalationModel": {
    "score": 4.7,
    "stage": "Stage 3: economic confrontation",
    "description": "Analysis of escalation based on event progression."
  },
  "actorStrategies": [
    {
      "actor": "China",
      "priorities": ["supply chain control", "resource security", "regional dominance"],
      "riskTolerance": "Medium",
      "responsePattern": "economic retaliation",
      "predictedResponse": "Targeted export restrictions on rare earth minerals"
    }
  ],
  "sourceDiversity": {
    "mediaSources": 12,
    "governmentSource": 0,
    "policySource": 0,
    "militarySource": 0,
    "interpretation": "High narrative amplification, low strategic signal."
  },
  "networkGraph": {
    "nodes": [
      { "id": "DEU", "label": "Germany", "type": "country", "influenceCentrality": 0.8 },
      { "id": "CHN", "label": "China", "type": "country", "influenceCentrality": 0.7 },
      { "id": "USA", "label": "US", "type": "country", "influenceCentrality": 0.9 }
    ],
    "edges": [
      { "from": "DEU", "to": "CHN", "relationship": "trade dependency" },
      { "from": "DEU", "to": "USA", "relationship": "alliance" }
    ],
    "coalitionClusters": [["DEU", "USA"], ["CHN"]]
  },
  "narrativeRealityIndex": {
    "narrativeIntensity": 8,
    "policyIntensity": 3,
    "militaryIntensity": 1,
    "interpretation": "High narrative amplification, low strategic signal. Likely propaganda."
  },
  "regionalIssues": [
    {
      "regionOrCountry": "Country/Region Name",
      "issue": "Description of the issue",
      "stance": "Support/Oppose/Neutral",
      "intensityScore": 1-10 (number)
    }
  ],
  "leaderIntents": [
    {
      "leaderName": "Name",
      "country": "Country",
      "recentStatement": "Summary of recent statement or action",
      "inferredIntent": "What they are likely planning",
      "threatLevel": 1-10 (number)
    }
  ],
  "dialecticalAnalysis": {
    "thesis": "The dominant current trend or plan (e.g., Europe planning embargo)",
    "antithesis": "The opposing force or reaction (e.g., China retaliating with rare earth export bans)",
    "synthesis": "The predicted future outcome or new paradigm"
  },
  "threatMatrix": [
    {
      "threatName": "Name of threat",
      "probability": 1-10 (number),
      "impact": 1-10 (number),
      "description": "Details"
    }
  ],
  "temporalTrends": [
    {
      "week": "W1",
      "countryMentions": 3 (number of countries involved),
      "leaderStatements": 2 (number of official statements),
      "escalationScore": 2.3 (float 0.0-10.0),
      "keyEvent": "Brief description of the key event that week"
    },
    {
      "week": "W2",
      "countryMentions": 6,
      "leaderStatements": 4,
      "escalationScore": 4.9,
      "keyEvent": "Brief description"
    },
    {
      "week": "W3",
      "countryMentions": 9,
      "leaderStatements": 6,
      "escalationScore": 7.1,
      "keyEvent": "Brief description"
    },
    {
      "week": "W4",
      "countryMentions": 12,
      "leaderStatements": 8,
      "escalationScore": 8.5,
      "keyEvent": "Brief description"
    }
  ],
  "momentumIndex": 75 (integer 0-100, representing the current momentum of the issue escalating),
  "narrativeShift": "A brief analysis of how the narrative has shifted over these 4 weeks (e.g., 'Awalnya hanya diskusi antar 3 negara, kini NATO mulai ikut serta...').",
  "narrativeClusters": [
    {
      "narrative": "Core narrative or propaganda theme (e.g., 'China threat to supply chain')",
      "origin": "Who started or is the main source of this narrative (e.g., 'US think tank')",
      "amplifiedBy": ["Entity 1", "Entity 2"],
      "opposedBy": ["Entity 3"],
      "neutralCoverage": ["Entity 4"],
      "propagationSpeed": "Slow"
    }
  ],
  "influenceNetwork": {
    "nodes": [
      {
        "id": "unique_id_1",
        "name": "Leader/Org Name",
        "type": "Leader",
        "group": 1
      }
    ],
    "edges": [
      {
        "source": "unique_id_1",
        "target": "unique_id_2",
        "relationType": "alliance",
        "description": "Brief description of the relationship"
      }
    ]
  },
  "earlyWarningSignals": [
    {
      "signalType": "think tank publish policy paper",
      "description": "Brief description of the weak signal",
      "region": "South China Sea",
      "mediaFrequency": 5,
      "credibilityWeight": 0.8,
      "policyMentionWeight": 3,
      "militaryIndicatorWeight": 1,
      "weakSignalScore": 8,
      "confidence": 72
    }
  ],
  "scenarioSimulation": {
    "triggerEvent": "The main event or trigger (e.g., 'EU embargo China')",
    "scenarios": [
      {
        "name": "Scenario name (e.g., 'Trade war escalation')",
        "probability": 40,
        "description": "Brief description of this scenario",
        "impact": {
          "oilPriceImpact": "+15%",
          "supplyChainImpact": "Severe Disruption",
          "militaryRiskIndex": 8
        }
      }
    ]
  },
  "osintIngestion": {
    "sources": [
      {
        "sourceName": "Name of the source (e.g., 'CSIS', 'Reuters', 'r/geopolitics')",
        "sourceType": "RSS Media" | "Think Tank" | "X/Twitter" | "Reddit" | "Gov Press Release" | "Sanctions DB" | "Military DB" | "Other",
        "signalStrength": 8,
        "keyFinding": "Brief summary of the finding from this source",
        "reliability": 90,
        "credibilityScore": 9
      }
    ],
    "fusionSummary": "A brief summary synthesizing the signals from all these diverse sources.",
    "overallConfidence": 85
  },
  "globalHeatmap": [
    {
      "countryCode": "ISO 3166-1 alpha-3 code (e.g., 'USA', 'CHN', 'RUS', 'IDN')",
      "countryName": "Country Name",
      "riskScore": 8.7
    }
  ],
  "confidenceScore": {
    "prediction": "The main prediction (e.g., 'EU embargo China')",
    "confidence": 63,
    "evidence": {
      "newsSources": 9,
      "leaderStatements": 2,
      "policyDrafts": 1
    }
  },
  "eventTimeline": [
    {
      "date": "Jan 4",
      "event": "EU trade meeting"
    }
  ],
  "strategicPredictions": [
    {
      "figureName": "Name of the influential figure",
      "country": "Country",
      "role": "Role or position",
      "analysis": "Analysis of their recent news and public statements",
      "predictedPlan": "Predicted strategic plan (e.g., Pemboikotan, Embargo)",
      "confidenceLevel": 85,
      "potentialImpact": 9
    }
  ],
  "osintVerifications": [
    {
      "methodName": "Geolocation",
      "description": "Cocokkan elemen di foto/video (papan nama, bayangan, vegetasi, arsitektur) dengan citra satelit atau Street View.",
      "application": "Bagaimana metode ini diterapkan pada topik ini (misal: melacak lokasi video pergerakan militer).",
      "status": "Verified",
      "confidence": 90
    },
    {
      "methodName": "Chronolocation",
      "description": "Analisis waktu via bayangan matahari, posisi bulan, atau metadata.",
      "application": "Bagaimana metode ini diterapkan...",
      "status": "Verified",
      "confidence": 85
    },
    {
      "methodName": "Reverse Image Search",
      "description": "Pakai Yandex, Google, TinEye untuk melacak asal foto.",
      "application": "Bagaimana metode ini diterapkan...",
      "status": "Verified",
      "confidence": 95
    },
    {
      "methodName": "Social Media Footprint",
      "description": "Analisis profil, koneksi, postingan lama, metadata.",
      "application": "Bagaimana metode ini diterapkan...",
      "status": "In Progress",
      "confidence": 60
    },
    {
      "methodName": "Satellite & Geospatial",
      "description": "Bandingkan citra sebelum-sesudah (Maxar, Planet, Sentinel Hub).",
      "application": "Bagaimana metode ini diterapkan...",
      "status": "Not Applicable",
      "confidence": 0
    },
    {
      "methodName": "Verification Tools",
      "description": "InVID, Amnesty Video Verifier, Google Earth Pro, dll.",
      "application": "Bagaimana metode ini diterapkan...",
      "status": "Verified",
      "confidence": 88
    }
  ],
  "intelligenceLogic": [
    {
      "layerName": "1. Logika Dasar (Penalaran)",
      "layerDescription": "3 Jenis Penalaran yang Digabung (Deduktif, Induktif, Abduktif)",
      "components": [
        {
          "name": "Deduktif",
          "description": "Dari aturan umum ke kesimpulan spesifik.",
          "application": "Berikan contoh penerapan deduktif yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan nama aktor, negara, kebijakan, atau peristiwa spesifik yang sedang dianalisis. Jangan gunakan penjelasan umum."
        },
        {
          "name": "Induktif",
          "description": "Dari banyak kasus kecil ke pola/kesimpulan umum.",
          "application": "Berikan contoh penerapan induktif yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan nama aktor, negara, kebijakan, atau peristiwa spesifik yang sedang dianalisis. Jangan gunakan penjelasan umum."
        },
        {
          "name": "Abduktif",
          "description": "Penjelasan terbaik dari bukti yang ada.",
          "application": "Berikan contoh penerapan abduktif yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan nama aktor, negara, kebijakan, atau peristiwa spesifik yang sedang dianalisis. Jangan gunakan penjelasan umum."
        }
      ]
    },
    {
      "layerName": "2. Structured Analytic Techniques (SATs)",
      "layerDescription": "Teknik analisis terstruktur",
      "components": [
        {
          "name": "Analysis of Competing Hypotheses (ACH)",
          "description": "Menguji bukti untuk menolak hipotesis, bukan mendukungnya.",
          "application": "Berikan contoh penerapan ACH yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan hipotesis spesifik yang diuji."
        },
        {
          "name": "Key Assumptions Check",
          "description": "Menguji asumsi dasar dan mencari bukti yang membantahnya.",
          "application": "Berikan contoh penerapan Key Assumptions Check yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan asumsi spesifik yang diuji."
        },
        {
          "name": "Devil's Advocacy & Red Team",
          "description": "Membantah kesimpulan sendiri atau berpikir seperti musuh.",
          "application": "Berikan contoh penerapan Red Team/Devil's Advocacy yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan skenario spesifik."
        }
      ]
    },
    {
      "layerName": "3. Logika Verifikasi OSINT",
      "layerDescription": "Falsification, Triangulation, Chain of Custody, Confidence Calibration",
      "components": [
        {
          "name": "Falsification Logic",
          "description": "Mencari bukti yang membantah hipotesis (Karl Popper style).",
          "application": "Berikan contoh penerapan Falsification yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini."
        },
        {
          "name": "Triangulation Logic",
          "description": "Minimal 3 sumber independen + 1 sumber konfirmasi visual/satelit.",
          "application": "Berikan contoh penerapan Triangulation yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan sumber spesifik."
        },
        {
          "name": "Chain of Custody & Confidence",
          "description": "Penelusuran asal bukti dan kalibrasi keyakinan (High/Moderate/Low).",
          "application": "Berikan contoh penerapan Chain of Custody yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini."
        }
      ]
    },
    {
      "layerName": "4. Logika Anti-Bias",
      "layerDescription": "Menghindari Anchoring, Mirror-imaging, Availability bias, Groupthink",
      "components": [
        {
          "name": "Anti-Bias Check",
          "description": "Mengevaluasi apa yang terlewat karena ingin percaya sesuatu benar.",
          "application": "Berikan contoh penerapan Anti-Bias Check yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan bias spesifik yang dihindari."
        },
        {
          "name": "Pre-mortem",
          "description": "Membayangkan kesimpulan salah total, dan mencari penyebabnya.",
          "application": "Berikan contoh penerapan Pre-mortem yang SANGAT SPESIFIK dan MENDETAIL terkait topik ini. Sebutkan skenario kegagalan spesifik."
        }
      ]
    }
  ],
  "achAnalysis": {
    "hypotheses": [
      {
        "id": "H1",
        "name": "Hipotesis 1",
        "description": "Deskripsi hipotesis 1",
        "inconsistencies": 1,
        "confidenceLevel": "High"
      },
      {
        "id": "H2",
        "name": "Hipotesis 2",
        "description": "Deskripsi hipotesis 2",
        "inconsistencies": 4,
        "confidenceLevel": "Low"
      },
      {
        "id": "H3",
        "name": "Hipotesis 3",
        "description": "Deskripsi hipotesis 3",
        "inconsistencies": 3,
        "confidenceLevel": "Moderate"
      }
    ],
    "evidence": [
      {
        "id": "E1",
        "description": "Bukti 1 (dengan link & tanggal)",
        "evaluations": {
          "H1": "+",
          "H2": "-",
          "H3": "N/A"
        }
      },
      {
        "id": "E2",
        "description": "Bukti 2 (dengan link & tanggal)",
        "evaluations": {
          "H1": "+",
          "H2": "-",
          "H3": "-"
        }
      }
    ],
    "keyAssumptions": [
      "Asumsi kunci 1...",
      "Asumsi kunci 2..."
    ],
    "rejectedHypotheses": [
      {
        "hypothesisId": "H2",
        "reason": "Ditolak karena bertentangan dengan bukti E1 dan E2 yang sangat kuat."
      }
    ],
    "sensitivityCheck": {
      "crucialEvidenceId": "E1",
      "wouldConclusionChange": false,
      "mostSensitiveHypothesisId": "H3"
    },
    "finalConclusion": {
      "strongestHypothesisId": "H1",
      "confidenceLevel": "High",
      "reasoning": "Hipotesis 1 memiliki jumlah inkonsistensi (-) paling sedikit dan didukung oleh bukti terkuat."
    }
  },
  "satAnalysis": {
    "keyAssumptionsCheck": [
      {
        "assumption": "Media ini netral",
        "supportingEvidence": "Reputasi historis baik",
        "refutingEvidence": "Ada kepemilikan baru oleh pihak berkepentingan",
        "strength": "Weak",
        "actionTaken": "Revise"
      }
    ],
    "devilsAdvocacy": {
      "originalConclusion": "Conclusion: Country X is isolated",
      "counterArguments": [
        "Could be a feint",
        "Internal political reasons"
      ]
    },
    "redTeamAnalysis": {
      "adversaryPerspective": "Jika saya adalah negara X, saya akan...",
      "deceptionTactics": [
        "Meninggalkan jejak bahasa negara Y di dalam malware.",
        "Menyerang infrastruktur sendiri yang tidak penting sebagai alibi."
      ]
    },
    "whatIfAnalysis": {
      "unlikelyScenario": "Bagaimana jika video ini adalah deepfake yang sangat canggih?",
      "implications": [
        "Semua bukti visual harus dianulir.",
        "Ada aktor negara dengan teknologi AI tingkat tinggi yang terlibat."
      ],
      "earlyIndicators": [
        "Ketidakkonsistenan bayangan pada frame 12-15.",
        "Audio tidak sinkron dengan gerakan bibir mikro."
      ]
    },
    "indicatorsAndWarnings": {
      "scenario": "Eskalasi militer di wilayah Z",
      "indicators": [
        {
          "description": "Lonjakan berita latihan militer rutin",
          "status": "Observed"
        },
        {
          "description": "Penutupan jalur penerbangan sipil",
          "status": "Emerging"
        }
      ],
      "alertLevel": "Elevated"
    },
    "scenarioAnalysis": [
      {
        "type": "Most Likely",
        "description": "Skenario yang paling mungkin terjadi...",
        "keyDrivers": ["Faktor ekonomi", "Tekanan domestik"],
        "indicators": ["Indikator 1", "Indikator 2"],
        "implications": ["Dampak 1", "Dampak 2"]
      }
    ],
    "crossImpactMatrix": {
      "factors": ["Harga Minyak", "Pernyataan Pejabat", "Sentimen Sosmed"],
      "matrix": [
        {
          "rowFactor": "Harga Minyak",
          "colFactor": "Pernyataan Pejabat",
          "impact": "Strengthens"
        }
      ]
    }
  },
  "deepDorkCrawl": {
    "dorks": {
      "indonesian": [
        {
          "query": "site:kompas.com OR site:detik.com OR site:tempo.co \"[keyword topik]\" after:2025-01-01",
          "purpose": "Mencari berita dasar di media nasional utama."
        }
      ],
      "international": [
        {
          "query": "site:reuters.com OR site:bbc.com inurl:2025 \"[keyword topik]\"",
          "purpose": "Mencari pemberitaan internasional terkait."
        }
      ],
      "advanced": [
        {
          "query": "\"laporan rahasia\" OR \"dokumen internal\" (site:kompas.com OR site:detik.com) -inurl:ads -inurl:sponsor",
          "purpose": "Mencari dokumen bocoran atau laporan investigasi mendalam."
        }
      ]
    },
    "crawlStrategy": [
      "Mulai dengan dork luas, catat 10-20 link terbaik.",
      "Ambil kata kunci baru dari artikel tersebut, buat dork baru."
    ],
    "archivingTools": [
      "archive.is",
      "Wayback Machine"
    ],
    "spreadsheetColumns": [
      "Tanggal",
      "Sumber",
      "Judul",
      "Link Arsip",
      "Catatan Bias"
    ]
  }
}

Ensure all text values are in Indonesian language, as requested by the user. For eventDetection, normalize news into structured events (EVENT_TYPE, ACTOR, TARGET, SECTOR, CONFIDENCE, DATE, ESCALATION_VALUE). For escalationModel, calculate the total escalation score based on event values and determine the stage (Stage 1: rhetoric escalation, Stage 2: diplomatic action, Stage 3: economic restriction, Stage 4: strategic pressure, Stage 5: military signalling). For actorStrategies, analyze the strategic doctrine of key actors involved in the events, including their priorities, risk tolerance, and response patterns, and predict their most likely response to the current event. For sourceDiversity, calculate the diversity of sources (media, government, policy, military) to interpret whether the event is a high-narrative amplification or a high-strategic signal. For networkGraph, map the relationships (trade dependency, alliance, policy alignment) between key actors to calculate influence centrality and coalition clusters. For narrativeRealityIndex, calculate narrativeIntensity (media frequency), policyIntensity (government action), and militaryIntensity (force movement). If narrativeIntensity >> policyIntensity, interpret as PROPAGANDA_FRAMING. If policyIntensity >> narrativeIntensity, interpret as QUIET_STRATEGIC_SHIFT. Otherwise, BALANCED. For narrativeSimilarities, calculate cosine similarity between article embeddings. If >0.85, interpret as IDENTICAL. If 0.6–0.85, interpret as RELATED. If <0.6, interpret as DIFFERENT. For escalationIndex, sum event scores: statement=1, diplomatic protest=2, sanction proposal=3, economic sanction=4, military exercise=6, military deployment=8. For actorInfluenceWeights, assign weights: US/China=1.0, EU=0.9, Russia=0.8, regional power=0.5, small state=0.2. For confidenceEstimation, calculate: confidence = evidenceStrength * sourceCredibility * signalDiversity. If <0.3 = WEAK_EVIDENCE, 0.3-0.6 = MODERATE, >0.6 = STRONG. For scenarioProbabilities, use Bayesian update: Posterior(A) = P(signal|A) * P(A) / P(signal). For riskMatrix, calculate Risk = Probability * Impact. If 0-20 = LOW, 20-50 = MEDIUM, 50-100 = HIGH. For clusterDetection, use K-means clustering to group related issues into 3-5 clusters based on topical similarity. For timeSeriesData, simulate a 4-week progression of mentions for the issue. For weakSignals, detect 2-3 weak signal clusters and assign a confidence score (0-100). For confidenceModel, provide a prediction, a confidence score (0-1) and evidence counts (media, policy, military signals). For multiFactorThreatScore, calculate the threat score using the formula: (0.30 * Probability) + (0.25 * Impact) + (0.20 * Escalation) + (0.15 * Actor Capability) + (0.10 * Strategic Importance). For temporalMomentum, calculate using the formula: (mentions_current - mentions_previous) / mentions_previous. Interpret as: <0 = ISU_MENURUN, 0-1 = STABIL, >1 = ESKALASI_CEPAT. For actorAlignments, identify key actors, compare their policy positions on major issues, and calculate similarity as matched_positions / total_positions. For signalExtraction, extract and categorize signals into POLICY, ECONOMIC, MILITARY, or DIPLOMATIC. Assign a source and weight based on this scale: GOVERNMENT_POLICY=1.0, MILITARY_MOVEMENT=0.9, DIPLOMATIC_MEETING=0.7, LEADER_SPEECH=0.5, MEDIA_REPORT=0.3, SOCIAL_MEDIA=0.1. Calculate the final signal score as: Σ (Intensity * Weight). For temporalTrends, simulate or infer a realistic 4-week progression (past 3 weeks + current week, or predicting the next 4 weeks) based on the current context. For narrativeClusters, identify 2-3 main propaganda or narrative themes currently circulating regarding this topic. For influenceNetwork, map out the key leaders, organizations, and countries involved and their relationships (alliance, conflict, economic dependency, policy alignment). For earlyWarningSignals, detect 2-3 weak signals (e.g., diplomat statement, military exercise, economic sanction draft). Calculate weakSignalScore as: (mediaFrequency * credibilityWeight) + policyMentionWeight + militaryIndicatorWeight. confidence should be a percentage (0-100). For scenarioSimulation, create a scenario tree with 3 possible scenarios based on a key trigger event, including their probabilities (summing to 100%) and impact simulations. For osintIngestion, simulate gathering data from at least 4 different source types (e.g., Think Tank, Twitter, Reddit, Gov Press Release) to show a multi-source signal fusion. signalStrength and reliability are 1-100. For credibilityScore, use this scale: Reuters/Bloomberg=9, State media=5, Blog=3, Social media=2. For globalHeatmap, provide a list of at least 10 countries involved or affected by this issue, their ISO 3166-1 alpha-3 codes, and a risk score from 0.0 to 10.0. For confidenceScore, provide the main prediction, a confidence percentage (0-100), and the number of pieces of evidence found. For eventTimeline, reconstruct a chronological timeline of at least 5 key events related to the topic. For strategicPredictions, map influential figures, analyze their news/statements, and predict strategic plans (like boycotts/embargoes) with confidence (0-100) and impact (0-10). For osintVerifications, map the 6 main OSINT working methods (Geolocation, Chronolocation, Reverse Image Search, Social Media Footprint, Satellite & Geospatial, Verification Tools) and explain how they were applied to verify the signals for this specific topic. For intelligenceLogic, map the 4 main layers of Intelligence Logic (Basic Logic, SATs, OSINT Verification, Anti-Bias) and explain how each component is applied to the current analysis. Provide highly detailed and specific 'application' examples that directly reference the current geopolitical topic, actors, and events, rather than generic descriptions. For achAnalysis, perform an Analysis of Competing Hypotheses (ACH). Create 3-5 competing hypotheses. List key verified evidence. Evaluate each evidence against each hypothesis using '+' (supports), '-' (refutes/inconsistent), or 'N/A' (irrelevant). Calculate inconsistencies (count of '-') for each hypothesis. The one with the lowest '-' is the strongest. Provide key assumptions, rejected hypotheses (with reasons citing at least 2 strong evidences), sensitivity check (what happens if the most crucial evidence is removed), and a final conclusion. For satAnalysis, perform 7 Structured Analytic Techniques: Key Assumptions Check (list assumptions, evidence, strength), Devil's Advocacy (attack the main conclusion), Red Team Analysis (adversary perspective and deception tactics), What If Analysis (unlikely scenario, implications, indicators), Indicators & Warnings (scenario, indicators with status, alert level), Scenario Analysis (Best Case, Worst Case, Most Likely, Wild Card with drivers, indicators, implications), and Cross-Impact Matrix (factors and how they impact each other). For deepDorkCrawl, generate specific Google Dork queries tailored to the topic for Indonesian news, International news, and Advanced combinations. Replace placeholders with actual keywords related to the topic. Also, outline a systematic manual crawl strategy, archiving targets (like archive.is), and recommended spreadsheet columns for tracking.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
    },
  });

  const text = response.text || "";
  
  // Extract JSON from markdown
  const jsonMatch = text.match(/\`\`\`(?:json)?\s*([\s\S]*?)\s*\`\`\`/);
  const jsonString = jsonMatch ? jsonMatch[1] : text;

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON:", jsonString);
    throw new Error("Failed to parse the analysis result. Please try again.");
  }
}
