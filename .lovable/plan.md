
## Add Job Posting Details to "Job Post in Swaasa" Node

### What Changes
When clicking the "Job Post in Swaasa" node in the pipeline, the side panel will show the layout from the reference image:

1. **In-Stage Progress** -- "Draft Created", "Published", "Live & Indexed" (replacing the current funnel labels)
2. **AI vs Human vs HITL Attribution** bar (already renders)
3. **Job Posting Details** card -- "Posted by", "JD Reviewed by" (with AI Agent and HITL badges), and "Details Added" checklist
4. **Avg Response Time / Handler** footer (already renders)

### Technical Changes

#### 1. Update `job-post-swaasa` mock data in `src/lib/mockData.ts`
- Change `progressFunnel` labels from "Job Published / Job Indexed / Job Viewed / Apply Clicked" to "Draft Created / Published / Live & Indexed" with counts matching the reference (120, 110, 95)
- Add `jobPostMetrics` field with:
  - `postedBy`: "Recruiter in HRM"
  - `jdReviewedBy`: AI Agent followed by HITL (Rahul Das)
  - `detailsAdded`: ["Matching criteria confirmation", "Right Ideal Candidate", "Screening Questions"]
- Update `avgTimeInStage` to "2 days" and `avgResponseTime` to "1.2 days" per the reference

#### 2. Add `job-post-swaasa` case in `StageSpecificMetrics` switch (`src/components/customer/StageDetailsPanel.tsx`)
- Render `JobPostMetricsCard` when `stageId === "job-post-swaasa"` and `metrics.jobPostMetrics` exists
- Add to `hasStageSpecificMetrics` check

#### Files
- `src/lib/mockData.ts` -- update `job-post-swaasa` entry for JOB-001 (and all other jobs that have it)
- `src/components/customer/StageDetailsPanel.tsx` -- add switch case + hasStageSpecificMetrics entry
