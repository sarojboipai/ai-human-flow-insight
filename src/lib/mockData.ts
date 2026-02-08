// Mock data for SHIP dashboards

export const funnelData = [
  { name: "Candidate Leads", value: 12500, conversion: 100 },
  { name: "Profile Completed", value: 8750, conversion: 70 },
  { name: "AI Matched", value: 5250, conversion: 60 },
  { name: "Recruiter Contacted", value: 3675, conversion: 70 },
  { name: "Interview Scheduled", value: 2205, conversion: 60 },
  { name: "Offer Released", value: 1323, conversion: 60 },
  { name: "Placement Confirmed", value: 926, conversion: 70 },
];

export const trendData = [
  { date: "Jan 1", aiMatches: 420, humanMatches: 180, placements: 45 },
  { date: "Jan 8", aiMatches: 480, humanMatches: 195, placements: 52 },
  { date: "Jan 15", aiMatches: 510, humanMatches: 210, placements: 58 },
  { date: "Jan 22", aiMatches: 545, humanMatches: 225, placements: 61 },
  { date: "Jan 29", aiMatches: 590, humanMatches: 240, placements: 68 },
  { date: "Feb 5", aiMatches: 620, humanMatches: 250, placements: 72 },
  { date: "Feb 12", aiMatches: 680, humanMatches: 265, placements: 78 },
  { date: "Feb 19", aiMatches: 720, humanMatches: 280, placements: 85 },
];

export const recruiters = [
  {
    id: "1",
    name: "Priya Sharma",
    team: "Nursing",
    screened: 145,
    interviews: 42,
    placements: 12,
    revenue: 48000,
    change: 15,
  },
  {
    id: "2",
    name: "Rahul Mehta",
    team: "Doctors",
    screened: 98,
    interviews: 35,
    placements: 8,
    revenue: 64000,
    change: 8,
  },
  {
    id: "3",
    name: "Ananya Patel",
    team: "Paramedic",
    screened: 210,
    interviews: 58,
    placements: 18,
    revenue: 54000,
    change: 22,
  },
  {
    id: "4",
    name: "Vikram Singh",
    team: "Nursing",
    screened: 132,
    interviews: 38,
    placements: 10,
    revenue: 40000,
    change: -5,
  },
  {
    id: "5",
    name: "Deepa Kumar",
    team: "Doctors",
    screened: 85,
    interviews: 28,
    placements: 6,
    revenue: 48000,
    change: 0,
  },
];

export const aiWorkloadData = [
  { name: "AI Automated", value: 68, color: "hsl(173, 58%, 45%)" },
  { name: "Human Handled", value: 24, color: "hsl(38, 92%, 50%)" },
  { name: "HITL Review", value: 8, color: "hsl(199, 89%, 48%)" },
];

export const stageWorkload = [
  { stage: "Profile Screening", ai: 85, human: 15 },
  { stage: "Skills Matching", ai: 92, human: 8 },
  { stage: "Initial Outreach", ai: 72, human: 28 },
  { stage: "Interview Scheduling", ai: 45, human: 55 },
  { stage: "Offer Negotiation", ai: 12, human: 88 },
  { stage: "Onboarding", ai: 35, human: 65 },
];

export const revenueMetrics = {
  totalRevenue: 2450000,
  revenueChange: 18,
  placements: 926,
  avgFeePerPlacement: 2645,
  recruiterCost: 890000,
  aiInfraCost: 125000,
  acquisitionCost: 340000,
  grossMargin: 44.7,
  marginChange: 3.2,
  costPerPlacement: 1462,
};

export const hitlQueue = [
  {
    id: "HITL-001",
    candidateId: "CAN-45892",
    reason: "Low AI confidence (0.62)",
    priority: "high",
    assignee: "Priya Sharma",
    status: "pending",
    createdAt: "2 hours ago",
  },
  {
    id: "HITL-002",
    candidateId: "CAN-45901",
    reason: "Enterprise employer requirement",
    priority: "high",
    assignee: "Rahul Mehta",
    status: "in_review",
    createdAt: "4 hours ago",
  },
  {
    id: "HITL-003",
    candidateId: "CAN-45876",
    reason: "Skills mismatch override",
    priority: "medium",
    assignee: "Ananya Patel",
    status: "pending",
    createdAt: "6 hours ago",
  },
  {
    id: "HITL-004",
    candidateId: "CAN-45912",
    reason: "Compliance verification",
    priority: "medium",
    assignee: null,
    status: "unassigned",
    createdAt: "8 hours ago",
  },
  {
    id: "HITL-005",
    candidateId: "CAN-45889",
    reason: "Low AI confidence (0.58)",
    priority: "low",
    assignee: "Vikram Singh",
    status: "completed",
    createdAt: "1 day ago",
  },
];

export const aiPerformanceMetrics = {
  matchPrecision: 87.4,
  matchRecall: 82.1,
  interviewPrediction: 76.8,
  slaAdherence: 94.2,
  biasScore: 0.03,
  avgConfidence: 0.78,
  overrideRate: 8.2,
  escalationRate: 5.4,
};

// Agent Registry Data
export interface Agent {
  id: string;
  name: string;
  type: "phenom" | "internal" | "third-party";
  status: "active" | "paused" | "error";
  description: string;
  tasksProcessed: number;
  successRate: number;
  avgLatencyMs: number;
  assignedStages: string[];
  lastActive: string;
}

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Phenom CV Parser",
    type: "phenom",
    status: "active",
    description: "Extracts structured data from resumes and CVs",
    tasksProcessed: 4520,
    successRate: 96.8,
    avgLatencyMs: 1250,
    assignedStages: ["Profile Screening"],
    lastActive: "2 mins ago",
  },
  {
    id: "agent-002",
    name: "Skills Matcher AI",
    type: "phenom",
    status: "active",
    description: "Matches candidate skills to job requirements",
    tasksProcessed: 3890,
    successRate: 92.4,
    avgLatencyMs: 890,
    assignedStages: ["Skills Matching", "AI Matched"],
    lastActive: "1 min ago",
  },
  {
    id: "agent-003",
    name: "Outreach Bot",
    type: "internal",
    status: "active",
    description: "Automated candidate outreach via email/SMS",
    tasksProcessed: 2150,
    successRate: 78.5,
    avgLatencyMs: 320,
    assignedStages: ["Initial Outreach"],
    lastActive: "5 mins ago",
  },
  {
    id: "agent-004",
    name: "Calendar Scheduler",
    type: "third-party",
    status: "active",
    description: "Coordinates interview scheduling with Calendly",
    tasksProcessed: 1280,
    successRate: 94.2,
    avgLatencyMs: 2100,
    assignedStages: ["Interview Scheduling"],
    lastActive: "8 mins ago",
  },
  {
    id: "agent-005",
    name: "Compliance Checker",
    type: "internal",
    status: "paused",
    description: "Validates healthcare credentials and licenses",
    tasksProcessed: 890,
    successRate: 99.1,
    avgLatencyMs: 1800,
    assignedStages: ["Profile Screening", "Offer Released"],
    lastActive: "2 hours ago",
  },
  {
    id: "agent-006",
    name: "Salary Predictor",
    type: "phenom",
    status: "error",
    description: "Predicts optimal salary ranges for negotiations",
    tasksProcessed: 0,
    successRate: 0,
    avgLatencyMs: 0,
    assignedStages: ["Offer Negotiation"],
    lastActive: "Error since 4 hours ago",
  },
  {
    id: "agent-007",
    name: "Onboarding Assistant",
    type: "internal",
    status: "active",
    description: "Guides new hires through onboarding process",
    tasksProcessed: 456,
    successRate: 88.3,
    avgLatencyMs: 450,
    assignedStages: ["Placement Confirmed"],
    lastActive: "15 mins ago",
  },
];

// Pipeline Stages for DAG
export interface PipelineStage {
  id: string;
  name: string;
  primaryHandler: "ai" | "human" | "hybrid";
  agents: string[];
  humanBackup: string;
  avgProcessingTime: string;
  throughput: number;
}

export const pipelineStages: PipelineStage[] = [
  {
    id: "stage-1",
    name: "Profile Screening",
    primaryHandler: "ai",
    agents: ["Phenom CV Parser", "Compliance Checker"],
    humanBackup: "Screening Team",
    avgProcessingTime: "2 mins",
    throughput: 4520,
  },
  {
    id: "stage-2",
    name: "Skills Matching",
    primaryHandler: "ai",
    agents: ["Skills Matcher AI"],
    humanBackup: "Technical Recruiters",
    avgProcessingTime: "45 secs",
    throughput: 3890,
  },
  {
    id: "stage-3",
    name: "Initial Outreach",
    primaryHandler: "hybrid",
    agents: ["Outreach Bot"],
    humanBackup: "Recruiter Team",
    avgProcessingTime: "4 hours",
    throughput: 2150,
  },
  {
    id: "stage-4",
    name: "Interview Scheduling",
    primaryHandler: "hybrid",
    agents: ["Calendar Scheduler"],
    humanBackup: "Coordination Team",
    avgProcessingTime: "1 day",
    throughput: 1280,
  },
  {
    id: "stage-5",
    name: "Offer Negotiation",
    primaryHandler: "human",
    agents: ["Salary Predictor"],
    humanBackup: "Senior Recruiters",
    avgProcessingTime: "3 days",
    throughput: 650,
  },
  {
    id: "stage-6",
    name: "Placement Confirmed",
    primaryHandler: "hybrid",
    agents: ["Onboarding Assistant"],
    humanBackup: "Onboarding Team",
    avgProcessingTime: "1 week",
    throughput: 456,
  },
];

// HITL Routing Rules
export interface HITLRule {
  id: string;
  name: string;
  condition: string;
  triggerCount: number;
  status: "active" | "paused";
  priority: "high" | "medium" | "low";
}

export const hitlRules: HITLRule[] = [
  {
    id: "rule-001",
    name: "Low AI Confidence",
    condition: "confidence_score < 0.7",
    triggerCount: 234,
    status: "active",
    priority: "high",
  },
  {
    id: "rule-002",
    name: "Enterprise Employer",
    condition: "employer_tier = 'enterprise'",
    triggerCount: 156,
    status: "active",
    priority: "high",
  },
  {
    id: "rule-003",
    name: "Senior Role",
    condition: "role_level = 'senior' OR salary > 2000000",
    triggerCount: 89,
    status: "active",
    priority: "medium",
  },
  {
    id: "rule-004",
    name: "Skills Mismatch Override",
    condition: "skill_gap > 30%",
    triggerCount: 45,
    status: "paused",
    priority: "low",
  },
];

// Job Funnel Data
export interface JobFunnelStage {
  name: string;
  candidates: number;
  aiHandled: number;
  humanHandled: number;
  avgTimeInStage: string;
}

export interface JobHITLEvent {
  id: string;
  type: "escalation" | "override" | "review" | "approval";
  reason: string;
  assignee: string;
  resolution: string;
  duration: string;
  timestamp: string;
}

export interface StageMetrics {
  sent: number;
  appeared: number;
  qualified: number;
  disqualified: number;
  pending: number;
  avgResponseTime: string;
  handler: string;
}

// In-stage progress step
export interface ProgressStep {
  label: string;
  count: number;
  percentage: number;
}

// Stage-specific metrics types
export interface JobsSwaasaMetrics {
  jobImpressions: number;
  uniqueCandidateViews: number;
  jobCTR: number;
  saveRate: number;
  shareRate: number;
  matchScoreAvg: number;
  contentQualityScore: number;
  aiRankedImpressions: number;
  manualBoosted: number;
  hitlOverrideRate: number;
}

export interface JobDiscoveryMetrics {
  searchSessions: number;
  searchResultCTR: number;
  filterUsageRate: number;
  recommendationClickRate: number;
  aiMatchConfidence: number;
  top10RelevanceScore: number;
  coldStartRate: number;
  searchLatency: string;
  rankingConfidenceDrift: number;
}

export interface EOIMetrics {
  eoiClickRate: number;
  leadCaptureRate: number;
  consentCompletionRate: number;
  intentScore: number;
  fraudDetectionRate: number;
  duplicateLeadRate: number;
  aiAutoQualified: number;
  hitlReviewedLeads: number;
}

export interface PreScreenMetrics {
  questionStartRate: number;
  completionRate: number;
  knockoutRate: number;
  passRate: number;
  falseRejectionRate: number;
  resumeParseConfidence: number;
  aiAutoReject: number;
  hitlOverride: number;
  manualApproval: number;
}

export interface VoiceScreeningMetrics {
  callAttemptRate: number;
  callConnectRate: number;
  avgCallDuration: string;
  aiPassRate: number;
  humanPassRate: number;
  dropOffDuringCall: number;
  speechRecognitionConfidence: number;
  responseConfidenceScore: number;
  hiringManagerFitScore: number;
  aiFullyScreened: number;
  hitlReview: number;
  humanInterview: number;
}

export interface InterviewSchedulingMetrics {
  candidatesQualifiedForInterview: number;
  interviewInvitesSent: number;
  interviewScheduled: number;
  interviewCompleted: number;
  noShowRate: number;
  feedbackSubmitted: number;
  aiSchedulingPercentage: number;
  humanSchedulingPercentage: number;
  hitlApprovalPercentage: number;
  aiSlotSuggestionTime: string;
  recruiterActionTime: string;
  candidateConfirmationTime: string;
  scheduleWithinSLA: number;
  confirmationWithinSLA: number;
  feedbackWithinSLA: number;
  interviewConversionRate: number;
  timeToInterview: string;
  interviewToOfferRatio: number;
}

export interface SilverMedalistMetrics {
  candidatesTagged: number;
  reEngagementInvitesSent: number;
  reAppliedToNewJobs: number;
  conversionToHire: number;
  aiTaggingRate: number;
  humanOverrideRate: number;
  hitlReviewRate: number;
  aiClassificationTime: string;
  recruiterReviewTime: string;
  candidateReEngagementResponseTime: string;
  taggingWithinSLA: number;
  reEngagementWithinSLA: number;
  followUpWithinSLA: number;
  silverToHireConversionRate: number;
  talentPoolReuseRate: number;
  costSavedVsFreshSourcing: number;
  candidateRetentionScore: number;
}

export interface TalentCommunityMetrics {
  candidatesAddedToCommunity: number;
  activeCommunityMembers: number;
  contentEngagementRate: number;
  candidatesActivatedIntoPipeline: number;
  communityToHireConversion: number;
  aiCommunityTagging: number;
  humanCommunityModeration: number;
  hitlModeration: number;
  aiEngagementTriggerTime: string;
  recruiterCommunityActionTime: string;
  candidateResponseTime: string;
  outreachFrequencySLA: string;
  activationWithinSLA: number;
  contentRefreshWithinSLA: number;
  communityActivationRate: number;
  passiveToActiveRate: number;
  longTermHireRate: number;
  employerBrandEngagementIndex: number;
}

export interface JobSEOScore {
  overall: number;
  titleOptimization: number;
  descriptionQuality: number;
  keywordMatch: number;
  locationOptimization: number;
  mobileReadiness: number;
}

export interface EnhancedStageMetrics extends StageMetrics {
  // AI/Human/HITL attribution
  aiPercentage: number;
  humanPercentage: number;
  hitlPercentage: number;
  
  // SLA metrics
  avgTimeInStage: string;
  slaThreshold: string;
  slaStatus: "green" | "amber" | "red";
  delayCause?: string;
  
  // Conversion metrics
  conversionRate: number;
  dropOffRate: number;
  
  // Channel breakdown (optional, for discovery stages)
  channels?: {
    app?: number;
    web?: number;
    whatsapp?: number;
    jobBoards?: number;
    recruiterOutreach?: number;
  };
  
  // Stage-specific metrics (only one populated based on stage type)
  jobsSwaasaMetrics?: JobsSwaasaMetrics;
  jobDiscoveryMetrics?: JobDiscoveryMetrics;
  eoiMetrics?: EOIMetrics;
  preScreenMetrics?: PreScreenMetrics;
  voiceScreeningMetrics?: VoiceScreeningMetrics;
  interviewSchedulingMetrics?: InterviewSchedulingMetrics;
  silverMedalistMetrics?: SilverMedalistMetrics;
  talentCommunityMetrics?: TalentCommunityMetrics;
  
  // SEO score (only for jobs-ankura / job posting stage)
  seoScore?: JobSEOScore;
  
  // In-stage progress funnel
  progressFunnel?: ProgressStep[];
}

export interface Job {
  id: string;
  title: string;
  employer: string;
  employerTier: "enterprise" | "mid-market" | "smb";
  roleType: "nurse" | "doctor" | "paramedic" | "technician";
  geography: string;
  status: "active" | "filled" | "closed";
  createdAt: string;
  daysOpen: number;
  funnel: JobFunnelStage[];
  aiContribution: number;
  humanContribution: number;
  revenue: number;
  cost: number;
  margin: number;
  hitlEvents: JobHITLEvent[];
  workflowId: string;
  stageMetrics?: Record<string, StageMetrics>;
  enhancedStageMetrics?: Record<string, EnhancedStageMetrics>;
}

