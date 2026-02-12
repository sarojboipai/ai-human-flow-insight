
## Custom Job Post Stage Details for Anaesthesia Technician

### What Changes
When you click the **Job Post** node in the Anaesthesia Technician pipeline, the sidebar will show a custom "Job Posting Details" card with three sections:

- **Posted by**: Recruiter in HRM
- **JD Reviewed by**: AI Agent, then HITL (Rahul Das)
- **Details Added**: Matching criteria confirmation, Right Ideal Candidate, Screening Questions

### Technical Details

**1. New type: `JobPostMetrics`** in `src/components/customer/stage-metrics/types.ts`
- Add a new interface with fields: `postedBy`, `jdReviewedBy` (array of reviewer objects with name and role), and `detailsAdded` (string array).

**2. New component: `JobPostMetricsCard`** in `src/components/customer/stage-metrics/JobPostMetricsCard.tsx`
- Renders three sections in cards:
  - "Posted by" with a user icon and "Recruiter in HRM"
  - "JD Reviewed by" showing a timeline/list: "AI Agent" then "HITL (Rahul Das)"
  - "Details Added" as a checklist of items

**3. Update `EnhancedStageMetrics`** in `src/lib/mockData.ts`
- Add optional `jobPostMetrics?: JobPostMetrics` field to the interface.

**4. Update `StageDetailsSheet.tsx`**
- Import the new `JobPostMetricsCard`
- Add a `case "job-post"` to the `StageSpecificMetrics` switch
- Add `"job-post"` to the `hasStageSpecificMetrics` check

**5. Update `stage-metrics/index.ts`**
- Export the new `JobPostMetricsCard`

**6. Populate mock data** in `src/lib/mockData.ts`
- Add `jobPostMetrics` to the Anaesthesia Technician job's `enhancedStageMetrics["job-post"]` entry with the specified values.

**7. Update database** for job P-139819
- Update the `enhanced_stage_metrics` JSON in the `jobs` table to include the `jobPostMetrics` data for the `job-post` stage.
