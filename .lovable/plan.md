
# Show All Stages and Jobs Count in Workflow Card

This plan updates the WorkflowCard component to display all stages (instead of limiting to 4) and adds a "Jobs" metric showing how many jobs are assigned to each workflow.

---

## Overview

**Current State:**
- WorkflowCard shows only first 4 stages with "+X more" text
- Jobs are not linked to workflows (no workflowId field)
- No visibility into how many jobs use each workflow

**Target State:**
- All stages visible in the card with horizontal scroll for overflow
- Each workflow card shows a "Jobs" metric count
- Jobs linked to workflows via workflowId field

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/lib/mockData.ts` | Modify | Add `workflowId` field to Job interface and update job records |
| `src/components/orchestration/WorkflowCard.tsx` | Modify | Show all stages, add jobs count prop and display |
| `src/components/orchestration/WorkflowList.tsx` | Modify | Import jobs data and pass job counts to WorkflowCard |

---

## Implementation Details

### 1. Update Job Interface (mockData.ts)

Add `workflowId` field to the Job interface:

```text
export interface Job {
  id: string;
  title: string;
  employer: string;
  workflowId: string;  // NEW: Links job to a workflow
  // ... rest of fields
}
```

Update existing jobs with workflow assignments:
- JOB-001 (Senior ICU Nurse) -> wf-001 (Frontline Hiring)
- JOB-002 (General Physician) -> wf-002 (Enterprise Physician)
- JOB-003 (Emergency Paramedic) -> wf-003 (Bulk Paramedic)
- JOB-004 -> wf-001
- JOB-005 -> wf-005

### 2. Update WorkflowCard Component

**Props change:**
```text
interface WorkflowCardProps {
  workflow: Workflow;
  jobsCount?: number;  // NEW: Number of jobs using this workflow
  onEdit?: (workflow: Workflow) => void;
  onToggleStatus?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
}
```

**Metrics Row - Add Jobs count:**
```text
<div className="flex items-center gap-8 mb-4">
  <div className="text-center">
    <div className="text-xl font-bold">{workflow.stages.length}</div>
    <div className="text-xs text-muted-foreground">Stages</div>
  </div>
  <div className="text-center">
    <div className="text-xl font-bold text-blue-500">{jobsCount || 0}</div>
    <div className="text-xs text-muted-foreground">Jobs</div>
  </div>
  <!-- ... other metrics -->
</div>
```

**Stage Flow - Show all stages with wrapping:**
```text
{/* Stage Flow - Show all stages */}
<div className="flex flex-wrap items-center gap-2 mb-3">
  {workflow.stages.map((stage, index) => (
    <div key={stage.id} className="flex items-center gap-2">
      <Badge variant="outline" className="whitespace-nowrap bg-teal-500/10 text-teal-600 border-teal-500/20">
        {stage.name}
      </Badge>
      {index < workflow.stages.length - 1 && (
        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}
    </div>
  ))}
</div>
```

### 3. Update WorkflowList Component

Import jobs data and compute counts:

```text
import { jobs } from "@/lib/mockData";

// Compute jobs count per workflow
const getJobsCount = (workflowId: string) => {
  return jobs.filter(job => job.workflowId === workflowId).length;
};

// Pass to WorkflowCard
<WorkflowCard
  workflow={workflow}
  jobsCount={getJobsCount(workflow.id)}
  onEdit={handleEdit}
  onToggleStatus={handleToggleStatus}
  onDelete={handleDelete}
/>
```

---

## Updated WorkflowCard Layout

```text
+------------------------------------------------------------------+
| [Icon] Frontline Hiring v2                    [Active] [Frontline] |
+------------------------------------------------------------------+
| Standard workflow for nurse and paramedic positions...            |
+------------------------------------------------------------------+
| 6        | 12       | 1,245      | 87.4%    | [Bot]2 [Users]1... |
| Stages   | Jobs     | Executions | Success  | AI/Human/Hybrid    |
+------------------------------------------------------------------+
| [Profile Screening] -> [Skills Matching] -> [Initial Outreach]   |
| -> [Interview Scheduling] -> [Offer Process] -> [Onboarding]     |
+------------------------------------------------------------------+
| [Progress Bar: 87.4%]                                             |
+------------------------------------------------------------------+
| Updated 2024-01-25 by Saroj                        [Edit] [Pause] |
+------------------------------------------------------------------+
```

---

## Files to Modify

### 1. `src/lib/mockData.ts`
- Add `workflowId: string` to Job interface
- Update all 5 job records with appropriate workflowId values
- Map jobs to workflows based on job type:
  - Nurse/Paramedic frontline jobs -> Frontline or Bulk workflows
  - Doctor jobs -> Enterprise Physician workflow
  - Technician jobs -> Allied Health workflow

### 2. `src/components/orchestration/WorkflowCard.tsx`
- Add `jobsCount` prop to interface
- Import Briefcase icon from lucide-react
- Add "Jobs" metric to the metrics row (between Stages and Executions)
- Remove `.slice(0, 4)` from stages mapping
- Change stage container from `overflow-x-auto` to `flex-wrap` for wrapping
- Remove the "+X more" text since all stages are now shown

### 3. `src/components/orchestration/WorkflowList.tsx`
- Import `jobs` from mockData
- Create helper function to count jobs per workflow
- Pass `jobsCount` prop to each WorkflowCard

---

## Job-to-Workflow Mapping

| Job ID | Job Title | Workflow ID | Workflow Name |
|--------|-----------|-------------|---------------|
| JOB-001 | Senior ICU Nurse | wf-001 | Frontline Hiring |
| JOB-002 | General Physician | wf-002 | Enterprise Physician |
| JOB-003 | Emergency Paramedic | wf-003 | Bulk Paramedic |
| JOB-004 | Lab Technician | wf-007 | Allied Health Specialist |
| JOB-005 | Staff Nurse | wf-001 | Frontline Hiring |

This results in:
- wf-001 (Frontline Hiring): 2 jobs
- wf-002 (Enterprise Physician): 1 job
- wf-003 (Bulk Paramedic): 1 job
- wf-007 (Allied Health Specialist): 1 job
- Other workflows: 0 jobs

---

## Success Criteria

- All 6 stages visible in workflow cards (wrapped to multiple lines if needed)
- Jobs count metric displayed between Stages and Executions
- Jobs correctly mapped to workflows via workflowId
- Workflow cards show accurate job counts based on linked jobs
