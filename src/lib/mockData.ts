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