export const jobs: Job[] = [
  {
    id: "JOB-001",
    title: "Senior ICU Nurse",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "nurse",
    geography: "Mumbai",
    status: "active",
    createdAt: "2024-01-15",
    daysOpen: 14,
    funnel: [
      { name: "Candidate Lead", candidates: 245, aiHandled: 220, humanHandled: 25, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 189, aiHandled: 175, humanHandled: 14, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 98, aiHandled: 98, humanHandled: 0, avgTimeInStage: "4 hours" },
      { name: "Recruiter Contacted", candidates: 72, aiHandled: 52, humanHandled: 20, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 34, aiHandled: 15, humanHandled: 19, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 12, aiHandled: 2, humanHandled: 10, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 5, aiHandled: 2, humanHandled: 3, avgTimeInStage: "5 days" },
    ],
    aiContribution: 72,
    humanContribution: 28,
    revenue: 450000,
    cost: 125000,
    margin: 72.2,
    hitlEvents: [
      { id: "evt-001", type: "escalation", reason: "Enterprise employer requirement", assignee: "Priya Sharma", resolution: "Approved after review", duration: "2 hours", timestamp: "2 days ago" },
      { id: "evt-002", type: "override", reason: "Candidate requested specific shift", assignee: "Rahul Mehta", resolution: "Manual scheduling", duration: "4 hours", timestamp: "1 day ago" },
    ],
    workflowId: "wf-001",
    stageMetrics: {
      "prescreen": { sent: 98, appeared: 72, qualified: 45, disqualified: 18, pending: 9, avgResponseTime: "4 hours", handler: "AE" },
      "voice-agent": { sent: 45, appeared: 38, qualified: 28, disqualified: 8, pending: 2, avgResponseTime: "15 mins", handler: "X+" },
      "expression": { sent: 189, appeared: 156, qualified: 98, disqualified: 42, pending: 16, avgResponseTime: "2 hours", handler: "C" },
      "job-discovery": { sent: 245, appeared: 189, qualified: 156, disqualified: 25, pending: 8, avgResponseTime: "1 hour", handler: "C" },
      "interview": { sent: 34, appeared: 28, qualified: 12, disqualified: 10, pending: 6, avgResponseTime: "3 days", handler: "R" },
    },
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 245, appeared: 189, qualified: 156, disqualified: 25, pending: 8,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 85, humanPercentage: 12, hitlPercentage: 3,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 77.1, dropOffRate: 22.9,
        jobsSwaasaMetrics: {
          jobImpressions: 12450, uniqueCandidateViews: 8234, jobCTR: 3.2,
          saveRate: 12.5, shareRate: 2.1, matchScoreAvg: 78,
          contentQualityScore: 85, aiRankedImpressions: 85,
          manualBoosted: 12, hitlOverrideRate: 3,
        },
        progressFunnel: [
          { label: "Job Published", count: 523, percentage: 100 },
          { label: "Job Indexed", count: 497, percentage: 95 },
          { label: "Job Ranked by AI", count: 445, percentage: 85 },
          { label: "Job Viewed", count: 324, percentage: 62 },
          { label: "Apply Clicked", count: 199, percentage: 38 },
        ],
        seoScore: {
          overall: 72, titleOptimization: 68, descriptionQuality: 75,
          keywordMatch: 65, locationOptimization: 82, mobileReadiness: 78,
        },
      },
      "job-discovery": {
        sent: 245, appeared: 189, qualified: 156, disqualified: 25, pending: 8,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 78, humanPercentage: 18, hitlPercentage: 4,
        avgTimeInStage: "6 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 77.1, dropOffRate: 22.9,
        channels: { app: 45, web: 30, whatsapp: 15, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 4520, searchResultCTR: 8.7, filterUsageRate: 42,
          recommendationClickRate: 23.5, aiMatchConfidence: 82,
          top10RelevanceScore: 76, coldStartRate: 8.2,
          searchLatency: "120ms", rankingConfidenceDrift: 2.1,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 4520, percentage: 100 },
          { label: "Results Generated", count: 4293, percentage: 95 },
          { label: "Filters Applied", count: 1900, percentage: 42 },
          { label: "Job Card Viewed", count: 1580, percentage: 35 },
          { label: "Job Opened", count: 890, percentage: 20 },
          { label: "Interest Clicked", count: 324, percentage: 7 },
        ],
      },
      "expression": {
        sent: 189, appeared: 156, qualified: 98, disqualified: 42, pending: 16,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 65, humanPercentage: 30, hitlPercentage: 5,
        avgTimeInStage: "12 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 62.8, dropOffRate: 37.2,
        channels: { app: 52, whatsapp: 28, recruiterOutreach: 20 },
        eoiMetrics: {
          eoiClickRate: 38, leadCaptureRate: 82, consentCompletionRate: 94,
          intentScore: 72, fraudDetectionRate: 1.2, duplicateLeadRate: 4.5,
          aiAutoQualified: 65, hitlReviewedLeads: 8,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 324, percentage: 100 },
          { label: "Details Submitted", count: 285, percentage: 88 },
          { label: "Consent Given", count: 268, percentage: 83 },
          { label: "Lead Scored", count: 245, percentage: 76 },
          { label: "Routed to Pipeline", count: 189, percentage: 58 },
        ],
      },
      "prescreen": {
        sent: 98, appeared: 72, qualified: 45, disqualified: 18, pending: 9,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 92, humanPercentage: 5, hitlPercentage: 3,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 62.5, dropOffRate: 37.5,
        preScreenMetrics: {
          questionStartRate: 92, completionRate: 78, knockoutRate: 18,
          passRate: 62, falseRejectionRate: 2.4, resumeParseConfidence: 89,
          aiAutoReject: 15, hitlOverride: 4, manualApproval: 8,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 98, percentage: 100 },
          { label: "Candidate Started", count: 90, percentage: 92 },
          { label: "Questions Completed", count: 72, percentage: 73 },
          { label: "Auto-Scored", count: 68, percentage: 69 },
          { label: "Passed / Failed / Escalated", count: 45, percentage: 46 },
        ],
      },
      "voice-agent": {
        sent: 45, appeared: 38, qualified: 28, disqualified: 8, pending: 2,
        avgResponseTime: "15 mins", handler: "X+",
        aiPercentage: 88, humanPercentage: 5, hitlPercentage: 7,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 73.7, dropOffRate: 26.3,
        voiceScreeningMetrics: {
          callAttemptRate: 95, callConnectRate: 84, avgCallDuration: "4m 32s",
          aiPassRate: 74, humanPassRate: 82, dropOffDuringCall: 8,
          speechRecognitionConfidence: 91, responseConfidenceScore: 85,
          hiringManagerFitScore: 78, aiFullyScreened: 72,
          hitlReview: 12, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 45, percentage: 100 },
          { label: "Call Dialed", count: 43, percentage: 96 },
          { label: "Call Connected", count: 38, percentage: 84 },
          { label: "Questions Asked", count: 35, percentage: 78 },
          { label: "AI Evaluation Completed", count: 32, percentage: 71 },
          { label: "Final Outcome", count: 28, percentage: 62 },
        ],
      },
      "scheduling": {
        sent: 28, appeared: 24, qualified: 18, disqualified: 4, pending: 2,
        avgResponseTime: "6 hours", handler: "AE",
        aiPercentage: 75, humanPercentage: 20, hitlPercentage: 5,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 34,
          interviewInvitesSent: 28,
          interviewScheduled: 24,
          interviewCompleted: 18,
          noShowRate: 14,
          feedbackSubmitted: 15,
          aiSchedulingPercentage: 75,
          humanSchedulingPercentage: 20,
          hitlApprovalPercentage: 5,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "4h",
          candidateConfirmationTime: "6h",
          scheduleWithinSLA: 88,
          confirmationWithinSLA: 82,
          feedbackWithinSLA: 75,
          interviewConversionRate: 75,
          timeToInterview: "3d",
          interviewToOfferRatio: 42,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 34, percentage: 100 },
          { label: "Interview Invites Sent", count: 28, percentage: 82 },
          { label: "Interview Scheduled", count: 24, percentage: 71 },
          { label: "Interview Completed", count: 18, percentage: 53 },
          { label: "Feedback Submitted", count: 15, percentage: 44 },
        ],
      },
      "silver-med": {
        sent: 8, appeared: 8, qualified: 6, disqualified: 0, pending: 2,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 70, humanPercentage: 25, hitlPercentage: 5,
        avgTimeInStage: "5 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 8,
          reEngagementInvitesSent: 6,
          reAppliedToNewJobs: 4,
          conversionToHire: 2,
          aiTaggingRate: 70,
          humanOverrideRate: 25,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "8h",
          candidateReEngagementResponseTime: "2d",
          taggingWithinSLA: 92,
          reEngagementWithinSLA: 85,
          followUpWithinSLA: 78,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 35,
          costSavedVsFreshSourcing: 1200,
          candidateRetentionScore: 82,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 8, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 6, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 4, percentage: 50 },
          { label: "Converted to Hire", count: 2, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 4, appeared: 4, qualified: 4, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 60, humanPercentage: 35, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 4,
          activeCommunityMembers: 3200,
          contentEngagementRate: 45,
          candidatesActivatedIntoPipeline: 12,
          communityToHireConversion: 3,
          aiCommunityTagging: 60,
          humanCommunityModeration: 35,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "12h",
          candidateResponseTime: "2d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 70,
          contentRefreshWithinSLA: 85,
          communityActivationRate: 15,
          passiveToActiveRate: 12,
          longTermHireRate: 8,
          employerBrandEngagementIndex: 78,
        },
        progressFunnel: [
          { label: "Added to Community", count: 4, percentage: 100 },
          { label: "Active Members", count: 3200, percentage: 80 },
          { label: "Content Engaged", count: 1440, percentage: 45 },
          { label: "Activated into Pipeline", count: 12, percentage: 12 },
          { label: "Converted to Hire", count: 1, percentage: 3 },
        ],
      },
    },
  },
  {
    id: "JOB-002",
    title: "General Physician",
    employer: "Oasis Fertility",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Delhi",
    status: "active",
    createdAt: "2024-01-10",
    daysOpen: 19,
    funnel: [
      { name: "Candidate Lead", candidates: 156, aiHandled: 140, humanHandled: 16, avgTimeInStage: "2 days" },
      { name: "Profile Completed", candidates: 112, aiHandled: 100, humanHandled: 12, avgTimeInStage: "3 days" },
      { name: "AI Matched", candidates: 67, aiHandled: 67, humanHandled: 0, avgTimeInStage: "6 hours" },
      { name: "Recruiter Contacted", candidates: 48, aiHandled: 30, humanHandled: 18, avgTimeInStage: "2 days" },
      { name: "Interview Scheduled", candidates: 22, aiHandled: 8, humanHandled: 14, avgTimeInStage: "4 days" },
      { name: "Offer Released", candidates: 8, aiHandled: 1, humanHandled: 7, avgTimeInStage: "3 days" },
      { name: "Placement Confirmed", candidates: 3, aiHandled: 1, humanHandled: 2, avgTimeInStage: "7 days" },
    ],
    aiContribution: 65,
    humanContribution: 35,
    revenue: 780000,
    cost: 245000,
    margin: 68.6,
    hitlEvents: [
      { id: "evt-003", type: "review", reason: "High salary negotiation", assignee: "Ananya Patel", resolution: "Counter-offer approved", duration: "6 hours", timestamp: "3 days ago" },
    ],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 156, appeared: 112, qualified: 89, disqualified: 15, pending: 8,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 72, humanPercentage: 22, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "amber",
        conversionRate: 71.8, dropOffRate: 28.2,
        jobsSwaasaMetrics: {
          jobImpressions: 8920, uniqueCandidateViews: 5680, jobCTR: 2.8,
          saveRate: 10.2, shareRate: 1.8, matchScoreAvg: 82,
          contentQualityScore: 88, aiRankedImpressions: 72,
          manualBoosted: 18, hitlOverrideRate: 6,
        },
        progressFunnel: [
          { label: "Job Published", count: 312, percentage: 100 },
          { label: "Job Indexed", count: 296, percentage: 95 },
          { label: "Job Ranked by AI", count: 265, percentage: 85 },
          { label: "Job Viewed", count: 187, percentage: 60 },
          { label: "Apply Clicked", count: 112, percentage: 36 },
        ],
        seoScore: {
          overall: 85, titleOptimization: 88, descriptionQuality: 82,
          keywordMatch: 80, locationOptimization: 90, mobileReadiness: 86,
        },
      },
      "job-discovery": {
        sent: 156, appeared: 112, qualified: 89, disqualified: 15, pending: 8,
        avgResponseTime: "3 hours", handler: "C",
        aiPercentage: 68, humanPercentage: 26, hitlPercentage: 6,
        avgTimeInStage: "8 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 71.8, dropOffRate: 28.2,
        channels: { app: 38, web: 32, whatsapp: 18, jobBoards: 12 },
        jobDiscoveryMetrics: {
          searchSessions: 3250, searchResultCTR: 7.2, filterUsageRate: 38,
          recommendationClickRate: 21.5, aiMatchConfidence: 84,
          top10RelevanceScore: 78, coldStartRate: 6.8,
          searchLatency: "135ms", rankingConfidenceDrift: 1.8,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3250, percentage: 100 },
          { label: "Results Generated", count: 3088, percentage: 95 },
          { label: "Filters Applied", count: 1235, percentage: 38 },
          { label: "Job Card Viewed", count: 1138, percentage: 35 },
          { label: "Job Opened", count: 650, percentage: 20 },
          { label: "Interest Clicked", count: 228, percentage: 7 },
        ],
      },
      "expression": {
        sent: 112, appeared: 89, qualified: 67, disqualified: 14, pending: 8,
        avgResponseTime: "4 hours", handler: "C",
        aiPercentage: 55, humanPercentage: 38, hitlPercentage: 7,
        avgTimeInStage: "18 hours", slaThreshold: "24 hours", slaStatus: "amber",
        conversionRate: 75.3, dropOffRate: 24.7,
        channels: { app: 45, whatsapp: 30, recruiterOutreach: 25 },
        eoiMetrics: {
          eoiClickRate: 32, leadCaptureRate: 78, consentCompletionRate: 92,
          intentScore: 76, fraudDetectionRate: 0.8, duplicateLeadRate: 3.2,
          aiAutoQualified: 55, hitlReviewedLeads: 12,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 228, percentage: 100 },
          { label: "Details Submitted", count: 196, percentage: 86 },
          { label: "Consent Given", count: 180, percentage: 79 },
          { label: "Lead Scored", count: 168, percentage: 74 },
          { label: "Routed to Pipeline", count: 112, percentage: 49 },
        ],
      },
      "prescreen": {
        sent: 67, appeared: 52, qualified: 35, disqualified: 12, pending: 5,
        avgResponseTime: "6 hours", handler: "AE",
        aiPercentage: 82, humanPercentage: 12, hitlPercentage: 6,
        avgTimeInStage: "6 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 67.3, dropOffRate: 32.7,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 72, knockoutRate: 22,
          passRate: 58, falseRejectionRate: 3.1, resumeParseConfidence: 86,
          aiAutoReject: 18, hitlOverride: 6, manualApproval: 10,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 67, percentage: 100 },
          { label: "Candidate Started", count: 59, percentage: 88 },
          { label: "Questions Completed", count: 48, percentage: 72 },
          { label: "Auto-Scored", count: 45, percentage: 67 },
          { label: "Passed / Failed / Escalated", count: 35, percentage: 52 },
        ],
      },
      "voice-agent": {
        sent: 35, appeared: 28, qualified: 22, disqualified: 4, pending: 2,
        avgResponseTime: "20 mins", handler: "X+",
        aiPercentage: 78, humanPercentage: 12, hitlPercentage: 10,
        avgTimeInStage: "3 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 78.6, dropOffRate: 21.4,
        voiceScreeningMetrics: {
          callAttemptRate: 92, callConnectRate: 80, avgCallDuration: "5m 15s",
          aiPassRate: 70, humanPassRate: 85, dropOffDuringCall: 10,
          speechRecognitionConfidence: 88, responseConfidenceScore: 82,
          hiringManagerFitScore: 80, aiFullyScreened: 68,
          hitlReview: 15, humanInterview: 17,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 35, percentage: 100 },
          { label: "Call Dialed", count: 33, percentage: 94 },
          { label: "Call Connected", count: 28, percentage: 80 },
          { label: "Questions Asked", count: 26, percentage: 74 },
          { label: "AI Evaluation Completed", count: 24, percentage: 69 },
          { label: "Final Outcome", count: 22, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 22, appeared: 18, qualified: 12, disqualified: 4, pending: 2,
        avgResponseTime: "8 hours", handler: "AE",
        aiPercentage: 65, humanPercentage: 28, hitlPercentage: 7,
        avgTimeInStage: "1.5 days", slaThreshold: "2 days", slaStatus: "amber",
        conversionRate: 66.7, dropOffRate: 33.3,
        delayCause: "Human Backlog",
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 22,
          interviewInvitesSent: 18,
          interviewScheduled: 15,
          interviewCompleted: 12,
          noShowRate: 16,
          feedbackSubmitted: 10,
          aiSchedulingPercentage: 65,
          humanSchedulingPercentage: 28,
          hitlApprovalPercentage: 7,
          aiSlotSuggestionTime: "3m",
          recruiterActionTime: "6h",
          candidateConfirmationTime: "8h",
          scheduleWithinSLA: 78,
          confirmationWithinSLA: 72,
          feedbackWithinSLA: 68,
          interviewConversionRate: 67,
          timeToInterview: "4d",
          interviewToOfferRatio: 36,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 22, percentage: 100 },
          { label: "Interview Invites Sent", count: 18, percentage: 82 },
          { label: "Interview Scheduled", count: 15, percentage: 68 },
          { label: "Interview Completed", count: 12, percentage: 55 },
          { label: "Feedback Submitted", count: 10, percentage: 45 },
        ],
      },
      "silver-med": {
        sent: 6, appeared: 6, qualified: 4, disqualified: 0, pending: 2,
        avgResponseTime: "3 days", handler: "R",
        aiPercentage: 20, humanPercentage: 75, hitlPercentage: 5,
        avgTimeInStage: "7 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        silverMedalistMetrics: {
          candidatesTagged: 6,
          reEngagementInvitesSent: 4,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 20,
          humanOverrideRate: 75,
          hitlReviewRate: 5,
          aiClassificationTime: "2m",
          recruiterReviewTime: "12h",
          candidateReEngagementResponseTime: "3d",
          taggingWithinSLA: 88,
          reEngagementWithinSLA: 80,
          followUpWithinSLA: 72,
          silverToHireConversionRate: 17,
          talentPoolReuseRate: 28,
          costSavedVsFreshSourcing: 950,
          candidateRetentionScore: 78,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 6, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 4, percentage: 67 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 33 },
          { label: "Converted to Hire", count: 1, percentage: 17 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "2 days", handler: "C",
        aiPercentage: 55, humanPercentage: 40, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 2800,
          contentEngagementRate: 42,
          candidatesActivatedIntoPipeline: 8,
          communityToHireConversion: 2,
          aiCommunityTagging: 55,
          humanCommunityModeration: 40,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1.5h",
          recruiterCommunityActionTime: "14h",
          candidateResponseTime: "2.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 65,
          contentRefreshWithinSLA: 80,
          communityActivationRate: 12,
          passiveToActiveRate: 10,
          longTermHireRate: 6,
          employerBrandEngagementIndex: 74,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 2800, percentage: 78 },
          { label: "Content Engaged", count: 1176, percentage: 42 },
          { label: "Activated into Pipeline", count: 8, percentage: 10 },
          { label: "Converted to Hire", count: 1, percentage: 2 },
        ],
      },
    },
  },
  {
    id: "JOB-003",
    title: "Emergency Paramedic",
    employer: "Manipal Hospitals",
    employerTier: "mid-market",
    roleType: "paramedic",
    geography: "Bangalore",
    status: "active",
    createdAt: "2024-01-20",
    daysOpen: 9,
    funnel: [
      { name: "Candidate Lead", candidates: 312, aiHandled: 290, humanHandled: 22, avgTimeInStage: "12 hours" },
      { name: "Profile Completed", candidates: 256, aiHandled: 240, humanHandled: 16, avgTimeInStage: "1 day" },
      { name: "AI Matched", candidates: 178, aiHandled: 178, humanHandled: 0, avgTimeInStage: "2 hours" },
      { name: "Recruiter Contacted", candidates: 134, aiHandled: 110, humanHandled: 24, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 67, aiHandled: 45, humanHandled: 22, avgTimeInStage: "2 days" },
      { name: "Offer Released", candidates: 28, aiHandled: 8, humanHandled: 20, avgTimeInStage: "1 day" },
      { name: "Placement Confirmed", candidates: 12, aiHandled: 5, humanHandled: 7, avgTimeInStage: "3 days" },
    ],
    aiContribution: 78,
    humanContribution: 22,
    revenue: 320000,
    cost: 85000,
    margin: 73.4,
    hitlEvents: [],
    workflowId: "wf-003",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 312, appeared: 256, qualified: 200, disqualified: 40, pending: 16,
        avgResponseTime: "45 mins", handler: "C",
        aiPercentage: 90, humanPercentage: 8, hitlPercentage: 2,
        avgTimeInStage: "12 hours", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 82.1, dropOffRate: 17.9,
        jobsSwaasaMetrics: {
          jobImpressions: 15800, uniqueCandidateViews: 10250, jobCTR: 4.1,
          saveRate: 15.2, shareRate: 3.2, matchScoreAvg: 72,
          contentQualityScore: 80, aiRankedImpressions: 90,
          manualBoosted: 6, hitlOverrideRate: 2,
        },
        progressFunnel: [
          { label: "Job Published", count: 680, percentage: 100 },
          { label: "Job Indexed", count: 646, percentage: 95 },
          { label: "Job Ranked by AI", count: 578, percentage: 85 },
          { label: "Job Viewed", count: 442, percentage: 65 },
          { label: "Apply Clicked", count: 272, percentage: 40 },
        ],
        seoScore: {
          overall: 68, titleOptimization: 72, descriptionQuality: 65,
          keywordMatch: 58, locationOptimization: 75, mobileReadiness: 70,
        },
      },
      "job-discovery": {
        sent: 312, appeared: 256, qualified: 200, disqualified: 40, pending: 16,
        avgResponseTime: "30 mins", handler: "C",
        aiPercentage: 88, humanPercentage: 10, hitlPercentage: 2,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 82.1, dropOffRate: 17.9,
        channels: { app: 55, web: 25, whatsapp: 12, jobBoards: 8 },
        jobDiscoveryMetrics: {
          searchSessions: 6200, searchResultCTR: 10.5, filterUsageRate: 48,
          recommendationClickRate: 28.5, aiMatchConfidence: 78,
          top10RelevanceScore: 72, coldStartRate: 5.2,
          searchLatency: "95ms", rankingConfidenceDrift: 1.2,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 6200, percentage: 100 },
          { label: "Results Generated", count: 5890, percentage: 95 },
          { label: "Filters Applied", count: 2976, percentage: 48 },
          { label: "Job Card Viewed", count: 2170, percentage: 35 },
          { label: "Job Opened", count: 1240, percentage: 20 },
          { label: "Interest Clicked", count: 434, percentage: 7 },
        ],
      },
      "expression": {
        sent: 256, appeared: 200, qualified: 178, disqualified: 15, pending: 7,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 85, humanPercentage: 12, hitlPercentage: 3,
        avgTimeInStage: "6 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 89.0, dropOffRate: 11.0,
        channels: { app: 60, whatsapp: 25, recruiterOutreach: 15 },
        eoiMetrics: {
          eoiClickRate: 45, leadCaptureRate: 88, consentCompletionRate: 96,
          intentScore: 68, fraudDetectionRate: 0.5, duplicateLeadRate: 2.1,
          aiAutoQualified: 85, hitlReviewedLeads: 4,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 434, percentage: 100 },
          { label: "Details Submitted", count: 390, percentage: 90 },
          { label: "Consent Given", count: 374, percentage: 86 },
          { label: "Lead Scored", count: 348, percentage: 80 },
          { label: "Routed to Pipeline", count: 256, percentage: 59 },
        ],
      },
      "prescreen": {
        sent: 178, appeared: 145, qualified: 120, disqualified: 18, pending: 7,
        avgResponseTime: "2 hours", handler: "AE",
        aiPercentage: 95, humanPercentage: 3, hitlPercentage: 2,
        avgTimeInStage: "3 hours", slaThreshold: "8 hours", slaStatus: "green",
        conversionRate: 82.8, dropOffRate: 17.2,
        preScreenMetrics: {
          questionStartRate: 95, completionRate: 85, knockoutRate: 12,
          passRate: 73, falseRejectionRate: 1.5, resumeParseConfidence: 92,
          aiAutoReject: 10, hitlOverride: 2, manualApproval: 5,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 178, percentage: 100 },
          { label: "Candidate Started", count: 169, percentage: 95 },
          { label: "Questions Completed", count: 151, percentage: 85 },
          { label: "Auto-Scored", count: 145, percentage: 81 },
          { label: "Passed / Failed / Escalated", count: 120, percentage: 67 },
        ],
      },
      "voice-agent": {
        sent: 120, appeared: 105, qualified: 85, disqualified: 15, pending: 5,
        avgResponseTime: "10 mins", handler: "X+",
        aiPercentage: 92, humanPercentage: 5, hitlPercentage: 3,
        avgTimeInStage: "1 hour", slaThreshold: "4 hours", slaStatus: "green",
        conversionRate: 81.0, dropOffRate: 19.0,
        voiceScreeningMetrics: {
          callAttemptRate: 98, callConnectRate: 88, avgCallDuration: "3m 45s",
          aiPassRate: 81, humanPassRate: 78, dropOffDuringCall: 5,
          speechRecognitionConfidence: 94, responseConfidenceScore: 88,
          hiringManagerFitScore: 72, aiFullyScreened: 88,
          hitlReview: 6, humanInterview: 6,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 120, percentage: 100 },
          { label: "Call Dialed", count: 118, percentage: 98 },
          { label: "Call Connected", count: 106, percentage: 88 },
          { label: "Questions Asked", count: 100, percentage: 83 },
          { label: "AI Evaluation Completed", count: 92, percentage: 77 },
          { label: "Final Outcome", count: 85, percentage: 71 },
        ],
      },
      "scheduling": {
        sent: 85, appeared: 72, qualified: 60, disqualified: 8, pending: 4,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 88, humanPercentage: 10, hitlPercentage: 2,
        avgTimeInStage: "8 hours", slaThreshold: "1 day", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 85,
          interviewInvitesSent: 72,
          interviewScheduled: 65,
          interviewCompleted: 60,
          noShowRate: 8,
          feedbackSubmitted: 55,
          aiSchedulingPercentage: 88,
          humanSchedulingPercentage: 10,
          hitlApprovalPercentage: 2,
          aiSlotSuggestionTime: "1m",
          recruiterActionTime: "2h",
          candidateConfirmationTime: "4h",
          scheduleWithinSLA: 95,
          confirmationWithinSLA: 92,
          feedbackWithinSLA: 88,
          interviewConversionRate: 83,
          timeToInterview: "2d",
          interviewToOfferRatio: 52,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 85, percentage: 100 },
          { label: "Interview Invites Sent", count: 72, percentage: 85 },
          { label: "Interview Scheduled", count: 65, percentage: 76 },
          { label: "Interview Completed", count: 60, percentage: 71 },
          { label: "Feedback Submitted", count: 55, percentage: 65 },
        ],
      },
      "silver-med": {
        sent: 12, appeared: 12, qualified: 10, disqualified: 0, pending: 2,
        avgResponseTime: "1 day", handler: "R",
        aiPercentage: 35, humanPercentage: 60, hitlPercentage: 5,
        avgTimeInStage: "3 days", slaThreshold: "7 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        silverMedalistMetrics: {
          candidatesTagged: 12,
          reEngagementInvitesSent: 10,
          reAppliedToNewJobs: 7,
          conversionToHire: 4,
          aiTaggingRate: 35,
          humanOverrideRate: 60,
          hitlReviewRate: 5,
          aiClassificationTime: "45s",
          recruiterReviewTime: "4h",
          candidateReEngagementResponseTime: "1d",
          taggingWithinSLA: 96,
          reEngagementWithinSLA: 92,
          followUpWithinSLA: 88,
          silverToHireConversionRate: 33,
          talentPoolReuseRate: 45,
          costSavedVsFreshSourcing: 1800,
          candidateRetentionScore: 88,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 12, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 10, percentage: 83 },
          { label: "Re-applied to New Jobs", count: 7, percentage: 58 },
          { label: "Converted to Hire", count: 4, percentage: 33 },
        ],
      },
      "talent-community": {
        sent: 8, appeared: 8, qualified: 8, disqualified: 0, pending: 0,
        avgResponseTime: "12 hours", handler: "C",
        aiPercentage: 70, humanPercentage: 25, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 8,
          activeCommunityMembers: 4200,
          contentEngagementRate: 52,
          candidatesActivatedIntoPipeline: 18,
          communityToHireConversion: 5,
          aiCommunityTagging: 70,
          humanCommunityModeration: 25,
          hitlModeration: 5,
          aiEngagementTriggerTime: "45m",
          recruiterCommunityActionTime: "8h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Bi-weekly",
          activationWithinSLA: 82,
          contentRefreshWithinSLA: 90,
          communityActivationRate: 22,
          passiveToActiveRate: 18,
          longTermHireRate: 12,
          employerBrandEngagementIndex: 82,
        },
        progressFunnel: [
          { label: "Added to Community", count: 8, percentage: 100 },
          { label: "Active Members", count: 4200, percentage: 85 },
          { label: "Content Engaged", count: 2184, percentage: 52 },
          { label: "Activated into Pipeline", count: 18, percentage: 18 },
          { label: "Converted to Hire", count: 5, percentage: 5 },
        ],
      },
    },
  },
  {
    id: "JOB-004",
    title: "Lab Technician",
    employer: "KIMS Hospital",
    employerTier: "mid-market",
    roleType: "technician",
    geography: "Chennai",
    status: "filled",
    createdAt: "2024-01-05",
    daysOpen: 24,
    funnel: [
      { name: "Candidate Lead", candidates: 189, aiHandled: 175, humanHandled: 14, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 145, aiHandled: 138, humanHandled: 7, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 89, aiHandled: 89, humanHandled: 0, avgTimeInStage: "3 hours" },
      { name: "Recruiter Contacted", candidates: 62, aiHandled: 48, humanHandled: 14, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 31, aiHandled: 18, humanHandled: 13, avgTimeInStage: "2 days" },
      { name: "Offer Released", candidates: 15, aiHandled: 4, humanHandled: 11, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 8, aiHandled: 3, humanHandled: 5, avgTimeInStage: "4 days" },
    ],
    aiContribution: 82,
    humanContribution: 18,
    revenue: 240000,
    cost: 62000,
    margin: 74.2,
    hitlEvents: [
      { id: "evt-004", type: "approval", reason: "Bulk hiring approval", assignee: "Vikram Singh", resolution: "Approved 8 candidates", duration: "1 hour", timestamp: "5 days ago" },
    ],
    workflowId: "wf-007",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 189, appeared: 145, qualified: 115, disqualified: 22, pending: 8,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 88, humanPercentage: 9, hitlPercentage: 3,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 76.7, dropOffRate: 23.3,
        jobsSwaasaMetrics: {
          jobImpressions: 9450, uniqueCandidateViews: 6120, jobCTR: 3.5,
          saveRate: 11.8, shareRate: 2.0, matchScoreAvg: 75,
          contentQualityScore: 82, aiRankedImpressions: 88,
          manualBoosted: 8, hitlOverrideRate: 3,
        },
        progressFunnel: [
          { label: "Job Published", count: 420, percentage: 100 },
          { label: "Job Indexed", count: 399, percentage: 95 },
          { label: "Job Ranked by AI", count: 357, percentage: 85 },
          { label: "Job Viewed", count: 273, percentage: 65 },
          { label: "Apply Clicked", count: 168, percentage: 40 },
        ],
        seoScore: {
          overall: 82, titleOptimization: 85, descriptionQuality: 80,
          keywordMatch: 78, locationOptimization: 88, mobileReadiness: 82,
        },
      },
      "job-discovery": {
        sent: 189, appeared: 145, qualified: 115, disqualified: 22, pending: 8,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 85, humanPercentage: 12, hitlPercentage: 3,
        avgTimeInStage: "5 hours", slaThreshold: "18 hours", slaStatus: "green",
        conversionRate: 76.7, dropOffRate: 23.3,
        channels: { app: 50, web: 28, whatsapp: 14, jobBoards: 8 },
        jobDiscoveryMetrics: {
          searchSessions: 4850, searchResultCTR: 9.2, filterUsageRate: 45,
          recommendationClickRate: 26.5, aiMatchConfidence: 80,
          top10RelevanceScore: 74, coldStartRate: 6.5,
          searchLatency: "110ms", rankingConfidenceDrift: 1.5,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 4850, percentage: 100 },
          { label: "Results Generated", count: 4608, percentage: 95 },
          { label: "Filters Applied", count: 2183, percentage: 45 },
          { label: "Job Card Viewed", count: 1698, percentage: 35 },
          { label: "Job Opened", count: 970, percentage: 20 },
          { label: "Interest Clicked", count: 340, percentage: 7 },
        ],
      },
      "expression": {
        sent: 145, appeared: 115, qualified: 89, disqualified: 18, pending: 8,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 78, humanPercentage: 18, hitlPercentage: 4,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 77.4, dropOffRate: 22.6,
        channels: { app: 52, whatsapp: 28, recruiterOutreach: 20 },
        eoiMetrics: {
          eoiClickRate: 40, leadCaptureRate: 85, consentCompletionRate: 95,
          intentScore: 70, fraudDetectionRate: 0.6, duplicateLeadRate: 2.8,
          aiAutoQualified: 78, hitlReviewedLeads: 6,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 340, percentage: 100 },
          { label: "Details Submitted", count: 306, percentage: 90 },
          { label: "Consent Given", count: 289, percentage: 85 },
          { label: "Lead Scored", count: 269, percentage: 79 },
          { label: "Routed to Pipeline", count: 145, percentage: 43 },
        ],
      },
      "prescreen": {
        sent: 89, appeared: 72, qualified: 55, disqualified: 12, pending: 5,
        avgResponseTime: "3 hours", handler: "AE",
        aiPercentage: 90, humanPercentage: 7, hitlPercentage: 3,
        avgTimeInStage: "4 hours", slaThreshold: "10 hours", slaStatus: "green",
        conversionRate: 76.4, dropOffRate: 23.6,
        preScreenMetrics: {
          questionStartRate: 93, completionRate: 81, knockoutRate: 15,
          passRate: 66, falseRejectionRate: 2.0, resumeParseConfidence: 90,
          aiAutoReject: 12, hitlOverride: 3, manualApproval: 6,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 89, percentage: 100 },
          { label: "Candidate Started", count: 83, percentage: 93 },
          { label: "Questions Completed", count: 72, percentage: 81 },
          { label: "Auto-Scored", count: 68, percentage: 76 },
          { label: "Passed / Failed / Escalated", count: 55, percentage: 62 },
        ],
      },
      "voice-agent": {
        sent: 55, appeared: 48, qualified: 38, disqualified: 7, pending: 3,
        avgResponseTime: "12 mins", handler: "X+",
        aiPercentage: 88, humanPercentage: 8, hitlPercentage: 4,
        avgTimeInStage: "1.5 hours", slaThreshold: "5 hours", slaStatus: "green",
        conversionRate: 79.2, dropOffRate: 20.8,
        voiceScreeningMetrics: {
          callAttemptRate: 96, callConnectRate: 87, avgCallDuration: "4m 10s",
          aiPassRate: 79, humanPassRate: 80, dropOffDuringCall: 6,
          speechRecognitionConfidence: 92, responseConfidenceScore: 86,
          hiringManagerFitScore: 74, aiFullyScreened: 82,
          hitlReview: 8, humanInterview: 10,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 55, percentage: 100 },
          { label: "Call Dialed", count: 53, percentage: 96 },
          { label: "Call Connected", count: 48, percentage: 87 },
          { label: "Questions Asked", count: 45, percentage: 82 },
          { label: "AI Evaluation Completed", count: 41, percentage: 75 },
          { label: "Final Outcome", count: 38, percentage: 69 },
        ],
      },
      "scheduling": {
        sent: 38, appeared: 32, qualified: 25, disqualified: 5, pending: 2,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 82, humanPercentage: 14, hitlPercentage: 4,
        avgTimeInStage: "10 hours", slaThreshold: "1.5 days", slaStatus: "green",
        conversionRate: 78.1, dropOffRate: 21.9,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 38,
          interviewInvitesSent: 32,
          interviewScheduled: 28,
          interviewCompleted: 25,
          noShowRate: 11,
          feedbackSubmitted: 22,
          aiSchedulingPercentage: 82,
          humanSchedulingPercentage: 14,
          hitlApprovalPercentage: 4,
          aiSlotSuggestionTime: "1.5m",
          recruiterActionTime: "3h",
          candidateConfirmationTime: "5h",
          scheduleWithinSLA: 92,
          confirmationWithinSLA: 88,
          feedbackWithinSLA: 82,
          interviewConversionRate: 78,
          timeToInterview: "2.5d",
          interviewToOfferRatio: 48,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 38, percentage: 100 },
          { label: "Interview Invites Sent", count: 32, percentage: 84 },
          { label: "Interview Scheduled", count: 28, percentage: 74 },
          { label: "Interview Completed", count: 25, percentage: 66 },
          { label: "Feedback Submitted", count: 22, percentage: 58 },
        ],
      },
      "silver-med": {
        sent: 10, appeared: 10, qualified: 8, disqualified: 0, pending: 2,
        avgResponseTime: "1.5 days", handler: "R",
        aiPercentage: 50, humanPercentage: 45, hitlPercentage: 5,
        avgTimeInStage: "4 days", slaThreshold: "10 days", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        silverMedalistMetrics: {
          candidatesTagged: 10,
          reEngagementInvitesSent: 8,
          reAppliedToNewJobs: 5,
          conversionToHire: 3,
          aiTaggingRate: 50,
          humanOverrideRate: 45,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "6h",
          candidateReEngagementResponseTime: "1.5d",
          taggingWithinSLA: 94,
          reEngagementWithinSLA: 88,
          followUpWithinSLA: 82,
          silverToHireConversionRate: 30,
          talentPoolReuseRate: 40,
          costSavedVsFreshSourcing: 1500,
          candidateRetentionScore: 85,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 10, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 8, percentage: 80 },
          { label: "Re-applied to New Jobs", count: 5, percentage: 50 },
          { label: "Converted to Hire", count: 3, percentage: 30 },
        ],
      },
      "talent-community": {
        sent: 5, appeared: 5, qualified: 5, disqualified: 0, pending: 0,
        avgResponseTime: "18 hours", handler: "C",
        aiPercentage: 65, humanPercentage: 30, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 5,
          activeCommunityMembers: 3500,
          contentEngagementRate: 48,
          candidatesActivatedIntoPipeline: 14,
          communityToHireConversion: 4,
          aiCommunityTagging: 65,
          humanCommunityModeration: 30,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "10h",
          candidateResponseTime: "2d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 75,
          contentRefreshWithinSLA: 88,
          communityActivationRate: 18,
          passiveToActiveRate: 14,
          longTermHireRate: 10,
          employerBrandEngagementIndex: 80,
        },
        progressFunnel: [
          { label: "Added to Community", count: 5, percentage: 100 },
          { label: "Active Members", count: 3500, percentage: 82 },
          { label: "Content Engaged", count: 1680, percentage: 48 },
          { label: "Activated into Pipeline", count: 14, percentage: 14 },
          { label: "Converted to Hire", count: 4, percentage: 4 },
        ],
      },
    },
  },
  {
    id: "JOB-005",
    title: "Pediatric Nurse",
    employer: "Yashoda Hospitals",
    employerTier: "smb",
    roleType: "nurse",
    geography: "Hyderabad",
    status: "active",
    createdAt: "2024-01-22",
    daysOpen: 7,
    funnel: [
      { name: "Candidate Lead", candidates: 98, aiHandled: 92, humanHandled: 6, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 76, aiHandled: 72, humanHandled: 4, avgTimeInStage: "1 day" },
      { name: "AI Matched", candidates: 45, aiHandled: 45, humanHandled: 0, avgTimeInStage: "2 hours" },
      { name: "Recruiter Contacted", candidates: 32, aiHandled: 26, humanHandled: 6, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 15, aiHandled: 10, humanHandled: 5, avgTimeInStage: "2 days" },
      { name: "Offer Released", candidates: 4, aiHandled: 1, humanHandled: 3, avgTimeInStage: "1 day" },
      { name: "Placement Confirmed", candidates: 0, aiHandled: 0, humanHandled: 0, avgTimeInStage: "-" },
    ],
    aiContribution: 85,
    humanContribution: 15,
    revenue: 180000,
    cost: 42000,
    margin: 76.7,
    hitlEvents: [],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 98, appeared: 76, qualified: 58, disqualified: 12, pending: 6,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 92, humanPercentage: 6, hitlPercentage: 2,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 76.3, dropOffRate: 23.7,
        jobsSwaasaMetrics: {
          jobImpressions: 5800, uniqueCandidateViews: 3950, jobCTR: 3.8,
          saveRate: 13.5, shareRate: 2.4, matchScoreAvg: 76,
          contentQualityScore: 84, aiRankedImpressions: 92,
          manualBoosted: 5, hitlOverrideRate: 2,
        },
        progressFunnel: [
          { label: "Job Published", count: 210, percentage: 100 },
          { label: "Job Indexed", count: 200, percentage: 95 },
          { label: "Job Ranked by AI", count: 179, percentage: 85 },
          { label: "Job Viewed", count: 137, percentage: 65 },
          { label: "Apply Clicked", count: 84, percentage: 40 },
        ],
        seoScore: {
          overall: 91, titleOptimization: 92, descriptionQuality: 88,
          keywordMatch: 90, locationOptimization: 94, mobileReadiness: 92,
        },
      },
      "job-discovery": {
        sent: 98, appeared: 76, qualified: 58, disqualified: 12, pending: 6,
        avgResponseTime: "45 mins", handler: "C",
        aiPercentage: 90, humanPercentage: 8, hitlPercentage: 2,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 76.3, dropOffRate: 23.7,
        channels: { app: 58, web: 22, whatsapp: 14, jobBoards: 6 },
        jobDiscoveryMetrics: {
          searchSessions: 2850, searchResultCTR: 10.8, filterUsageRate: 52,
          recommendationClickRate: 30.5, aiMatchConfidence: 82,
          top10RelevanceScore: 78, coldStartRate: 4.2,
          searchLatency: "85ms", rankingConfidenceDrift: 1.0,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 2850, percentage: 100 },
          { label: "Results Generated", count: 2708, percentage: 95 },
          { label: "Filters Applied", count: 1482, percentage: 52 },
          { label: "Job Card Viewed", count: 998, percentage: 35 },
          { label: "Job Opened", count: 570, percentage: 20 },
          { label: "Interest Clicked", count: 200, percentage: 7 },
        ],
      },
      "expression": {
        sent: 76, appeared: 58, qualified: 45, disqualified: 9, pending: 4,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 88, humanPercentage: 10, hitlPercentage: 2,
        avgTimeInStage: "6 hours", slaThreshold: "18 hours", slaStatus: "green",
        conversionRate: 77.6, dropOffRate: 22.4,
        channels: { app: 62, whatsapp: 24, recruiterOutreach: 14 },
        eoiMetrics: {
          eoiClickRate: 48, leadCaptureRate: 90, consentCompletionRate: 97,
          intentScore: 74, fraudDetectionRate: 0.4, duplicateLeadRate: 2.0,
          aiAutoQualified: 88, hitlReviewedLeads: 3,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 200, percentage: 100 },
          { label: "Details Submitted", count: 182, percentage: 91 },
          { label: "Consent Given", count: 176, percentage: 88 },
          { label: "Lead Scored", count: 164, percentage: 82 },
          { label: "Routed to Pipeline", count: 76, percentage: 38 },
        ],
      },
      "prescreen": {
        sent: 45, appeared: 38, qualified: 32, disqualified: 4, pending: 2,
        avgResponseTime: "2.5 hours", handler: "AE",
        aiPercentage: 94, humanPercentage: 4, hitlPercentage: 2,
        avgTimeInStage: "3 hours", slaThreshold: "8 hours", slaStatus: "green",
        conversionRate: 84.2, dropOffRate: 15.8,
        preScreenMetrics: {
          questionStartRate: 96, completionRate: 88, knockoutRate: 10,
          passRate: 78, falseRejectionRate: 1.2, resumeParseConfidence: 93,
          aiAutoReject: 8, hitlOverride: 2, manualApproval: 4,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 45, percentage: 100 },
          { label: "Candidate Started", count: 43, percentage: 96 },
          { label: "Questions Completed", count: 40, percentage: 89 },
          { label: "Auto-Scored", count: 38, percentage: 84 },
          { label: "Passed / Failed / Escalated", count: 32, percentage: 71 },
        ],
      },
      "voice-agent": {
        sent: 32, appeared: 28, qualified: 24, disqualified: 3, pending: 1,
        avgResponseTime: "10 mins", handler: "X+",
        aiPercentage: 92, humanPercentage: 5, hitlPercentage: 3,
        avgTimeInStage: "1 hour", slaThreshold: "4 hours", slaStatus: "green",
        conversionRate: 85.7, dropOffRate: 14.3,
        voiceScreeningMetrics: {
          callAttemptRate: 98, callConnectRate: 88, avgCallDuration: "3m 50s",
          aiPassRate: 85, humanPassRate: 82, dropOffDuringCall: 4,
          speechRecognitionConfidence: 94, responseConfidenceScore: 89,
          hiringManagerFitScore: 78, aiFullyScreened: 88,
          hitlReview: 6, humanInterview: 6,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 32, percentage: 100 },
          { label: "Call Dialed", count: 31, percentage: 97 },
          { label: "Call Connected", count: 28, percentage: 88 },
          { label: "Questions Asked", count: 27, percentage: 84 },
          { label: "AI Evaluation Completed", count: 25, percentage: 78 },
          { label: "Final Outcome", count: 24, percentage: 75 },
        ],
      },
      "scheduling": {
        sent: 24, appeared: 20, qualified: 15, disqualified: 3, pending: 2,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 88, humanPercentage: 9, hitlPercentage: 3,
        avgTimeInStage: "8 hours", slaThreshold: "1 day", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 24,
          interviewInvitesSent: 20,
          interviewScheduled: 18,
          interviewCompleted: 15,
          noShowRate: 10,
          feedbackSubmitted: 14,
          aiSchedulingPercentage: 88,
          humanSchedulingPercentage: 9,
          hitlApprovalPercentage: 3,
          aiSlotSuggestionTime: "1m",
          recruiterActionTime: "2h",
          candidateConfirmationTime: "4h",
          scheduleWithinSLA: 95,
          confirmationWithinSLA: 92,
          feedbackWithinSLA: 88,
          interviewConversionRate: 75,
          timeToInterview: "2d",
          interviewToOfferRatio: 50,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 24, percentage: 100 },
          { label: "Interview Invites Sent", count: 20, percentage: 83 },
          { label: "Interview Scheduled", count: 18, percentage: 75 },
          { label: "Interview Completed", count: 15, percentage: 63 },
          { label: "Feedback Submitted", count: 14, percentage: 58 },
        ],
      },
      "silver-med": {
        sent: 4, appeared: 4, qualified: 3, disqualified: 0, pending: 1,
        avgResponseTime: "1 day", handler: "R",
        aiPercentage: 55, humanPercentage: 40, hitlPercentage: 5,
        avgTimeInStage: "3 days", slaThreshold: "7 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 4,
          reEngagementInvitesSent: 3,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 55,
          humanOverrideRate: 40,
          hitlReviewRate: 5,
          aiClassificationTime: "45s",
          recruiterReviewTime: "4h",
          candidateReEngagementResponseTime: "1d",
          taggingWithinSLA: 96,
          reEngagementWithinSLA: 92,
          followUpWithinSLA: 88,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 35,
          costSavedVsFreshSourcing: 1200,
          candidateRetentionScore: 86,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 4, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 3, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "12 hours", handler: "C",
        aiPercentage: 75, humanPercentage: 20, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 2200,
          contentEngagementRate: 50,
          candidatesActivatedIntoPipeline: 10,
          communityToHireConversion: 3,
          aiCommunityTagging: 75,
          humanCommunityModeration: 20,
          hitlModeration: 5,
          aiEngagementTriggerTime: "45m",
          recruiterCommunityActionTime: "8h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Bi-weekly",
          activationWithinSLA: 82,
          contentRefreshWithinSLA: 90,
          communityActivationRate: 22,
          passiveToActiveRate: 18,
          longTermHireRate: 12,
          employerBrandEngagementIndex: 82,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 2200, percentage: 85 },
          { label: "Content Engaged", count: 1100, percentage: 50 },
          { label: "Activated into Pipeline", count: 10, percentage: 15 },
          { label: "Converted to Hire", count: 3, percentage: 5 },
        ],
      },
    },
  },
  {
    id: "JOB-006",
    title: "Cardiologist",
    employer: "Aster CMI Hospital",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Gurugram",
    status: "active",
    createdAt: "2024-01-08",
    daysOpen: 21,
    funnel: [
      { name: "Candidate Lead", candidates: 78, aiHandled: 65, humanHandled: 13, avgTimeInStage: "3 days" },
      { name: "Profile Completed", candidates: 52, aiHandled: 45, humanHandled: 7, avgTimeInStage: "4 days" },
      { name: "AI Matched", candidates: 28, aiHandled: 28, humanHandled: 0, avgTimeInStage: "8 hours" },
      { name: "Recruiter Contacted", candidates: 18, aiHandled: 8, humanHandled: 10, avgTimeInStage: "3 days" },
      { name: "Interview Scheduled", candidates: 8, aiHandled: 2, humanHandled: 6, avgTimeInStage: "5 days" },
      { name: "Offer Released", candidates: 3, aiHandled: 0, humanHandled: 3, avgTimeInStage: "4 days" },
      { name: "Placement Confirmed", candidates: 1, aiHandled: 0, humanHandled: 1, avgTimeInStage: "6 days" },
    ],
    aiContribution: 58,
    humanContribution: 42,
    revenue: 1250000,
    cost: 480000,
    margin: 61.6,
    hitlEvents: [
      { id: "evt-005", type: "escalation", reason: "VIP candidate - requires senior recruiter", assignee: "Deepa Kumar", resolution: "Personal outreach completed", duration: "8 hours", timestamp: "1 week ago" },
      { id: "evt-006", type: "review", reason: "Credential verification complex", assignee: "Priya Sharma", resolution: "Manual verification completed", duration: "2 days", timestamp: "4 days ago" },
    ],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 78, appeared: 52, qualified: 38, disqualified: 10, pending: 4,
        avgResponseTime: "4 hours", handler: "C",
        aiPercentage: 58, humanPercentage: 35, hitlPercentage: 7,
        avgTimeInStage: "3 days", slaThreshold: "4 days", slaStatus: "amber",
        conversionRate: 66.7, dropOffRate: 33.3,
        jobsSwaasaMetrics: {
          jobImpressions: 4200, uniqueCandidateViews: 2850, jobCTR: 2.2,
          saveRate: 8.5, shareRate: 1.5, matchScoreAvg: 85,
          contentQualityScore: 90, aiRankedImpressions: 58,
          manualBoosted: 28, hitlOverrideRate: 7,
        },
        progressFunnel: [
          { label: "Job Published", count: 165, percentage: 100 },
          { label: "Job Indexed", count: 157, percentage: 95 },
          { label: "Job Ranked by AI", count: 140, percentage: 85 },
          { label: "Job Viewed", count: 99, percentage: 60 },
          { label: "Apply Clicked", count: 56, percentage: 34 },
        ],
        seoScore: {
          overall: 55, titleOptimization: 50, descriptionQuality: 58,
          keywordMatch: 48, locationOptimization: 62, mobileReadiness: 55,
        },
      },
      "job-discovery": {
        sent: 78, appeared: 52, qualified: 38, disqualified: 10, pending: 4,
        avgResponseTime: "6 hours", handler: "C",
        aiPercentage: 52, humanPercentage: 40, hitlPercentage: 8,
        avgTimeInStage: "12 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        channels: { app: 32, web: 35, whatsapp: 18, jobBoards: 15 },
        jobDiscoveryMetrics: {
          searchSessions: 1850, searchResultCTR: 5.8, filterUsageRate: 35,
          recommendationClickRate: 18.5, aiMatchConfidence: 88,
          top10RelevanceScore: 82, coldStartRate: 12.5,
          searchLatency: "180ms", rankingConfidenceDrift: 2.8,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 1850, percentage: 100 },
          { label: "Results Generated", count: 1758, percentage: 95 },
          { label: "Filters Applied", count: 648, percentage: 35 },
          { label: "Job Card Viewed", count: 648, percentage: 35 },
          { label: "Job Opened", count: 370, percentage: 20 },
          { label: "Interest Clicked", count: 130, percentage: 7 },
        ],
      },
      "expression": {
        sent: 52, appeared: 38, qualified: 28, disqualified: 7, pending: 3,
        avgResponseTime: "8 hours", handler: "C",
        aiPercentage: 45, humanPercentage: 48, hitlPercentage: 7,
        avgTimeInStage: "18 hours", slaThreshold: "24 hours", slaStatus: "amber",
        conversionRate: 73.7, dropOffRate: 26.3,
        channels: { app: 35, whatsapp: 30, recruiterOutreach: 35 },
        eoiMetrics: {
          eoiClickRate: 28, leadCaptureRate: 75, consentCompletionRate: 90,
          intentScore: 82, fraudDetectionRate: 0.3, duplicateLeadRate: 1.8,
          aiAutoQualified: 45, hitlReviewedLeads: 15,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 130, percentage: 100 },
          { label: "Details Submitted", count: 110, percentage: 85 },
          { label: "Consent Given", count: 99, percentage: 76 },
          { label: "Lead Scored", count: 88, percentage: 68 },
          { label: "Routed to Pipeline", count: 52, percentage: 40 },
        ],
      },
      "prescreen": {
        sent: 28, appeared: 22, qualified: 15, disqualified: 5, pending: 2,
        avgResponseTime: "12 hours", handler: "AE",
        aiPercentage: 68, humanPercentage: 25, hitlPercentage: 7,
        avgTimeInStage: "8 hours", slaThreshold: "16 hours", slaStatus: "green",
        conversionRate: 68.2, dropOffRate: 31.8,
        preScreenMetrics: {
          questionStartRate: 85, completionRate: 72, knockoutRate: 25,
          passRate: 54, falseRejectionRate: 4.2, resumeParseConfidence: 82,
          aiAutoReject: 20, hitlOverride: 8, manualApproval: 12,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 28, percentage: 100 },
          { label: "Candidate Started", count: 24, percentage: 86 },
          { label: "Questions Completed", count: 20, percentage: 71 },
          { label: "Auto-Scored", count: 18, percentage: 64 },
          { label: "Passed / Failed / Escalated", count: 15, percentage: 54 },
        ],
      },
      "voice-agent": {
        sent: 15, appeared: 12, qualified: 8, disqualified: 3, pending: 1,
        avgResponseTime: "30 mins", handler: "X+",
        aiPercentage: 62, humanPercentage: 28, hitlPercentage: 10,
        avgTimeInStage: "4 hours", slaThreshold: "8 hours", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        voiceScreeningMetrics: {
          callAttemptRate: 88, callConnectRate: 78, avgCallDuration: "6m 45s",
          aiPassRate: 62, humanPassRate: 88, dropOffDuringCall: 12,
          speechRecognitionConfidence: 85, responseConfidenceScore: 80,
          hiringManagerFitScore: 85, aiFullyScreened: 55,
          hitlReview: 20, humanInterview: 25,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 15, percentage: 100 },
          { label: "Call Dialed", count: 14, percentage: 93 },
          { label: "Call Connected", count: 12, percentage: 80 },
          { label: "Questions Asked", count: 11, percentage: 73 },
          { label: "AI Evaluation Completed", count: 9, percentage: 60 },
          { label: "Final Outcome", count: 8, percentage: 53 },
        ],
      },
      "scheduling": {
        sent: 8, appeared: 6, qualified: 4, disqualified: 2, pending: 0,
        avgResponseTime: "18 hours", handler: "AE",
        aiPercentage: 45, humanPercentage: 48, hitlPercentage: 7,
        avgTimeInStage: "3 days", slaThreshold: "4 days", slaStatus: "amber",
        conversionRate: 66.7, dropOffRate: 33.3,
        delayCause: "Specialist Availability",
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 8,
          interviewInvitesSent: 6,
          interviewScheduled: 5,
          interviewCompleted: 4,
          noShowRate: 20,
          feedbackSubmitted: 3,
          aiSchedulingPercentage: 45,
          humanSchedulingPercentage: 48,
          hitlApprovalPercentage: 7,
          aiSlotSuggestionTime: "5m",
          recruiterActionTime: "12h",
          candidateConfirmationTime: "18h",
          scheduleWithinSLA: 62,
          confirmationWithinSLA: 55,
          feedbackWithinSLA: 50,
          interviewConversionRate: 67,
          timeToInterview: "6d",
          interviewToOfferRatio: 33,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 8, percentage: 100 },
          { label: "Interview Invites Sent", count: 6, percentage: 75 },
          { label: "Interview Scheduled", count: 5, percentage: 63 },
          { label: "Interview Completed", count: 4, percentage: 50 },
          { label: "Feedback Submitted", count: 3, percentage: 38 },
        ],
      },
      "silver-med": {
        sent: 3, appeared: 3, qualified: 2, disqualified: 0, pending: 1,
        avgResponseTime: "4 days", handler: "R",
        aiPercentage: 15, humanPercentage: 80, hitlPercentage: 5,
        avgTimeInStage: "10 days", slaThreshold: "21 days", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        silverMedalistMetrics: {
          candidatesTagged: 3,
          reEngagementInvitesSent: 2,
          reAppliedToNewJobs: 1,
          conversionToHire: 0,
          aiTaggingRate: 15,
          humanOverrideRate: 80,
          hitlReviewRate: 5,
          aiClassificationTime: "3m",
          recruiterReviewTime: "24h",
          candidateReEngagementResponseTime: "4d",
          taggingWithinSLA: 82,
          reEngagementWithinSLA: 75,
          followUpWithinSLA: 68,
          silverToHireConversionRate: 0,
          talentPoolReuseRate: 22,
          costSavedVsFreshSourcing: 0,
          candidateRetentionScore: 72,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 3, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 2, percentage: 67 },
          { label: "Re-applied to New Jobs", count: 1, percentage: 33 },
          { label: "Converted to Hire", count: 0, percentage: 0 },
        ],
      },
      "talent-community": {
        sent: 1, appeared: 1, qualified: 1, disqualified: 0, pending: 0,
        avgResponseTime: "3 days", handler: "C",
        aiPercentage: 40, humanPercentage: 55, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 1,
          activeCommunityMembers: 850,
          contentEngagementRate: 35,
          candidatesActivatedIntoPipeline: 3,
          communityToHireConversion: 1,
          aiCommunityTagging: 40,
          humanCommunityModeration: 55,
          hitlModeration: 5,
          aiEngagementTriggerTime: "2h",
          recruiterCommunityActionTime: "18h",
          candidateResponseTime: "3d",
          outreachFrequencySLA: "Monthly",
          activationWithinSLA: 58,
          contentRefreshWithinSLA: 72,
          communityActivationRate: 8,
          passiveToActiveRate: 6,
          longTermHireRate: 4,
          employerBrandEngagementIndex: 70,
        },
        progressFunnel: [
          { label: "Added to Community", count: 1, percentage: 100 },
          { label: "Active Members", count: 850, percentage: 72 },
          { label: "Content Engaged", count: 298, percentage: 35 },
          { label: "Activated into Pipeline", count: 3, percentage: 8 },
          { label: "Converted to Hire", count: 1, percentage: 4 },
        ],
      },
    },
  },
  {
    id: "JOB-007",
    title: "Radiologist",
    employer: "Apollo Hospitals",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Chennai",
    status: "active",
    createdAt: "2024-01-18",
    daysOpen: 11,
    funnel: [
      { name: "Candidate Lead", candidates: 85, aiHandled: 72, humanHandled: 13, avgTimeInStage: "2 days" },
      { name: "Profile Completed", candidates: 62, aiHandled: 55, humanHandled: 7, avgTimeInStage: "3 days" },
      { name: "AI Matched", candidates: 38, aiHandled: 38, humanHandled: 0, avgTimeInStage: "6 hours" },
      { name: "Recruiter Contacted", candidates: 25, aiHandled: 14, humanHandled: 11, avgTimeInStage: "2 days" },
      { name: "Interview Scheduled", candidates: 12, aiHandled: 4, humanHandled: 8, avgTimeInStage: "4 days" },
      { name: "Offer Released", candidates: 5, aiHandled: 1, humanHandled: 4, avgTimeInStage: "3 days" },
      { name: "Placement Confirmed", candidates: 2, aiHandled: 0, humanHandled: 2, avgTimeInStage: "5 days" },
    ],
    aiContribution: 55,
    humanContribution: 45,
    revenue: 920000,
    cost: 310000,
    margin: 66.3,
    hitlEvents: [
      { id: "evt-007", type: "escalation", reason: "Senior specialist requirement", assignee: "Rahul Mehta", resolution: "Manual screening completed", duration: "4 hours", timestamp: "3 days ago" },
    ],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 85, appeared: 62, qualified: 48, disqualified: 10, pending: 4,
        avgResponseTime: "3 hours", handler: "C",
        aiPercentage: 62, humanPercentage: 32, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 72.9, dropOffRate: 27.1,
        jobsSwaasaMetrics: {
          jobImpressions: 5100, uniqueCandidateViews: 3420, jobCTR: 2.5,
          saveRate: 9.2, shareRate: 1.8, matchScoreAvg: 84,
          contentQualityScore: 88, aiRankedImpressions: 62,
          manualBoosted: 25, hitlOverrideRate: 6,
        },
        progressFunnel: [
          { label: "Job Published", count: 185, percentage: 100 },
          { label: "Job Indexed", count: 176, percentage: 95 },
          { label: "Job Ranked by AI", count: 157, percentage: 85 },
          { label: "Job Viewed", count: 111, percentage: 60 },
          { label: "Apply Clicked", count: 63, percentage: 34 },
        ],
        seoScore: {
          overall: 78, titleOptimization: 80, descriptionQuality: 76,
          keywordMatch: 72, locationOptimization: 82, mobileReadiness: 80,
        },
      },
      "job-discovery": {
        sent: 85, appeared: 62, qualified: 48, disqualified: 10, pending: 4,
        avgResponseTime: "5 hours", handler: "C",
        aiPercentage: 58, humanPercentage: 35, hitlPercentage: 7,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 72.9, dropOffRate: 27.1,
        channels: { app: 35, web: 38, whatsapp: 15, jobBoards: 12 },
        jobDiscoveryMetrics: {
          searchSessions: 2250, searchResultCTR: 6.5, filterUsageRate: 38,
          recommendationClickRate: 20.5, aiMatchConfidence: 86,
          top10RelevanceScore: 80, coldStartRate: 10.2,
          searchLatency: "160ms", rankingConfidenceDrift: 2.2,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 2250, percentage: 100 },
          { label: "Results Generated", count: 2138, percentage: 95 },
          { label: "Filters Applied", count: 855, percentage: 38 },
          { label: "Job Card Viewed", count: 788, percentage: 35 },
          { label: "Job Opened", count: 450, percentage: 20 },
          { label: "Interest Clicked", count: 158, percentage: 7 },
        ],
      },
      "expression": {
        sent: 62, appeared: 48, qualified: 38, disqualified: 7, pending: 3,
        avgResponseTime: "6 hours", handler: "C",
        aiPercentage: 52, humanPercentage: 42, hitlPercentage: 6,
        avgTimeInStage: "14 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 79.2, dropOffRate: 20.8,
        channels: { app: 38, whatsapp: 28, recruiterOutreach: 34 },
        eoiMetrics: {
          eoiClickRate: 32, leadCaptureRate: 80, consentCompletionRate: 92,
          intentScore: 80, fraudDetectionRate: 0.4, duplicateLeadRate: 2.0,
          aiAutoQualified: 52, hitlReviewedLeads: 12,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 158, percentage: 100 },
          { label: "Details Submitted", count: 137, percentage: 87 },
          { label: "Consent Given", count: 126, percentage: 80 },
          { label: "Lead Scored", count: 113, percentage: 72 },
          { label: "Routed to Pipeline", count: 62, percentage: 39 },
        ],
      },
      "prescreen": {
        sent: 38, appeared: 30, qualified: 22, disqualified: 6, pending: 2,
        avgResponseTime: "10 hours", handler: "AE",
        aiPercentage: 72, humanPercentage: 22, hitlPercentage: 6,
        avgTimeInStage: "6 hours", slaThreshold: "14 hours", slaStatus: "green",
        conversionRate: 73.3, dropOffRate: 26.7,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 76, knockoutRate: 22,
          passRate: 58, falseRejectionRate: 3.5, resumeParseConfidence: 84,
          aiAutoReject: 18, hitlOverride: 6, manualApproval: 10,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 38, percentage: 100 },
          { label: "Candidate Started", count: 33, percentage: 87 },
          { label: "Questions Completed", count: 29, percentage: 76 },
          { label: "Auto-Scored", count: 26, percentage: 68 },
          { label: "Passed / Failed / Escalated", count: 22, percentage: 58 },
        ],
      },
      "voice-agent": {
        sent: 22, appeared: 18, qualified: 12, disqualified: 4, pending: 2,
        avgResponseTime: "25 mins", handler: "X+",
        aiPercentage: 68, humanPercentage: 24, hitlPercentage: 8,
        avgTimeInStage: "3 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        voiceScreeningMetrics: {
          callAttemptRate: 90, callConnectRate: 82, avgCallDuration: "5m 30s",
          aiPassRate: 68, humanPassRate: 85, dropOffDuringCall: 10,
          speechRecognitionConfidence: 87, responseConfidenceScore: 82,
          hiringManagerFitScore: 82, aiFullyScreened: 62,
          hitlReview: 18, humanInterview: 20,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 22, percentage: 100 },
          { label: "Call Dialed", count: 20, percentage: 91 },
          { label: "Call Connected", count: 18, percentage: 82 },
          { label: "Questions Asked", count: 16, percentage: 73 },
          { label: "AI Evaluation Completed", count: 14, percentage: 64 },
          { label: "Final Outcome", count: 12, percentage: 55 },
        ],
      },
      "scheduling": {
        sent: 12, appeared: 10, qualified: 6, disqualified: 3, pending: 1,
        avgResponseTime: "14 hours", handler: "AE",
        aiPercentage: 52, humanPercentage: 42, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 60.0, dropOffRate: 40.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 12,
          interviewInvitesSent: 10,
          interviewScheduled: 8,
          interviewCompleted: 6,
          noShowRate: 18,
          feedbackSubmitted: 5,
          aiSchedulingPercentage: 52,
          humanSchedulingPercentage: 42,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "4m",
          recruiterActionTime: "10h",
          candidateConfirmationTime: "14h",
          scheduleWithinSLA: 72,
          confirmationWithinSLA: 65,
          feedbackWithinSLA: 58,
          interviewConversionRate: 60,
          timeToInterview: "5d",
          interviewToOfferRatio: 38,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 12, percentage: 100 },
          { label: "Interview Invites Sent", count: 10, percentage: 83 },
          { label: "Interview Scheduled", count: 8, percentage: 67 },
          { label: "Interview Completed", count: 6, percentage: 50 },
          { label: "Feedback Submitted", count: 5, percentage: 42 },
        ],
      },
      "silver-med": {
        sent: 4, appeared: 4, qualified: 3, disqualified: 0, pending: 1,
        avgResponseTime: "3 days", handler: "R",
        aiPercentage: 22, humanPercentage: 72, hitlPercentage: 6,
        avgTimeInStage: "8 days", slaThreshold: "18 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 4,
          reEngagementInvitesSent: 3,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 22,
          humanOverrideRate: 72,
          hitlReviewRate: 6,
          aiClassificationTime: "2m",
          recruiterReviewTime: "18h",
          candidateReEngagementResponseTime: "3d",
          taggingWithinSLA: 85,
          reEngagementWithinSLA: 78,
          followUpWithinSLA: 72,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 30,
          costSavedVsFreshSourcing: 1100,
          candidateRetentionScore: 76,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 4, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 3, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "2 days", handler: "C",
        aiPercentage: 48, humanPercentage: 47, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 1100,
          contentEngagementRate: 38,
          candidatesActivatedIntoPipeline: 5,
          communityToHireConversion: 2,
          aiCommunityTagging: 48,
          humanCommunityModeration: 47,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1.5h",
          recruiterCommunityActionTime: "15h",
          candidateResponseTime: "2.5d",
          outreachFrequencySLA: "Bi-weekly",
          activationWithinSLA: 65,
          contentRefreshWithinSLA: 78,
          communityActivationRate: 12,
          passiveToActiveRate: 9,
          longTermHireRate: 6,
          employerBrandEngagementIndex: 74,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 1100, percentage: 75 },
          { label: "Content Engaged", count: 418, percentage: 38 },
          { label: "Activated into Pipeline", count: 5, percentage: 10 },
          { label: "Converted to Hire", count: 2, percentage: 5 },
        ],
      },
    },
  },
  {
    id: "JOB-008",
    title: "Staff Nurse",
    employer: "Fortis Healthcare",
    employerTier: "enterprise",
    roleType: "nurse",
    geography: "Kolkata",
    status: "active",
    createdAt: "2024-01-24",
    daysOpen: 5,
    funnel: [
      { name: "Candidate Lead", candidates: 420, aiHandled: 395, humanHandled: 25, avgTimeInStage: "8 hours" },
      { name: "Profile Completed", candidates: 345, aiHandled: 330, humanHandled: 15, avgTimeInStage: "1 day" },
      { name: "AI Matched", candidates: 210, aiHandled: 210, humanHandled: 0, avgTimeInStage: "2 hours" },
      { name: "Recruiter Contacted", candidates: 165, aiHandled: 140, humanHandled: 25, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 82, aiHandled: 60, humanHandled: 22, avgTimeInStage: "2 days" },
      { name: "Offer Released", candidates: 35, aiHandled: 12, humanHandled: 23, avgTimeInStage: "1 day" },
      { name: "Placement Confirmed", candidates: 15, aiHandled: 8, humanHandled: 7, avgTimeInStage: "3 days" },
    ],
    aiContribution: 80,
    humanContribution: 20,
    revenue: 380000,
    cost: 95000,
    margin: 75.0,
    hitlEvents: [],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 420, appeared: 345, qualified: 275, disqualified: 50, pending: 20,
        avgResponseTime: "30 mins", handler: "C",
        aiPercentage: 94, humanPercentage: 5, hitlPercentage: 1,
        avgTimeInStage: "8 hours", slaThreshold: "1 day", slaStatus: "green",
        conversionRate: 82.1, dropOffRate: 17.9,
        jobsSwaasaMetrics: {
          jobImpressions: 22500, uniqueCandidateViews: 15800, jobCTR: 4.8,
          saveRate: 16.5, shareRate: 3.8, matchScoreAvg: 74,
          contentQualityScore: 82, aiRankedImpressions: 94,
          manualBoosted: 4, hitlOverrideRate: 1,
        },
        progressFunnel: [
          { label: "Job Published", count: 920, percentage: 100 },
          { label: "Job Indexed", count: 874, percentage: 95 },
          { label: "Job Ranked by AI", count: 782, percentage: 85 },
          { label: "Job Viewed", count: 598, percentage: 65 },
          { label: "Apply Clicked", count: 368, percentage: 40 },
        ],
        seoScore: {
          overall: 88, titleOptimization: 90, descriptionQuality: 85,
          keywordMatch: 86, locationOptimization: 92, mobileReadiness: 88,
        },
      },
      "job-discovery": {
        sent: 420, appeared: 345, qualified: 275, disqualified: 50, pending: 20,
        avgResponseTime: "20 mins", handler: "C",
        aiPercentage: 92, humanPercentage: 6, hitlPercentage: 2,
        avgTimeInStage: "3 hours", slaThreshold: "10 hours", slaStatus: "green",
        conversionRate: 82.1, dropOffRate: 17.9,
        channels: { app: 62, web: 20, whatsapp: 12, jobBoards: 6 },
        jobDiscoveryMetrics: {
          searchSessions: 9200, searchResultCTR: 12.5, filterUsageRate: 55,
          recommendationClickRate: 32.5, aiMatchConfidence: 76,
          top10RelevanceScore: 72, coldStartRate: 3.8,
          searchLatency: "75ms", rankingConfidenceDrift: 0.8,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 9200, percentage: 100 },
          { label: "Results Generated", count: 8740, percentage: 95 },
          { label: "Filters Applied", count: 5060, percentage: 55 },
          { label: "Job Card Viewed", count: 3220, percentage: 35 },
          { label: "Job Opened", count: 1840, percentage: 20 },
          { label: "Interest Clicked", count: 644, percentage: 7 },
        ],
      },
      "expression": {
        sent: 345, appeared: 275, qualified: 210, disqualified: 45, pending: 20,
        avgResponseTime: "45 mins", handler: "C",
        aiPercentage: 90, humanPercentage: 8, hitlPercentage: 2,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 76.4, dropOffRate: 23.6,
        channels: { app: 65, whatsapp: 22, recruiterOutreach: 13 },
        eoiMetrics: {
          eoiClickRate: 52, leadCaptureRate: 92, consentCompletionRate: 98,
          intentScore: 70, fraudDetectionRate: 0.3, duplicateLeadRate: 1.5,
          aiAutoQualified: 90, hitlReviewedLeads: 2,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 644, percentage: 100 },
          { label: "Details Submitted", count: 593, percentage: 92 },
          { label: "Consent Given", count: 580, percentage: 90 },
          { label: "Lead Scored", count: 541, percentage: 84 },
          { label: "Routed to Pipeline", count: 345, percentage: 54 },
        ],
      },
      "prescreen": {
        sent: 210, appeared: 180, qualified: 155, disqualified: 18, pending: 7,
        avgResponseTime: "1.5 hours", handler: "AE",
        aiPercentage: 96, humanPercentage: 2, hitlPercentage: 2,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 86.1, dropOffRate: 13.9,
        preScreenMetrics: {
          questionStartRate: 98, completionRate: 90, knockoutRate: 8,
          passRate: 82, falseRejectionRate: 1.0, resumeParseConfidence: 95,
          aiAutoReject: 6, hitlOverride: 2, manualApproval: 3,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 210, percentage: 100 },
          { label: "Candidate Started", count: 206, percentage: 98 },
          { label: "Questions Completed", count: 189, percentage: 90 },
          { label: "Auto-Scored", count: 183, percentage: 87 },
          { label: "Passed / Failed / Escalated", count: 155, percentage: 74 },
        ],
      },
      "voice-agent": {
        sent: 155, appeared: 140, qualified: 115, disqualified: 18, pending: 7,
        avgResponseTime: "8 mins", handler: "X+",
        aiPercentage: 94, humanPercentage: 4, hitlPercentage: 2,
        avgTimeInStage: "45 mins", slaThreshold: "3 hours", slaStatus: "green",
        conversionRate: 82.1, dropOffRate: 17.9,
        voiceScreeningMetrics: {
          callAttemptRate: 99, callConnectRate: 90, avgCallDuration: "3m 20s",
          aiPassRate: 82, humanPassRate: 80, dropOffDuringCall: 4,
          speechRecognitionConfidence: 95, responseConfidenceScore: 90,
          hiringManagerFitScore: 74, aiFullyScreened: 92,
          hitlReview: 4, humanInterview: 4,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 155, percentage: 100 },
          { label: "Call Dialed", count: 153, percentage: 99 },
          { label: "Call Connected", count: 140, percentage: 90 },
          { label: "Questions Asked", count: 133, percentage: 86 },
          { label: "AI Evaluation Completed", count: 124, percentage: 80 },
          { label: "Final Outcome", count: 115, percentage: 74 },
        ],
      },
      "scheduling": {
        sent: 115, appeared: 98, qualified: 82, disqualified: 12, pending: 4,
        avgResponseTime: "3 hours", handler: "AE",
        aiPercentage: 90, humanPercentage: 8, hitlPercentage: 2,
        avgTimeInStage: "6 hours", slaThreshold: "1 day", slaStatus: "green",
        conversionRate: 83.7, dropOffRate: 16.3,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 115,
          interviewInvitesSent: 98,
          interviewScheduled: 90,
          interviewCompleted: 82,
          noShowRate: 6,
          feedbackSubmitted: 78,
          aiSchedulingPercentage: 90,
          humanSchedulingPercentage: 8,
          hitlApprovalPercentage: 2,
          aiSlotSuggestionTime: "45s",
          recruiterActionTime: "1.5h",
          candidateConfirmationTime: "3h",
          scheduleWithinSLA: 98,
          confirmationWithinSLA: 95,
          feedbackWithinSLA: 92,
          interviewConversionRate: 84,
          timeToInterview: "1.5d",
          interviewToOfferRatio: 58,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 115, percentage: 100 },
          { label: "Interview Invites Sent", count: 98, percentage: 85 },
          { label: "Interview Scheduled", count: 90, percentage: 78 },
          { label: "Interview Completed", count: 82, percentage: 71 },
          { label: "Feedback Submitted", count: 78, percentage: 68 },
        ],
      },
      "silver-med": {
        sent: 18, appeared: 18, qualified: 15, disqualified: 0, pending: 3,
        avgResponseTime: "18 hours", handler: "R",
        aiPercentage: 60, humanPercentage: 35, hitlPercentage: 5,
        avgTimeInStage: "2 days", slaThreshold: "5 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        silverMedalistMetrics: {
          candidatesTagged: 18,
          reEngagementInvitesSent: 15,
          reAppliedToNewJobs: 10,
          conversionToHire: 6,
          aiTaggingRate: 60,
          humanOverrideRate: 35,
          hitlReviewRate: 5,
          aiClassificationTime: "30s",
          recruiterReviewTime: "3h",
          candidateReEngagementResponseTime: "18h",
          taggingWithinSLA: 98,
          reEngagementWithinSLA: 95,
          followUpWithinSLA: 92,
          silverToHireConversionRate: 33,
          talentPoolReuseRate: 48,
          costSavedVsFreshSourcing: 2200,
          candidateRetentionScore: 90,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 18, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 15, percentage: 83 },
          { label: "Re-applied to New Jobs", count: 10, percentage: 56 },
          { label: "Converted to Hire", count: 6, percentage: 33 },
        ],
      },
      "talent-community": {
        sent: 12, appeared: 12, qualified: 12, disqualified: 0, pending: 0,
        avgResponseTime: "8 hours", handler: "C",
        aiPercentage: 78, humanPercentage: 18, hitlPercentage: 4,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 12,
          activeCommunityMembers: 5800,
          contentEngagementRate: 58,
          candidatesActivatedIntoPipeline: 28,
          communityToHireConversion: 8,
          aiCommunityTagging: 78,
          humanCommunityModeration: 18,
          hitlModeration: 4,
          aiEngagementTriggerTime: "30m",
          recruiterCommunityActionTime: "5h",
          candidateResponseTime: "1d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 88,
          contentRefreshWithinSLA: 95,
          communityActivationRate: 28,
          passiveToActiveRate: 22,
          longTermHireRate: 15,
          employerBrandEngagementIndex: 86,
        },
        progressFunnel: [
          { label: "Added to Community", count: 12, percentage: 100 },
          { label: "Active Members", count: 5800, percentage: 88 },
          { label: "Content Engaged", count: 3364, percentage: 58 },
          { label: "Activated into Pipeline", count: 28, percentage: 22 },
          { label: "Converted to Hire", count: 8, percentage: 8 },
        ],
      },
    },
  },
  {
    id: "JOB-009",
    title: "Anesthesiologist",
    employer: "Max Healthcare",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Delhi",
    status: "active",
    createdAt: "2024-01-19",
    daysOpen: 10,
    funnel: [
      { name: "Candidate Lead", candidates: 65, aiHandled: 52, humanHandled: 13, avgTimeInStage: "2 days" },
      { name: "Profile Completed", candidates: 48, aiHandled: 42, humanHandled: 6, avgTimeInStage: "3 days" },
      { name: "AI Matched", candidates: 28, aiHandled: 28, humanHandled: 0, avgTimeInStage: "5 hours" },
      { name: "Recruiter Contacted", candidates: 20, aiHandled: 12, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "Interview Scheduled", candidates: 10, aiHandled: 4, humanHandled: 6, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 4, aiHandled: 1, humanHandled: 3, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 2, aiHandled: 1, humanHandled: 1, avgTimeInStage: "4 days" },
    ],
    aiContribution: 62,
    humanContribution: 38,
    revenue: 1100000,
    cost: 380000,
    margin: 65.5,
    hitlEvents: [],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 65, appeared: 48, qualified: 36, disqualified: 8, pending: 4,
        avgResponseTime: "3 hours", handler: "C",
        aiPercentage: 62, humanPercentage: 32, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 73.8, dropOffRate: 26.2,
        jobsSwaasaMetrics: {
          jobImpressions: 3800, uniqueCandidateViews: 2550, jobCTR: 2.3,
          saveRate: 8.8, shareRate: 1.6, matchScoreAvg: 86,
          contentQualityScore: 91, aiRankedImpressions: 62,
          manualBoosted: 26, hitlOverrideRate: 6,
        },
        progressFunnel: [
          { label: "Job Published", count: 142, percentage: 100 },
          { label: "Job Indexed", count: 135, percentage: 95 },
          { label: "Job Ranked by AI", count: 121, percentage: 85 },
          { label: "Job Viewed", count: 85, percentage: 60 },
          { label: "Apply Clicked", count: 48, percentage: 34 },
        ],
        seoScore: {
          overall: 63, titleOptimization: 60, descriptionQuality: 68,
          keywordMatch: 55, locationOptimization: 70, mobileReadiness: 62,
        },
      },
      "job-discovery": {
        sent: 65, appeared: 48, qualified: 36, disqualified: 8, pending: 4,
        avgResponseTime: "5 hours", handler: "C",
        aiPercentage: 58, humanPercentage: 35, hitlPercentage: 7,
        avgTimeInStage: "10 hours", slaThreshold: "20 hours", slaStatus: "green",
        conversionRate: 73.8, dropOffRate: 26.2,
        channels: { app: 35, web: 38, whatsapp: 15, jobBoards: 12 },
        jobDiscoveryMetrics: {
          searchSessions: 1650, searchResultCTR: 5.8, filterUsageRate: 35,
          recommendationClickRate: 18.5, aiMatchConfidence: 88,
          top10RelevanceScore: 83, coldStartRate: 11.5,
          searchLatency: "175ms", rankingConfidenceDrift: 2.5,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 1650, percentage: 100 },
          { label: "Results Generated", count: 1568, percentage: 95 },
          { label: "Filters Applied", count: 578, percentage: 35 },
          { label: "Job Card Viewed", count: 578, percentage: 35 },
          { label: "Job Opened", count: 330, percentage: 20 },
          { label: "Interest Clicked", count: 116, percentage: 7 },
        ],
      },
      "expression": {
        sent: 48, appeared: 36, qualified: 28, disqualified: 6, pending: 2,
        avgResponseTime: "6 hours", handler: "C",
        aiPercentage: 52, humanPercentage: 42, hitlPercentage: 6,
        avgTimeInStage: "14 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 77.8, dropOffRate: 22.2,
        channels: { app: 38, whatsapp: 28, recruiterOutreach: 34 },
        eoiMetrics: {
          eoiClickRate: 30, leadCaptureRate: 78, consentCompletionRate: 91,
          intentScore: 81, fraudDetectionRate: 0.4, duplicateLeadRate: 2.0,
          aiAutoQualified: 52, hitlReviewedLeads: 12,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 116, percentage: 100 },
          { label: "Details Submitted", count: 99, percentage: 85 },
          { label: "Consent Given", count: 90, percentage: 78 },
          { label: "Lead Scored", count: 81, percentage: 70 },
          { label: "Routed to Pipeline", count: 48, percentage: 41 },
        ],
      },
      "prescreen": {
        sent: 28, appeared: 22, qualified: 16, disqualified: 4, pending: 2,
        avgResponseTime: "10 hours", handler: "AE",
        aiPercentage: 72, humanPercentage: 22, hitlPercentage: 6,
        avgTimeInStage: "6 hours", slaThreshold: "14 hours", slaStatus: "green",
        conversionRate: 72.7, dropOffRate: 27.3,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 75, knockoutRate: 22,
          passRate: 58, falseRejectionRate: 3.5, resumeParseConfidence: 84,
          aiAutoReject: 18, hitlOverride: 6, manualApproval: 10,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 28, percentage: 100 },
          { label: "Candidate Started", count: 25, percentage: 89 },
          { label: "Questions Completed", count: 21, percentage: 75 },
          { label: "Auto-Scored", count: 19, percentage: 68 },
          { label: "Passed / Failed / Escalated", count: 16, percentage: 57 },
        ],
      },
      "voice-agent": {
        sent: 16, appeared: 13, qualified: 10, disqualified: 2, pending: 1,
        avgResponseTime: "25 mins", handler: "X+",
        aiPercentage: 68, humanPercentage: 24, hitlPercentage: 8,
        avgTimeInStage: "3 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 76.9, dropOffRate: 23.1,
        voiceScreeningMetrics: {
          callAttemptRate: 92, callConnectRate: 81, avgCallDuration: "5m 40s",
          aiPassRate: 68, humanPassRate: 85, dropOffDuringCall: 10,
          speechRecognitionConfidence: 86, responseConfidenceScore: 82,
          hiringManagerFitScore: 83, aiFullyScreened: 62,
          hitlReview: 18, humanInterview: 20,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 16, percentage: 100 },
          { label: "Call Dialed", count: 15, percentage: 94 },
          { label: "Call Connected", count: 13, percentage: 81 },
          { label: "Questions Asked", count: 12, percentage: 75 },
          { label: "AI Evaluation Completed", count: 11, percentage: 69 },
          { label: "Final Outcome", count: 10, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 10, appeared: 8, qualified: 5, disqualified: 2, pending: 1,
        avgResponseTime: "12 hours", handler: "AE",
        aiPercentage: 55, humanPercentage: 40, hitlPercentage: 5,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 62.5, dropOffRate: 37.5,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 10,
          interviewInvitesSent: 8,
          interviewScheduled: 7,
          interviewCompleted: 5,
          noShowRate: 15,
          feedbackSubmitted: 4,
          aiSchedulingPercentage: 55,
          humanSchedulingPercentage: 40,
          hitlApprovalPercentage: 5,
          aiSlotSuggestionTime: "4m",
          recruiterActionTime: "8h",
          candidateConfirmationTime: "12h",
          scheduleWithinSLA: 75,
          confirmationWithinSLA: 68,
          feedbackWithinSLA: 62,
          interviewConversionRate: 63,
          timeToInterview: "4d",
          interviewToOfferRatio: 40,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 10, percentage: 100 },
          { label: "Interview Invites Sent", count: 8, percentage: 80 },
          { label: "Interview Scheduled", count: 7, percentage: 70 },
          { label: "Interview Completed", count: 5, percentage: 50 },
          { label: "Feedback Submitted", count: 4, percentage: 40 },
        ],
      },
      "silver-med": {
        sent: 3, appeared: 3, qualified: 2, disqualified: 0, pending: 1,
        avgResponseTime: "3 days", handler: "R",
        aiPercentage: 25, humanPercentage: 70, hitlPercentage: 5,
        avgTimeInStage: "8 days", slaThreshold: "18 days", slaStatus: "green",
        conversionRate: 66.7, dropOffRate: 33.3,
        silverMedalistMetrics: {
          candidatesTagged: 3,
          reEngagementInvitesSent: 2,
          reAppliedToNewJobs: 1,
          conversionToHire: 1,
          aiTaggingRate: 25,
          humanOverrideRate: 70,
          hitlReviewRate: 5,
          aiClassificationTime: "2m",
          recruiterReviewTime: "18h",
          candidateReEngagementResponseTime: "3d",
          taggingWithinSLA: 85,
          reEngagementWithinSLA: 78,
          followUpWithinSLA: 72,
          silverToHireConversionRate: 33,
          talentPoolReuseRate: 32,
          costSavedVsFreshSourcing: 1200,
          candidateRetentionScore: 77,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 3, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 2, percentage: 67 },
          { label: "Re-applied to New Jobs", count: 1, percentage: 33 },
          { label: "Converted to Hire", count: 1, percentage: 33 },
        ],
      },
      "talent-community": {
        sent: 1, appeared: 1, qualified: 1, disqualified: 0, pending: 0,
        avgResponseTime: "2 days", handler: "C",
        aiPercentage: 48, humanPercentage: 47, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 1,
          activeCommunityMembers: 920,
          contentEngagementRate: 36,
          candidatesActivatedIntoPipeline: 4,
          communityToHireConversion: 1,
          aiCommunityTagging: 48,
          humanCommunityModeration: 47,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1.5h",
          recruiterCommunityActionTime: "15h",
          candidateResponseTime: "2.5d",
          outreachFrequencySLA: "Bi-weekly",
          activationWithinSLA: 65,
          contentRefreshWithinSLA: 78,
          communityActivationRate: 11,
          passiveToActiveRate: 8,
          longTermHireRate: 5,
          employerBrandEngagementIndex: 73,
        },
        progressFunnel: [
          { label: "Added to Community", count: 1, percentage: 100 },
          { label: "Active Members", count: 920, percentage: 74 },
          { label: "Content Engaged", count: 331, percentage: 36 },
          { label: "Activated into Pipeline", count: 4, percentage: 9 },
          { label: "Converted to Hire", count: 1, percentage: 4 },
        ],
      },
    },
  },
  {
    id: "JOB-010",
    title: "Medical Officer",
    employer: "Narayana Health",
    employerTier: "mid-market",
    roleType: "doctor",
    geography: "Bangalore",
    status: "active",
    createdAt: "2024-01-12",
    daysOpen: 17,
    funnel: [
      { name: "Candidate Lead", candidates: 132, aiHandled: 115, humanHandled: 17, avgTimeInStage: "2 days" },
      { name: "Profile Completed", candidates: 98, aiHandled: 88, humanHandled: 10, avgTimeInStage: "3 days" },
      { name: "AI Matched", candidates: 58, aiHandled: 58, humanHandled: 0, avgTimeInStage: "4 hours" },
      { name: "Recruiter Contacted", candidates: 42, aiHandled: 30, humanHandled: 12, avgTimeInStage: "2 days" },
      { name: "Interview Scheduled", candidates: 22, aiHandled: 10, humanHandled: 12, avgTimeInStage: "5 days" },
      { name: "Offer Released", candidates: 10, aiHandled: 3, humanHandled: 7, avgTimeInStage: "4 days" },
      { name: "Placement Confirmed", candidates: 4, aiHandled: 2, humanHandled: 2, avgTimeInStage: "6 days" },
    ],
    aiContribution: 70,
    humanContribution: 30,
    revenue: 560000,
    cost: 195000,
    margin: 65.2,
    hitlEvents: [
      { id: "evt-008", type: "review", reason: "SLA breach risk - scheduling delays", assignee: "Ananya Patel", resolution: "Expedited scheduling", duration: "3 hours", timestamp: "2 days ago" },
    ],
    workflowId: "wf-003",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 132, appeared: 98, qualified: 75, disqualified: 17, pending: 6,
        avgResponseTime: "2.5 hours", handler: "C",
        aiPercentage: 72, humanPercentage: 23, hitlPercentage: 5,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "amber",
        conversionRate: 74.2, dropOffRate: 25.8,
        jobsSwaasaMetrics: {
          jobImpressions: 7200, uniqueCandidateViews: 4850, jobCTR: 2.8,
          saveRate: 10.5, shareRate: 1.9, matchScoreAvg: 80,
          contentQualityScore: 85, aiRankedImpressions: 72,
          manualBoosted: 18, hitlOverrideRate: 5,
        },
        progressFunnel: [
          { label: "Job Published", count: 285, percentage: 100 },
          { label: "Job Indexed", count: 271, percentage: 95 },
          { label: "Job Ranked by AI", count: 242, percentage: 85 },
          { label: "Job Viewed", count: 171, percentage: 60 },
          { label: "Apply Clicked", count: 97, percentage: 34 },
        ],
        seoScore: {
          overall: 76, titleOptimization: 78, descriptionQuality: 74,
          keywordMatch: 70, locationOptimization: 80, mobileReadiness: 78,
        },
      },
      "job-discovery": {
        sent: 132, appeared: 98, qualified: 75, disqualified: 17, pending: 6,
        avgResponseTime: "4 hours", handler: "C",
        aiPercentage: 68, humanPercentage: 26, hitlPercentage: 6,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 74.2, dropOffRate: 25.8,
        channels: { app: 42, web: 32, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 3450, searchResultCTR: 7.5, filterUsageRate: 40,
          recommendationClickRate: 22.5, aiMatchConfidence: 82,
          top10RelevanceScore: 78, coldStartRate: 8.8,
          searchLatency: "145ms", rankingConfidenceDrift: 2.0,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3450, percentage: 100 },
          { label: "Results Generated", count: 3278, percentage: 95 },
          { label: "Filters Applied", count: 1380, percentage: 40 },
          { label: "Job Card Viewed", count: 1208, percentage: 35 },
          { label: "Job Opened", count: 690, percentage: 20 },
          { label: "Interest Clicked", count: 242, percentage: 7 },
        ],
      },
      "expression": {
        sent: 98, appeared: 75, qualified: 58, disqualified: 12, pending: 5,
        avgResponseTime: "5 hours", handler: "C",
        aiPercentage: 62, humanPercentage: 32, hitlPercentage: 6,
        avgTimeInStage: "15 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 77.3, dropOffRate: 22.7,
        channels: { app: 45, whatsapp: 30, recruiterOutreach: 25 },
        eoiMetrics: {
          eoiClickRate: 35, leadCaptureRate: 82, consentCompletionRate: 93,
          intentScore: 76, fraudDetectionRate: 0.5, duplicateLeadRate: 2.5,
          aiAutoQualified: 62, hitlReviewedLeads: 10,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 242, percentage: 100 },
          { label: "Details Submitted", count: 211, percentage: 87 },
          { label: "Consent Given", count: 196, percentage: 81 },
          { label: "Lead Scored", count: 176, percentage: 73 },
          { label: "Routed to Pipeline", count: 98, percentage: 40 },
        ],
      },
      "prescreen": {
        sent: 58, appeared: 46, qualified: 35, disqualified: 8, pending: 3,
        avgResponseTime: "8 hours", handler: "AE",
        aiPercentage: 78, humanPercentage: 17, hitlPercentage: 5,
        avgTimeInStage: "6 hours", slaThreshold: "14 hours", slaStatus: "green",
        conversionRate: 76.1, dropOffRate: 23.9,
        preScreenMetrics: {
          questionStartRate: 90, completionRate: 78, knockoutRate: 18,
          passRate: 62, falseRejectionRate: 2.8, resumeParseConfidence: 87,
          aiAutoReject: 14, hitlOverride: 5, manualApproval: 8,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 58, percentage: 100 },
          { label: "Candidate Started", count: 52, percentage: 90 },
          { label: "Questions Completed", count: 45, percentage: 78 },
          { label: "Auto-Scored", count: 42, percentage: 72 },
          { label: "Passed / Failed / Escalated", count: 35, percentage: 60 },
        ],
      },
      "voice-agent": {
        sent: 35, appeared: 29, qualified: 22, disqualified: 5, pending: 2,
        avgResponseTime: "18 mins", handler: "X+",
        aiPercentage: 75, humanPercentage: 18, hitlPercentage: 7,
        avgTimeInStage: "2.5 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 75.9, dropOffRate: 24.1,
        voiceScreeningMetrics: {
          callAttemptRate: 94, callConnectRate: 83, avgCallDuration: "5m 10s",
          aiPassRate: 75, humanPassRate: 82, dropOffDuringCall: 8,
          speechRecognitionConfidence: 89, responseConfidenceScore: 84,
          hiringManagerFitScore: 79, aiFullyScreened: 70,
          hitlReview: 14, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 35, percentage: 100 },
          { label: "Call Dialed", count: 33, percentage: 94 },
          { label: "Call Connected", count: 29, percentage: 83 },
          { label: "Questions Asked", count: 27, percentage: 77 },
          { label: "AI Evaluation Completed", count: 24, percentage: 69 },
          { label: "Final Outcome", count: 22, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 22, appeared: 18, qualified: 12, disqualified: 4, pending: 2,
        avgResponseTime: "10 hours", handler: "AE",
        aiPercentage: 62, humanPercentage: 32, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "amber",
        conversionRate: 66.7, dropOffRate: 33.3,
        delayCause: "Human Backlog",
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 22,
          interviewInvitesSent: 18,
          interviewScheduled: 15,
          interviewCompleted: 12,
          noShowRate: 15,
          feedbackSubmitted: 10,
          aiSchedulingPercentage: 62,
          humanSchedulingPercentage: 32,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "3m",
          recruiterActionTime: "7h",
          candidateConfirmationTime: "10h",
          scheduleWithinSLA: 78,
          confirmationWithinSLA: 72,
          feedbackWithinSLA: 65,
          interviewConversionRate: 67,
          timeToInterview: "5d",
          interviewToOfferRatio: 38,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 22, percentage: 100 },
          { label: "Interview Invites Sent", count: 18, percentage: 82 },
          { label: "Interview Scheduled", count: 15, percentage: 68 },
          { label: "Interview Completed", count: 12, percentage: 55 },
          { label: "Feedback Submitted", count: 10, percentage: 45 },
        ],
      },
      "silver-med": {
        sent: 6, appeared: 6, qualified: 5, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 38, humanPercentage: 57, hitlPercentage: 5,
        avgTimeInStage: "6 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        silverMedalistMetrics: {
          candidatesTagged: 6,
          reEngagementInvitesSent: 5,
          reAppliedToNewJobs: 3,
          conversionToHire: 2,
          aiTaggingRate: 38,
          humanOverrideRate: 57,
          hitlReviewRate: 5,
          aiClassificationTime: "1.5m",
          recruiterReviewTime: "12h",
          candidateReEngagementResponseTime: "2d",
          taggingWithinSLA: 90,
          reEngagementWithinSLA: 85,
          followUpWithinSLA: 78,
          silverToHireConversionRate: 33,
          talentPoolReuseRate: 38,
          costSavedVsFreshSourcing: 1400,
          candidateRetentionScore: 80,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 6, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 5, percentage: 83 },
          { label: "Re-applied to New Jobs", count: 3, percentage: 50 },
          { label: "Converted to Hire", count: 2, percentage: 33 },
        ],
      },
      "talent-community": {
        sent: 3, appeared: 3, qualified: 3, disqualified: 0, pending: 0,
        avgResponseTime: "1.5 days", handler: "C",
        aiPercentage: 58, humanPercentage: 37, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 3,
          activeCommunityMembers: 1800,
          contentEngagementRate: 42,
          candidatesActivatedIntoPipeline: 8,
          communityToHireConversion: 3,
          aiCommunityTagging: 58,
          humanCommunityModeration: 37,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "12h",
          candidateResponseTime: "2d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 72,
          contentRefreshWithinSLA: 85,
          communityActivationRate: 16,
          passiveToActiveRate: 12,
          longTermHireRate: 8,
          employerBrandEngagementIndex: 77,
        },
        progressFunnel: [
          { label: "Added to Community", count: 3, percentage: 100 },
          { label: "Active Members", count: 1800, percentage: 78 },
          { label: "Content Engaged", count: 756, percentage: 42 },
          { label: "Activated into Pipeline", count: 8, percentage: 14 },
          { label: "Converted to Hire", count: 3, percentage: 6 },
        ],
      },
    },
  },
  {
    id: "JOB-017",
    title: "Nurse",
    employer: "Bhrungi Hospitals",
    employerTier: "enterprise",
    roleType: "nurse",
    geography: "Hyderabad",
    status: "active",
    createdAt: "2024-01-22",
    daysOpen: 8,
    funnel: [
      { name: "Candidate Lead", candidates: 180, aiHandled: 162, humanHandled: 18, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 142, aiHandled: 130, humanHandled: 12, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 88, aiHandled: 88, humanHandled: 0, avgTimeInStage: "5 hours" },
      { name: "Recruiter Contacted", candidates: 64, aiHandled: 45, humanHandled: 19, avgTimeInStage: "1.5 days" },
      { name: "Interview Scheduled", candidates: 38, aiHandled: 16, humanHandled: 22, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 10, aiHandled: 2, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 4, aiHandled: 1, humanHandled: 3, avgTimeInStage: "5 days" },
    ],
    aiContribution: 70,
    humanContribution: 30,
    revenue: 320000,
    cost: 95000,
    margin: 70.3,
    hitlEvents: [
      { id: "evt-017", type: "review", reason: "Enterprise employer review", assignee: "Priya Sharma", resolution: "Approved", duration: "3 hours", timestamp: "2 days ago" },
    ],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 180, appeared: 142, qualified: 120, disqualified: 15, pending: 7,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 84, humanPercentage: 12, hitlPercentage: 4,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 78.9, dropOffRate: 21.1,
        jobsSwaasaMetrics: {
          jobImpressions: 9200, uniqueCandidateViews: 5800, jobCTR: 3.0,
          saveRate: 11.2, shareRate: 1.8, matchScoreAvg: 80,
          contentQualityScore: 86, aiRankedImpressions: 84,
          manualBoosted: 12, hitlOverrideRate: 4,
        },
        progressFunnel: [
          { label: "Job Published", count: 380, percentage: 100 },
          { label: "Job Indexed", count: 361, percentage: 95 },
          { label: "Job Ranked by AI", count: 323, percentage: 85 },
          { label: "Job Viewed", count: 228, percentage: 60 },
          { label: "Apply Clicked", count: 142, percentage: 37 },
        ],
        seoScore: {
          overall: 84, titleOptimization: 86, descriptionQuality: 82,
          keywordMatch: 80, locationOptimization: 88, mobileReadiness: 84,
        },
      },
      "job-discovery": {
        sent: 180, appeared: 142, qualified: 120, disqualified: 15, pending: 7,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 76, humanPercentage: 20, hitlPercentage: 4,
        avgTimeInStage: "7 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 78.9, dropOffRate: 21.1,
        channels: { app: 42, web: 32, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 3400, searchResultCTR: 8.2, filterUsageRate: 41,
          recommendationClickRate: 22.0, aiMatchConfidence: 81,
          top10RelevanceScore: 75, coldStartRate: 7.5,
          searchLatency: "125ms", rankingConfidenceDrift: 2.0,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3400, percentage: 100 },
          { label: "Results Generated", count: 3230, percentage: 95 },
          { label: "Filters Applied", count: 1394, percentage: 41 },
          { label: "Job Card Viewed", count: 1190, percentage: 35 },
          { label: "Job Opened", count: 680, percentage: 20 },
          { label: "Interest Clicked", count: 238, percentage: 7 },
        ],
      },
      "expression": {
        sent: 142, appeared: 120, qualified: 88, disqualified: 22, pending: 10,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 68, humanPercentage: 28, hitlPercentage: 4,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 73.3, dropOffRate: 26.7,
        channels: { app: 48, whatsapp: 30, recruiterOutreach: 22 },
        eoiMetrics: {
          eoiClickRate: 36, leadCaptureRate: 80, consentCompletionRate: 93,
          intentScore: 74, fraudDetectionRate: 1.0, duplicateLeadRate: 3.8,
          aiAutoQualified: 68, hitlReviewedLeads: 7,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 238, percentage: 100 },
          { label: "Details Submitted", count: 209, percentage: 88 },
          { label: "Consent Given", count: 198, percentage: 83 },
          { label: "Lead Scored", count: 181, percentage: 76 },
          { label: "Routed to Pipeline", count: 142, percentage: 60 },
        ],
      },
      "prescreen": {
        sent: 88, appeared: 68, qualified: 48, disqualified: 14, pending: 6,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 90, humanPercentage: 6, hitlPercentage: 4,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 70.6, dropOffRate: 29.4,
        preScreenMetrics: {
          questionStartRate: 90, completionRate: 77, knockoutRate: 16,
          passRate: 71, falseRejectionRate: 2.2, resumeParseConfidence: 88,
          aiAutoReject: 13, hitlOverride: 4, manualApproval: 8,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 88, percentage: 100 },
          { label: "Candidate Started", count: 79, percentage: 90 },
          { label: "Questions Completed", count: 68, percentage: 77 },
          { label: "Auto-Scored", count: 64, percentage: 73 },
          { label: "Passed / Failed / Escalated", count: 48, percentage: 55 },
        ],
      },
      "voice-agent": {
        sent: 48, appeared: 40, qualified: 30, disqualified: 7, pending: 3,
        avgResponseTime: "15 mins", handler: "X+",
        aiPercentage: 86, humanPercentage: 8, hitlPercentage: 6,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        voiceScreeningMetrics: {
          callAttemptRate: 94, callConnectRate: 83, avgCallDuration: "4m 20s",
          aiPassRate: 72, humanPassRate: 80, dropOffDuringCall: 8,
          speechRecognitionConfidence: 90, responseConfidenceScore: 84,
          hiringManagerFitScore: 77, aiFullyScreened: 72,
          hitlReview: 12, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 48, percentage: 100 },
          { label: "Call Dialed", count: 45, percentage: 94 },
          { label: "Call Connected", count: 40, percentage: 83 },
          { label: "Questions Asked", count: 37, percentage: 77 },
          { label: "AI Evaluation Completed", count: 34, percentage: 71 },
          { label: "Final Outcome", count: 30, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 30, appeared: 25, qualified: 18, disqualified: 5, pending: 2,
        avgResponseTime: "6 hours", handler: "AE",
        aiPercentage: 74, humanPercentage: 20, hitlPercentage: 6,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 72.0, dropOffRate: 28.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 38,
          interviewInvitesSent: 30,
          interviewScheduled: 25,
          interviewCompleted: 18,
          noShowRate: 12,
          feedbackSubmitted: 15,
          aiSchedulingPercentage: 74,
          humanSchedulingPercentage: 20,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "4h",
          candidateConfirmationTime: "6h",
          scheduleWithinSLA: 88,
          confirmationWithinSLA: 84,
          feedbackWithinSLA: 78,
          interviewConversionRate: 72,
          timeToInterview: "3d",
          interviewToOfferRatio: 45,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 38, percentage: 100 },
          { label: "Interview Invites Sent", count: 30, percentage: 79 },
          { label: "Interview Scheduled", count: 25, percentage: 66 },
          { label: "Interview Completed", count: 18, percentage: 47 },
          { label: "Feedback Submitted", count: 15, percentage: 39 },
        ],
      },
      "silver-med": {
        sent: 5, appeared: 5, qualified: 4, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 70, humanPercentage: 25, hitlPercentage: 5,
        avgTimeInStage: "5 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        silverMedalistMetrics: {
          candidatesTagged: 5,
          reEngagementInvitesSent: 4,
          reAppliedToNewJobs: 3,
          conversionToHire: 1,
          aiTaggingRate: 70,
          humanOverrideRate: 25,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "8h",
          candidateReEngagementResponseTime: "2d",
          taggingWithinSLA: 92,
          reEngagementWithinSLA: 86,
          followUpWithinSLA: 80,
          silverToHireConversionRate: 20,
          talentPoolReuseRate: 32,
          costSavedVsFreshSourcing: 1100,
          candidateRetentionScore: 81,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 5, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 4, percentage: 80 },
          { label: "Re-applied to New Jobs", count: 3, percentage: 60 },
          { label: "Converted to Hire", count: 1, percentage: 20 },
        ],
      },
      "talent-community": {
        sent: 3, appeared: 3, qualified: 3, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 62, humanPercentage: 33, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 3,
          activeCommunityMembers: 2600,
          contentEngagementRate: 44,
          candidatesActivatedIntoPipeline: 10,
          communityToHireConversion: 3,
          aiCommunityTagging: 62,
          humanCommunityModeration: 33,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "12h",
          candidateResponseTime: "2d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 70,
          contentRefreshWithinSLA: 84,
          communityActivationRate: 14,
          passiveToActiveRate: 11,
          longTermHireRate: 7,
          employerBrandEngagementIndex: 76,
        },
        progressFunnel: [
          { label: "Added to Community", count: 3, percentage: 100 },
          { label: "Active Members", count: 2600, percentage: 78 },
          { label: "Content Engaged", count: 1144, percentage: 44 },
          { label: "Activated into Pipeline", count: 10, percentage: 10 },
          { label: "Converted to Hire", count: 1, percentage: 3 },
        ],
      },
    },
  },
];

