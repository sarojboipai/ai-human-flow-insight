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

// Stage 6: Interview Scheduling
export interface InterviewSchedulingMetrics {
  // Core Progress
  candidatesQualifiedForInterview: number;
  interviewInvitesSent: number;
  interviewScheduled: number;
  interviewCompleted: number;
  noShowRate: number;
  feedbackSubmitted: number;
  
  // AI vs Human Attribution
  aiSchedulingPercentage: number;
  humanSchedulingPercentage: number;
  hitlApprovalPercentage: number;
  
  // Avg Response Time
  aiSlotSuggestionTime: string;
  recruiterActionTime: string;
  candidateConfirmationTime: string;
  
  // SLA Metrics
  scheduleWithinSLA: number;
  confirmationWithinSLA: number;
  feedbackWithinSLA: number;
  
  // Outcome Metrics
  interviewConversionRate: number;
  timeToInterview: string;
  interviewToOfferRatio: number;
}

// Stage 7: Silver Medalist
export interface SilverMedalistMetrics {
  // Core Progress
  candidatesTagged: number;
  reEngagementInvitesSent: number;
  reAppliedToNewJobs: number;
  conversionToHire: number;
  
  // AI vs Human Attribution
  aiTaggingRate: number;
  humanOverrideRate: number;
  hitlReviewRate: number;
  
  // Avg Response Time
  aiClassificationTime: string;
  recruiterReviewTime: string;
  candidateReEngagementResponseTime: string;
  
  // SLA Metrics
  taggingWithinSLA: number;
  reEngagementWithinSLA: number;
  followUpWithinSLA: number;
  
  // Outcome Metrics
  silverToHireConversionRate: number;
  talentPoolReuseRate: number;
  costSavedVsFreshSourcing: number;
  candidateRetentionScore: number;
}

// Stage 8: Talent Community
export interface TalentCommunityMetrics {
  // Core Progress
  candidatesAddedToCommunity: number;
  activeCommunityMembers: number;
  contentEngagementRate: number;
  candidatesActivatedIntoPipeline: number;
  communityToHireConversion: number;
  
  // AI vs Human Attribution
  aiCommunityTagging: number;
  humanCommunityModeration: number;
  hitlModeration: number;
  
  // Avg Response Time
  aiEngagementTriggerTime: string;
  recruiterCommunityActionTime: string;
  candidateResponseTime: string;
  
  // SLA Metrics
  outreachFrequencySLA: string;
  activationWithinSLA: number;
  contentRefreshWithinSLA: number;
  
  // Outcome Metrics
  communityActivationRate: number;
  passiveToActiveRate: number;
  longTermHireRate: number;
  employerBrandEngagementIndex: number;
}

// Stage ID to metrics type mapping
export const STAGE_IDS = {
  JOBS_SWAASA: "jobs-ankura",
  JOB_DISCOVERY: "job-discovery",
  EXPRESSION: "expression",
  PRESCREEN: "prescreen",
  VOICE_AGENT: "voice-agent",
  SCHEDULING: "scheduling",
  SILVER_MEDALIST: "silver-med",
  TALENT_COMMUNITY: "talent-community",
} as const;

export type StageId = typeof STAGE_IDS[keyof typeof STAGE_IDS];

// Job Post stage metrics
export interface JobPostReviewer {
  name: string;
  role: "ai" | "hitl" | "recruiter";
}

export interface JobPostMetrics {
  postedBy: string;
  jdReviewedBy: JobPostReviewer[];
  detailsAdded: string[];
}

// Sourcing stage metrics
export interface SourcingMetrics {
  candidatesSourcedBy: string;
  candidatesSourcedCount: number;
  candidatesActiveLabel: string;
  candidatesActiveCount: number;
}
