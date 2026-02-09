import { jobs, enterpriseCustomers } from "./mockData";

// AOP Target Constants
export const aopTargets = {
  totalJobs: 50000,
  totalPlacements: 10000,
  revenue: 12000000000, // ₹120 Cr in paisa-style (120 * 1Cr)
  grossMargin: 45,
  aiCoverage: 75,
};

// Weekly WBR trend data
export const wbrWeeklyData = [
  { date: "W1 Jan", aiMatches: 820, humanMatches: 340, placements: 92 },
  { date: "W2 Jan", aiMatches: 910, humanMatches: 365, placements: 105 },
  { date: "W3 Jan", aiMatches: 980, humanMatches: 390, placements: 118 },
  { date: "W4 Jan", aiMatches: 1045, humanMatches: 410, placements: 125 },
  { date: "W1 Feb", aiMatches: 1120, humanMatches: 435, placements: 138 },
  { date: "W2 Feb", aiMatches: 1190, humanMatches: 460, placements: 148 },
  { date: "W3 Feb", aiMatches: 1260, humanMatches: 480, placements: 155 },
  { date: "W4 Feb", aiMatches: 1340, humanMatches: 505, placements: 165 },
];

// Strategic levers
export interface StrategicLever {
  id: string;
  name: string;
  value: string;
  description: string;
  icon: string;
}

export const strategicLevers: StrategicLever[] = [
  {
    id: "lever-1",
    name: "AI Coverage Target",
    value: "75%",
    description: "Target percentage of tasks handled by AI across all stages",
    icon: "bot",
  },
  {
    id: "lever-2",
    name: "HITL Threshold",
    value: "AI confidence < 80%",
    description: "Escalate to human review when AI confidence drops below threshold",
    icon: "shield",
  },
  {
    id: "lever-3",
    name: "SLA Policy",
    value: "Screening < 6 hrs",
    description: "Maximum time allowed for initial candidate screening stage",
    icon: "clock",
  },
  {
    id: "lever-4",
    name: "Hiring Priority",
    value: "Nurse - Tier 1 Cities",
    description: "Current top-priority hiring focus for resource allocation",
    icon: "target",
  },
];

// WBR KPI calculation
export interface WBRKPIs {
  activeJobs: number;
  candidatesInPipeline: number;
  weeklyPlacements: number;
  aiAutomationRate: number;
  hitlLoad: number;
  slaCompliance: number;
}

export function calculateWBRKPIs(filteredJobs: typeof jobs): WBRKPIs {
  const activeJobs = filteredJobs.filter((j) => j.status === "active").length;

  const candidatesInPipeline = filteredJobs.reduce((sum, job) => {
    const topFunnel = job.funnel[0];
    return sum + (topFunnel ? topFunnel.candidates : 0);
  }, 0);

  const weeklyPlacements = filteredJobs.reduce((sum, job) => {
    const lastStage = job.funnel[job.funnel.length - 1];
    return sum + (lastStage ? lastStage.candidates : 0);
  }, 0);

  const totalAi = filteredJobs.reduce((s, j) => s + j.aiContribution, 0);
  const aiAutomationRate = filteredJobs.length > 0 ? Math.round(totalAi / filteredJobs.length) : 0;

  const hitlLoad = filteredJobs.length > 0
    ? Math.round(100 - aiAutomationRate - (filteredJobs.reduce((s, j) => s + j.humanContribution, 0) / filteredJobs.length) * 0.6)
    : 0;

  const slaCompliance = 91; // mock static

  return {
    activeJobs,
    candidatesInPipeline,
    weeklyPlacements,
    aiAutomationRate,
    hitlLoad: Math.max(5, Math.min(hitlLoad, 25)),
    slaCompliance,
  };
}

// AOP Variance calculation
export interface AOPVarianceRow {
  metric: string;
  target: string;
  actual: string;
  variancePercent: number;
  progress: number;
  status: "on-track" | "minor-risk" | "off-track";
}

