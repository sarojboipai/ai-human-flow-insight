
# Plan: Update Customer Dashboard to Show Single-Company Jobs

## Overview

The Customer Dashboard should only display jobs from one company (since it represents a customer's portal). This plan will:
1. Add more jobs for "Ankura Hospital" to create a richer dataset
2. Create a dedicated customer jobs array filtered to Ankura Hospital
3. Update the CustomerJobsTable to use customer-specific data and remove irrelevant filters

---

## Current State

- Jobs data includes 10 jobs from 10 different employers
- CustomerJobsTable imports all jobs and filters by search, company, stage, location
- The Company filter is irrelevant for a single-customer view

---

## Implementation

### 1. Add More Ankura Hospital Jobs in Mock Data

**File:** `src/lib/mockData.ts`

Add 5-6 new jobs for Ankura Hospital with varied roles:
- JOB-011: Night Shift Nurse
- JOB-012: Emergency Room Physician
- JOB-013: Operating Room Technician
- JOB-014: Head Nurse - Cardiology
- JOB-015: Junior Resident Doctor
- JOB-016: Dialysis Technician

Each job will include:
- Full funnel data with candidate counts
- enhancedStageMetrics matching the existing pattern
- Varied statuses (active, filled, closed)
- Different geographies within India

---

### 2. Create Customer-Specific Jobs Export

**File:** `src/lib/mockData.ts`

Add a filtered export for customer jobs:

```typescript
// Customer-specific jobs (Ankura Hospital)
export const customerJobs = jobs.filter(job => job.employer === "Ankura Hospital");
```

---

### 3. Update CustomerJobsTable Component

**File:** `src/components/customer/CustomerJobsTable.tsx`

**Changes:**
1. Import `customerJobs` instead of `jobs`
2. Remove the Company column from the table (not needed)
3. Remove the Company filter from the filter popover
4. Update the filter options to only include Stage and Location filters

**Before:**
```typescript
import { jobs, Job } from "@/lib/mockData";
// Company filter state and logic
// Company column in table
```

**After:**
```typescript
import { customerJobs, Job } from "@/lib/mockData";
// No company filter
// No company column in table
```

---

## New Jobs Data Structure

| Job ID | Title | Role Type | Geography | Status |
|--------|-------|-----------|-----------|--------|
| JOB-001 | Senior ICU Nurse | Nurse | Mumbai | Active |
| JOB-011 | Night Shift Nurse | Nurse | Delhi | Active |
| JOB-012 | Emergency Room Physician | Doctor | Bangalore | Active |
| JOB-013 | Operating Room Technician | Technician | Mumbai | Filled |
| JOB-014 | Head Nurse - Cardiology | Nurse | Chennai | Active |
| JOB-015 | Junior Resident Doctor | Doctor | Hyderabad | Active |
| JOB-016 | Dialysis Technician | Technician | Delhi | Closed |

---

## Files to Modify

1. **`src/lib/mockData.ts`**
   - Add 6 new jobs for Ankura Hospital with complete enhancedStageMetrics
   - Add `customerJobs` export

2. **`src/components/customer/CustomerJobsTable.tsx`**
   - Import `customerJobs` instead of `jobs`
   - Remove Company column from table
   - Remove Company filter from filter popover
   - Update COMPANY_OPTIONS removal

---

## Outcome

- Customer Dashboard displays 7 jobs all from Ankura Hospital
- Table has cleaner columns: Job ID, Title, Current Stage, Candidates, Days Open, Actions
- Filters include only Stage and Location (relevant for single-company view)
- Each job has complete stage metrics for the Job Workflow Explorer
