
# Open Job Detail within Ops Environment

## Overview
When clicking on a job in the Ops Dashboard's Job Pipeline Health table, the job detail should open within the Ops layout (keeping the Operations sidebar visible) rather than switching to the Admin dashboard layout.

## Current Behavior
- Clicking a job row navigates to `/jobs/:jobId`
- The `JobDetail` page uses `DashboardLayout` which shows the Admin sidebar (`AppSidebar`)
- This causes the sidebar to switch from Ops to Admin, breaking the navigation context

## Solution
Create an Ops-specific job detail route and page that wraps the job content in `OpsLayout`.

---

## Technical Changes

### 1. Create Ops Job Detail Page
**New File:** `src/pages/OpsJobDetail.tsx`

Create a new page component that:
- Uses `OpsLayout` instead of `DashboardLayout`
- Displays the same job detail content (funnel, AI/Human charts, HITL timeline, economics)
- Has a "Back to Dashboard" link that returns to `/ops`

### 2. Add Route for Ops Job Detail
**File:** `src/App.tsx`

Add a new route under the Operations Manager routes section:
```
/ops/jobs/:jobId -> OpsJobDetail
```

### 3. Update Navigation in Job Pipeline Health Table
**File:** `src/components/ops/JobPipelineHealthTable.tsx`

Change the navigation path from `/jobs/${jobId}` to `/ops/jobs/${jobId}` so job clicks stay within the Ops environment.

---

## Implementation Details

| File | Change |
|------|--------|
| `src/pages/OpsJobDetail.tsx` | New file - Job detail page wrapped in `OpsLayout` |
| `src/App.tsx` | Add route: `<Route path="/ops/jobs/:jobId" element={<OpsJobDetail />} />` |
| `src/components/ops/JobPipelineHealthTable.tsx` | Update navigation: `/jobs/` to `/ops/jobs/` |

---

## Result
Clicking any job row in the Ops Dashboard will open the job detail view while maintaining the Operations sidebar and header, providing a seamless navigation experience within the Ops persona.