export function calculateAOPVariance(filteredJobs: typeof jobs): AOPVarianceRow[] {
  const activeJobCount = filteredJobs.length;
  const totalPlacements = filteredJobs.reduce((s, j) => {
    const last = j.funnel[j.funnel.length - 1];
    return s + (last ? last.candidates : 0);
  }, 0);
  const totalRevenue = filteredJobs.reduce((s, j) => s + j.revenue, 0);
  const avgMargin = filteredJobs.length > 0
    ? filteredJobs.reduce((s, j) => s + j.margin, 0) / filteredJobs.length
    : 0;
  const avgAi = filteredJobs.length > 0
    ? filteredJobs.reduce((s, j) => s + j.aiContribution, 0) / filteredJobs.length
    : 0;

  // Scale up from sample to projected annualized
  const scaleFactor = 2941; // 50000 / 17 jobs sample
  const projectedJobs = activeJobCount * scaleFactor;
  const projectedPlacements = totalPlacements * scaleFactor;
  const projectedRevenue = totalRevenue * scaleFactor;

  const rows: AOPVarianceRow[] = [
    {
      metric: "Total Jobs",
      target: "50,000",
      actual: projectedJobs.toLocaleString("en-IN"),
      variancePercent: Math.round(((projectedJobs - aopTargets.totalJobs) / aopTargets.totalJobs) * 100),
      progress: Math.min(100, Math.round((projectedJobs / aopTargets.totalJobs) * 100)),
      status: "on-track",
    },
    {
      metric: "Total Placements",
      target: "10,000",
      actual: projectedPlacements.toLocaleString("en-IN"),
      variancePercent: Math.round(((projectedPlacements - aopTargets.totalPlacements) / aopTargets.totalPlacements) * 100),
      progress: Math.min(100, Math.round((projectedPlacements / aopTargets.totalPlacements) * 100)),
      status: "on-track",
    },
    {
      metric: "Revenue",
      target: "₹120 Cr",
      actual: `₹${Math.round(projectedRevenue / 10000000)} Cr`,
      variancePercent: Math.round(((projectedRevenue - aopTargets.revenue) / aopTargets.revenue) * 100),
      progress: Math.min(100, Math.round((projectedRevenue / aopTargets.revenue) * 100)),
      status: "on-track",
    },
    {
      metric: "Gross Margin",
      target: "45%",
      actual: `${avgMargin.toFixed(1)}%`,
      variancePercent: Math.round(((avgMargin - aopTargets.grossMargin) / aopTargets.grossMargin) * 100),
      progress: Math.min(100, Math.round((avgMargin / aopTargets.grossMargin) * 100)),
      status: "on-track",
    },
    {
      metric: "AI Coverage",
      target: "75%",
      actual: `${avgAi.toFixed(1)}%`,
      variancePercent: Math.round(((avgAi - aopTargets.aiCoverage) / aopTargets.aiCoverage) * 100),
      progress: Math.min(100, Math.round((avgAi / aopTargets.aiCoverage) * 100)),
      status: "on-track",
    },
  ];

  // Assign status based on variance thresholds
  rows.forEach((row) => {
    if (row.variancePercent >= -5) {
      row.status = "on-track";
    } else if (row.variancePercent >= -15) {
      row.status = "minor-risk";
    } else {
      row.status = "off-track";
    }
  });

  return rows;
}

// Customer AOP Performance
export interface CustomerAOPPerformance {
  id: string;
  name: string;
  aopJobs: number;
  actualJobs: number;
  placements: number;
  revenue: string;
  slaPercent: number;
  aiPercent: number;
}

export function calculateCustomerAOPPerformance(): CustomerAOPPerformance[] {
  const customerAopTargets: Record<string, number> = {
    "Ankura Hospital": 5000,
    "Oasis Fertility": 4000,
    "Manipal Hospitals": 6000,
    "Apollo Hospitals": 8000,
    "Fortis Healthcare": 7000,
    "Max Healthcare": 5500,
    "Narayana Health": 6500,
    "Bhrungi Hospitals": 3000,
  };

  return enterpriseCustomers.map((cust) => {
    const custJobs = jobs.filter((j) => j.employer === cust.name);
    const totalPlacements = custJobs.reduce((s, j) => {
      const last = j.funnel[j.funnel.length - 1];
      return s + (last ? last.candidates : 0);
    }, 0);
    const totalRevenue = custJobs.reduce((s, j) => s + j.revenue, 0);
    const avgAi = custJobs.length > 0
      ? Math.round(custJobs.reduce((s, j) => s + j.aiContribution, 0) / custJobs.length)
      : 0;

    const scaledJobs = custJobs.length * 2941;

    return {
      id: cust.id,
      name: cust.name,
      aopJobs: customerAopTargets[cust.name] || 3000,
      actualJobs: scaledJobs,
      placements: totalPlacements * 180,
      revenue: `₹${Math.round((totalRevenue * 180) / 10000000)} Cr`,
      slaPercent: Math.round(85 + Math.random() * 12),
      aiPercent: avgAi,
    };
  });
}

