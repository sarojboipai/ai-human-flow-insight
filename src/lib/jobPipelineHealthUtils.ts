import type { Job, JobPipelineHealthRow } from "@/lib/mockData";

const getCurrentStage = (daysOpen: number): string => {
  if (daysOpen < 5) return "Lead Ingested";
  if (daysOpen < 10) return "AI Match Generated";
  if (daysOpen < 15) return "Recruiter Contacted";
  if (daysOpen < 20) return "Interview Scheduled";
  if (daysOpen < 25) return "Offer Extended";
  return "Placement";
};

const getBottleneckStage = (funnel: { name: string; candidates: number }[], jobIndex: number): string => {
  // Most jobs show "Candidate Shortage" as the bottleneck
  const alternates = ["SLA Breach", "Offer Declined", "Interview No-Show"];
  if (jobIndex % 5 === 0) return alternates[0];
  if (jobIndex % 7 === 0) return alternates[1];
  if (jobIndex % 9 === 0) return alternates[2];
  return "Candidate Shortage";
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

  const mapped = filtered.map((job, index) => {
    const slaRisk = calculateSLARisk(job.daysOpen, job.status);
    return {
      jobId: job.id,
      jobTitle: job.title,
      customer: job.employer,
      currentStage: getCurrentStage(job.daysOpen),
      bottleneckStage: getBottleneckStage(job.funnel, index),
      aiPercentage: job.aiContribution,
      humanPercentage: job.humanContribution,
      slaRisk,
      slaDetails: getSLADetails(job.daysOpen, slaRisk),
    };
  });

  const pinnedIds = ["P-139789"];
  const pinnedTitles = [
    "Medical Oncologist",
    "Staff Nurse - Emergency Room",
    "Anaesthesia Technician",
  ];

  mapped.sort((a, b) => {
    const aIdPin = pinnedIds.indexOf(a.jobId);
    const bIdPin = pinnedIds.indexOf(b.jobId);
    if (aIdPin !== -1 && bIdPin === -1) return -1;
    if (aIdPin === -1 && bIdPin !== -1) return 1;
    if (aIdPin !== -1 && bIdPin !== -1) return aIdPin - bIdPin;

    const aTitlePin = pinnedTitles.findIndex(t => a.jobTitle.includes(t));
    const bTitlePin = pinnedTitles.findIndex(t => b.jobTitle.includes(t));
    const aPinned = aTitlePin !== -1;
    const bPinned = bTitlePin !== -1;
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    if (aPinned && bPinned) return aTitlePin - bTitlePin;
    return a.jobTitle.localeCompare(b.jobTitle);
  });

  return mapped;
}
