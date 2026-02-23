

## Add Metrics for Every Node via Fallback Mapping

### Problem
Only JOB-001 has `enhancedStageMetrics` entries for workflow node IDs (e.g., `outreach`, `primary-screening`, `interview-scheduling`). JOB-002 through JOB-017 only have the original legacy stage IDs (e.g., `sourcing`, `prescreen`, `scheduling`), so clicking nodes for those jobs shows "No detailed metrics available" or falls back to only showing AI/Human cards without volume data.

### Solution
Add a **node-to-legacy-stage fallback map** so the system resolves metrics correctly for all jobs, and extend the `StageSpecificMetrics` switch to render the right metric cards for workflow node IDs too.

### Changes

#### 1. Add fallback mapping in PipelineBoardDialog.tsx

Add a `nodeIdFallbackMap` object that maps workflow node IDs to their equivalent legacy stage IDs. Update the `selectedMetrics` resolution (line 363) to try the direct node ID first, then the fallback:

```text
Mapping:
  job-post-swaasa     -> jobs-ankura
  primary-screening   -> prescreen
  interview-scheduling -> scheduling
  backup-candidate    -> silver-med
  talent-pool         -> talent-community
  application         -> expression
  outreach            -> sourcing
  campaigns           -> job-discovery
  marketing           -> job-discovery
  human-screening     -> voice-agent
```

Updated resolution logic:
```text
const selectedMetrics = selectedNodeId && job?.enhancedStageMetrics
  ? job.enhancedStageMetrics[selectedNodeId]
    || job.enhancedStageMetrics[nodeIdFallbackMap[selectedNodeId]]
    || null
  : null;
```

#### 2. Extend StageSpecificMetrics switch in StageDetailsPanel.tsx

Add cases for workflow node IDs that should render existing stage-specific metric cards:

| Workflow Node ID | Renders |
|-----------------|---------|
| `job-post-swaasa` | JobsSwaasaMetricsCard |
| `primary-screening` | PreScreenMetricsCard |
| `interview-scheduling` | InterviewSchedulingMetricsCard |
| `backup-candidate` | SilverMedalistMetricsCard |
| `talent-pool` | TalentCommunityMetricsCard |
| `application` | EOIMetricsCard |
| `outreach` | SourcingMetricsCard |
| `human-screening` | VoiceScreeningMetricsCard |

Also extend the `hasStageSpecificMetrics` check to include these new node IDs.

### Files to Modify
- `src/components/customer/PipelineBoardDialog.tsx` -- add fallback map + update metric resolution
- `src/components/customer/StageDetailsPanel.tsx` -- extend StageSpecificMetrics switch and hasStageSpecificMetrics check

