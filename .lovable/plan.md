

# Split Orchestration Engine into Pipeline Config and Job Orchestration

This implementation renames "Orchestration Engine" to "Pipeline Config" and creates a new "Job Orchestration" section for assigning pipelines to jobs.

---

## Overview

The current "Orchestration Engine" will be split into two distinct sections:

| Section | Purpose | Contents |
|---------|---------|----------|
| **Pipeline Config** | Create and configure templates | Job Pipeline templates, Agents, Rules |
| **Job Orchestration** | Assign pipelines to jobs | Jobs list with pipeline assignment, status monitoring |

---

## Changes

### 1. Update Sidebar Navigation

**File:** `src/components/layout/OpsSidebar.tsx`

Rename the existing entry and add a new navigation item:

| Before | After |
|--------|-------|
| Orchestration Engine (/ops/orchestration) | Pipeline Config (/ops/pipeline-config) |
| - | Job Orchestration (/ops/job-orchestration) |

Both items will remain in an "Orchestration" group to maintain logical organization.

### 2. Rename Existing Page

**Files to modify:**
- Rename `src/pages/OpsOrchestrationEngine.tsx` to `src/pages/OpsPipelineConfig.tsx`
- Update the page header from "Orchestration Engine" to "Pipeline Config"
- Update description to "Configure pipeline templates, AI agents, and routing rules"

### 3. Create Job Orchestration Page

**File:** `src/pages/OpsJobOrchestration.tsx` (New)

A new page for managing pipeline-to-job assignments with:

**Key Metrics (4 cards):**
- Active Jobs (count of jobs being orchestrated)
- Pipelines in Use (count of distinct pipelines assigned)
- Unassigned Jobs (jobs without pipelines)
- Jobs At-Risk (SLA breach risk)

**Main Content:**
- Jobs table with columns:
  - Job Title
  - Employer
  - Role Type
  - Assigned Pipeline (dropdown to change)
  - Status (Active/Paused/Filled)
  - Days Open
  - SLA Status (Green/Amber/Red)
  - Actions (View Details, Reassign Pipeline)

**Features:**
- Filter by: Employer, Status, Pipeline
- Bulk pipeline assignment
- Quick access to job details

### 4. Update Routes

**File:** `src/App.tsx`

Update and add routes:

```text
/ops/pipeline-config     → OpsPipelineConfig (renamed from OpsOrchestrationEngine)
/ops/job-orchestration   → OpsJobOrchestration (new page)
```

---

## Sidebar Structure (Updated)

```text
Overview
├── Dashboard

Orchestration
├── Pipeline Config     (renamed)
└── Job Orchestration   (new)

Operations
├── Human Activity
└── AI Activity
```

---

## Job Orchestration Page Layout

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  Job Orchestration                                                          │
│  Assign and monitor pipeline execution for active jobs                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  Active Jobs    │  Pipelines Used  │  Unassigned    │  At-Risk Jobs        │
│      156        │       12         │       4        │        7             │
├─────────────────────────────────────────────────────────────────────────────┤
│  Filters: [Employer ▼] [Status ▼] [Pipeline ▼] [Search...]    [Bulk Assign]│
├─────────────────────────────────────────────────────────────────────────────┤
│  Job Title          │ Employer      │ Pipeline           │ Status │ SLA    │
│  ICU Nurse          │ Apollo        │ Nurse Tier 1   ▼   │ Active │ 🟢     │
│  Staff Nurse        │ Fortis        │ Nurse Tier 1   ▼   │ Active │ 🟡     │
│  Cardiologist       │ Aster CMI     │ Doctor Tier 1  ▼   │ Active │ 🔴     │
│  Lab Technician     │ KIMS          │ Tech Standard  ▼   │ Filled │ 🟢     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/OpsSidebar.tsx` | Modify | Rename nav item, add Job Orchestration link |
| `src/pages/OpsOrchestrationEngine.tsx` | Rename | Rename to OpsPipelineConfig.tsx, update header text |
| `src/pages/OpsJobOrchestration.tsx` | Create | New page for job-pipeline assignments |
| `src/App.tsx` | Modify | Update route paths, add new route |

---

## Technical Details

The Job Orchestration page will:
- Import jobs data from mockData.ts (already has workflowId field linking to pipelines)
- Import workflows from WorkflowContext to show available pipelines
- Provide dropdown selectors for reassigning pipelines to jobs
- Show SLA status based on existing job data (daysOpen, status)
- Enable filtering and search for efficient job management

