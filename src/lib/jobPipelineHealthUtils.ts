import type { Job, JobPipelineHealthRow } from "@/lib/mockData";

const getCurrentStage = (daysOpen: number): string => {
  if (daysOpen < 5) return "Lead Ingested";
  if (daysOpen < 10) return "AI Match Generated";
  if (daysOpen < 15) return "Recruiter Contacted";
  if (daysOpen < 20) return "Interview Scheduled";
  if (daysOpen < 25) return "Offer Extended";
  return "Placement";
};

const getBottleneckStage = (funnel: { name: string; candidates: number }[]): string => {
  let minConversion = 100;
  let bottleneck = funnel[0]?.name || "Unknown";
  for (let i = 1; i < funnel.length; i++) {
    const prev = funnel[i - 1]?.candidates || 1;
    const curr = funnel[i]?.candidates || 0;
    const conversion = (curr / prev) * 100;
    if (conversion < minConversion) {
      minConversion = conversion;
      bottleneck = funnel[i]?.name || "Unknown";
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

export function deriveJobPipelineHealth(jobs: Job[], customerFilter?: string): JobPipelineHealthRow[] {
  const filtered = customerFilter && customerFilter !== "all"
    ? jobs.filter(j => j.employer === customerFilter)
    : jobs;

  const mapped = filtered.map((job) => {
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

  mapped.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));

  return mapped;
}
