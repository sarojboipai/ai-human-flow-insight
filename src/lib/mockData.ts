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
}

export const jobs: Job[] = [
  {
    id: "JOB-001",
    title: "Senior ICU Nurse",
    employer: "Apollo Hospitals",
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
  },
  {
    id: "JOB-002",
    title: "General Physician",
    employer: "Fortis Healthcare",
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
  },
  {
    id: "JOB-003",
    title: "Emergency Paramedic",
    employer: "Max Healthcare",
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
  },
  {
    id: "JOB-004",
    title: "Lab Technician",
    employer: "Narayana Health",
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
  },
  {
    id: "JOB-005",
    title: "Pediatric Nurse",
    employer: "Rainbow Hospitals",
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
  },
  {
    id: "JOB-006",
    title: "Cardiologist",
    employer: "Medanta",
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

export type RuleType = "confidence" | "business" | "anomaly" | "sla";
export type OperatorType = ">" | "<" | "=" | ">=" | "<=" | "!=";
export type ActionType = "route_to_queue" | "alert" | "escalate" | "block";
export type TargetQueue = "recruiter_review" | "ops_escalation" | "enterprise_priority";
export type RuleStatus = "active" | "paused" | "draft";
export type TaskStatus = "pending" | "assigned" | "in_review" | "approved" | "rejected" | "escalated";
export type TaskPriority = "high" | "medium" | "low";
export type AuditEventType = "rule_triggered" | "task_created" | "task_assigned" | "task_resolved" | "task_escalated";

export interface HITLRuleV2 {
  id: string;
  name: string;
  description: string;
  ruleType: RuleType;
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
];

export const targetQueues: { value: TargetQueue; label: string }[] = [
  { value: "recruiter_review", label: "Recruiter Review Queue" },
  { value: "ops_escalation", label: "Ops Escalation Queue" },
  { value: "enterprise_priority", label: "Enterprise Priority Queue" },
];

// Extended HITL Rules with full structure
export const hitlRulesV2: HITLRuleV2[] = [
  {
    id: "rule-001",
    name: "Low AI Confidence",
    description: "Route candidates with low AI match confidence for human review",
    ruleType: "confidence",
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
