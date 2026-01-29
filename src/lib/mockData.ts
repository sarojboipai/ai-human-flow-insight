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
