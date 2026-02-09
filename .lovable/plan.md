

# Plan: Create Jobs Table in Cloud Database and Display Data

## Overview

Create a `jobs` table in the Cloud database to persist the jobs data that currently lives in mock data, seed it with the existing mock records, and update the UI to read from the database.

---

## What Changes

### A. Create Database Table

A new `jobs` table will be created with the following columns matching the current `Job` interface:

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "JOB-001" |
| title | text | Job title |
| employer | text | Employer name |
| employer_tier | text | "enterprise", "mid-market", "smb" |
| role_type | text | "nurse", "doctor", "paramedic", "technician" |
| geography | text | Location |
| status | text | "active", "filled", "closed" |
| created_at | timestamptz | When created |
| days_open | integer | Days since posted |
| ai_contribution | integer | AI % |
| human_contribution | integer | Human % |
| revenue | numeric | Revenue amount |
| cost | numeric | Cost amount |
| margin | numeric | Margin % |
| workflow_id | text | Associated workflow |
| funnel | jsonb | Array of funnel stage objects |
| hitl_events | jsonb | Array of HITL event objects |
| stage_metrics | jsonb | Stage metrics object |
| enhanced_stage_metrics | jsonb | Enhanced stage metrics object |

Complex nested data (funnel stages, HITL events, stage metrics) will be stored as JSONB columns since they have variable structure and are primarily read as a whole.

RLS will be set to allow public read access (since there's no auth yet) so the data is visible in the Cloud database view.

### B. Seed Data

Insert the existing mock jobs data (all records from `mockData.ts`) into the new table using SQL insert statements.

### C. Update Frontend to Read from Database

- Create a custom hook `useJobs` that fetches jobs from the database using the Supabase client
- Update components that import `jobs` from `mockData` to use the hook instead
- Keep mock data as fallback in case the database query fails
- The Cloud database view will then show the jobs table with all records

---

## Files to Create/Modify

1. **Database migration** -- Create `jobs` table with RLS policy for public read
2. **Database seed** -- Insert all existing mock job records
3. **`src/hooks/useJobs.ts`** (new) -- Custom hook to fetch jobs from database
4. **`src/pages/FunnelAnalytics.tsx`** -- Use `useJobs` hook instead of mock import
5. **`src/pages/Index.tsx`** -- Use `useJobs` hook
6. **`src/pages/OpsDashboard.tsx`** -- Use `useJobs` hook
7. **`src/pages/OpsJobOrchestration.tsx`** -- Use `useJobs` hook
8. **Other pages importing `jobs`** -- Update to use hook

---

## Technical Notes

- JSONB columns are used for nested/variable structures to avoid excessive table normalization
- RLS policy allows public SELECT since no authentication is implemented yet
- The `useJobs` hook will use TanStack React Query for caching and loading states
- Mock data remains as fallback -- if the database query fails, the app still works
- After this change, you can view and manage jobs directly in the Cloud database UI

