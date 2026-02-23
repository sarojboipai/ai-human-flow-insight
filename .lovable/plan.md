

## Add Pipeline Data to All Nodes for All Jobs

### Problem
Only JOB-001 has `enhancedStageMetrics` entries for all workflow node IDs (e.g., `customer-job-posting`, `review-jd-criteria`, `outreach`, `campaigns`, `marketing`, `application`, `primary-screening`, `interview-scheduling`, `placement-candidate`, `2ndpri`, `human-screening`, `backup-candidate`, `talent-pool`). JOB-002 through JOB-017 only have legacy stage IDs (e.g., `jobs-ankura`, `expression`, `prescreen`, `voice-agent`, `scheduling`, `silver-med`, `talent-community`) plus the recently added `review-jd-seo` and `job-post-swaasa`. Clicking most pipeline nodes for these jobs shows "No detailed metrics available."

### Solution
Two-pronged approach:

#### 1. Add a fallback mapping in PipelineBoardDialog.tsx
Add a `nodeIdFallbackMap` that maps workflow node IDs to their equivalent legacy stage IDs. Update the `selectedMetrics` resolution to try the direct node ID first, then the fallback:

```text
Mapping:
  application         -> expression
  primary-screening   -> prescreen
  interview-scheduling -> scheduling
  backup-candidate    -> silver-med
  talent-pool         -> talent-community
  outreach            -> sourcing
  campaigns           -> job-discovery
  marketing           -> job-discovery
  human-screening     -> voice-agent
```

This gives immediate coverage for JOB-002 through JOB-017 without duplicating data.

#### 2. Add missing workflow node entries for all jobs (JOB-002 through JOB-017)
Add the remaining workflow node IDs that have no legacy equivalent and therefore need explicit data:
- `customer-job-posting` -- job intake step (single-item, 100% conversion)
- `review-jd-criteria` -- criteria validation step (single-item, 100% conversion)
- `placement-candidate` -- offer/placement outcome
- `2ndpri` -- secondary priority routing
- `human-screening` -- manual screening interviews
- `backup-candidate` -- backup candidate tagging

Each entry will include varied but realistic metrics, a progress funnel, and appropriate AI/Human attribution values.

#### 3. Extend StageSpecificMetrics switch in StageDetailsPanel.tsx
Add fallback cases so workflow node IDs render the correct existing metric cards:

| Workflow Node ID | Renders (same card as legacy ID) |
|---|---|
| `application` | EOIMetricsCard |
| `primary-screening` | PreScreenMetricsCard |
| `interview-scheduling` | InterviewSchedulingMetricsCard |
| `backup-candidate` | SilverMedalistMetricsCard |
| `talent-pool` | TalentCommunityMetricsCard |
| `outreach` | SourcingMetricsCard |
| `human-screening` | VoiceScreeningMetricsCard |

Also extend the `hasStageSpecificMetrics` check to include these node IDs.

### Files to Modify
- `src/components/customer/PipelineBoardDialog.tsx` -- add `nodeIdFallbackMap` and update `selectedMetrics` resolution
- `src/components/customer/StageDetailsPanel.tsx` -- add switch cases and `hasStageSpecificMetrics` entries for workflow node IDs
- `src/lib/mockData.ts` -- add `customer-job-posting`, `review-jd-criteria`, `placement-candidate`, `2ndpri`, `human-screening`, and `backup-candidate` entries to JOB-002 through JOB-017

### Technical Notes
- The fallback approach avoids duplicating large metric objects (e.g., `eoiMetrics`, `preScreenMetrics`) across two keys
- Jobs with DB-sourced `enhanced_stage_metrics` will also benefit from the fallback if their data uses legacy IDs
- Approximately 6 new entries per job x 16 jobs = ~96 new metric blocks in mockData.ts
