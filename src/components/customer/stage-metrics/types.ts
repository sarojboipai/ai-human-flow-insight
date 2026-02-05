// Stage-specific metrics types

export interface ProgressStep {
  label: string;
  count: number;
  percentage: number;
}

// Stage 1: Jobs in Swaasa
export interface JobsSwaasaMetrics {
  // Reach & Awareness
  jobImpressions: number;
  uniqueCandidateViews: number;
  jobCTR: number;
  saveRate: number;
  shareRate: number;
  // Quality
  matchScoreAvg: number;
  contentQualityScore: number;
  // AI vs Human
  aiRankedImpressions: number;
  manualBoosted: number;
  hitlOverrideRate: number;
}

// Stage 2: Job Discovery
export interface JobDiscoveryMetrics {
  // Search & Discovery
  searchSessions: number;
  searchResultCTR: number;
  filterUsageRate: number;
  recommendationClickRate: number;
  // Matching
  aiMatchConfidence: number;
  top10RelevanceScore: number;
  coldStartRate: number;
  // Operational
  searchLatency: string;
  rankingConfidenceDrift: number;
}

// Stage 3: Expression of Interest
export interface EOIMetrics {
  // Intent
  eoiClickRate: number;
  leadCaptureRate: number;
  consentCompletionRate: number;
  // Lead Quality
  intentScore: number;
  fraudDetectionRate: number;
  duplicateLeadRate: number;
  // AI vs Human
  aiAutoQualified: number;
  hitlReviewedLeads: number;
}

// Stage 4: Pre-Screen Questions
export interface PreScreenMetrics {
  // Screening
  questionStartRate: number;
  completionRate: number;
  knockoutRate: number;
  passRate: number;
  // Quality
  falseRejectionRate: number;
  resumeParseConfidence: number;
  // AI vs Human
  aiAutoReject: number;
  hitlOverride: number;
  manualApproval: number;
}

// Stage 5: Voice Agent Screening
export interface VoiceScreeningMetrics {
  // Engagement
  callAttemptRate: number;
  callConnectRate: number;
  avgCallDuration: string;
  // Screening Outcome
  aiPassRate: number;
  humanPassRate: number;
  dropOffDuringCall: number;
  // Quality
  speechRecognitionConfidence: number;
  responseConfidenceScore: number;
  hiringManagerFitScore: number;
  // AI vs Human
  aiFullyScreened: number;
  hitlReview: number;
  humanInterview: number;
}

// Stage ID to metrics type mapping
export const STAGE_IDS = {
  JOBS_SWAASA: "jobs-ankura",
  JOB_DISCOVERY: "job-discovery",
  EXPRESSION: "expression",
  PRESCREEN: "prescreen",
  VOICE_AGENT: "voice-agent",
} as const;

export type StageId = typeof STAGE_IDS[keyof typeof STAGE_IDS];