// Aggregate funnel data with AI/Human split
export const aggregateFunnelData = [
  { name: "Candidate Lead", total: 1078, ai: 882, human: 196 },
  { name: "Profile Completed", total: 830, ai: 770, human: 60 },
  { name: "AI Matched", total: 505, ai: 505, human: 0 },
  { name: "Recruiter Contacted", total: 366, ai: 274, human: 92 },
  { name: "Interview Scheduled", total: 177, ai: 98, human: 79 },
  { name: "Offer Released", total: 70, ai: 16, human: 54 },
  { name: "Placement Confirmed", total: 29, ai: 11, human: 18 },
];

// ============================================
// HITL Rule Engine V2 Data Models
// ============================================

export type RuleType = "confidence" | "business" | "anomaly" | "sla" | "posting" | "sourcing" | "outreach" | "interview" | "application" | "screening";
export type HiringStage = "cross_stage" | "job_posting" | "sourcing" | "outreach" | "application" | "screening" | "interview";
export type AutomationActionType = "screen" | "match" | "outreach" | "schedule" | "notify";

export interface StageAutomation {
  stageId: string;
  stageName: string;
  assignedAgentId: string | null;
  actionType: AutomationActionType;
  confidenceThreshold: number;
  escalationTarget: string;
  enabled: boolean;
  integrations: {
    connectorId: string;
    trigger: string;
    action: string;
  }[];
}
export type OperatorType = ">" | "<" | "=" | ">=" | "<=" | "!=";
export type ActionType = "route_to_queue" | "alert" | "escalate" | "block" | "route_to_ai_agent" | "trigger_automation" | "retry_with_fallback";
export type TargetQueue = "recruiter_review" | "ops_escalation" | "enterprise_priority" | "content_hitl" | "ops_admin_hitl" | "human_sourcer_hitl" | "qa_hitl" | "compliance_hitl" | "hiring_manager_hitl" | "human_screening_pool" | "outreach_hitl" | "recruiter_hitl";
export type RuleStatus = "active" | "paused" | "draft";
export type TaskStatus = "pending" | "assigned" | "in_review" | "approved" | "rejected" | "escalated";
export type TaskPriority = "high" | "medium" | "low";
export type AuditEventType = "rule_triggered" | "task_created" | "task_assigned" | "task_resolved" | "task_escalated";

