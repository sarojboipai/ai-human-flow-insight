
# Fix Job Pipeline Health Table Navigation

## Issue
Clicking on job rows navigates to `/job/JOB-001` but the route is defined as `/jobs/:jobId` (with an 's'), causing a 404 error.

## Solution
Update the navigation path in `JobPipelineHealthTable.tsx` to use the correct route.

---

## Change

**File:** `src/components/ops/JobPipelineHealthTable.tsx`

| Line | Current | Fixed |
|------|---------|-------|
| 59 | `navigate(\`/job/${jobId}\`)` | `navigate(\`/jobs/${jobId}\`)` |

---

## Summary
A one-line fix to correct the route path from `/job/` to `/jobs/`, matching the route defined in `App.tsx`:

```tsx
<Route path="/jobs/:jobId" element={<JobDetail />} />
```
