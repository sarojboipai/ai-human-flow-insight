

## Show Details for Every Node in the Side Panel

### Problem
When clicking nodes in the pipeline board, most nodes show "No detailed metrics available" because the `enhancedStageMetrics` data uses different IDs (e.g., "jobs-ankura") than the workflow schema node IDs (e.g., "review-jd-seo", "sourcing", "outreach"). Only a few stages have matching metrics.

### Solution
Two changes to ensure every node shows rich details including AI Agent and Human Involved cards:

### 1. Add enhancedStageMetrics entries for all workflow node IDs
**File: `src/lib/mockData.ts`**

Add `enhancedStageMetrics` entries for every node ID used in the workflow schema that currently lacks data. The node IDs that need new entries (per job):
- `customer-job-posting` -- Customer's initial posting
- `review-jd-seo` -- AI SEO review
- `review-jd-criteria` -- Criteria & screening question review
- `job-post-swaasa` -- Swaasa job post (can map from existing "jobs-ankura")
- `sourcing` -- (can map from existing "sourcing" if present, but ID mismatch)
- `outreach` -- Outreach campaigns
- `campaigns` -- Campaign management
- `marketing` -- Marketing efforts
- `application` -- Application processing
- `primary-screening` -- Primary screening (can map from "prescreen")
- `interview-scheduling` -- (can map from existing "scheduling")
- `placement-candidate` -- Final placement
- `2ndpri` -- 2nd priority routing
- `human-screening` -- Human screening step
- `backup-candidate` -- Backup candidate pool
- `talent-pool` -- Talent pool

Each entry will include: volume metrics (sent/appeared/qualified/etc.), attribution percentages, SLA info, progress funnel, and the AI agent name/task + human role name/task.

### 2. Expand stageAttributionDefaults for all node IDs
**File: `src/components/customer/StageDetailsPanel.tsx`**

Add fallback attribution defaults for all workflow node IDs so that even if a specific job doesn't have metrics, the AI Agent and Human Involved cards still render:

| Node ID | AI Agent | Human Role |
|---------|----------|------------|
| customer-job-posting | Intake Agent | Account Manager |
| review-jd-seo | SEO Optimization Agent | Recruiter |
| review-jd-criteria | Criteria Validation Agent | Hiring Manager |
| job-post-swaasa | JD Optimization Agent | Recruiter |
| sourcing | Sourcing Agent | Sourcer |
| outreach | Outreach Agent | Recruiter |
| campaigns | Campaign Agent | Marketing Specialist |
| marketing | Marketing Agent | Marketing Specialist |
| application | Application Processing Agent | Recruiter |
| primary-screening | Pre-Screen Agent | Recruiter |
| interview-scheduling | Scheduling Agent | Recruiter |
| placement-candidate | Placement Agent | Recruiter |
| 2ndpri | Priority Routing Agent | Recruiter |
| human-screening | Screening Support Agent | Recruiter |
| backup-candidate | Talent Classification Agent | Recruiter |
| talent-pool | Community Engagement Agent | Community Manager |

### 3. Make the panel show AI/Human cards even when metrics is null
**File: `src/components/customer/StageDetailsPanel.tsx`**

Update the "no metrics" fallback state to still render the AI Agent Involved and Human Involved cards using the `stageAttributionDefaults` lookup. Instead of just showing "No detailed metrics available", show:
- Stage header with icon and name
- AI Agent Involved card (from defaults)
- Human Involved card (from defaults)
- A note that detailed volume metrics are not yet available

### Technical Details

**Files to modify:**
- `src/lib/mockData.ts` -- Add ~16 new enhancedStageMetrics entries per job (across all jobs) with realistic data for each workflow node
- `src/components/customer/StageDetailsPanel.tsx` -- Expand `stageAttributionDefaults` to cover all node IDs, and update the null-metrics fallback to still render AI/Human cards

**Mock data pattern per new node (example for "outreach"):**
```text
"outreach": {
  sent: 120, appeared: 95, qualified: 78, disqualified: 12, pending: 5,
  avgResponseTime: "6 hours", handler: "AE",
  aiPercentage: 80, humanPercentage: 15, hitlPercentage: 5,
  aiAgentName: "Outreach Agent",
  aiTaskDescription: "Automated candidate outreach via email and WhatsApp",
  humanRoleName: "Recruiter",
  humanTaskDescription: "Personalized outreach for senior candidates",
  avgTimeInStage: "2 days", slaThreshold: "3 days", slaStatus: "green",
  conversionRate: 65.0, dropOffRate: 35.0,
  progressFunnel: [
    { label: "Candidates Identified", count: 120, percentage: 100 },
    { label: "Contacted", count: 95, percentage: 79 },
    { label: "Responded", count: 78, percentage: 65 },
  ],
}
```