export interface HITLRuleV2 {
  id: string;
  name: string;
  description: string;
  ruleType: RuleType;
  stage: HiringStage;
  conditionMetric: string;
  operator: OperatorType;
  thresholdValue: string | number;
  actionType: ActionType;
  targetQueue: TargetQueue;
  priority: 1 | 2 | 3 | 4 | 5;
  status: RuleStatus;
  triggerCount: number;
  lastTriggered: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  version: number;
}

export interface HITLTask {
  id: string;
  ruleId: string;
  ruleName: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  aiAgentId: string | null;
  aiDecision: string;
  confidenceScore: number;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string | null;
  assignedAt: string | null;
  resolution: string | null;
  resolvedAt: string | null;
  dueAt: string | null;
  createdAt: string;
  metadata: Record<string, string | number>;
}

export interface HITLAuditLog {
  id: string;
  ruleId: string;
  ruleName: string;
  taskId: string;
  eventType: AuditEventType;
  actor: string;
  details: string;
  snapshot: Record<string, string | number>;
  timestamp: string;
}

export interface SimulationResult {
  ruleId: string;
  totalCandidates: number;
  matchedCandidates: number;
  routingPercentage: number;
  sampleMatches: Array<{ candidateId: string; jobId: string; score: number }>;
}

// Condition metrics by rule type
export const conditionMetrics: Record<RuleType, { value: string; label: string }[]> = {
  confidence: [
    { value: "ai_confidence", label: "AI Confidence Score" },
    { value: "match_confidence", label: "Match Confidence" },
    { value: "interview_prediction", label: "Interview Prediction Score" },
  ],
  business: [
    { value: "employer_tier", label: "Employer Tier" },
    { value: "role_type", label: "Role Type" },
    { value: "role_level", label: "Role Level" },
    { value: "salary_range", label: "Salary Range" },
  ],
  anomaly: [
    { value: "drop_off_rate", label: "Drop-off Rate (%)" },
    { value: "response_rate", label: "Response Rate (%)" },
    { value: "conversion_rate", label: "Conversion Rate (%)" },
  ],
  sla: [
    { value: "time_to_interview", label: "Time to Interview (hours)" },
    { value: "time_in_stage", label: "Time in Stage (hours)" },
    { value: "days_open", label: "Days Open" },
  ],
  posting: [
    { value: "time_to_publish", label: "Time to Publish (mins)" },
    { value: "jd_completeness", label: "JD Completeness (%)" },
    { value: "channel_distribution_failures", label: "Channel Distribution Failures" },
  ],
  sourcing: [
    { value: "sourced_candidates_24h", label: "Sourced Candidates (24h)" },
    { value: "ai_fit_score", label: "AI Fit Score" },
    { value: "spam_duplicate_rate", label: "Spam/Duplicate Rate (%)" },
  ],
  outreach: [
    { value: "delivery_failure_rate", label: "Delivery Failure Rate (%)" },
    { value: "response_rate", label: "Response Rate (%)" },
    { value: "sentiment_score", label: "Candidate Sentiment Score" },
    { value: "optout_rate", label: "Opt-out Rate (%)" },
  ],
  interview: [
    { value: "time_since_screening", label: "Time Since Screening (hours)" },
    { value: "no_show_rate", label: "No-Show Rate (%)" },
    { value: "feedback_delay", label: "Feedback Delay (hours)" },
    { value: "scheduling_failed", label: "Scheduling Failed" },
  ],
  application: [
    { value: "application_conversion_rate", label: "Application Conversion (%)" },
    { value: "incomplete_application_rate", label: "Incomplete Applications (%)" },
    { value: "fraud_risk_score", label: "Fraud Risk Score" },
  ],
  screening: [
    { value: "screening_confidence", label: "Screening AI Confidence" },
    { value: "rejection_rate", label: "Rejection Rate (%)" },
    { value: "screening_time", label: "Screening Time (hours)" },
  ],
};

export const operators: { value: OperatorType; label: string }[] = [
  { value: "<", label: "Less than" },
  { value: "<=", label: "Less than or equal" },
  { value: "=", label: "Equals" },
  { value: "!=", label: "Not equals" },
  { value: ">", label: "Greater than" },
  { value: ">=", label: "Greater than or equal" },
];

export const actionTypes: { value: ActionType; label: string }[] = [
  { value: "route_to_queue", label: "Route to Queue" },
  { value: "alert", label: "Send Alert" },
  { value: "escalate", label: "Escalate to Manager" },
  { value: "block", label: "Block Action" },
  { value: "route_to_ai_agent", label: "Route to AI Agent" },
  { value: "trigger_automation", label: "Trigger Automation" },
  { value: "retry_with_fallback", label: "Retry with Fallback" },
];

export const targetQueues: { value: TargetQueue; label: string }[] = [
  { value: "recruiter_review", label: "Recruiter Review Queue" },
  { value: "ops_escalation", label: "Ops Escalation Queue" },
  { value: "enterprise_priority", label: "Enterprise Priority Queue" },
  { value: "content_hitl", label: "Content HITL Queue" },
  { value: "ops_admin_hitl", label: "Ops Admin HITL Queue" },
  { value: "human_sourcer_hitl", label: "Human Sourcer HITL Queue" },
  { value: "qa_hitl", label: "QA HITL Queue" },
  { value: "compliance_hitl", label: "Compliance HITL Queue" },
  { value: "hiring_manager_hitl", label: "Hiring Manager HITL Queue" },
  { value: "human_screening_pool", label: "Human Screening Pool" },
  { value: "outreach_hitl", label: "Outreach HITL Queue" },
  { value: "recruiter_hitl", label: "Recruiter HITL Queue" },
];

