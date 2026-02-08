

# Plan: Show 10 Jobs Per Page and Add Bhrungi Hospitals Job

## Overview

Two changes are needed:
1. Increase the Job Pipeline Health table from 5 rows per page to 10
2. Add a new job row for Bhrungi Hospitals with the specified details

---

## Changes

### 1. Update Pagination to Show 10 Jobs

**File:** `src/components/dashboard/JobPipelineHealthTable.tsx`

Change `itemsPerPage` from `5` to `10` (line 124). This will show all current jobs (16 existing + 1 new = 17) across 2 pages instead of the current 4 pages.

---

### 2. Add New Job: Nurse at Bhrungi Hospitals

**File:** `src/lib/mockData.ts`

Add a new job entry (JOB-017) to the `jobs` array with:

| Field | Value |
|-------|-------|
| Job ID | JOB-017 |
| Title | Nurse |
| Employer | Bhrungi Hospitals |
| Role Type | nurse |
| Status | active |
| Days Open | 8 (to keep SLA "green" / On Track) |

The job will include:
- A complete 7-stage funnel with the **Interview Scheduling** stage having the most active candidates (matching "Interview" funnel stage)
- The bottleneck will be set at **Offer Negotiation** (matching "Negotiation" bottleneck)
- SLA Risk will be **green** ("On Track") with comfortable buffer
- Full `enhancedStageMetrics` for all 8 stages to support the Job Workflow Explorer
- AI/Human contribution percentages

Since `jobPipelineHealth` is auto-generated from the `jobs` array, the new job will automatically appear in the Pipeline Health table with the correct funnel stage, bottleneck, and SLA status.

---

## Files to Modify

1. **`src/components/dashboard/JobPipelineHealthTable.tsx`** -- Change `itemsPerPage` from 5 to 10
2. **`src/lib/mockData.ts`** -- Add JOB-017 (Nurse, Bhrungi Hospitals) with complete mock data

---

## Outcome

- The Pipeline Health table displays 10 rows per page
- A new "Nurse" job from "Bhrungi Hospitals" appears in the table with Interview stage, Negotiation bottleneck, and On Track SLA status