// Risk flag generation
export interface RiskFlag {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
}

export function generateRiskFlags(
  kpis: WBRKPIs,
  aopVariance: AOPVarianceRow[]
): RiskFlag[] {
  const flags: RiskFlag[] = [];

  // Check placement run rate
  const placementRow = aopVariance.find((r) => r.metric === "Total Placements");
  if (placementRow && placementRow.variancePercent < -10) {
    flags.push({
      id: "risk-1",
      severity: "error",
      message: `Hiring velocity is ${Math.abs(placementRow.variancePercent)}% below AOP required run rate. Current weekly placements (${kpis.weeklyPlacements}) need to increase to meet annual target.`,
    });
  }

  // Check AI coverage
  const aiRow = aopVariance.find((r) => r.metric === "AI Coverage");
  if (aiRow && aiRow.variancePercent < -5) {
    flags.push({
      id: "risk-2",
      severity: "warning",
      message: `AI automation below target by ${Math.abs(aiRow.variancePercent)}%. Consider expanding AI agent coverage in screening and matching stages.`,
    });
  }

  // Check gross margin
  const marginRow = aopVariance.find((r) => r.metric === "Gross Margin");
  if (marginRow && marginRow.variancePercent < -5) {
    flags.push({
      id: "risk-3",
      severity: "warning",
      message: `Gross margin trending ${Math.abs(marginRow.variancePercent)}% below plan. Review cost-per-placement and recruiter staffing efficiency.`,
    });
  }

  // SLA compliance
  if (kpis.slaCompliance < 90) {
    flags.push({
      id: "risk-4",
      severity: "error",
      message: `SLA compliance at ${kpis.slaCompliance}% — below 90% threshold. Multiple stages may be experiencing delays.`,
    });
  }

  // HITL overload
  if (kpis.hitlLoad > 15) {
    flags.push({
      id: "risk-5",
      severity: "info",
      message: `HITL review load at ${kpis.hitlLoad}%. Optimize AI confidence thresholds to reduce manual escalations.`,
    });
  }

  // Revenue
  const revenueRow = aopVariance.find((r) => r.metric === "Revenue");
  if (revenueRow && revenueRow.variancePercent < -15) {
    flags.push({
      id: "risk-6",
      severity: "error",
      message: `Revenue is ${Math.abs(revenueRow.variancePercent)}% below AOP target. Accelerate enterprise customer onboarding and placement velocity.`,
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "risk-ok",
      severity: "info",
      message: "All metrics are tracking within acceptable range of AOP targets. Continue current operational tempo.",
    });
  }

  return flags;
}

// WBR workload donut data
export function getWBRWorkloadData(kpis: WBRKPIs) {
  const humanPct = 100 - kpis.aiAutomationRate - kpis.hitlLoad;
  return [
    { name: "AI Automated", value: kpis.aiAutomationRate, color: "hsl(173, 58%, 45%)" },
    { name: "Human Handled", value: humanPct, color: "hsl(38, 92%, 50%)" },
    { name: "HITL Review", value: kpis.hitlLoad, color: "hsl(199, 89%, 48%)" },
  ];
}

// WBR duration filter options
export const wbrDurationOptions = [
  { value: "this-week", label: "This Week" },
  { value: "last-week", label: "Last Week" },
  { value: "this-month", label: "This Month" },
  { value: "qtd", label: "QTD" },
  { value: "ytd", label: "YTD" },
  { value: "custom", label: "Custom Range" },
];