// Extended HITL Rules with full structure
export const hitlRulesV2: HITLRuleV2[] = [
  {
    id: "rule-001",
    name: "Low AI Confidence",
    description: "Route candidates with low AI match confidence for human review",
    ruleType: "confidence",
    stage: "cross_stage",
    conditionMetric: "ai_confidence",
    operator: "<",
    thresholdValue: 0.7,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 1,
    status: "active",
    triggerCount: 342,
    lastTriggered: "10 mins ago",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-28",
    createdBy: "Saroj",
    version: 3,
  },
  {
    id: "rule-002",
    name: "Enterprise Employer",
    description: "All enterprise employer candidates require mandatory human review",
    ruleType: "business",
    stage: "cross_stage",
    conditionMetric: "employer_tier",
    operator: "=",
    thresholdValue: "enterprise",
    actionType: "route_to_queue",
    targetQueue: "enterprise_priority",
    priority: 1,
    status: "active",
    triggerCount: 189,
    lastTriggered: "25 mins ago",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-20",
    createdBy: "Priya",
    version: 2,
  },
  {
    id: "rule-003",
    name: "Senior Doctor Roles",
    description: "Senior doctor positions need specialized recruiter attention",
    ruleType: "business",
    stage: "cross_stage",
    conditionMetric: "role_level",
    operator: "=",
    thresholdValue: "senior",
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 2,
    status: "active",
    triggerCount: 114,
    lastTriggered: "2 hours ago",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-15",
    createdBy: "Rahul",
    version: 1,
  },
  {
    id: "rule-004",
    name: "High Drop-off Alert",
    description: "Alert ops team when funnel drop-off exceeds threshold",
    ruleType: "anomaly",
    stage: "cross_stage",
    conditionMetric: "drop_off_rate",
    operator: ">",
    thresholdValue: 40,
    actionType: "alert",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 28,
    lastTriggered: "1 day ago",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-22",
    createdBy: "Ananya",
    version: 2,
  },
  {
    id: "rule-005",
    name: "Interview Scheduling SLA",
    description: "Escalate if interview not scheduled within 48 hours",
    ruleType: "sla",
    stage: "cross_stage",
    conditionMetric: "time_to_interview",
    operator: ">",
    thresholdValue: 48,
    actionType: "escalate",
    targetQueue: "ops_escalation",
    priority: 3,
    status: "active",
    triggerCount: 56,
    lastTriggered: "4 hours ago",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-18",
    createdBy: "Vikram",
    version: 1,
  },
  {
    id: "rule-006",
    name: "Low Response Rate",
    description: "Trigger human outreach when AI response rate is below threshold",
    ruleType: "anomaly",
    stage: "cross_stage",
    conditionMetric: "response_rate",
    operator: "<",
    thresholdValue: 5,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 3,
    status: "paused",
    triggerCount: 22,
    lastTriggered: "3 days ago",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-25",
    createdBy: "Deepa",
    version: 1,
  },
  {
    id: "rule-007",
    name: "High Salary Negotiation",
    description: "Senior recruiter review for offers exceeding salary threshold",
    ruleType: "business",
    stage: "cross_stage",
    conditionMetric: "salary_range",
    operator: ">",
    thresholdValue: 2500000,
    actionType: "route_to_queue",
    targetQueue: "enterprise_priority",
    priority: 2,
    status: "active",
    triggerCount: 34,
    lastTriggered: "6 hours ago",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-26",
    createdBy: "Saroj",
    version: 1,
  },
  {
    id: "rule-008",
    name: "Match Confidence Warning",
    description: "Flag candidates with moderate match confidence for review",
    ruleType: "confidence",
    stage: "cross_stage",
    conditionMetric: "match_confidence",
    operator: "<",
    thresholdValue: 0.75,
    actionType: "alert",
    targetQueue: "recruiter_review",
    priority: 4,
    status: "draft",
    triggerCount: 0,
    lastTriggered: null,
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Priya",
    version: 1,
  },
  // PRD Rule Types - Posting
  {
    id: "rule-009",
    name: "Job Posting Delay",
    description: "Escalate if job not published within 10 minutes",
    ruleType: "posting",
    stage: "job_posting",
    conditionMetric: "time_to_publish",
    operator: ">",
    thresholdValue: 10,
    actionType: "escalate",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 45,
    lastTriggered: "30 mins ago",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-28",
    createdBy: "Saroj",
    version: 1,
  },
  {
    id: "rule-010",
    name: "Low JD Completeness",
    description: "Flag jobs with incomplete job descriptions",
    ruleType: "posting",
    stage: "job_posting",
    conditionMetric: "jd_completeness",
    operator: "<",
    thresholdValue: 80,
    actionType: "route_to_queue",
    targetQueue: "ops_escalation",
    priority: 3,
    status: "active",
    triggerCount: 28,
    lastTriggered: "2 hours ago",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-28",
    createdBy: "Ananya",
    version: 1,
  },
  // PRD Rule Types - Sourcing
  {
    id: "rule-011",
    name: "Candidate Supply Gap",
    description: "Activate sourcing agent when supply is low",
    ruleType: "sourcing",
    stage: "sourcing",
    conditionMetric: "sourced_candidates_24h",
    operator: "<",
    thresholdValue: 50,
    actionType: "alert",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 67,
    lastTriggered: "1 hour ago",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-28",
    createdBy: "Vikram",
    version: 1,
  },
  {
    id: "rule-012",
    name: "Low AI Fit Score",
    description: "Route candidates with low AI fit scores for review",
    ruleType: "sourcing",
    stage: "sourcing",
    conditionMetric: "ai_fit_score",
    operator: "<",
    thresholdValue: 0.65,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 3,
    status: "active",
    triggerCount: 89,
    lastTriggered: "45 mins ago",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    createdBy: "Rahul",
    version: 1,
  },
  // PRD Rule Types - Outreach
  {
    id: "rule-013",
    name: "Outreach Delivery Failure",
    description: "Switch to alternate channel on high failure rate",
    ruleType: "outreach",
    stage: "outreach",
    conditionMetric: "delivery_failure_rate",
    operator: ">",
    thresholdValue: 10,
    actionType: "alert",
    targetQueue: "ops_escalation",
    priority: 1,
    status: "active",
    triggerCount: 34,
    lastTriggered: "3 hours ago",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-28",
    createdBy: "Deepa",
    version: 1,
  },
  {
    id: "rule-014",
    name: "Negative Candidate Sentiment",
    description: "Route to human when sentiment is negative",
    ruleType: "outreach",
    stage: "outreach",
    conditionMetric: "sentiment_score",
    operator: "<",
    thresholdValue: 0.4,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 2,
    status: "active",
    triggerCount: 18,
    lastTriggered: "5 hours ago",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-28",
    createdBy: "Priya",
    version: 1,
  },
  // PRD Rule Types - Interview
  {
    id: "rule-015",
    name: "Interview Scheduling Delay",
    description: "Trigger scheduling agent if not scheduled in 24 hours",
    ruleType: "interview",
    stage: "interview",
    conditionMetric: "time_since_screening",
    operator: ">",
    thresholdValue: 24,
    actionType: "escalate",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 56,
    lastTriggered: "2 hours ago",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-28",
    createdBy: "Vikram",
    version: 1,
  },
  {
    id: "rule-016",
    name: "High No-Show Rate",
    description: "Alert when no-show rate exceeds threshold",
    ruleType: "interview",
    stage: "interview",
    conditionMetric: "no_show_rate",
    operator: ">",
    thresholdValue: 20,
    actionType: "alert",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 12,
    lastTriggered: "1 day ago",
    createdAt: "2024-01-27",
    updatedAt: "2024-01-28",
    createdBy: "Ananya",
    version: 1,
  },
  // New rules - Posting
  {
    id: "rule-017",
    name: "Channel Distribution Failure",
    description: "Retry via automation connector when posting fails on channels, fallback to Ops Admin HITL",
    ruleType: "posting",
    stage: "job_posting",
    conditionMetric: "channel_distribution_failures",
    operator: ">=",
    thresholdValue: 1,
    actionType: "retry_with_fallback",
    targetQueue: "ops_admin_hitl",
    priority: 1,
    status: "active",
    triggerCount: 23,
    lastTriggered: "1 hour ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Saroj",
    version: 1,
  },
  // New rules - Sourcing
  {
    id: "rule-018",
    name: "High Spam/Duplicate Rate",
    description: "Activate deduplication agent, if unresolved assign to QA HITL",
    ruleType: "sourcing",
    stage: "sourcing",
    conditionMetric: "spam_duplicate_rate",
    operator: ">",
    thresholdValue: 20,
    actionType: "route_to_ai_agent",
    targetQueue: "qa_hitl",
    priority: 2,
    status: "active",
    triggerCount: 34,
    lastTriggered: "3 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Rahul",
    version: 1,
  },
  // New rules - Outreach
  {
    id: "rule-019",
    name: "Low Outreach Response",
    description: "Trigger Outreach Optimization AI, if still low escalate to Human Recruiter",
    ruleType: "outreach",
    stage: "outreach",
    conditionMetric: "response_rate",
    operator: "<",
    thresholdValue: 15,
    actionType: "route_to_ai_agent",
    targetQueue: "recruiter_hitl",
    priority: 2,
    status: "active",
    triggerCount: 45,
    lastTriggered: "2 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Deepa",
    version: 1,
  },
  {
    id: "rule-020",
    name: "Candidate Opt-out Alert",
    description: "Pause campaign via automation, assign to Recruiter HITL for manual intervention",
    ruleType: "outreach",
    stage: "outreach",
    conditionMetric: "optout_rate",
    operator: ">",
    thresholdValue: 5,
    actionType: "trigger_automation",
    targetQueue: "recruiter_hitl",
    priority: 1,
    status: "active",
    triggerCount: 12,
    lastTriggered: "4 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Priya",
    version: 1,
  },
  // New rules - Application
  {
    id: "rule-021",
    name: "Application Conversion Drop",
    description: "Trigger Application UX Optimization AI, if persists escalate to Ops HITL",
    ruleType: "application",
    stage: "application",
    conditionMetric: "application_conversion_rate",
    operator: "<",
    thresholdValue: 30,
    actionType: "route_to_ai_agent",
    targetQueue: "ops_escalation",
    priority: 2,
    status: "active",
    triggerCount: 28,
    lastTriggered: "5 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Vikram",
    version: 1,
  },
  {
    id: "rule-022",
    name: "Incomplete Applications",
    description: "Trigger Follow-up Nudging Agent, if no response assign to Recruiter HITL",
    ruleType: "application",
    stage: "application",
    conditionMetric: "incomplete_application_rate",
    operator: ">",
    thresholdValue: 25,
    actionType: "route_to_ai_agent",
    targetQueue: "recruiter_hitl",
    priority: 3,
    status: "active",
    triggerCount: 56,
    lastTriggered: "1 hour ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Ananya",
    version: 1,
  },
  {
    id: "rule-023",
    name: "Fraud/Bot Detection",
    description: "Activate Fraud Detection Agent, if flagged route to Compliance HITL",
    ruleType: "application",
    stage: "application",
    conditionMetric: "fraud_risk_score",
    operator: ">",
    thresholdValue: 0.7,
    actionType: "route_to_queue",
    targetQueue: "compliance_hitl",
    priority: 1,
    status: "active",
    triggerCount: 8,
    lastTriggered: "2 days ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Saroj",
    version: 1,
  },
  // New rules - Screening
  {
    id: "rule-024",
    name: "AI Screening Confidence Low",
    description: "Route candidate to HITL Screening Queue when model confidence is low",
    ruleType: "screening",
    stage: "screening",
    conditionMetric: "screening_confidence",
    operator: "<",
    thresholdValue: 0.7,
    actionType: "route_to_queue",
    targetQueue: "human_screening_pool",
    priority: 1,
    status: "active",
    triggerCount: 156,
    lastTriggered: "30 mins ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Rahul",
    version: 1,
  },
  {
    id: "rule-025",
    name: "High Screening Rejection",
    description: "Trigger JD-Candidate Fit Recalibration AI, if persists escalate to Hiring Manager HITL",
    ruleType: "screening",
    stage: "screening",
    conditionMetric: "rejection_rate",
    operator: ">",
    thresholdValue: 70,
    actionType: "route_to_ai_agent",
    targetQueue: "hiring_manager_hitl",
    priority: 2,
    status: "active",
    triggerCount: 23,
    lastTriggered: "6 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Priya",
    version: 1,
  },
  {
    id: "rule-026",
    name: "Screening SLA Breach",
    description: "Auto-assign to Human Screening Pool when screening time exceeds SLA",
    ruleType: "screening",
    stage: "screening",
    conditionMetric: "screening_time",
    operator: ">",
    thresholdValue: 12,
    actionType: "escalate",
    targetQueue: "human_screening_pool",
    priority: 1,
    status: "active",
    triggerCount: 67,
    lastTriggered: "45 mins ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Deepa",
    version: 1,
  },
  // New rules - Interview (additional)
  {
    id: "rule-027",
    name: "Interview Feedback Missing",
    description: "Trigger Feedback Nudging Agent, if unresolved escalate to Hiring Manager HITL",
    ruleType: "interview",
    stage: "interview",
    conditionMetric: "feedback_delay",
    operator: ">",
    thresholdValue: 48,
    actionType: "route_to_ai_agent",
    targetQueue: "hiring_manager_hitl",
    priority: 2,
    status: "active",
    triggerCount: 34,
    lastTriggered: "3 hours ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Vikram",
    version: 1,
  },
  {
    id: "rule-028",
    name: "Interview Scheduling Retry",
    description: "Trigger Scheduling AI Agent, if fails assign to Recruiter HITL",
    ruleType: "interview",
    stage: "interview",
    conditionMetric: "scheduling_failed",
    operator: "=",
    thresholdValue: 1,
    actionType: "retry_with_fallback",
    targetQueue: "recruiter_hitl",
    priority: 2,
    status: "active",
    triggerCount: 18,
    lastTriggered: "1 hour ago",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    createdBy: "Ananya",
    version: 1,
  },
  {
    id: "rule-029",
    name: "Low SEO Score",
    description: "Assign job posting to human reviewer when SEO score is below 80",
    ruleType: "posting",
    stage: "job_posting",
    conditionMetric: "seo_score",
    operator: "<",
    thresholdValue: 80,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 2,
    status: "active",
    triggerCount: 0,
    lastTriggered: null,
    createdAt: "2024-02-08",
    updatedAt: "2024-02-08",
    createdBy: "System",
    version: 1,
  },
];

// HITL Tasks with full details
export const hitlTasks: HITLTask[] = [
  {
    id: "HITL-001",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    candidateId: "CAN-45892",
    candidateName: "Amit Verma",
    jobId: "JOB-001",
    jobTitle: "Senior ICU Nurse",
    aiAgentId: "agent-002",
    aiDecision: "Matched",
    confidenceScore: 0.62,
    status: "pending",
    priority: "high",
    assignedTo: "Priya Sharma",
    assignedAt: "1 hour ago",
    resolution: null,
    resolvedAt: null,
    dueAt: "4 hours",
    createdAt: "2 hours ago",
    metadata: { skillGap: "35%", roleMatch: "72%", experience: "6 years" },
  },
  {
    id: "HITL-002",
    ruleId: "rule-002",
    ruleName: "Enterprise Employer",
    candidateId: "CAN-45901",
    candidateName: "Neha Gupta",
    jobId: "JOB-002",
    jobTitle: "General Physician",
    aiAgentId: "agent-002",
    aiDecision: "Strong Match",
    confidenceScore: 0.89,
    status: "in_review",
    priority: "high",
    assignedTo: "Rahul Mehta",
    assignedAt: "3 hours ago",
    resolution: null,
    resolvedAt: null,
    dueAt: "2 hours",
    createdAt: "4 hours ago",
    metadata: { employerTier: "enterprise", salary: "₹18,00,000" },
  },
  {
    id: "HITL-003",
    ruleId: "rule-003",
    ruleName: "Senior Doctor Roles",
    candidateId: "CAN-45876",
    candidateName: "Dr. Rajesh Kumar",
    jobId: "JOB-006",
    jobTitle: "Cardiologist",
    aiAgentId: "agent-002",
    aiDecision: "Matched",
    confidenceScore: 0.78,
    status: "pending",
    priority: "medium",
    assignedTo: "Ananya Patel",
    assignedAt: "5 hours ago",
    resolution: null,
    resolvedAt: null,
    dueAt: "8 hours",
    createdAt: "6 hours ago",
    metadata: { roleLevel: "senior", specialization: "Cardiology" },
  },
  {
    id: "HITL-004",
    ruleId: "rule-005",
    ruleName: "Interview Scheduling SLA",
    candidateId: "CAN-45912",
    candidateName: "Sunita Reddy",
    jobId: "JOB-003",
    jobTitle: "Emergency Paramedic",
    aiAgentId: "agent-004",
    aiDecision: "Schedule Pending",
    confidenceScore: 0.85,
    status: "assigned",
    priority: "medium",
    assignedTo: null,
    assignedAt: null,
    resolution: null,
    resolvedAt: null,
    dueAt: "1 hour",
    createdAt: "8 hours ago",
    metadata: { waitTime: "52 hours", schedulingAttempts: 3 },
  },
  {
    id: "HITL-005",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    candidateId: "CAN-45889",
    candidateName: "Kiran Joshi",
    jobId: "JOB-004",
    jobTitle: "Lab Technician",
    aiAgentId: "agent-002",
    aiDecision: "Weak Match",
    confidenceScore: 0.58,
    status: "approved",
    priority: "low",
    assignedTo: "Vikram Singh",
    assignedAt: "1 day ago",
    resolution: "Approved after skills verification",
    resolvedAt: "20 hours ago",
    dueAt: null,
    createdAt: "1 day ago",
    metadata: { skillGap: "42%", roleMatch: "65%" },
  },
  {
    id: "HITL-006",
    ruleId: "rule-004",
    ruleName: "High Drop-off Alert",
    candidateId: "CAN-45923",
    candidateName: "Meera Shah",
    jobId: "JOB-005",
    jobTitle: "Pediatric Nurse",
    aiAgentId: null,
    aiDecision: "N/A - Anomaly Alert",
    confidenceScore: 0,
    status: "rejected",
    priority: "low",
    assignedTo: "Deepa Kumar",
    assignedAt: "2 days ago",
    resolution: "Candidate withdrew application",
    resolvedAt: "1 day ago",
    dueAt: null,
    createdAt: "2 days ago",
    metadata: { dropOffStage: "Interview Scheduled", dropOffRate: "45%" },
  },
  {
    id: "HITL-007",
    ruleId: "rule-007",
    ruleName: "High Salary Negotiation",
    candidateId: "CAN-45934",
    candidateName: "Dr. Arun Nair",
    jobId: "JOB-006",
    jobTitle: "Cardiologist",
    aiAgentId: "agent-006",
    aiDecision: "Salary Counter Proposed",
    confidenceScore: 0.72,
    status: "pending",
    priority: "high",
    assignedTo: null,
    assignedAt: null,
    resolution: null,
    resolvedAt: null,
    dueAt: "6 hours",
    createdAt: "3 hours ago",
    metadata: { proposedSalary: "₹32,00,000", budgetMax: "₹28,00,000" },
  },
  {
    id: "HITL-008",
    ruleId: "rule-002",
    ruleName: "Enterprise Employer",
    candidateId: "CAN-45945",
    candidateName: "Pooja Iyer",
    jobId: "JOB-001",
    jobTitle: "Senior ICU Nurse",
    aiAgentId: "agent-002",
    aiDecision: "Matched",
    confidenceScore: 0.81,
    status: "escalated",
    priority: "high",
    assignedTo: "Saroj Manager",
    assignedAt: "5 hours ago",
    resolution: null,
    resolvedAt: null,
    dueAt: "OVERDUE",
    createdAt: "12 hours ago",
    metadata: { escalationReason: "Client requested senior attention" },
  },
];

// HITL Audit Logs
export const hitlAuditLogs: HITLAuditLog[] = [
  {
    id: "log-001",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    taskId: "HITL-001",
    eventType: "rule_triggered",
    actor: "system",
    details: "Rule triggered: AI confidence score 0.62 < 0.7 threshold",
    snapshot: { aiDecision: "Matched", score: 0.62, candidate: "CAN-45892" },
    timestamp: "2 hours ago",
  },
  {
    id: "log-002",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    taskId: "HITL-001",
    eventType: "task_created",
    actor: "system",
    details: "HITL task created and added to Recruiter Review Queue",
    snapshot: { queue: "recruiter_review", priority: "high" },
    timestamp: "2 hours ago",
  },
  {
    id: "log-003",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    taskId: "HITL-001",
    eventType: "task_assigned",
    actor: "Priya Sharma",
    details: "Task self-assigned by recruiter",
    snapshot: { previousAssignee: null, newAssignee: "Priya Sharma" },
    timestamp: "1 hour ago",
  },
  {
    id: "log-004",
    ruleId: "rule-002",
    ruleName: "Enterprise Employer",
    taskId: "HITL-002",
    eventType: "rule_triggered",
    actor: "system",
    details: "Rule triggered: Enterprise employer detected (Fortis Healthcare)",
    snapshot: { employer: "Fortis Healthcare", tier: "enterprise" },
    timestamp: "4 hours ago",
  },
  {
    id: "log-005",
    ruleId: "rule-002",
    ruleName: "Enterprise Employer",
    taskId: "HITL-002",
    eventType: "task_assigned",
    actor: "system",
    details: "Auto-assigned to Rahul Mehta based on workload balancing",
    snapshot: { assignmentMethod: "auto", workloadScore: 0.65 },
    timestamp: "4 hours ago",
  },
  {
    id: "log-006",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    taskId: "HITL-005",
    eventType: "task_resolved",
    actor: "Vikram Singh",
    details: "Task approved: Candidate skills verified manually",
    snapshot: { resolution: "approved", verificationMethod: "manual_review" },
    timestamp: "20 hours ago",
  },
  {
    id: "log-007",
    ruleId: "rule-004",
    ruleName: "High Drop-off Alert",
    taskId: "HITL-006",
    eventType: "task_resolved",
    actor: "Deepa Kumar",
    details: "Task rejected: Candidate withdrew application during process",
    snapshot: { resolution: "rejected", reason: "candidate_withdrawal" },
    timestamp: "1 day ago",
  },
  {
    id: "log-008",
    ruleId: "rule-002",
    ruleName: "Enterprise Employer",
    taskId: "HITL-008",
    eventType: "task_escalated",
    actor: "Rahul Mehta",
    details: "Task escalated to senior manager: Client special request",
    snapshot: { previousAssignee: "Rahul Mehta", escalatedTo: "Saroj Manager" },
    timestamp: "5 hours ago",
  },
  {
    id: "log-009",
    ruleId: "rule-005",
    ruleName: "Interview Scheduling SLA",
    taskId: "HITL-004",
    eventType: "rule_triggered",
    actor: "system",
    details: "SLA breach: Interview not scheduled within 48 hours (current: 52h)",
    snapshot: { slaThreshold: 48, actualTime: 52, attempts: 3 },
    timestamp: "8 hours ago",
  },
  {
    id: "log-010",
    ruleId: "rule-007",
    ruleName: "High Salary Negotiation",
    taskId: "HITL-007",
    eventType: "rule_triggered",
    actor: "system",
    details: "Rule triggered: Proposed salary ₹32,00,000 exceeds threshold ₹25,00,000",
    snapshot: { proposedSalary: 3200000, threshold: 2500000 },
    timestamp: "3 hours ago",
  },
];

// HITL Analytics Data
export const hitlVolumeData = [
  { date: "Jan 22", created: 12, resolved: 10, pending: 8 },
  { date: "Jan 23", created: 15, resolved: 14, pending: 9 },
  { date: "Jan 24", created: 18, resolved: 16, pending: 11 },
  { date: "Jan 25", created: 14, resolved: 15, pending: 10 },
  { date: "Jan 26", created: 22, resolved: 18, pending: 14 },
  { date: "Jan 27", created: 19, resolved: 21, pending: 12 },
  { date: "Jan 28", created: 16, resolved: 14, pending: 14 },
  { date: "Jan 29", created: 8, resolved: 6, pending: 16 },
];

export const rulePerformanceData = [
  { rule: "Low AI Confidence", triggers: 342, overrideRate: 12, falsePositive: 8, avgResolutionTime: 2.4 },
  { rule: "Enterprise Employer", triggers: 189, overrideRate: 5, falsePositive: 3, avgResolutionTime: 3.1 },
  { rule: "Senior Doctor Roles", triggers: 114, overrideRate: 18, falsePositive: 12, avgResolutionTime: 4.2 },
  { rule: "High Drop-off Alert", triggers: 28, overrideRate: 45, falsePositive: 22, avgResolutionTime: 1.8 },
  { rule: "Interview SLA", triggers: 56, overrideRate: 8, falsePositive: 5, avgResolutionTime: 1.2 },
  { rule: "Low Response Rate", triggers: 22, overrideRate: 35, falsePositive: 28, avgResolutionTime: 2.8 },
  { rule: "High Salary Negotiation", triggers: 34, overrideRate: 22, falsePositive: 10, avgResolutionTime: 5.6 },
];

export const resolutionOutcomes = [
  { name: "Approved", value: 62, color: "hsl(var(--success))" },
  { name: "Rejected", value: 18, color: "hsl(var(--destructive))" },
  { name: "Escalated", value: 12, color: "hsl(var(--warning))" },
  { name: "Pending", value: 8, color: "hsl(var(--muted))" },
];

// Historical candidates for simulation
export const historicalCandidates = [
  { id: "SIM-001", jobId: "JOB-001", aiConfidence: 0.65, employerTier: "enterprise", roleLevel: "mid" },
  { id: "SIM-002", jobId: "JOB-002", aiConfidence: 0.82, employerTier: "enterprise", roleLevel: "senior" },
  { id: "SIM-003", jobId: "JOB-003", aiConfidence: 0.71, employerTier: "mid-market", roleLevel: "junior" },
  { id: "SIM-004", jobId: "JOB-001", aiConfidence: 0.58, employerTier: "enterprise", roleLevel: "senior" },
  { id: "SIM-005", jobId: "JOB-004", aiConfidence: 0.89, employerTier: "smb", roleLevel: "mid" },
  { id: "SIM-006", jobId: "JOB-005", aiConfidence: 0.45, employerTier: "smb", roleLevel: "junior" },
  { id: "SIM-007", jobId: "JOB-006", aiConfidence: 0.77, employerTier: "enterprise", roleLevel: "senior" },
  { id: "SIM-008", jobId: "JOB-002", aiConfidence: 0.62, employerTier: "mid-market", roleLevel: "mid" },
  { id: "SIM-009", jobId: "JOB-003", aiConfidence: 0.91, employerTier: "enterprise", roleLevel: "mid" },
  { id: "SIM-010", jobId: "JOB-001", aiConfidence: 0.53, employerTier: "smb", roleLevel: "senior" },
];

// ============================================
// Orchestration Engine Data Models
// ============================================

// Workflow Automation Types
export type AutomationTrigger =
  | "stage_entered"
  | "stage_completed"
  | "candidate_matched"
  | "interview_scheduled"
  | "offer_released"
  | "offer_accepted"
  | "offer_rejected"
  | "sla_breach"
  | "candidate_response";

export type AutomationAction =
  | "send_notification"
  | "update_ats"
  | "sync_crm"
  | "schedule_calendar"
  | "send_message"
  | "generate_invoice"
  | "create_hitl_task"
  | "trigger_webhook";

export interface WorkflowAutomation {
  id: string;
  trigger: AutomationTrigger;
  stageId?: string;
  condition?: {
    field: string;
    operator: string;
    value: string | number;
  };
  action: AutomationAction;
  targetConnectorId: string;
  enabled: boolean;
}

