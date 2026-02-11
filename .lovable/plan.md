

## Realtime Job Sync Across Pipeline Views

### What Changes
When you add, edit, or delete a job from the Job List, **all pipeline views will update automatically in real-time** -- no page refresh needed. The Pipeline Health table on the Job Pipeline page will also switch from static demo data to live database-driven data.

### What You Will See
- Delete a job in Job List -- it disappears from Pipeline Health and Funnel Analytics instantly
- Add a job in Job List -- it appears in Pipeline Health within seconds
- Edit a job -- changes reflect across all views immediately

### Technical Details

**1. Enable Realtime on `jobs` table** (database migration)
- Run `ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;` so the database broadcasts changes.

**2. Update `useJobs` hook** (`src/hooks/useJobs.ts`)
- Add a Supabase Realtime subscription inside the hook that listens for INSERT, UPDATE, and DELETE events on the `jobs` table.
- On any change, call `queryClient.invalidateQueries({ queryKey: ["jobs"] })` to trigger a refetch.
- Clean up the subscription on unmount using `useEffect` return.

**3. Derive Pipeline Health data from DB jobs** (`src/pages/FunnelAnalytics.tsx`)
- Replace `getJobPipelineHealthByCustomer("all")` with a transformation of the `jobs` array (already fetched via `useJobs`).
- Map each job to a `JobPipelineHealthRow` shape by deriving `currentStage` from `job.funnel`, `aiPercentage`/`humanPercentage` from `job.aiContribution`/`job.humanContribution`, and SLA risk from `job.daysOpen`.
- This ensures the Pipeline Health table shows the same live data as the Job List.

**4. Update Ops Dashboard pipeline table** (`src/pages/Index.tsx`)
- Same approach: replace `getJobPipelineHealthByCustomer(selectedCustomerName)` with a derived mapping from the `useJobs` data, filtered by customer name.