// Workflow Entity
export interface WorkflowStage {
  id: string;
  name: string;
  type: "intake" | "match" | "outreach" | "interview" | "offer" | "join";
  assignedActor: "ai" | "human" | "hybrid";
  agentId: string | null;
  humanBackup: string;
  slaHours: number;
  retryPolicy: { maxRetries: number; backoffMinutes: number };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  version: number;
  status: "draft" | "active" | "paused" | "archived";
  jobType: "frontline" | "professional" | "enterprise";
  stages: WorkflowStage[];
  automations?: WorkflowAutomation[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  executionCount: number;
  successRate: number;
  // New metadata fields for template configuration
  profession?: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone?: 1 | 2 | 3 | 4;
  locationTier?: "tier_1" | "tier_2" | "tier_3";
  industry?: "hospital" | "diagnostic_lab" | "pharmaceuticals";
  hiringType?: "bulk" | "fast_track" | "niche";
  nodePositions?: Record<string, { x: number; y: number }>;
  connections?: Array<{ source: string; target: string }>;
}

export const workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Frontline Hiring",
    description: "Standard workflow for nurse and paramedic positions with high automation",
    version: 2,
    status: "active",
    jobType: "frontline",
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 4, retryPolicy: { maxRetries: 3, backoffMinutes: 15 } },
      { id: "s2", name: "Skills Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Recruiters", slaHours: 2, retryPolicy: { maxRetries: 2, backoffMinutes: 10 } },
      { id: "s3", name: "Initial Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 24, retryPolicy: { maxRetries: 5, backoffMinutes: 60 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Process", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
    automations: [
      {
        id: "auto-001",
        trigger: "stage_completed",
        stageId: "s1",
        condition: { field: "ai_confidence", operator: "<", value: 0.7 },
        action: "create_hitl_task",
        targetConnectorId: "",
        enabled: true,
      },
      {
        id: "auto-002",
        trigger: "interview_scheduled",
        action: "update_ats",
        targetConnectorId: "conn-001",
        enabled: true,
      },
      {
        id: "auto-003",
        trigger: "offer_accepted",
        action: "generate_invoice",
        targetConnectorId: "conn-006",
        enabled: true,
      },
    ],
    createdBy: "Saroj",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-25",
    executionCount: 1245,
    successRate: 87.4,
    // New metadata fields
    profession: "nurse",
    jobZone: 1,
    locationTier: "tier_1",
    industry: "hospital",
    hiringType: "bulk",
  },
  {
    id: "wf-002",
    name: "Enterprise Physician",
    description: "Premium workflow for senior physician roles with mandatory human checkpoints",
    version: 1,
    status: "active",
    jobType: "enterprise",
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Senior Screening", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s2", name: "Credential Verification", type: "match", assignedActor: "human", agentId: "agent-005", humanBackup: "Compliance Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s3", name: "Personal Outreach", type: "outreach", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s4", name: "Multi-Panel Interview", type: "interview", assignedActor: "human", agentId: null, humanBackup: "Interview Panel", slaHours: 96, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s5", name: "Offer Negotiation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Executive Team", slaHours: 120, retryPolicy: { maxRetries: 3, backoffMinutes: 480 } },
      { id: "s6", name: "Executive Onboarding", type: "join", assignedActor: "human", agentId: null, humanBackup: "HR Director", slaHours: 336, retryPolicy: { maxRetries: 1, backoffMinutes: 720 } },
    ],
    createdBy: "Priya",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-20",
    executionCount: 89,
    successRate: 92.1,
  },
  {
    id: "wf-003",
    name: "Bulk Paramedic",
    description: "High-volume automated workflow for bulk paramedic hiring",
    version: 3,
    status: "active",
    jobType: "frontline",
    stages: [
      { id: "s1", name: "Bulk Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 2, retryPolicy: { maxRetries: 5, backoffMinutes: 10 } },
      { id: "s2", name: "Auto Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Recruiters", slaHours: 1, retryPolicy: { maxRetries: 3, backoffMinutes: 5 } },
      { id: "s3", name: "Batch Outreach", type: "outreach", assignedActor: "ai", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 12, retryPolicy: { maxRetries: 7, backoffMinutes: 30 } },
      { id: "s4", name: "Group Interview", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s5", name: "Standard Offer", type: "offer", assignedActor: "ai", agentId: null, humanBackup: "Recruiters", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 120 } },
      { id: "s6", name: "Fast Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 72, retryPolicy: { maxRetries: 1, backoffMinutes: 240 } },
    ],
    createdBy: "Ananya",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-28",
    executionCount: 456,
    successRate: 81.2,
  },
  {
    id: "wf-004",
    name: "New ICU Process",
    description: "Draft workflow for specialized ICU nurse hiring",
    version: 1,
    status: "draft",
    jobType: "professional",
    stages: [
      { id: "s1", name: "ICU Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "ICU Specialist", slaHours: 6, retryPolicy: { maxRetries: 2, backoffMinutes: 20 } },
      { id: "s2", name: "Clinical Skills Match", type: "match", assignedActor: "hybrid", agentId: "agent-002", humanBackup: "Clinical Team", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
    ],
    createdBy: "Rahul",
    createdAt: "2024-01-28",
    updatedAt: "2024-01-28",
    executionCount: 0,
    successRate: 0,
  },
  {
    id: "wf-005",
    name: "Locum Physician Placement",
    description: "Short-term physician placements with expedited process",
    version: 2,
    status: "active",
    jobType: "professional",
    stages: [
      { id: "s1", name: "Quick Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 4, retryPolicy: { maxRetries: 2, backoffMinutes: 15 } },
      { id: "s2", name: "Credential Check", type: "match", assignedActor: "hybrid", agentId: "agent-005", humanBackup: "Compliance Team", slaHours: 12, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s3", name: "Direct Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Senior Recruiters", slaHours: 24, retryPolicy: { maxRetries: 3, backoffMinutes: 60 } },
      { id: "s4", name: "Quick Interview", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Interview Team", slaHours: 36, retryPolicy: { maxRetries: 2, backoffMinutes: 90 } },
      { id: "s5", name: "Fast Offer", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Recruiters", slaHours: 48, retryPolicy: { maxRetries: 2, backoffMinutes: 120 } },
    ],
    createdBy: "Vikram",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-22",
    executionCount: 234,
    successRate: 85.3,
  },
  {
    id: "wf-006",
    name: "Nursing Agency Float Pool",
    description: "For floating nurses across multiple facilities",
    version: 1,
    status: "active",
    jobType: "frontline",
    stages: [
      { id: "s1", name: "Float Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 3, retryPolicy: { maxRetries: 3, backoffMinutes: 10 } },
      { id: "s2", name: "Multi-Facility Match", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Matching Team", slaHours: 2, retryPolicy: { maxRetries: 2, backoffMinutes: 10 } },
      { id: "s3", name: "Availability Check", type: "outreach", assignedActor: "ai", agentId: "agent-003", humanBackup: "Scheduling Team", slaHours: 12, retryPolicy: { maxRetries: 4, backoffMinutes: 30 } },
      { id: "s4", name: "Orientation Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Orientation Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s5", name: "Contract Offer", type: "offer", assignedActor: "hybrid", agentId: null, humanBackup: "Contracts Team", slaHours: 36, retryPolicy: { maxRetries: 2, backoffMinutes: 90 } },
      { id: "s6", name: "Float Onboarding", type: "join", assignedActor: "ai", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 48, retryPolicy: { maxRetries: 1, backoffMinutes: 120 } },
    ],
    createdBy: "Deepa",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-26",
    executionCount: 567,
    successRate: 89.1,
  },
  {
    id: "wf-007",
    name: "Allied Health Specialist",
    description: "For lab technicians, radiologists, therapists",
    version: 1,
    status: "paused",
    jobType: "professional",
    stages: [
      { id: "s1", name: "Specialist Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Specialist Recruiters", slaHours: 6, retryPolicy: { maxRetries: 2, backoffMinutes: 20 } },
      { id: "s2", name: "Certification Match", type: "match", assignedActor: "hybrid", agentId: "agent-002", humanBackup: "Compliance Team", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s3", name: "Department Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiters", slaHours: 36, retryPolicy: { maxRetries: 3, backoffMinutes: 90 } },
      { id: "s4", name: "Technical Interview", type: "interview", assignedActor: "human", agentId: null, humanBackup: "Department Heads", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 180 } },
      { id: "s5", name: "Offer Preparation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "HR Team", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 180 } },
      { id: "s6", name: "Specialist Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Training Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 360 } },
    ],
    createdBy: "Ananya",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-25",
    executionCount: 78,
    successRate: 83.6,
  },
  {
    id: "wf-008",
    name: "Executive Healthcare Search",
    description: "C-suite and director-level healthcare positions",
    version: 1,
    status: "draft",
    jobType: "enterprise",
    stages: [
      { id: "s1", name: "Executive Sourcing", type: "intake", assignedActor: "human", agentId: null, humanBackup: "Executive Search Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s2", name: "Background Verification", type: "match", assignedActor: "human", agentId: null, humanBackup: "Verification Team", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 120 } },
      { id: "s3", name: "Executive Outreach", type: "outreach", assignedActor: "human", agentId: null, humanBackup: "Managing Partners", slaHours: 96, retryPolicy: { maxRetries: 3, backoffMinutes: 240 } },
      { id: "s4", name: "Board Interview", type: "interview", assignedActor: "human", agentId: null, humanBackup: "Board Members", slaHours: 168, retryPolicy: { maxRetries: 2, backoffMinutes: 480 } },
      { id: "s5", name: "Executive Offer", type: "offer", assignedActor: "human", agentId: null, humanBackup: "CEO Office", slaHours: 168, retryPolicy: { maxRetries: 3, backoffMinutes: 480 } },
      { id: "s6", name: "Executive Onboarding", type: "join", assignedActor: "human", agentId: null, humanBackup: "Executive HR", slaHours: 336, retryPolicy: { maxRetries: 1, backoffMinutes: 720 } },
    ],
    createdBy: "Priya",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-28",
    executionCount: 0,
    successRate: 0,
  },
];

// Connector Entity
export interface Connector {
  id: string;
  name: string;
  type: "ats" | "messaging" | "calendar" | "crm" | "webhook" | "billing";
  provider: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  eventSubscriptions: string[];
  dailyVolume: number;
  errorRate: number;
}

export const connectors: Connector[] = [
  {
    id: "conn-001",
    name: "Greenhouse ATS",
    type: "ats",
    provider: "greenhouse",
    status: "connected",
    lastSync: "5 mins ago",
    eventSubscriptions: ["candidate_stage_change", "offer_accepted", "interview_scheduled"],
    dailyVolume: 2450,
    errorRate: 0.8,
  },
  {
    id: "conn-002",
    name: "WhatsApp Business",
    type: "messaging",
    provider: "whatsapp",
    status: "connected",
    lastSync: "2 mins ago",
    eventSubscriptions: ["outreach_sent", "response_received", "opt_out"],
    dailyVolume: 3200,
    errorRate: 1.2,
  },
  {
    id: "conn-003",
    name: "Calendly",
    type: "calendar",
    provider: "calendly",
    status: "connected",
    lastSync: "8 mins ago",
    eventSubscriptions: ["interview_booked", "interview_cancelled", "reschedule_requested"],
    dailyVolume: 340,
    errorRate: 0.3,
  },
  {
    id: "conn-004",
    name: "Salesforce CRM",
    type: "crm",
    provider: "salesforce",
    status: "error",
    lastSync: "2 hours ago",
    eventSubscriptions: ["employer_created", "deal_closed", "renewal_due"],
    dailyVolume: 0,
    errorRate: 100,
  },
  {
    id: "conn-005",
    name: "Slack Notifications",
    type: "webhook",
    provider: "slack",
    status: "connected",
    lastSync: "1 min ago",
    eventSubscriptions: ["sla_breach", "escalation_needed", "daily_summary"],
    dailyVolume: 156,
    errorRate: 0.1,
  },
  {
    id: "conn-006",
    name: "Stripe Billing",
    type: "billing",
    provider: "stripe",
    status: "connected",
    lastSync: "15 mins ago",
    eventSubscriptions: ["placement_confirmed", "invoice_generated", "payment_received"],
    dailyVolume: 28,
    errorRate: 0.5,
  },
];

// Event Subscription Entity
export interface EventSubscription {
  id: string;
  trigger: string;
  action: string;
  connectorId: string;
  status: "active" | "paused";
  lastTriggered: string;
  triggerCount: number;
}

export const eventSubscriptions: EventSubscription[] = [
  { id: "evt-sub-001", trigger: "interview_scheduled", action: "Update ATS status", connectorId: "conn-001", status: "active", lastTriggered: "10 mins ago", triggerCount: 892 },
  { id: "evt-sub-002", trigger: "candidate_joined", action: "Generate invoice", connectorId: "conn-006", status: "active", lastTriggered: "2 hours ago", triggerCount: 156 },
  { id: "evt-sub-003", trigger: "sla_breach", action: "Send Slack alert", connectorId: "conn-005", status: "active", lastTriggered: "4 hours ago", triggerCount: 234 },
  { id: "evt-sub-004", trigger: "offer_accepted", action: "Sync to CRM", connectorId: "conn-004", status: "paused", lastTriggered: "2 hours ago", triggerCount: 89 },
  { id: "evt-sub-005", trigger: "candidate_response", action: "Update messaging thread", connectorId: "conn-002", status: "active", lastTriggered: "5 mins ago", triggerCount: 4521 },
];

// Execution Log Entity
export interface TraceEvent {
  id: string;
  stage: string;
  actor: "ai" | "human";
  action: string;
  duration: string;
  status: "success" | "failed" | "pending";
  timestamp: string;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  currentStage: string;
  status: "running" | "completed" | "failed" | "paused";
  startedAt: string;
  completedAt: string | null;
  traceEvents: TraceEvent[];
  aiActions: number;
  humanActions: number;
}

export const executionLogs: ExecutionLog[] = [
  {
    id: "exec-001",
    workflowId: "wf-001",
    workflowName: "Frontline Hiring",
    jobId: "JOB-001",
    jobTitle: "Senior ICU Nurse",
    candidateId: "CAN-45892",
    candidateName: "Amit Verma",
    currentStage: "Interview Scheduling",
    status: "running",
    startedAt: "2 hours ago",
    completedAt: null,
    traceEvents: [
      { id: "t1", stage: "Profile Screening", actor: "ai", action: "CV parsed and validated", duration: "1.2s", status: "success", timestamp: "2 hours ago" },
      { id: "t2", stage: "Skills Matching", actor: "ai", action: "Matched with 87% confidence", duration: "0.8s", status: "success", timestamp: "1h 58m ago" },
      { id: "t3", stage: "Initial Outreach", actor: "ai", action: "WhatsApp sent", duration: "0.3s", status: "success", timestamp: "1h 55m ago" },
      { id: "t4", stage: "Initial Outreach", actor: "human", action: "Response handled", duration: "15m", status: "success", timestamp: "1h 30m ago" },
      { id: "t5", stage: "Interview Scheduling", actor: "ai", action: "Calendar invite sent", duration: "2.1s", status: "pending", timestamp: "45m ago" },
    ],
    aiActions: 4,
    humanActions: 1,
  },
  {
    id: "exec-002",
    workflowId: "wf-002",
    workflowName: "Enterprise Physician",
    jobId: "JOB-006",
    jobTitle: "Cardiologist",
    candidateId: "CAN-45934",
    candidateName: "Dr. Arun Nair",
    currentStage: "Offer Negotiation",
    status: "running",
    startedAt: "3 days ago",
    completedAt: null,
    traceEvents: [
      { id: "t1", stage: "Profile Screening", actor: "ai", action: "Initial screening", duration: "2.5s", status: "success", timestamp: "3 days ago" },
      { id: "t2", stage: "Profile Screening", actor: "human", action: "Manual review completed", duration: "2h", status: "success", timestamp: "3 days ago" },
      { id: "t3", stage: "Credential Verification", actor: "human", action: "Medical license verified", duration: "1 day", status: "success", timestamp: "2 days ago" },
      { id: "t4", stage: "Personal Outreach", actor: "human", action: "Personal call completed", duration: "45m", status: "success", timestamp: "2 days ago" },
      { id: "t5", stage: "Multi-Panel Interview", actor: "human", action: "Panel interview completed", duration: "2h", status: "success", timestamp: "1 day ago" },
      { id: "t6", stage: "Offer Negotiation", actor: "human", action: "Counter-offer pending", duration: "ongoing", status: "pending", timestamp: "6 hours ago" },
    ],
    aiActions: 1,
    humanActions: 5,
  },
  {
    id: "exec-003",
    workflowId: "wf-003",
    workflowName: "Bulk Paramedic",
    jobId: "JOB-003",
    jobTitle: "Emergency Paramedic",
    candidateId: "CAN-45956",
    candidateName: "Rahul Sharma",
    currentStage: "Onboarding",
    status: "completed",
    startedAt: "5 days ago",
    completedAt: "1 day ago",
    traceEvents: [
      { id: "t1", stage: "Bulk Screening", actor: "ai", action: "Batch processed", duration: "0.5s", status: "success", timestamp: "5 days ago" },
      { id: "t2", stage: "Auto Matching", actor: "ai", action: "Auto matched 92%", duration: "0.3s", status: "success", timestamp: "5 days ago" },
      { id: "t3", stage: "Batch Outreach", actor: "ai", action: "Email + WhatsApp sent", duration: "0.8s", status: "success", timestamp: "5 days ago" },
      { id: "t4", stage: "Group Interview", actor: "ai", action: "Slot auto-assigned", duration: "1.2s", status: "success", timestamp: "4 days ago" },
      { id: "t5", stage: "Group Interview", actor: "human", action: "Interview conducted", duration: "30m", status: "success", timestamp: "3 days ago" },
      { id: "t6", stage: "Standard Offer", actor: "ai", action: "Offer letter generated", duration: "2.1s", status: "success", timestamp: "2 days ago" },
      { id: "t7", stage: "Fast Onboarding", actor: "ai", action: "Onboarding completed", duration: "1 day", status: "success", timestamp: "1 day ago" },
    ],
    aiActions: 6,
    humanActions: 1,
  },
  {
    id: "exec-004",
    workflowId: "wf-001",
    workflowName: "Frontline Hiring",
    jobId: "JOB-005",
    jobTitle: "Pediatric Nurse",
    candidateId: "CAN-45967",
    candidateName: "Priya Menon",
    currentStage: "Skills Matching",
    status: "failed",
    startedAt: "4 hours ago",
    completedAt: "3 hours ago",
    traceEvents: [
      { id: "t1", stage: "Profile Screening", actor: "ai", action: "CV parsed", duration: "1.1s", status: "success", timestamp: "4 hours ago" },
      { id: "t2", stage: "Skills Matching", actor: "ai", action: "Match failed - skill gap too high", duration: "0.9s", status: "failed", timestamp: "3 hours ago" },
    ],
    aiActions: 2,
    humanActions: 0,
  },
  {
    id: "exec-005",
    workflowId: "wf-001",
    workflowName: "Frontline Hiring",
    jobId: "JOB-001",
    jobTitle: "Senior ICU Nurse",
    candidateId: "CAN-45978",
    candidateName: "Sunita Devi",
    currentStage: "Initial Outreach",
    status: "paused",
    startedAt: "6 hours ago",
    completedAt: null,
    traceEvents: [
      { id: "t1", stage: "Profile Screening", actor: "ai", action: "CV parsed", duration: "1.3s", status: "success", timestamp: "6 hours ago" },
      { id: "t2", stage: "Skills Matching", actor: "ai", action: "Matched 78%", duration: "0.7s", status: "success", timestamp: "6 hours ago" },
      { id: "t3", stage: "Initial Outreach", actor: "ai", action: "Paused - HITL review required", duration: "-", status: "pending", timestamp: "5 hours ago" },
    ],
    aiActions: 2,
    humanActions: 0,
  },
];

// Telemetry Metrics
export const telemetryMetrics = {
  workflowsRunning: 12,
  workflowsCompleted: 156,
  workflowsFailed: 8,
  avgDuration: "2.4 days",
  aiActionsToday: 4521,
  humanActionsToday: 342,
  avgLatency: "1.2s",
  errorRate: 2.4,
};

// Enterprise Customers
export const enterpriseCustomers = [
  { id: "cust-001", name: "Ankura Hospital", tier: "enterprise" },
  { id: "cust-002", name: "Oasis Fertility", tier: "enterprise" },
  { id: "cust-003", name: "Manipal Hospitals", tier: "mid-market" },
  { id: "cust-004", name: "Apollo Hospitals", tier: "enterprise" },
  { id: "cust-005", name: "Fortis Healthcare", tier: "enterprise" },
  { id: "cust-006", name: "Max Healthcare", tier: "mid-market" },
  { id: "cust-007", name: "Narayana Health", tier: "enterprise" },
  { id: "cust-008", name: "Bhrungi Hospitals", tier: "enterprise" },
];

// Hiring Activity Trend (with HITL Overrides)
export const hiringActivityTrend = [
  { date: "Jan 1", aiMatches: 420, humanMatches: 180, hitlOverrides: 28, placements: 45 },
  { date: "Jan 8", aiMatches: 480, humanMatches: 195, hitlOverrides: 32, placements: 52 },
  { date: "Jan 15", aiMatches: 510, humanMatches: 210, hitlOverrides: 35, placements: 58 },
  { date: "Jan 22", aiMatches: 545, humanMatches: 225, hitlOverrides: 38, placements: 61 },
  { date: "Jan 29", aiMatches: 590, humanMatches: 240, hitlOverrides: 42, placements: 68 },
  { date: "Feb 5", aiMatches: 620, humanMatches: 250, hitlOverrides: 45, placements: 72 },
  { date: "Feb 12", aiMatches: 680, humanMatches: 265, hitlOverrides: 48, placements: 78 },
  { date: "Feb 19", aiMatches: 720, humanMatches: 280, hitlOverrides: 52, placements: 85 },
];

// AI Evaluation Metrics
export const aiEvaluationMetrics = {
  matchAccuracy: 87.4,
  fitScoreAcceptance: 82.1,
  overrideRate: 8.2,
  escalationRate: 5.4,
  automationFailure: 1.2,
};

// Job Pipeline Health Data
const funnelStageMap: Record<number, string> = {
  0: "Lead Ingested",
  1: "AI Match Generated",
  2: "Human Review",
  3: "Interview Scheduled",
  4: "Offer Extended",
  5: "Placement Completed",
};

const getCurrentStage = (daysOpen: number): string => {
  if (daysOpen < 5) return "Lead Ingested";
  if (daysOpen < 10) return "AI Match Generated";
  if (daysOpen < 15) return "Human Review";
  if (daysOpen < 20) return "Interview Scheduled";
  if (daysOpen < 25) return "Offer Extended";
  return "Placement Completed";
};

const getBottleneckStage = (funnel: JobFunnelStage[]): string => {
  let minConversion = 100;
  let bottleneck = funnel[0]?.name || "Unknown";
  
  for (let i = 1; i < funnel.length; i++) {
    const conversion = (funnel[i].candidates / funnel[i - 1].candidates) * 100;
    if (conversion < minConversion) {
      minConversion = conversion;
      bottleneck = funnel[i].name;
    }
  }
  return bottleneck;
};

const calculateSLARisk = (daysOpen: number, status: string): "green" | "amber" | "red" => {
  if (status === "filled") return "green";
  if (daysOpen > 21) return "red";
  if (daysOpen > 14) return "amber";
  return "green";
};

const getSLADetails = (daysOpen: number, slaRisk: "green" | "amber" | "red"): string => {
  if (slaRisk === "green") return `${21 - daysOpen} days buffer`;
  if (slaRisk === "amber") return `${21 - daysOpen} days remaining`;
  return `${daysOpen - 21} days overdue`;
};

export interface JobPipelineHealthRow {
  jobId: string;
  jobTitle: string;
  customer: string;
  currentStage: string;
  bottleneckStage: string;
  aiPercentage: number;
  humanPercentage: number;
  slaRisk: "green" | "amber" | "red";
  slaDetails: string;
}

export const jobPipelineHealth: JobPipelineHealthRow[] = (() => {
  const mapped = jobs.map((job) => {
    const slaRisk = calculateSLARisk(job.daysOpen, job.status);
    return {
      jobId: job.id,
      jobTitle: job.title,
      customer: job.employer,
      currentStage: getCurrentStage(job.daysOpen),
      bottleneckStage: getBottleneckStage(job.funnel),
      aiPercentage: job.aiContribution,
      humanPercentage: job.humanContribution,
      slaRisk,
      slaDetails: getSLADetails(job.daysOpen, slaRisk),
    };
  });

  // Override JOB-017 to show correct pipeline health values per requirements
  const job017Index = mapped.findIndex(j => j.jobId === "JOB-017");
  if (job017Index >= 0) {
    mapped[job017Index].currentStage = "Interview Scheduled";
    mapped[job017Index].bottleneckStage = "Offer Negotiation";
  }

  // Move Bhrungi Hospitals (JOB-017) to the top
  const bhrungiIndex = mapped.findIndex(j => j.jobId === "JOB-017");
  if (bhrungiIndex > 0) {
    const [bhrungiRow] = mapped.splice(bhrungiIndex, 1);
    mapped.unshift(bhrungiRow);
  }

  return mapped;
})();

// Dashboard KPI Metrics
export const dashboardKPIs = {
  activeJobPipelines: jobs.filter(j => j.status === "active").length,
  candidatesInPipeline: jobs.reduce((acc, job) => acc + job.funnel[0].candidates, 0),
  aiAutomationCoverage: 68,
  hiringSLACompliance: 87,
  grossMargin: 44.7,
};

// ============================================
// Customer Workflow Schemas
// ============================================

export interface PipelineWorkflowStage {
  id: string;
  type: "source" | "candidate" | "automation" | "ai" | "recruiter" | "decision" | "outcome";
  label: string;
  icon: string;
  position: { x: number; y: number };
}

export interface CustomerWorkflowSchema {
  customerId: string;
  customerName: string;
  workflowId: string;
  stages: PipelineWorkflowStage[];
  outcomeStages: PipelineWorkflowStage[];
}

export const customerWorkflowSchemas: CustomerWorkflowSchema[] = [
  {
    customerId: "cust-001",
    customerName: "Ankura Hospital",
    workflowId: "wf-ankura",
    stages: [
      { id: "source", type: "source", label: "Ankura\nHospital", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nAnkura", icon: "eye", position: { x: 200, y: 130 } },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search", position: { x: 370, y: 130 } },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 540, y: 130 } },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send", position: { x: 710, y: 130 } },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 880, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 1050, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1200, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1200, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1200, y: 260 } },
    ],
  },
  {
    customerId: "cust-002",
    customerName: "Oasis Fertility",
    workflowId: "wf-oasis",
    stages: [
      { id: "source", type: "source", label: "Oasis\nFertility", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nOasis", icon: "eye", position: { x: 200, y: 130 } },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search", position: { x: 370, y: 130 } },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 540, y: 130 } },
      // No prescreen stage for Oasis Fertility
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 710, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 880, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1030, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1030, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1030, y: 260 } },
    ],
  },
  {
    customerId: "cust-003",
    customerName: "Manipal Hospitals",
    workflowId: "wf-manipal",
    stages: [
      { id: "source", type: "source", label: "Manipal\nHospitals", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nManipal", icon: "eye", position: { x: 200, y: 130 } },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search", position: { x: 370, y: 130 } },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 540, y: 130 } },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send", position: { x: 710, y: 130 } },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 880, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 1050, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1200, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1200, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1200, y: 260 } },
    ],
  },
  {
    customerId: "cust-004",
    customerName: "KIMS Hospital",
    workflowId: "wf-kims",
    stages: [
      { id: "source", type: "source", label: "KIMS\nHospital", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nKIMS", icon: "eye", position: { x: 200, y: 130 } },
      // No job-discovery stage for KIMS
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 370, y: 130 } },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send", position: { x: 540, y: 130 } },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 710, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 880, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1030, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1030, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1030, y: 260 } },
    ],
  },
  {
    customerId: "cust-005",
    customerName: "Yashoda Hospitals",
    workflowId: "wf-yashoda",
    stages: [
      { id: "source", type: "source", label: "Yashoda\nHospitals", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nYashoda", icon: "eye", position: { x: 200, y: 130 } },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search", position: { x: 370, y: 130 } },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 540, y: 130 } },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send", position: { x: 710, y: 130 } },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 880, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 1050, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1200, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1200, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1200, y: 260 } },
    ],
  },
  {
    customerId: "cust-006",
    customerName: "Aster CMI Hospital",
    workflowId: "wf-aster",
    stages: [
      { id: "source", type: "source", label: "Aster CMI\nHospital", icon: "hospital", position: { x: 50, y: 140 } },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nAster CMI", icon: "eye", position: { x: 200, y: 130 } },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search", position: { x: 370, y: 130 } },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart", position: { x: 540, y: 130 } },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send", position: { x: 710, y: 130 } },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone", position: { x: 880, y: 130 } },
      { id: "decision", type: "decision", label: "Decision", icon: "branch", position: { x: 1050, y: 145 } },
    ],
    outcomeStages: [
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar", position: { x: 1200, y: 40 } },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck", position: { x: 1200, y: 150 } },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user", position: { x: 1200, y: 260 } },
    ],
  },
];

// Helper: Get workflow schema for a customer
export const getCustomerWorkflowSchema = (customerName: string): CustomerWorkflowSchema => {
  return customerWorkflowSchemas.find(
    schema => schema.customerName === customerName
  ) || customerWorkflowSchemas[0];
};

// Helper: Filter jobs by customer
export const getJobsByCustomer = (customerName: string | "all"): Job[] => {
  if (customerName === "all") return jobs;
  return jobs.filter(job => job.employer === customerName);
};

// Helper: Calculate KPIs for filtered jobs
export const calculateCustomerKPIs = (filteredJobs: Job[]) => {
  const totalJobs = filteredJobs.length || 1;
  return {
    activeJobPipelines: filteredJobs.filter(j => j.status === "active").length,
    candidatesInPipeline: filteredJobs.reduce((acc, job) => acc + job.funnel[0].candidates, 0),
    aiAutomationCoverage: Math.round(
      filteredJobs.reduce((acc, job) => acc + job.aiContribution, 0) / totalJobs
    ),
    hiringSLACompliance: Math.round(
      (filteredJobs.filter(j => j.daysOpen <= 21).length / totalJobs) * 100
    ),
    grossMargin: Math.round(
      filteredJobs.reduce((acc, job) => acc + job.margin, 0) / totalJobs * 10
    ) / 10,
  };
};

// Helper: Filter job pipeline health by customer
export const getJobPipelineHealthByCustomer = (customerName: string | "all"): JobPipelineHealthRow[] => {
  if (customerName === "all") return jobPipelineHealth;
  return jobPipelineHealth.filter(row => row.customer === customerName);
};

// ============================================
// Pipeline Templates for Operations Manager
// ============================================

export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  hiringType: "bulk" | "fast_track";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  defaultAICoverage: number;
  defaultHITLRuleset: string;
  characteristics: string[];
  stages: WorkflowStage[];
  icon: string;
}

export const pipelineTemplates: PipelineTemplate[] = [
  {
    id: "template-nurse-t1",
    name: "Nurse Hiring - Tier 1 City",
    description: "High-volume nurse hiring for metro hospitals",
    hiringType: "bulk",
    profession: "nurse",
    jobZone: 1,
    defaultAICoverage: 85,
    defaultHITLRuleset: "standard-nursing",
    characteristics: ["6 stages", "High automation", "AI-first"],
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 4, retryPolicy: { maxRetries: 3, backoffMinutes: 15 } },
      { id: "s2", name: "Skills Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Recruiters", slaHours: 2, retryPolicy: { maxRetries: 2, backoffMinutes: 10 } },
      { id: "s3", name: "Initial Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 24, retryPolicy: { maxRetries: 5, backoffMinutes: 60 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Process", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
    icon: "Zap",
  },
  {
    id: "template-doctor-t1",
    name: "Doctor Hiring - Tier 1 City",
    description: "Premium physician recruitment with human checkpoints",
    hiringType: "fast_track",
    profession: "doctor",
    jobZone: 1,
    defaultAICoverage: 55,
    defaultHITLRuleset: "enterprise-physician",
    characteristics: ["6 stages", "Human-heavy", "Mandatory approvals"],
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Senior Screening", slaHours: 8, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s2", name: "Credential Verification", type: "match", assignedActor: "human", agentId: "agent-005", humanBackup: "Compliance Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s3", name: "Personal Outreach", type: "outreach", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s4", name: "Multi-Panel Interview", type: "interview", assignedActor: "human", agentId: null, humanBackup: "Interview Panel", slaHours: 96, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s5", name: "Offer Negotiation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Executive Team", slaHours: 120, retryPolicy: { maxRetries: 3, backoffMinutes: 480 } },
      { id: "s6", name: "Executive Onboarding", type: "join", assignedActor: "human", agentId: null, humanBackup: "HR Director", slaHours: 336, retryPolicy: { maxRetries: 1, backoffMinutes: 720 } },
    ],
    icon: "Users",
  },
  {
    id: "template-nurse-t2",
    name: "Nurse Hiring - Tier 2 City",
    description: "Standard nurse hiring for regional hospitals",
    hiringType: "bulk",
    profession: "nurse",
    jobZone: 2,
    defaultAICoverage: 80,
    defaultHITLRuleset: "standard-nursing",
    characteristics: ["6 stages", "Balanced automation", "Regional focus"],
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 6, retryPolicy: { maxRetries: 3, backoffMinutes: 20 } },
      { id: "s2", name: "Skills Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Recruiters", slaHours: 4, retryPolicy: { maxRetries: 2, backoffMinutes: 15 } },
      { id: "s3", name: "Initial Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 36, retryPolicy: { maxRetries: 4, backoffMinutes: 90 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 72, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Process", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 96, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
    icon: "Zap",
  },
  {
    id: "template-technician",
    name: "Technician Hiring - Standard",
    description: "High-automation workflow for lab and radiology technicians",
    hiringType: "bulk",
    profession: "technician",
    jobZone: 1,
    defaultAICoverage: 90,
    defaultHITLRuleset: "fast-track",
    characteristics: ["6 stages", "Maximum automation", "Fast processing"],
    stages: [
      { id: "s1", name: "Bulk Screening", type: "intake", assignedActor: "ai", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 2, retryPolicy: { maxRetries: 5, backoffMinutes: 10 } },
      { id: "s2", name: "Auto Matching", type: "match", assignedActor: "ai", agentId: "agent-002", humanBackup: "Technical Team", slaHours: 1, retryPolicy: { maxRetries: 3, backoffMinutes: 5 } },
      { id: "s3", name: "Batch Outreach", type: "outreach", assignedActor: "ai", agentId: "agent-003", humanBackup: "Recruiter Team", slaHours: 12, retryPolicy: { maxRetries: 7, backoffMinutes: 30 } },
      { id: "s4", name: "Group Interview", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 60 } },
      { id: "s5", name: "Standard Offer", type: "offer", assignedActor: "ai", agentId: null, humanBackup: "Recruiters", slaHours: 24, retryPolicy: { maxRetries: 2, backoffMinutes: 120 } },
      { id: "s6", name: "Fast Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "Onboarding Team", slaHours: 72, retryPolicy: { maxRetries: 1, backoffMinutes: 240 } },
    ],
    icon: "Bot",
  },
  {
    id: "template-pharmacist",
    name: "Pharmacist Hiring - Standard",
    description: "Balanced workflow for pharmacy professionals",
    hiringType: "fast_track",
    profession: "pharmacist",
    jobZone: 1,
    defaultAICoverage: 70,
    defaultHITLRuleset: "compliance-heavy",
    characteristics: ["6 stages", "Compliance focus", "Credential checks"],
    stages: [
      { id: "s1", name: "Profile Screening", type: "intake", assignedActor: "hybrid", agentId: "agent-001", humanBackup: "Screening Team", slaHours: 6, retryPolicy: { maxRetries: 2, backoffMinutes: 20 } },
      { id: "s2", name: "License Verification", type: "match", assignedActor: "human", agentId: "agent-005", humanBackup: "Compliance Team", slaHours: 12, retryPolicy: { maxRetries: 2, backoffMinutes: 30 } },
      { id: "s3", name: "Recruiter Outreach", type: "outreach", assignedActor: "hybrid", agentId: "agent-003", humanBackup: "Recruiters", slaHours: 36, retryPolicy: { maxRetries: 4, backoffMinutes: 90 } },
      { id: "s4", name: "Interview Scheduling", type: "interview", assignedActor: "hybrid", agentId: "agent-004", humanBackup: "Coordination Team", slaHours: 48, retryPolicy: { maxRetries: 3, backoffMinutes: 120 } },
      { id: "s5", name: "Offer Negotiation", type: "offer", assignedActor: "human", agentId: null, humanBackup: "Senior Recruiters", slaHours: 72, retryPolicy: { maxRetries: 2, backoffMinutes: 240 } },
      { id: "s6", name: "Onboarding", type: "join", assignedActor: "hybrid", agentId: "agent-007", humanBackup: "HR Team", slaHours: 168, retryPolicy: { maxRetries: 1, backoffMinutes: 480 } },
    ],
    icon: "Briefcase",
  },
];

// ============================================
// Operations Dashboard KPIs
// ============================================

export const opsDashboardKPIs = {
  activePipelines: 12,
  aiTaskDistribution: 68,
  humanTaskDistribution: 32,
  hitlQueueVolume: 47,
  hitlQueueTrend: 12,
  pipelineSLAStatus: {
    green: 8,
    amber: 3,
    red: 1,
  },
  topTemplates: [
    { name: "Nurse Hiring - Tier 1", profession: "Nurse", jobZone: 1, activeJobs: 24, aiCoverage: 85, hitlRuleset: "standard-nursing" },
    { name: "Doctor Hiring - Tier 1", profession: "Doctor", jobZone: 1, activeJobs: 8, aiCoverage: 55, hitlRuleset: "enterprise-physician" },
    { name: "Technician Standard", profession: "Technician", jobZone: 1, activeJobs: 15, aiCoverage: 90, hitlRuleset: "fast-track" },
    { name: "Nurse Hiring - Tier 2", profession: "Nurse", jobZone: 2, activeJobs: 18, aiCoverage: 80, hitlRuleset: "standard-nursing" },
  ],
  // NEW metrics for Ops Manager Dashboard
  activeJobs: 156,
  positionsRequired: 156,
  positionsFilled: 89,
  jobFulfilmentRate: 57.1,
  avgTimeToFill: 18,
  slaBreachCount: 4,
  atRiskJobs: 7,
};

// ============================================
// Ops Dashboard Filtered KPI Calculator
// ============================================

export interface OpsFilterParams {
  customerId: string;
  roleType: string;
  cityTier: string;
  dateRange: string;
}

// City tier mapping based on geography
const getCityTier = (geography: string): number => {
  const tier1Cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Gurugram"];
  const tier2Cities = ["Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh"];
  if (tier1Cities.includes(geography)) return 1;
  if (tier2Cities.includes(geography)) return 2;
  return 3;
};

// Date filter helper
const isWithinDateRange = (createdAt: string, dateRange: string): boolean => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  
  switch (dateRange) {
    case "7days": return diffDays <= 7;
    case "30days": return diffDays <= 30;
    case "90days": return diffDays <= 90;
    default: return true;
  }
};

export const calculateOpsFilteredKPIs = (filters: OpsFilterParams) => {
  // Filter jobs based on all filter parameters
  const filteredJobs = jobs.filter((job) => {
    const matchesCustomer = filters.customerId === "all" || 
      enterpriseCustomers.find(c => c.id === filters.customerId)?.name === job.employer;
    const matchesRole = filters.roleType === "all" || job.roleType === filters.roleType;
    const matchesTier = filters.cityTier === "all" || getCityTier(job.geography) === Number(filters.cityTier);
    const matchesDate = isWithinDateRange(job.createdAt, filters.dateRange);
    
    return matchesCustomer && matchesRole && matchesTier && matchesDate;
  });

  const activeJobs = filteredJobs.filter(j => j.status === "active");
  const totalJobs = filteredJobs.length || 1;
  
  // Calculate AI/Human split based on filtered jobs
  const avgAiContribution = Math.round(
    filteredJobs.reduce((acc, job) => acc + job.aiContribution, 0) / totalJobs
  );
  const avgHumanContribution = 100 - avgAiContribution;
  
  // Calculate positions filled
  const filledJobs = filteredJobs.filter(j => j.status === "filled").length;
  const totalPositions = filteredJobs.length;
  
  // Calculate SLA metrics
  const slaBreached = filteredJobs.filter(j => j.status === "active" && j.daysOpen > 21).length;
  const atRisk = filteredJobs.filter(j => j.status === "active" && j.daysOpen > 14 && j.daysOpen <= 21).length;
  
  // Calculate avg time to fill from filled jobs
  const filledJobsList = filteredJobs.filter(j => j.status === "filled");
  const avgTimeToFill = filledJobsList.length > 0
    ? Math.round(filledJobsList.reduce((acc, j) => acc + j.daysOpen, 0) / filledJobsList.length)
    : 0;
  
  // HITL queue volume (simplified - based on HITL events)
  const hitlQueueVolume = filteredJobs.reduce((acc, job) => acc + job.hitlEvents.length, 0);
  
  // Job fulfilment rate
  const jobFulfilmentRate = totalPositions > 0 
    ? Math.round((filledJobs / totalPositions) * 100 * 10) / 10
    : 0;
  
  // Pipeline SLA status
  const greenPipelines = filteredJobs.filter(j => j.status === "filled" || j.daysOpen <= 14).length;
  const amberPipelines = atRisk;
  const redPipelines = slaBreached;

  return {
    activeJobs: activeJobs.length,
    aiTaskDistribution: avgAiContribution,
    humanTaskDistribution: avgHumanContribution,
    hitlQueueVolume: Math.max(hitlQueueVolume, 3), // Minimum 3 for demo
    hitlQueueTrend: 12,
    positionsRequired: totalPositions,
    positionsFilled: filledJobs,
    jobFulfilmentRate,
    avgTimeToFill: avgTimeToFill || 18,
    slaBreachCount: slaBreached,
    atRiskJobs: atRisk,
    pipelineSLAStatus: {
      green: greenPipelines,
      amber: amberPipelines,
      red: redPipelines,
    },
  };
};

// Filter top templates based on filters
export const getFilteredTopTemplates = (filters: OpsFilterParams) => {
  let templates = [...opsDashboardKPIs.topTemplates];
  
  // Filter by role type
  if (filters.roleType !== "all") {
    templates = templates.filter(t => 
      t.profession.toLowerCase() === filters.roleType.toLowerCase()
    );
  }
  
  // Filter by tier
  if (filters.cityTier !== "all") {
    templates = templates.filter(t => t.jobZone === Number(filters.cityTier));
  }
  
  // If no templates match filters, return original list
  return templates.length > 0 ? templates : opsDashboardKPIs.topTemplates;
};

// Filter job pipeline health data based on filters
export const getFilteredJobPipelineHealth = (filters: OpsFilterParams): JobPipelineHealthRow[] => {
  // Filter jobs first, then map to pipeline health rows
  const filteredJobs = jobs.filter((job) => {
    const matchesCustomer = filters.customerId === "all" || 
      enterpriseCustomers.find(c => c.id === filters.customerId)?.name === job.employer;
    const matchesRole = filters.roleType === "all" || job.roleType === filters.roleType;
    const tier1Cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Gurugram"];
    const tier2Cities = ["Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh"];
    const getCityTier = (geography: string): number => {
      if (tier1Cities.includes(geography)) return 1;
      if (tier2Cities.includes(geography)) return 2;
      return 3;
    };
    const matchesTier = filters.cityTier === "all" || getCityTier(job.geography) === Number(filters.cityTier);
    
    return matchesCustomer && matchesRole && matchesTier;
  });

  return filteredJobs.map((job) => {
    const calculateSLARiskLocal = (daysOpen: number, status: string): "green" | "amber" | "red" => {
      if (status === "filled") return "green";
      if (daysOpen > 21) return "red";
      if (daysOpen > 14) return "amber";
      return "green";
    };
    
    const getSLADetailsLocal = (daysOpen: number, slaRisk: "green" | "amber" | "red"): string => {
      if (slaRisk === "green") return `${21 - daysOpen} days buffer`;
      if (slaRisk === "amber") return `${21 - daysOpen} days remaining`;
      return `${daysOpen - 21} days overdue`;
    };

    const slaRisk = calculateSLARiskLocal(job.daysOpen, job.status);
    return {
      jobId: job.id,
      jobTitle: job.title,
      customer: job.employer,
      currentStage: getCurrentStage(job.daysOpen),
      bottleneckStage: getBottleneckStage(job.funnel),
      aiPercentage: job.aiContribution,
      humanPercentage: job.humanContribution,
      slaRisk,
    slaDetails: getSLADetailsLocal(job.daysOpen, slaRisk),
    };
  });
};

// HITL Notifications interface and mock data
export interface HITLNotification {
  id: string;
  taskId: string;
  type: "new_task" | "priority_escalation" | "sla_warning" | "assignment";
  title: string;
  message: string;
  priority: TaskPriority;
  isRead: boolean;
  createdAt: string;
  relatedCandidate?: string;
  relatedJob?: string;
}

// Generate notifications from hitlTasks
export const hitlNotifications: HITLNotification[] = [
  {
    id: "notif-001",
    taskId: "HITL-001",
    type: "new_task",
    title: "New High Priority Task",
    message: "Low AI Confidence",
    priority: "high",
    isRead: false,
    createdAt: "2 hours ago",
    relatedCandidate: "Amit Verma",
    relatedJob: "Senior ICU Nurse",
  },
  {
    id: "notif-002",
    taskId: "HITL-002",
    type: "priority_escalation",
    title: "Enterprise Employer Task",
    message: "Enterprise Employer",
    priority: "high",
    isRead: false,
    createdAt: "4 hours ago",
    relatedCandidate: "Neha Gupta",
    relatedJob: "General Physician",
  },
  {
    id: "notif-003",
    taskId: "HITL-003",
    type: "new_task",
    title: "Senior Role Review",
    message: "Senior Doctor Roles",
    priority: "medium",
    isRead: false,
    createdAt: "6 hours ago",
    relatedCandidate: "Dr. Rajesh Kumar",
    relatedJob: "Cardiologist",
  },
  {
    id: "notif-004",
    taskId: "HITL-004",
    type: "sla_warning",
    title: "SLA Warning",
    message: "Interview Scheduling SLA - Due in 1 hour",
    priority: "medium",
    isRead: true,
    createdAt: "8 hours ago",
    relatedCandidate: "Sunita Reddy",
    relatedJob: "Emergency Paramedic",
  },
  {
    id: "notif-005",
    taskId: "HITL-005",
    type: "new_task",
    title: "Low Confidence Match",
    message: "Low AI Confidence",
    priority: "low",
    isRead: true,
    createdAt: "1 day ago",
    relatedCandidate: "Kiran Joshi",
    relatedJob: "Lab Technician",
  },
  {
    id: "notif-006",
    taskId: "HITL-006",
    type: "sla_warning",
    title: "SLA Breach Imminent",
    message: "High Drop-off Alert - 2 hours overdue",
    priority: "high",
    isRead: false,
    createdAt: "30 mins ago",
    relatedCandidate: "Priya Nair",
    relatedJob: "Staff Nurse",
  },
  {
    id: "notif-007",
    taskId: "HITL-007",
    type: "assignment",
    title: "Task Assigned to You",
    message: "High Salary Negotiation",
    priority: "medium",
    isRead: false,
    createdAt: "1 hour ago",
    relatedCandidate: "Dr. Anil Kapoor",
    relatedJob: "Head of Surgery",
  },
];

// Automation Entries for Automation Center
export interface AutomationEntry {
  id: string;
  name: string;
  type: "custom" | "system" | "template";
  triggerType: string;
  actionType: string;
  lastRun: string | null;
  triggeredCount: number;
  createdBy: string;
  createdAt: string;
  active: boolean;
}

export const automationEntries: AutomationEntry[] = [
  {
    id: "auto-001",
    name: "Psychologist_automation",
    type: "custom",
    triggerType: "stage_entered",
    actionType: "send_notification",
    lastRun: "Feb 5, 2026, 1:56 PM GMT+5:30",
    triggeredCount: 152,
    createdBy: "Prateek Saini",
    createdAt: "2026-01-15",
    active: true,
  },
  {
    id: "auto-002",
    name: "Psychiatrist_automation",
    type: "custom",
    triggerType: "candidate_matched",
    actionType: "update_ats",
    lastRun: "Feb 3, 2026, 5:42 PM GMT+5:30",
    triggeredCount: 14,
    createdBy: "Prateek Saini",
    createdAt: "2026-01-18",
    active: true,
  },
  {
    id: "auto-003",
    name: "Nurse_outreach_flow",
    type: "custom",
    triggerType: "stage_completed",
    actionType: "send_whatsapp",
    lastRun: "Feb 5, 2026, 9:15 AM GMT+5:30",
    triggeredCount: 89,
    createdBy: "Ananya Patel",
    createdAt: "2026-01-20",
    active: true,
  },
  {
    id: "auto-004",
    name: "Interview_reminder_system",
    type: "system",
    triggerType: "interview_scheduled",
    actionType: "send_notification",
    lastRun: "Feb 5, 2026, 2:30 PM GMT+5:30",
    triggeredCount: 456,
    createdBy: "System",
    createdAt: "2025-12-01",
    active: true,
  },
  {
    id: "auto-005",
    name: "SLA_breach_escalation",
    type: "system",
    triggerType: "sla_breach",
    actionType: "create_task",
    lastRun: "Feb 4, 2026, 11:20 AM GMT+5:30",
    triggeredCount: 23,
    createdBy: "System",
    createdAt: "2025-12-01",
    active: true,
  },
  {
    id: "auto-006",
    name: "Doctor_sourcing_template",
    type: "template",
    triggerType: "stage_entered",
    actionType: "update_ats",
    lastRun: "Feb 2, 2026, 3:45 PM GMT+5:30",
    triggeredCount: 67,
    createdBy: "Rahul Mehta",
    createdAt: "2026-01-10",
    active: true,
  },
  {
    id: "auto-007",
    name: "Offer_released_notify",
    type: "custom",
    triggerType: "offer_released",
    actionType: "send_notification",
    lastRun: "Feb 5, 2026, 10:00 AM GMT+5:30",
    triggeredCount: 34,
    createdBy: "Vikram Singh",
    createdAt: "2026-01-25",
    active: false,
  },
  {
    id: "auto-008",
    name: "Candidate_screening_auto",
    type: "template",
    triggerType: "stage_entered",
    actionType: "schedule_interview",
    lastRun: null,
    triggeredCount: 0,
    createdBy: "Deepa Kumar",
    createdAt: "2026-02-01",
    active: false,
  },
  {
    id: "auto-009",
    name: "Pharmacist_pipeline_flow",
    type: "custom",
    triggerType: "candidate_matched",
    actionType: "send_whatsapp",
    lastRun: "Feb 4, 2026, 4:12 PM GMT+5:30",
    triggeredCount: 28,
    createdBy: "Prateek Saini",
    createdAt: "2026-01-22",
    active: true,
  },
  {
    id: "auto-010",
    name: "Lab_tech_recruitment",
    type: "custom",
    triggerType: "stage_completed",
    actionType: "update_ats",
    lastRun: "Feb 3, 2026, 2:00 PM GMT+5:30",
    triggeredCount: 45,
    createdBy: "Ananya Patel",
    createdAt: "2026-01-28",
    active: true,
  },
  {
    id: "auto-011",
    name: "Emergency_hire_fast_track",
    type: "system",
    triggerType: "stage_entered",
    actionType: "create_task",
    lastRun: "Feb 5, 2026, 8:30 AM GMT+5:30",
    triggeredCount: 12,
    createdBy: "System",
    createdAt: "2025-12-15",
    active: true,
  },
  {
    id: "auto-012",
    name: "Paramedic_onboarding",
    type: "template",
    triggerType: "offer_released",
    actionType: "send_notification",
    lastRun: "Feb 1, 2026, 5:00 PM GMT+5:30",
    triggeredCount: 19,
    createdBy: "Rahul Mehta",
    createdAt: "2026-01-12",
    active: true,
  },
];

// Additional Ankura Hospital Jobs for Customer Dashboard
const ankuraHospitalJobs: Job[] = [
  {
    id: "JOB-011",
    title: "Night Shift Nurse",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "nurse",
    geography: "Delhi",
    status: "active",
    createdAt: "2024-01-18",
    daysOpen: 11,
    funnel: [
      { name: "Candidate Lead", candidates: 178, aiHandled: 160, humanHandled: 18, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 142, aiHandled: 130, humanHandled: 12, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 85, aiHandled: 85, humanHandled: 0, avgTimeInStage: "4 hours" },
      { name: "Recruiter Contacted", candidates: 62, aiHandled: 45, humanHandled: 17, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 28, aiHandled: 12, humanHandled: 16, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 10, aiHandled: 2, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 4, aiHandled: 1, humanHandled: 3, avgTimeInStage: "5 days" },
    ],
    aiContribution: 70,
    humanContribution: 30,
    revenue: 320000,
    cost: 95000,
    margin: 70.3,
    hitlEvents: [
      { id: "evt-011", type: "escalation", reason: "Night shift preference conflict", assignee: "Priya Sharma", resolution: "Alternate shift offered", duration: "3 hours", timestamp: "2 days ago" },
    ],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 178, appeared: 142, qualified: 118, disqualified: 18, pending: 6,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 82, humanPercentage: 14, hitlPercentage: 4,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 79.9, dropOffRate: 20.1,
        jobsSwaasaMetrics: {
          jobImpressions: 9850, uniqueCandidateViews: 6120, jobCTR: 3.0,
          saveRate: 11.2, shareRate: 1.9, matchScoreAvg: 76,
          contentQualityScore: 82, aiRankedImpressions: 82,
          manualBoosted: 14, hitlOverrideRate: 4,
        },
        progressFunnel: [
          { label: "Job Published", count: 420, percentage: 100 },
          { label: "Job Indexed", count: 399, percentage: 95 },
          { label: "Job Ranked by AI", count: 357, percentage: 85 },
          { label: "Job Viewed", count: 260, percentage: 62 },
          { label: "Apply Clicked", count: 160, percentage: 38 },
        ],
      },
      "job-discovery": {
        sent: 178, appeared: 142, qualified: 118, disqualified: 18, pending: 6,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 75, humanPercentage: 20, hitlPercentage: 5,
        avgTimeInStage: "5 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 79.9, dropOffRate: 20.1,
        channels: { app: 42, web: 32, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 3850, searchResultCTR: 8.2, filterUsageRate: 40,
          recommendationClickRate: 22.0, aiMatchConfidence: 80,
          top10RelevanceScore: 74, coldStartRate: 8.5,
          searchLatency: "115ms", rankingConfidenceDrift: 2.3,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3850, percentage: 100 },
          { label: "Results Generated", count: 3657, percentage: 95 },
          { label: "Filters Applied", count: 1540, percentage: 40 },
          { label: "Job Card Viewed", count: 1347, percentage: 35 },
          { label: "Job Opened", count: 770, percentage: 20 },
          { label: "Interest Clicked", count: 270, percentage: 7 },
        ],
      },
      "expression": {
        sent: 142, appeared: 118, qualified: 85, disqualified: 28, pending: 5,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 62, humanPercentage: 32, hitlPercentage: 6,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 72.0, dropOffRate: 28.0,
        channels: { app: 50, whatsapp: 30, recruiterOutreach: 20 },
        eoiMetrics: {
          eoiClickRate: 36, leadCaptureRate: 80, consentCompletionRate: 92,
          intentScore: 70, fraudDetectionRate: 1.4, duplicateLeadRate: 4.8,
          aiAutoQualified: 62, hitlReviewedLeads: 10,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 270, percentage: 100 },
          { label: "Details Submitted", count: 238, percentage: 88 },
          { label: "Consent Given", count: 224, percentage: 83 },
          { label: "Lead Scored", count: 205, percentage: 76 },
          { label: "Routed to Pipeline", count: 142, percentage: 53 },
        ],
      },
      "prescreen": {
        sent: 85, appeared: 62, qualified: 42, disqualified: 15, pending: 5,
        avgResponseTime: "3.5 hours", handler: "AE",
        aiPercentage: 90, humanPercentage: 6, hitlPercentage: 4,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 67.7, dropOffRate: 32.3,
        preScreenMetrics: {
          questionStartRate: 90, completionRate: 76, knockoutRate: 16,
          passRate: 68, falseRejectionRate: 2.2, resumeParseConfidence: 87,
          aiAutoReject: 14, hitlOverride: 5, manualApproval: 7,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 85, percentage: 100 },
          { label: "Candidate Started", count: 77, percentage: 91 },
          { label: "Questions Completed", count: 62, percentage: 73 },
          { label: "Auto-Scored", count: 58, percentage: 68 },
          { label: "Passed / Failed / Escalated", count: 42, percentage: 49 },
        ],
      },
      "voice-agent": {
        sent: 42, appeared: 35, qualified: 28, disqualified: 5, pending: 2,
        avgResponseTime: "12 mins", handler: "X+",
        aiPercentage: 86, humanPercentage: 7, hitlPercentage: 7,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        voiceScreeningMetrics: {
          callAttemptRate: 94, callConnectRate: 83, avgCallDuration: "4m 15s",
          aiPassRate: 76, humanPassRate: 84, dropOffDuringCall: 7,
          speechRecognitionConfidence: 90, responseConfidenceScore: 84,
          hiringManagerFitScore: 77, aiFullyScreened: 74,
          hitlReview: 10, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 42, percentage: 100 },
          { label: "Call Dialed", count: 40, percentage: 95 },
          { label: "Call Connected", count: 35, percentage: 83 },
          { label: "Questions Asked", count: 32, percentage: 76 },
          { label: "AI Evaluation Completed", count: 30, percentage: 71 },
          { label: "Final Outcome", count: 28, percentage: 67 },
        ],
      },
      "scheduling": {
        sent: 28, appeared: 24, qualified: 18, disqualified: 4, pending: 2,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 72, humanPercentage: 22, hitlPercentage: 6,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 28,
          interviewInvitesSent: 24,
          interviewScheduled: 20,
          interviewCompleted: 15,
          noShowRate: 12,
          feedbackSubmitted: 13,
          aiSchedulingPercentage: 72,
          humanSchedulingPercentage: 22,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "3h",
          candidateConfirmationTime: "5h",
          scheduleWithinSLA: 90,
          confirmationWithinSLA: 85,
          feedbackWithinSLA: 78,
          interviewConversionRate: 75,
          timeToInterview: "2.5d",
          interviewToOfferRatio: 40,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 28, percentage: 100 },
          { label: "Interview Invites Sent", count: 24, percentage: 86 },
          { label: "Interview Scheduled", count: 20, percentage: 71 },
          { label: "Interview Completed", count: 15, percentage: 54 },
          { label: "Feedback Submitted", count: 13, percentage: 46 },
        ],
      },
      "silver-med": {
        sent: 6, appeared: 6, qualified: 5, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 68, humanPercentage: 27, hitlPercentage: 5,
        avgTimeInStage: "4 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        silverMedalistMetrics: {
          candidatesTagged: 6,
          reEngagementInvitesSent: 5,
          reAppliedToNewJobs: 3,
          conversionToHire: 1,
          aiTaggingRate: 68,
          humanOverrideRate: 27,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "6h",
          candidateReEngagementResponseTime: "1.5d",
          taggingWithinSLA: 94,
          reEngagementWithinSLA: 88,
          followUpWithinSLA: 80,
          silverToHireConversionRate: 20,
          talentPoolReuseRate: 32,
          costSavedVsFreshSourcing: 1000,
          candidateRetentionScore: 80,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 6, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 5, percentage: 83 },
          { label: "Re-applied to New Jobs", count: 3, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 17 },
        ],
      },
      "talent-community": {
        sent: 3, appeared: 3, qualified: 3, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 58, humanPercentage: 37, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 3,
          activeCommunityMembers: 2800,
          contentEngagementRate: 42,
          candidatesActivatedIntoPipeline: 10,
          communityToHireConversion: 2,
          aiCommunityTagging: 58,
          humanCommunityModeration: 37,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "10h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 72,
          contentRefreshWithinSLA: 82,
          communityActivationRate: 14,
          passiveToActiveRate: 11,
          longTermHireRate: 7,
          employerBrandEngagementIndex: 76,
        },
        progressFunnel: [
          { label: "Added to Community", count: 3, percentage: 100 },
          { label: "Active Members", count: 2800, percentage: 78 },
          { label: "Content Engaged", count: 1176, percentage: 42 },
          { label: "Activated into Pipeline", count: 10, percentage: 10 },
          { label: "Converted to Hire", count: 1, percentage: 2 },
        ],
      },
    },
  },
  {
    id: "JOB-012",
    title: "Emergency Room Physician",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Bangalore",
    status: "active",
    createdAt: "2024-01-08",
    daysOpen: 21,
    funnel: [
      { name: "Candidate Lead", candidates: 89, aiHandled: 78, humanHandled: 11, avgTimeInStage: "2 days" },
      { name: "Profile Completed", candidates: 72, aiHandled: 65, humanHandled: 7, avgTimeInStage: "3 days" },
      { name: "AI Matched", candidates: 45, aiHandled: 45, humanHandled: 0, avgTimeInStage: "6 hours" },
      { name: "Recruiter Contacted", candidates: 32, aiHandled: 20, humanHandled: 12, avgTimeInStage: "2 days" },
      { name: "Interview Scheduled", candidates: 18, aiHandled: 6, humanHandled: 12, avgTimeInStage: "4 days" },
      { name: "Offer Released", candidates: 6, aiHandled: 1, humanHandled: 5, avgTimeInStage: "3 days" },
      { name: "Placement Confirmed", candidates: 2, aiHandled: 0, humanHandled: 2, avgTimeInStage: "6 days" },
    ],
    aiContribution: 58,
    humanContribution: 42,
    revenue: 920000,
    cost: 310000,
    margin: 66.3,
    hitlEvents: [
      { id: "evt-012", type: "review", reason: "High salary negotiation", assignee: "Rahul Mehta", resolution: "Counter-offer approved", duration: "5 hours", timestamp: "1 day ago" },
      { id: "evt-013", type: "escalation", reason: "Credential verification needed", assignee: "Ananya Patel", resolution: "Verified and approved", duration: "8 hours", timestamp: "3 days ago" },
    ],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 89, appeared: 72, qualified: 58, disqualified: 10, pending: 4,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 70, humanPercentage: 24, hitlPercentage: 6,
        avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "amber",
        conversionRate: 80.6, dropOffRate: 19.4,
        jobsSwaasaMetrics: {
          jobImpressions: 5420, uniqueCandidateViews: 3280, jobCTR: 2.6,
          saveRate: 14.5, shareRate: 2.8, matchScoreAvg: 84,
          contentQualityScore: 90, aiRankedImpressions: 70,
          manualBoosted: 22, hitlOverrideRate: 8,
        },
        progressFunnel: [
          { label: "Job Published", count: 180, percentage: 100 },
          { label: "Job Indexed", count: 171, percentage: 95 },
          { label: "Job Ranked by AI", count: 153, percentage: 85 },
          { label: "Job Viewed", count: 108, percentage: 60 },
          { label: "Apply Clicked", count: 65, percentage: 36 },
        ],
      },
      "job-discovery": {
        sent: 89, appeared: 72, qualified: 58, disqualified: 10, pending: 4,
        avgResponseTime: "3 hours", handler: "C",
        aiPercentage: 65, humanPercentage: 28, hitlPercentage: 7,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 80.6, dropOffRate: 19.4,
        channels: { app: 35, web: 38, whatsapp: 15, jobBoards: 12 },
        jobDiscoveryMetrics: {
          searchSessions: 2150, searchResultCTR: 6.8, filterUsageRate: 45,
          recommendationClickRate: 25.0, aiMatchConfidence: 86,
          top10RelevanceScore: 80, coldStartRate: 6.5,
          searchLatency: "130ms", rankingConfidenceDrift: 1.8,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 2150, percentage: 100 },
          { label: "Results Generated", count: 2042, percentage: 95 },
          { label: "Filters Applied", count: 967, percentage: 45 },
          { label: "Job Card Viewed", count: 752, percentage: 35 },
          { label: "Job Opened", count: 430, percentage: 20 },
          { label: "Interest Clicked", count: 150, percentage: 7 },
        ],
      },
      "expression": {
        sent: 72, appeared: 58, qualified: 45, disqualified: 10, pending: 3,
        avgResponseTime: "2.5 hours", handler: "C",
        aiPercentage: 58, humanPercentage: 35, hitlPercentage: 7,
        avgTimeInStage: "14 hours", slaThreshold: "24 hours", slaStatus: "amber",
        conversionRate: 77.6, dropOffRate: 22.4,
        channels: { app: 48, whatsapp: 25, recruiterOutreach: 27 },
        eoiMetrics: {
          eoiClickRate: 40, leadCaptureRate: 85, consentCompletionRate: 96,
          intentScore: 78, fraudDetectionRate: 0.8, duplicateLeadRate: 3.2,
          aiAutoQualified: 58, hitlReviewedLeads: 12,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 150, percentage: 100 },
          { label: "Details Submitted", count: 135, percentage: 90 },
          { label: "Consent Given", count: 130, percentage: 87 },
          { label: "Lead Scored", count: 118, percentage: 79 },
          { label: "Routed to Pipeline", count: 72, percentage: 48 },
        ],
      },
      "prescreen": {
        sent: 45, appeared: 36, qualified: 28, disqualified: 6, pending: 2,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 85, humanPercentage: 10, hitlPercentage: 5,
        avgTimeInStage: "5 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 77.8, dropOffRate: 22.2,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 80, knockoutRate: 12,
          passRate: 78, falseRejectionRate: 1.8, resumeParseConfidence: 92,
          aiAutoReject: 10, hitlOverride: 6, manualApproval: 10,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 45, percentage: 100 },
          { label: "Candidate Started", count: 40, percentage: 89 },
          { label: "Questions Completed", count: 36, percentage: 80 },
          { label: "Auto-Scored", count: 34, percentage: 76 },
          { label: "Passed / Failed / Escalated", count: 28, percentage: 62 },
        ],
      },
      "voice-agent": {
        sent: 28, appeared: 24, qualified: 18, disqualified: 4, pending: 2,
        avgResponseTime: "18 mins", handler: "X+",
        aiPercentage: 80, humanPercentage: 12, hitlPercentage: 8,
        avgTimeInStage: "3 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        voiceScreeningMetrics: {
          callAttemptRate: 92, callConnectRate: 86, avgCallDuration: "5m 45s",
          aiPassRate: 70, humanPassRate: 85, dropOffDuringCall: 6,
          speechRecognitionConfidence: 93, responseConfidenceScore: 88,
          hiringManagerFitScore: 82, aiFullyScreened: 68,
          hitlReview: 15, humanInterview: 17,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 28, percentage: 100 },
          { label: "Call Dialed", count: 26, percentage: 93 },
          { label: "Call Connected", count: 24, percentage: 86 },
          { label: "Questions Asked", count: 22, percentage: 79 },
          { label: "AI Evaluation Completed", count: 20, percentage: 71 },
          { label: "Final Outcome", count: 18, percentage: 64 },
        ],
      },
      "scheduling": {
        sent: 18, appeared: 15, qualified: 12, disqualified: 2, pending: 1,
        avgResponseTime: "8 hours", handler: "AE",
        aiPercentage: 65, humanPercentage: 28, hitlPercentage: 7,
        avgTimeInStage: "1.5 days", slaThreshold: "2 days", slaStatus: "amber",
        conversionRate: 80.0, dropOffRate: 20.0,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 18,
          interviewInvitesSent: 15,
          interviewScheduled: 12,
          interviewCompleted: 10,
          noShowRate: 10,
          feedbackSubmitted: 9,
          aiSchedulingPercentage: 65,
          humanSchedulingPercentage: 28,
          hitlApprovalPercentage: 7,
          aiSlotSuggestionTime: "3m",
          recruiterActionTime: "6h",
          candidateConfirmationTime: "8h",
          scheduleWithinSLA: 82,
          confirmationWithinSLA: 78,
          feedbackWithinSLA: 72,
          interviewConversionRate: 80,
          timeToInterview: "4d",
          interviewToOfferRatio: 50,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 18, percentage: 100 },
          { label: "Interview Invites Sent", count: 15, percentage: 83 },
          { label: "Interview Scheduled", count: 12, percentage: 67 },
          { label: "Interview Completed", count: 10, percentage: 56 },
          { label: "Feedback Submitted", count: 9, percentage: 50 },
        ],
      },
      "silver-med": {
        sent: 4, appeared: 4, qualified: 3, disqualified: 0, pending: 1,
        avgResponseTime: "3 days", handler: "R",
        aiPercentage: 65, humanPercentage: 30, hitlPercentage: 5,
        avgTimeInStage: "6 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 4,
          reEngagementInvitesSent: 3,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 65,
          humanOverrideRate: 30,
          hitlReviewRate: 5,
          aiClassificationTime: "2m",
          recruiterReviewTime: "10h",
          candidateReEngagementResponseTime: "2.5d",
          taggingWithinSLA: 88,
          reEngagementWithinSLA: 82,
          followUpWithinSLA: 75,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 30,
          costSavedVsFreshSourcing: 1500,
          candidateRetentionScore: 78,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 4, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 3, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 55, humanPercentage: 40, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 1850,
          contentEngagementRate: 48,
          candidatesActivatedIntoPipeline: 8,
          communityToHireConversion: 4,
          aiCommunityTagging: 55,
          humanCommunityModeration: 40,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1.5h",
          recruiterCommunityActionTime: "14h",
          candidateResponseTime: "2d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 68,
          contentRefreshWithinSLA: 80,
          communityActivationRate: 12,
          passiveToActiveRate: 10,
          longTermHireRate: 9,
          employerBrandEngagementIndex: 80,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 1850, percentage: 75 },
          { label: "Content Engaged", count: 888, percentage: 48 },
          { label: "Activated into Pipeline", count: 8, percentage: 8 },
          { label: "Converted to Hire", count: 1, percentage: 4 },
        ],
      },
    },
  },
  {
    id: "JOB-013",
    title: "Operating Room Technician",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "technician",
    geography: "Mumbai",
    status: "filled",
    createdAt: "2024-01-02",
    daysOpen: 28,
    funnel: [
      { name: "Candidate Lead", candidates: 134, aiHandled: 120, humanHandled: 14, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 108, aiHandled: 100, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 72, aiHandled: 72, humanHandled: 0, avgTimeInStage: "5 hours" },
      { name: "Recruiter Contacted", candidates: 52, aiHandled: 38, humanHandled: 14, avgTimeInStage: "1.5 days" },
      { name: "Interview Scheduled", candidates: 28, aiHandled: 12, humanHandled: 16, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 12, aiHandled: 2, humanHandled: 10, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 8, aiHandled: 2, humanHandled: 6, avgTimeInStage: "4 days" },
    ],
    aiContribution: 68,
    humanContribution: 32,
    revenue: 480000,
    cost: 145000,
    margin: 69.8,
    hitlEvents: [],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 134, appeared: 108, qualified: 92, disqualified: 12, pending: 4,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 80, humanPercentage: 16, hitlPercentage: 4,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 85.2, dropOffRate: 14.8,
        jobsSwaasaMetrics: {
          jobImpressions: 7820, uniqueCandidateViews: 4950, jobCTR: 2.9,
          saveRate: 10.8, shareRate: 1.6, matchScoreAvg: 79,
          contentQualityScore: 84, aiRankedImpressions: 80,
          manualBoosted: 16, hitlOverrideRate: 4,
        },
        progressFunnel: [
          { label: "Job Published", count: 320, percentage: 100 },
          { label: "Job Indexed", count: 304, percentage: 95 },
          { label: "Job Ranked by AI", count: 272, percentage: 85 },
          { label: "Job Viewed", count: 192, percentage: 60 },
          { label: "Apply Clicked", count: 115, percentage: 36 },
        ],
      },
      "job-discovery": {
        sent: 134, appeared: 108, qualified: 92, disqualified: 12, pending: 4,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 76, humanPercentage: 20, hitlPercentage: 4,
        avgTimeInStage: "6 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 85.2, dropOffRate: 14.8,
        channels: { app: 44, web: 30, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 3120, searchResultCTR: 8.0, filterUsageRate: 42,
          recommendationClickRate: 24.0, aiMatchConfidence: 81,
          top10RelevanceScore: 76, coldStartRate: 7.8,
          searchLatency: "118ms", rankingConfidenceDrift: 2.0,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3120, percentage: 100 },
          { label: "Results Generated", count: 2964, percentage: 95 },
          { label: "Filters Applied", count: 1310, percentage: 42 },
          { label: "Job Card Viewed", count: 1092, percentage: 35 },
          { label: "Job Opened", count: 624, percentage: 20 },
          { label: "Interest Clicked", count: 218, percentage: 7 },
        ],
      },
      "expression": {
        sent: 108, appeared: 92, qualified: 72, disqualified: 15, pending: 5,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 68, humanPercentage: 28, hitlPercentage: 4,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 78.3, dropOffRate: 21.7,
        channels: { app: 52, whatsapp: 28, recruiterOutreach: 20 },
        eoiMetrics: {
          eoiClickRate: 42, leadCaptureRate: 84, consentCompletionRate: 95,
          intentScore: 74, fraudDetectionRate: 1.0, duplicateLeadRate: 3.8,
          aiAutoQualified: 68, hitlReviewedLeads: 6,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 218, percentage: 100 },
          { label: "Details Submitted", count: 192, percentage: 88 },
          { label: "Consent Given", count: 182, percentage: 83 },
          { label: "Lead Scored", count: 166, percentage: 76 },
          { label: "Routed to Pipeline", count: 108, percentage: 50 },
        ],
      },
      "prescreen": {
        sent: 72, appeared: 58, qualified: 42, disqualified: 12, pending: 4,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 88, humanPercentage: 8, hitlPercentage: 4,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 72.4, dropOffRate: 27.6,
        preScreenMetrics: {
          questionStartRate: 90, completionRate: 81, knockoutRate: 15,
          passRate: 72, falseRejectionRate: 2.0, resumeParseConfidence: 88,
          aiAutoReject: 12, hitlOverride: 4, manualApproval: 8,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 72, percentage: 100 },
          { label: "Candidate Started", count: 65, percentage: 90 },
          { label: "Questions Completed", count: 58, percentage: 81 },
          { label: "Auto-Scored", count: 54, percentage: 75 },
          { label: "Passed / Failed / Escalated", count: 42, percentage: 58 },
        ],
      },
      "voice-agent": {
        sent: 42, appeared: 36, qualified: 28, disqualified: 6, pending: 2,
        avgResponseTime: "14 mins", handler: "X+",
        aiPercentage: 85, humanPercentage: 8, hitlPercentage: 7,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 77.8, dropOffRate: 22.2,
        voiceScreeningMetrics: {
          callAttemptRate: 95, callConnectRate: 86, avgCallDuration: "4m 20s",
          aiPassRate: 75, humanPassRate: 82, dropOffDuringCall: 7,
          speechRecognitionConfidence: 91, responseConfidenceScore: 86,
          hiringManagerFitScore: 79, aiFullyScreened: 72,
          hitlReview: 12, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 42, percentage: 100 },
          { label: "Call Dialed", count: 40, percentage: 95 },
          { label: "Call Connected", count: 36, percentage: 86 },
          { label: "Questions Asked", count: 33, percentage: 79 },
          { label: "AI Evaluation Completed", count: 30, percentage: 71 },
          { label: "Final Outcome", count: 28, percentage: 67 },
        ],
      },
      "scheduling": {
        sent: 28, appeared: 24, qualified: 20, disqualified: 3, pending: 1,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 74, humanPercentage: 21, hitlPercentage: 5,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 28,
          interviewInvitesSent: 24,
          interviewScheduled: 20,
          interviewCompleted: 18,
          noShowRate: 10,
          feedbackSubmitted: 16,
          aiSchedulingPercentage: 74,
          humanSchedulingPercentage: 21,
          hitlApprovalPercentage: 5,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "4h",
          candidateConfirmationTime: "5h",
          scheduleWithinSLA: 92,
          confirmationWithinSLA: 88,
          feedbackWithinSLA: 82,
          interviewConversionRate: 83,
          timeToInterview: "2.5d",
          interviewToOfferRatio: 50,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 28, percentage: 100 },
          { label: "Interview Invites Sent", count: 24, percentage: 86 },
          { label: "Interview Scheduled", count: 20, percentage: 71 },
          { label: "Interview Completed", count: 18, percentage: 64 },
          { label: "Feedback Submitted", count: 16, percentage: 57 },
        ],
      },
      "silver-med": {
        sent: 4, appeared: 4, qualified: 3, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 72, humanPercentage: 23, hitlPercentage: 5,
        avgTimeInStage: "4 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 4,
          reEngagementInvitesSent: 3,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 72,
          humanOverrideRate: 23,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "7h",
          candidateReEngagementResponseTime: "1.5d",
          taggingWithinSLA: 94,
          reEngagementWithinSLA: 88,
          followUpWithinSLA: 82,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 38,
          costSavedVsFreshSourcing: 1100,
          candidateRetentionScore: 84,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 4, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 3, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 62, humanPercentage: 33, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 2400,
          contentEngagementRate: 44,
          candidatesActivatedIntoPipeline: 9,
          communityToHireConversion: 3,
          aiCommunityTagging: 62,
          humanCommunityModeration: 33,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "11h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 74,
          contentRefreshWithinSLA: 86,
          communityActivationRate: 16,
          passiveToActiveRate: 13,
          longTermHireRate: 8,
          employerBrandEngagementIndex: 79,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 2400, percentage: 80 },
          { label: "Content Engaged", count: 1056, percentage: 44 },
          { label: "Activated into Pipeline", count: 9, percentage: 9 },
          { label: "Converted to Hire", count: 1, percentage: 3 },
        ],
      },
    },
  },
  {
    id: "JOB-014",
    title: "Head Nurse - Cardiology",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "nurse",
    geography: "Chennai",
    status: "active",
    createdAt: "2024-01-12",
    daysOpen: 17,
    funnel: [
      { name: "Candidate Lead", candidates: 98, aiHandled: 85, humanHandled: 13, avgTimeInStage: "1.5 days" },
      { name: "Profile Completed", candidates: 78, aiHandled: 70, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 52, aiHandled: 52, humanHandled: 0, avgTimeInStage: "5 hours" },
      { name: "Recruiter Contacted", candidates: 38, aiHandled: 26, humanHandled: 12, avgTimeInStage: "1.5 days" },
      { name: "Interview Scheduled", candidates: 20, aiHandled: 8, humanHandled: 12, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 8, aiHandled: 1, humanHandled: 7, avgTimeInStage: "2.5 days" },
      { name: "Placement Confirmed", candidates: 3, aiHandled: 1, humanHandled: 2, avgTimeInStage: "5 days" },
    ],
    aiContribution: 62,
    humanContribution: 38,
    revenue: 520000,
    cost: 168000,
    margin: 67.7,
    hitlEvents: [
      { id: "evt-014", type: "escalation", reason: "Senior role verification", assignee: "Priya Sharma", resolution: "Credentials verified", duration: "4 hours", timestamp: "2 days ago" },
    ],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 98, appeared: 78, qualified: 65, disqualified: 10, pending: 3,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 75, humanPercentage: 20, hitlPercentage: 5,
        avgTimeInStage: "1.5 days", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        jobsSwaasaMetrics: {
          jobImpressions: 6280, uniqueCandidateViews: 3920, jobCTR: 2.7,
          saveRate: 12.8, shareRate: 2.2, matchScoreAvg: 81,
          contentQualityScore: 87, aiRankedImpressions: 75,
          manualBoosted: 18, hitlOverrideRate: 5,
        },
        progressFunnel: [
          { label: "Job Published", count: 240, percentage: 100 },
          { label: "Job Indexed", count: 228, percentage: 95 },
          { label: "Job Ranked by AI", count: 204, percentage: 85 },
          { label: "Job Viewed", count: 144, percentage: 60 },
          { label: "Apply Clicked", count: 86, percentage: 36 },
        ],
      },
      "job-discovery": {
        sent: 98, appeared: 78, qualified: 65, disqualified: 10, pending: 3,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 72, humanPercentage: 23, hitlPercentage: 5,
        avgTimeInStage: "7 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        channels: { app: 40, web: 34, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 2680, searchResultCTR: 7.5, filterUsageRate: 44,
          recommendationClickRate: 23.5, aiMatchConfidence: 83,
          top10RelevanceScore: 78, coldStartRate: 7.2,
          searchLatency: "122ms", rankingConfidenceDrift: 1.9,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 2680, percentage: 100 },
          { label: "Results Generated", count: 2546, percentage: 95 },
          { label: "Filters Applied", count: 1179, percentage: 44 },
          { label: "Job Card Viewed", count: 938, percentage: 35 },
          { label: "Job Opened", count: 536, percentage: 20 },
          { label: "Interest Clicked", count: 188, percentage: 7 },
        ],
      },
      "expression": {
        sent: 78, appeared: 65, qualified: 52, disqualified: 10, pending: 3,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 64, humanPercentage: 30, hitlPercentage: 6,
        avgTimeInStage: "11 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        channels: { app: 50, whatsapp: 28, recruiterOutreach: 22 },
        eoiMetrics: {
          eoiClickRate: 39, leadCaptureRate: 83, consentCompletionRate: 94,
          intentScore: 75, fraudDetectionRate: 1.1, duplicateLeadRate: 4.0,
          aiAutoQualified: 64, hitlReviewedLeads: 9,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 188, percentage: 100 },
          { label: "Details Submitted", count: 165, percentage: 88 },
          { label: "Consent Given", count: 156, percentage: 83 },
          { label: "Lead Scored", count: 143, percentage: 76 },
          { label: "Routed to Pipeline", count: 78, percentage: 41 },
        ],
      },
      "prescreen": {
        sent: 52, appeared: 42, qualified: 32, disqualified: 8, pending: 2,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 86, humanPercentage: 9, hitlPercentage: 5,
        avgTimeInStage: "4.5 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 76.2, dropOffRate: 23.8,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 81, knockoutRate: 14,
          passRate: 76, falseRejectionRate: 2.1, resumeParseConfidence: 90,
          aiAutoReject: 11, hitlOverride: 5, manualApproval: 9,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 52, percentage: 100 },
          { label: "Candidate Started", count: 46, percentage: 88 },
          { label: "Questions Completed", count: 42, percentage: 81 },
          { label: "Auto-Scored", count: 39, percentage: 75 },
          { label: "Passed / Failed / Escalated", count: 32, percentage: 62 },
        ],
      },
      "voice-agent": {
        sent: 32, appeared: 27, qualified: 20, disqualified: 5, pending: 2,
        avgResponseTime: "15 mins", handler: "X+",
        aiPercentage: 82, humanPercentage: 10, hitlPercentage: 8,
        avgTimeInStage: "2.5 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 74.1, dropOffRate: 25.9,
        voiceScreeningMetrics: {
          callAttemptRate: 93, callConnectRate: 84, avgCallDuration: "4m 40s",
          aiPassRate: 72, humanPassRate: 80, dropOffDuringCall: 8,
          speechRecognitionConfidence: 90, responseConfidenceScore: 84,
          hiringManagerFitScore: 78, aiFullyScreened: 70,
          hitlReview: 13, humanInterview: 17,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 32, percentage: 100 },
          { label: "Call Dialed", count: 30, percentage: 94 },
          { label: "Call Connected", count: 27, percentage: 84 },
          { label: "Questions Asked", count: 25, percentage: 78 },
          { label: "AI Evaluation Completed", count: 22, percentage: 69 },
          { label: "Final Outcome", count: 20, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 20, appeared: 17, qualified: 14, disqualified: 2, pending: 1,
        avgResponseTime: "6 hours", handler: "AE",
        aiPercentage: 70, humanPercentage: 24, hitlPercentage: 6,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 82.4, dropOffRate: 17.6,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 20,
          interviewInvitesSent: 17,
          interviewScheduled: 14,
          interviewCompleted: 12,
          noShowRate: 12,
          feedbackSubmitted: 10,
          aiSchedulingPercentage: 70,
          humanSchedulingPercentage: 24,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "5h",
          candidateConfirmationTime: "6h",
          scheduleWithinSLA: 86,
          confirmationWithinSLA: 80,
          feedbackWithinSLA: 76,
          interviewConversionRate: 82,
          timeToInterview: "3d",
          interviewToOfferRatio: 45,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 20, percentage: 100 },
          { label: "Interview Invites Sent", count: 17, percentage: 85 },
          { label: "Interview Scheduled", count: 14, percentage: 70 },
          { label: "Interview Completed", count: 12, percentage: 60 },
          { label: "Feedback Submitted", count: 10, percentage: 50 },
        ],
      },
      "silver-med": {
        sent: 5, appeared: 5, qualified: 4, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 68, humanPercentage: 27, hitlPercentage: 5,
        avgTimeInStage: "5 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        silverMedalistMetrics: {
          candidatesTagged: 5,
          reEngagementInvitesSent: 4,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 68,
          humanOverrideRate: 27,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "8h",
          candidateReEngagementResponseTime: "2d",
          taggingWithinSLA: 90,
          reEngagementWithinSLA: 84,
          followUpWithinSLA: 78,
          silverToHireConversionRate: 20,
          talentPoolReuseRate: 34,
          costSavedVsFreshSourcing: 1150,
          candidateRetentionScore: 81,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 5, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 4, percentage: 80 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 40 },
          { label: "Converted to Hire", count: 1, percentage: 20 },
        ],
      },
      "talent-community": {
        sent: 3, appeared: 3, qualified: 3, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 60, humanPercentage: 35, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 3,
          activeCommunityMembers: 2650,
          contentEngagementRate: 46,
          candidatesActivatedIntoPipeline: 11,
          communityToHireConversion: 3,
          aiCommunityTagging: 60,
          humanCommunityModeration: 35,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "11h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 72,
          contentRefreshWithinSLA: 84,
          communityActivationRate: 15,
          passiveToActiveRate: 12,
          longTermHireRate: 8,
          employerBrandEngagementIndex: 78,
        },
        progressFunnel: [
          { label: "Added to Community", count: 3, percentage: 100 },
          { label: "Active Members", count: 2650, percentage: 79 },
          { label: "Content Engaged", count: 1219, percentage: 46 },
          { label: "Activated into Pipeline", count: 11, percentage: 11 },
          { label: "Converted to Hire", count: 1, percentage: 3 },
        ],
      },
    },
  },
  {
    id: "JOB-015",
    title: "Junior Resident Doctor",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "doctor",
    geography: "Hyderabad",
    status: "active",
    createdAt: "2024-01-20",
    daysOpen: 9,
    funnel: [
      { name: "Candidate Lead", candidates: 156, aiHandled: 140, humanHandled: 16, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 128, aiHandled: 118, humanHandled: 10, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 82, aiHandled: 82, humanHandled: 0, avgTimeInStage: "4 hours" },
      { name: "Recruiter Contacted", candidates: 58, aiHandled: 42, humanHandled: 16, avgTimeInStage: "1 day" },
      { name: "Interview Scheduled", candidates: 26, aiHandled: 10, humanHandled: 16, avgTimeInStage: "2 days" },
      { name: "Offer Released", candidates: 8, aiHandled: 1, humanHandled: 7, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 2, aiHandled: 0, humanHandled: 2, avgTimeInStage: "4 days" },
    ],
    aiContribution: 65,
    humanContribution: 35,
    revenue: 680000,
    cost: 220000,
    margin: 67.6,
    hitlEvents: [
      { id: "evt-015", type: "review", reason: "Medical license verification", assignee: "Rahul Mehta", resolution: "Verified and approved", duration: "6 hours", timestamp: "1 day ago" },
    ],
    workflowId: "wf-002",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 156, appeared: 128, qualified: 105, disqualified: 18, pending: 5,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 78, humanPercentage: 18, hitlPercentage: 4,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 82.0, dropOffRate: 18.0,
        jobsSwaasaMetrics: {
          jobImpressions: 8950, uniqueCandidateViews: 5680, jobCTR: 3.1,
          saveRate: 13.2, shareRate: 2.4, matchScoreAvg: 80,
          contentQualityScore: 86, aiRankedImpressions: 78,
          manualBoosted: 16, hitlOverrideRate: 4,
        },
        progressFunnel: [
          { label: "Job Published", count: 380, percentage: 100 },
          { label: "Job Indexed", count: 361, percentage: 95 },
          { label: "Job Ranked by AI", count: 323, percentage: 85 },
          { label: "Job Viewed", count: 228, percentage: 60 },
          { label: "Apply Clicked", count: 137, percentage: 36 },
        ],
      },
      "job-discovery": {
        sent: 156, appeared: 128, qualified: 105, disqualified: 18, pending: 5,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 75, humanPercentage: 20, hitlPercentage: 5,
        avgTimeInStage: "5 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 82.0, dropOffRate: 18.0,
        channels: { app: 45, web: 30, whatsapp: 15, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 3850, searchResultCTR: 8.4, filterUsageRate: 41,
          recommendationClickRate: 24.0, aiMatchConfidence: 82,
          top10RelevanceScore: 77, coldStartRate: 7.5,
          searchLatency: "115ms", rankingConfidenceDrift: 2.0,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 3850, percentage: 100 },
          { label: "Results Generated", count: 3657, percentage: 95 },
          { label: "Filters Applied", count: 1578, percentage: 41 },
          { label: "Job Card Viewed", count: 1347, percentage: 35 },
          { label: "Job Opened", count: 770, percentage: 20 },
          { label: "Interest Clicked", count: 270, percentage: 7 },
        ],
      },
      "expression": {
        sent: 128, appeared: 105, qualified: 82, disqualified: 18, pending: 5,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 66, humanPercentage: 28, hitlPercentage: 6,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 78.1, dropOffRate: 21.9,
        channels: { app: 52, whatsapp: 26, recruiterOutreach: 22 },
        eoiMetrics: {
          eoiClickRate: 40, leadCaptureRate: 84, consentCompletionRate: 95,
          intentScore: 76, fraudDetectionRate: 1.0, duplicateLeadRate: 3.6,
          aiAutoQualified: 66, hitlReviewedLeads: 8,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 270, percentage: 100 },
          { label: "Details Submitted", count: 238, percentage: 88 },
          { label: "Consent Given", count: 224, percentage: 83 },
          { label: "Lead Scored", count: 205, percentage: 76 },
          { label: "Routed to Pipeline", count: 128, percentage: 47 },
        ],
      },
      "prescreen": {
        sent: 82, appeared: 65, qualified: 48, disqualified: 14, pending: 3,
        avgResponseTime: "3.5 hours", handler: "AE",
        aiPercentage: 88, humanPercentage: 8, hitlPercentage: 4,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 73.8, dropOffRate: 26.2,
        preScreenMetrics: {
          questionStartRate: 90, completionRate: 79, knockoutRate: 15,
          passRate: 74, falseRejectionRate: 1.9, resumeParseConfidence: 91,
          aiAutoReject: 12, hitlOverride: 5, manualApproval: 8,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 82, percentage: 100 },
          { label: "Candidate Started", count: 74, percentage: 90 },
          { label: "Questions Completed", count: 65, percentage: 79 },
          { label: "Auto-Scored", count: 61, percentage: 74 },
          { label: "Passed / Failed / Escalated", count: 48, percentage: 59 },
        ],
      },
      "voice-agent": {
        sent: 48, appeared: 40, qualified: 32, disqualified: 6, pending: 2,
        avgResponseTime: "12 mins", handler: "X+",
        aiPercentage: 84, humanPercentage: 9, hitlPercentage: 7,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 80.0, dropOffRate: 20.0,
        voiceScreeningMetrics: {
          callAttemptRate: 94, callConnectRate: 83, avgCallDuration: "5m 10s",
          aiPassRate: 74, humanPassRate: 83, dropOffDuringCall: 6,
          speechRecognitionConfidence: 92, responseConfidenceScore: 87,
          hiringManagerFitScore: 80, aiFullyScreened: 72,
          hitlReview: 11, humanInterview: 17,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 48, percentage: 100 },
          { label: "Call Dialed", count: 45, percentage: 94 },
          { label: "Call Connected", count: 40, percentage: 83 },
          { label: "Questions Asked", count: 37, percentage: 77 },
          { label: "AI Evaluation Completed", count: 35, percentage: 73 },
          { label: "Final Outcome", count: 32, percentage: 67 },
        ],
      },
      "scheduling": {
        sent: 32, appeared: 27, qualified: 22, disqualified: 3, pending: 2,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 72, humanPercentage: 22, hitlPercentage: 6,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 81.5, dropOffRate: 18.5,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 32,
          interviewInvitesSent: 27,
          interviewScheduled: 22,
          interviewCompleted: 18,
          noShowRate: 11,
          feedbackSubmitted: 15,
          aiSchedulingPercentage: 72,
          humanSchedulingPercentage: 22,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "4h",
          candidateConfirmationTime: "5h",
          scheduleWithinSLA: 88,
          confirmationWithinSLA: 84,
          feedbackWithinSLA: 78,
          interviewConversionRate: 82,
          timeToInterview: "2.5d",
          interviewToOfferRatio: 42,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 32, percentage: 100 },
          { label: "Interview Invites Sent", count: 27, percentage: 84 },
          { label: "Interview Scheduled", count: 22, percentage: 69 },
          { label: "Interview Completed", count: 18, percentage: 56 },
          { label: "Feedback Submitted", count: 15, percentage: 47 },
        ],
      },
      "silver-med": {
        sent: 6, appeared: 6, qualified: 5, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 70, humanPercentage: 25, hitlPercentage: 5,
        avgTimeInStage: "4 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        silverMedalistMetrics: {
          candidatesTagged: 6,
          reEngagementInvitesSent: 5,
          reAppliedToNewJobs: 3,
          conversionToHire: 1,
          aiTaggingRate: 70,
          humanOverrideRate: 25,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "7h",
          candidateReEngagementResponseTime: "1.5d",
          taggingWithinSLA: 92,
          reEngagementWithinSLA: 86,
          followUpWithinSLA: 80,
          silverToHireConversionRate: 20,
          talentPoolReuseRate: 36,
          costSavedVsFreshSourcing: 1300,
          candidateRetentionScore: 82,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 6, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 5, percentage: 83 },
          { label: "Re-applied to New Jobs", count: 3, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 17 },
        ],
      },
      "talent-community": {
        sent: 4, appeared: 4, qualified: 4, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 62, humanPercentage: 33, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 4,
          activeCommunityMembers: 2980,
          contentEngagementRate: 47,
          candidatesActivatedIntoPipeline: 13,
          communityToHireConversion: 4,
          aiCommunityTagging: 62,
          humanCommunityModeration: 33,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "10h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 74,
          contentRefreshWithinSLA: 86,
          communityActivationRate: 16,
          passiveToActiveRate: 13,
          longTermHireRate: 9,
          employerBrandEngagementIndex: 80,
        },
        progressFunnel: [
          { label: "Added to Community", count: 4, percentage: 100 },
          { label: "Active Members", count: 2980, percentage: 81 },
          { label: "Content Engaged", count: 1400, percentage: 47 },
          { label: "Activated into Pipeline", count: 13, percentage: 13 },
          { label: "Converted to Hire", count: 1, percentage: 4 },
        ],
      },
    },
  },
  {
    id: "JOB-016",
    title: "Dialysis Technician",
    employer: "Ankura Hospital",
    employerTier: "enterprise",
    roleType: "technician",
    geography: "Delhi",
    status: "closed",
    createdAt: "2023-12-20",
    daysOpen: 45,
    funnel: [
      { name: "Candidate Lead", candidates: 112, aiHandled: 100, humanHandled: 12, avgTimeInStage: "1 day" },
      { name: "Profile Completed", candidates: 92, aiHandled: 85, humanHandled: 7, avgTimeInStage: "2 days" },
      { name: "AI Matched", candidates: 58, aiHandled: 58, humanHandled: 0, avgTimeInStage: "5 hours" },
      { name: "Recruiter Contacted", candidates: 42, aiHandled: 30, humanHandled: 12, avgTimeInStage: "1.5 days" },
      { name: "Interview Scheduled", candidates: 22, aiHandled: 9, humanHandled: 13, avgTimeInStage: "3 days" },
      { name: "Offer Released", candidates: 10, aiHandled: 2, humanHandled: 8, avgTimeInStage: "2 days" },
      { name: "Placement Confirmed", candidates: 6, aiHandled: 1, humanHandled: 5, avgTimeInStage: "5 days" },
    ],
    aiContribution: 66,
    humanContribution: 34,
    revenue: 360000,
    cost: 115000,
    margin: 68.1,
    hitlEvents: [],
    workflowId: "wf-001",
    enhancedStageMetrics: {
      "jobs-ankura": {
        sent: 112, appeared: 92, qualified: 78, disqualified: 10, pending: 4,
        avgResponseTime: "1 hour", handler: "C",
        aiPercentage: 82, humanPercentage: 14, hitlPercentage: 4,
        avgTimeInStage: "1 day", slaThreshold: "3 days", slaStatus: "green",
        conversionRate: 84.8, dropOffRate: 15.2,
        jobsSwaasaMetrics: {
          jobImpressions: 6420, uniqueCandidateViews: 4080, jobCTR: 2.8,
          saveRate: 10.5, shareRate: 1.5, matchScoreAvg: 77,
          contentQualityScore: 82, aiRankedImpressions: 82,
          manualBoosted: 14, hitlOverrideRate: 4,
        },
        progressFunnel: [
          { label: "Job Published", count: 280, percentage: 100 },
          { label: "Job Indexed", count: 266, percentage: 95 },
          { label: "Job Ranked by AI", count: 238, percentage: 85 },
          { label: "Job Viewed", count: 168, percentage: 60 },
          { label: "Apply Clicked", count: 101, percentage: 36 },
        ],
      },
      "job-discovery": {
        sent: 112, appeared: 92, qualified: 78, disqualified: 10, pending: 4,
        avgResponseTime: "1.5 hours", handler: "C",
        aiPercentage: 78, humanPercentage: 18, hitlPercentage: 4,
        avgTimeInStage: "6 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 84.8, dropOffRate: 15.2,
        channels: { app: 44, web: 30, whatsapp: 16, jobBoards: 10 },
        jobDiscoveryMetrics: {
          searchSessions: 2680, searchResultCTR: 7.8, filterUsageRate: 40,
          recommendationClickRate: 22.5, aiMatchConfidence: 79,
          top10RelevanceScore: 74, coldStartRate: 8.0,
          searchLatency: "120ms", rankingConfidenceDrift: 2.2,
        },
        progressFunnel: [
          { label: "Search Triggered", count: 2680, percentage: 100 },
          { label: "Results Generated", count: 2546, percentage: 95 },
          { label: "Filters Applied", count: 1072, percentage: 40 },
          { label: "Job Card Viewed", count: 938, percentage: 35 },
          { label: "Job Opened", count: 536, percentage: 20 },
          { label: "Interest Clicked", count: 188, percentage: 7 },
        ],
      },
      "expression": {
        sent: 92, appeared: 78, qualified: 58, disqualified: 15, pending: 5,
        avgResponseTime: "2 hours", handler: "C",
        aiPercentage: 70, humanPercentage: 26, hitlPercentage: 4,
        avgTimeInStage: "10 hours", slaThreshold: "24 hours", slaStatus: "green",
        conversionRate: 74.4, dropOffRate: 25.6,
        channels: { app: 50, whatsapp: 30, recruiterOutreach: 20 },
        eoiMetrics: {
          eoiClickRate: 38, leadCaptureRate: 82, consentCompletionRate: 94,
          intentScore: 72, fraudDetectionRate: 1.2, duplicateLeadRate: 4.2,
          aiAutoQualified: 70, hitlReviewedLeads: 6,
        },
        progressFunnel: [
          { label: "Interest Clicked", count: 188, percentage: 100 },
          { label: "Details Submitted", count: 165, percentage: 88 },
          { label: "Consent Given", count: 156, percentage: 83 },
          { label: "Lead Scored", count: 143, percentage: 76 },
          { label: "Routed to Pipeline", count: 92, percentage: 49 },
        ],
      },
      "prescreen": {
        sent: 58, appeared: 46, qualified: 35, disqualified: 8, pending: 3,
        avgResponseTime: "4 hours", handler: "AE",
        aiPercentage: 90, humanPercentage: 6, hitlPercentage: 4,
        avgTimeInStage: "4 hours", slaThreshold: "12 hours", slaStatus: "green",
        conversionRate: 76.1, dropOffRate: 23.9,
        preScreenMetrics: {
          questionStartRate: 88, completionRate: 79, knockoutRate: 14,
          passRate: 76, falseRejectionRate: 2.0, resumeParseConfidence: 88,
          aiAutoReject: 11, hitlOverride: 4, manualApproval: 7,
        },
        progressFunnel: [
          { label: "Questions Loaded", count: 58, percentage: 100 },
          { label: "Candidate Started", count: 51, percentage: 88 },
          { label: "Questions Completed", count: 46, percentage: 79 },
          { label: "Auto-Scored", count: 43, percentage: 74 },
          { label: "Passed / Failed / Escalated", count: 35, percentage: 60 },
        ],
      },
      "voice-agent": {
        sent: 35, appeared: 29, qualified: 22, disqualified: 5, pending: 2,
        avgResponseTime: "14 mins", handler: "X+",
        aiPercentage: 86, humanPercentage: 8, hitlPercentage: 6,
        avgTimeInStage: "2 hours", slaThreshold: "6 hours", slaStatus: "green",
        conversionRate: 75.9, dropOffRate: 24.1,
        voiceScreeningMetrics: {
          callAttemptRate: 94, callConnectRate: 83, avgCallDuration: "4m 25s",
          aiPassRate: 73, humanPassRate: 81, dropOffDuringCall: 7,
          speechRecognitionConfidence: 90, responseConfidenceScore: 85,
          hiringManagerFitScore: 77, aiFullyScreened: 74,
          hitlReview: 10, humanInterview: 16,
        },
        progressFunnel: [
          { label: "Call Scheduled", count: 35, percentage: 100 },
          { label: "Call Dialed", count: 33, percentage: 94 },
          { label: "Call Connected", count: 29, percentage: 83 },
          { label: "Questions Asked", count: 27, percentage: 77 },
          { label: "AI Evaluation Completed", count: 25, percentage: 71 },
          { label: "Final Outcome", count: 22, percentage: 63 },
        ],
      },
      "scheduling": {
        sent: 22, appeared: 18, qualified: 15, disqualified: 2, pending: 1,
        avgResponseTime: "5 hours", handler: "AE",
        aiPercentage: 74, humanPercentage: 20, hitlPercentage: 6,
        avgTimeInStage: "1 day", slaThreshold: "2 days", slaStatus: "green",
        conversionRate: 83.3, dropOffRate: 16.7,
        interviewSchedulingMetrics: {
          candidatesQualifiedForInterview: 22,
          interviewInvitesSent: 18,
          interviewScheduled: 15,
          interviewCompleted: 13,
          noShowRate: 10,
          feedbackSubmitted: 11,
          aiSchedulingPercentage: 74,
          humanSchedulingPercentage: 20,
          hitlApprovalPercentage: 6,
          aiSlotSuggestionTime: "2m",
          recruiterActionTime: "4h",
          candidateConfirmationTime: "5h",
          scheduleWithinSLA: 90,
          confirmationWithinSLA: 85,
          feedbackWithinSLA: 80,
          interviewConversionRate: 83,
          timeToInterview: "2.5d",
          interviewToOfferRatio: 48,
        },
        progressFunnel: [
          { label: "Qualified for Interview", count: 22, percentage: 100 },
          { label: "Interview Invites Sent", count: 18, percentage: 82 },
          { label: "Interview Scheduled", count: 15, percentage: 68 },
          { label: "Interview Completed", count: 13, percentage: 59 },
          { label: "Feedback Submitted", count: 11, percentage: 50 },
        ],
      },
      "silver-med": {
        sent: 4, appeared: 4, qualified: 3, disqualified: 0, pending: 1,
        avgResponseTime: "2 days", handler: "R",
        aiPercentage: 72, humanPercentage: 23, hitlPercentage: 5,
        avgTimeInStage: "5 days", slaThreshold: "14 days", slaStatus: "green",
        conversionRate: 75.0, dropOffRate: 25.0,
        silverMedalistMetrics: {
          candidatesTagged: 4,
          reEngagementInvitesSent: 3,
          reAppliedToNewJobs: 2,
          conversionToHire: 1,
          aiTaggingRate: 72,
          humanOverrideRate: 23,
          hitlReviewRate: 5,
          aiClassificationTime: "1m",
          recruiterReviewTime: "7h",
          candidateReEngagementResponseTime: "1.5d",
          taggingWithinSLA: 94,
          reEngagementWithinSLA: 88,
          followUpWithinSLA: 82,
          silverToHireConversionRate: 25,
          talentPoolReuseRate: 38,
          costSavedVsFreshSourcing: 950,
          candidateRetentionScore: 83,
        },
        progressFunnel: [
          { label: "Tagged as Silver Medalist", count: 4, percentage: 100 },
          { label: "Re-engagement Invites Sent", count: 3, percentage: 75 },
          { label: "Re-applied to New Jobs", count: 2, percentage: 50 },
          { label: "Converted to Hire", count: 1, percentage: 25 },
        ],
      },
      "talent-community": {
        sent: 2, appeared: 2, qualified: 2, disqualified: 0, pending: 0,
        avgResponseTime: "1 day", handler: "C",
        aiPercentage: 64, humanPercentage: 31, hitlPercentage: 5,
        avgTimeInStage: "ongoing", slaThreshold: "N/A", slaStatus: "green",
        conversionRate: 100, dropOffRate: 0,
        talentCommunityMetrics: {
          candidatesAddedToCommunity: 2,
          activeCommunityMembers: 2200,
          contentEngagementRate: 43,
          candidatesActivatedIntoPipeline: 8,
          communityToHireConversion: 3,
          aiCommunityTagging: 64,
          humanCommunityModeration: 31,
          hitlModeration: 5,
          aiEngagementTriggerTime: "1h",
          recruiterCommunityActionTime: "11h",
          candidateResponseTime: "1.5d",
          outreachFrequencySLA: "Weekly",
          activationWithinSLA: 72,
          contentRefreshWithinSLA: 84,
          communityActivationRate: 14,
          passiveToActiveRate: 11,
          longTermHireRate: 7,
          employerBrandEngagementIndex: 77,
        },
        progressFunnel: [
          { label: "Added to Community", count: 2, percentage: 100 },
          { label: "Active Members", count: 2200, percentage: 78 },
          { label: "Content Engaged", count: 946, percentage: 43 },
          { label: "Activated into Pipeline", count: 8, percentage: 8 },
          { label: "Converted to Hire", count: 1, percentage: 3 },
        ],
      },
    },
  },
];

// Merge Ankura jobs into main jobs array
jobs.push(...ankuraHospitalJobs);

// Customer-specific jobs (Ankura Hospital)
export const customerJobs = jobs.filter(job => job.employer === "Ankura Hospital");
