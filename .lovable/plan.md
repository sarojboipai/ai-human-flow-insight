
# Add Interview Scheduling, Silver Medalist & Talent Community Stage Metrics

## Summary
Add comprehensive stage-specific metrics, in-stage progress funnels, and response time tracking for three additional pipeline stages: Interview Scheduling, Silver Medalist, and Talent Community.

---

## Current Architecture

The stage metrics system follows this pattern:
1. **Types file** (`types.ts`) - Defines the interface for each stage's metrics
2. **Metrics Card** (`*MetricsCard.tsx`) - Visual component displaying the metrics
3. **Mock Data** (`mockData.ts`) - Extends `EnhancedStageMetrics` interface and adds sample data
4. **StageDetailsSheet** - Switch statement to render the correct card based on `stageId`
5. **Index exports** - Barrel file for clean imports

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/stage-metrics/types.ts` | Modify | Add 3 new interfaces + update STAGE_IDS |
| `src/components/customer/stage-metrics/InterviewSchedulingMetricsCard.tsx` | Create | Interview scheduling metrics display |
| `src/components/customer/stage-metrics/SilverMedalistMetricsCard.tsx` | Create | Silver medalist pool metrics display |
| `src/components/customer/stage-metrics/TalentCommunityMetricsCard.tsx` | Create | Talent community metrics display |
| `src/components/customer/stage-metrics/index.ts` | Modify | Export new components |
| `src/lib/mockData.ts` | Modify | Add new metric interfaces + mock data |
| `src/components/customer/StageDetailsSheet.tsx` | Modify | Add cases for new stages |

---

## New Type Definitions

### Interview Scheduling Metrics
```typescript
interface InterviewSchedulingMetrics {
  // Core Progress
  candidatesQualifiedForInterview: number;
  interviewInvitesSent: number;
  interviewScheduled: number;
  interviewCompleted: number;
  noShowRate: number;
  feedbackSubmitted: number;
  
  // AI vs Human Attribution
  aiSchedulingPercentage: number;
  humanSchedulingPercentage: number;
  hitlApprovalPercentage: number;
  
  // Avg Response Time
  aiSlotSuggestionTime: string;
  recruiterActionTime: string;
  candidateConfirmationTime: string;
  
  // SLA Metrics
  scheduleWithinSLA: number;        // % scheduled within 24hrs
  confirmationWithinSLA: number;    // % confirmed within 12hrs
  feedbackWithinSLA: number;        // % feedback within 48hrs
  
  // Outcome Metrics
  interviewConversionRate: number;
  timeToInterview: string;
  interviewToOfferRatio: number;
}
```

### Silver Medalist Metrics
```typescript
interface SilverMedalistMetrics {
  // Core Progress
  candidatesTagged: number;
  reEngagementInvitesSent: number;
  reAppliedToNewJobs: number;
  conversionToHire: number;
  
  // AI vs Human Attribution
  aiTaggingRate: number;
  humanOverrideRate: number;
  hitlReviewRate: number;
  
  // Avg Response Time
  aiClassificationTime: string;
  recruiterReviewTime: string;
  candidateReEngagementResponseTime: string;
  
  // SLA Metrics
  taggingWithinSLA: number;          // % tagged within 24hrs
  reEngagementWithinSLA: number;     // % outreach within 7 days
  followUpWithinSLA: number;         // % follow-up within 72hrs
  
  // Outcome Metrics
  silverToHireConversionRate: number;
  talentPoolReuseRate: number;
  costSavedVsFreshSourcing: number;
  candidateRetentionScore: number;
}
```

### Talent Community Metrics
```typescript
interface TalentCommunityMetrics {
  // Core Progress
  candidatesAddedToCommunity: number;
  activeCommunityMembers: number;
  contentEngagementRate: number;
  candidatesActivatedIntoPipeline: number;
  communityToHireConversion: number;
  
  // AI vs Human Attribution
  aiCommunityTagging: number;
  humanCommunityModeration: number;
  hitlModeration: number;
  
  // Avg Response Time
  aiEngagementTriggerTime: string;
  recruiterCommunityActionTime: string;
  candidateResponseTime: string;
  
  // SLA Metrics
  outreachFrequencySLA: string;       // Weekly/Monthly
  activationWithinSLA: number;        // % activated within 48hrs
  contentRefreshWithinSLA: number;    // % content refreshed monthly
  
  // Outcome Metrics
  communityActivationRate: number;
  passiveToActiveRate: number;
  longTermHireRate: number;
  employerBrandEngagementIndex: number;
}
```

---

## Stage ID Mapping

| Stage ID | Metrics Type | Progress Funnel Steps |
|----------|--------------|----------------------|
| `scheduling` | `interviewSchedulingMetrics` | Qualified for Interview -> Invites Sent -> Scheduled -> Completed -> Feedback Submitted |
| `silver-med` | `silverMedalistMetrics` | Tagged as Silver -> Re-engagement Sent -> Re-applied -> Converted to Hire |
| `talent-community` | `talentCommunityMetrics` | Added to Community -> Engaged with Content -> Activated into Pipeline -> Converted |

---

## Visual Layout for Each Card

### Interview Scheduling Metrics Card
```text
+-------------------------------------------------------+
|  Progress Metrics                                      |
+-------------------------------------------------------+
|  Qualified for Interview    34    Invites Sent     28 |
|  Scheduled                  24    Completed        18 |
|  No-show Rate             14%     Feedback Done    15 |
+-------------------------------------------------------+
|  AI vs Human Attribution                              |
+-------------------------------------------------------+
|  AI Scheduling           75%     Human Scheduling  20%|
|  HITL Approvals           5%                          |
+-------------------------------------------------------+
|  Response Times                                        |
+-------------------------------------------------------+
|  AI Slot Suggestion       2m     Recruiter Action  4h |
|  Candidate Confirmation   6h                          |
+-------------------------------------------------------+
|  SLA Compliance                                        |
+-------------------------------------------------------+
|  Schedule (24h)          88%     Confirm (12h)    82% |
|  Feedback (48h)          75%                          |
+-------------------------------------------------------+
|  Outcomes                                              |
+-------------------------------------------------------+
|  Interview Conversion   75%     Time-to-Interview  3d |
|  Interview-to-Offer     42%                           |
+-------------------------------------------------------+
```

### Silver Medalist Metrics Card
```text
+-------------------------------------------------------+
|  Progress Metrics                                      |
+-------------------------------------------------------+
|  Candidates Tagged         8     Re-engagement Sent  6 |
|  Re-applied to Jobs        4     Converted to Hire   2 |
+-------------------------------------------------------+
|  AI vs Human Attribution                              |
+-------------------------------------------------------+
|  AI Tagging Rate         70%     Human Override    25%|
|  HITL Review Rate          5%                          |
+-------------------------------------------------------+
|  Response Times                                        |
+-------------------------------------------------------+
|  AI Classification        1m     Recruiter Review   8h |
|  Candidate Re-engagement  2d                          |
+-------------------------------------------------------+
|  SLA Compliance                                        |
+-------------------------------------------------------+
|  Tagging (24h)          92%     Re-engage (7d)    85% |
|  Follow-up (72h)        78%                          |
+-------------------------------------------------------+
|  Outcomes                                              |
+-------------------------------------------------------+
|  Silver-to-Hire         25%     Pool Reuse Rate   35% |
|  Cost Saved          $1,200     Retention Score    82 |
+-------------------------------------------------------+
```

### Talent Community Metrics Card
```text
+-------------------------------------------------------+
|  Progress Metrics                                      |
+-------------------------------------------------------+
|  Added to Community        4     Active Members   3.2k |
|  Content Engagement      45%     Activated          12 |
|  Community-to-Hire       3%                           |
+-------------------------------------------------------+
|  AI vs Human Attribution                              |
+-------------------------------------------------------+
|  AI Community Tagging    60%     Human Curation    35%|
|  HITL Moderation          5%                          |
+-------------------------------------------------------+
|  Response Times                                        |
+-------------------------------------------------------+
|  AI Engagement Trigger    1h     Recruiter Action  12h |
|  Candidate Response       2d                          |
+-------------------------------------------------------+
|  SLA Compliance                                        |
+-------------------------------------------------------+
|  Outreach Frequency   Weekly     Activation (48h) 70% |
|  Content Refresh       Monthly                        |
+-------------------------------------------------------+
|  Outcomes                                              |
+-------------------------------------------------------+
|  Activation Rate        15%     Passive-to-Active 12% |
|  Long-term Hire          8%     Brand Engagement   78 |
+-------------------------------------------------------+
```

---

## In-Stage Progress Funnels

### Interview Scheduling Funnel
1. Qualified for Interview (100%)
2. Interview Invites Sent (82%)
3. Interview Scheduled (71%)
4. Interview Completed (53%)
5. Feedback Submitted (44%)

### Silver Medalist Funnel
1. Tagged as Silver Medalist (100%)
2. Re-engagement Invites Sent (75%)
3. Re-applied to New Jobs (50%)
4. Converted to Hire (25%)

### Talent Community Funnel
1. Added to Community (100%)
2. Active Members (80%)
3. Content Engaged (45%)
4. Activated into Pipeline (12%)
5. Converted to Hire (3%)

---

## Implementation Steps

### Step 1: Update Types
Add the three new interfaces to `types.ts` and update the `STAGE_IDS` constant.

### Step 2: Create Metric Cards
Create three new components following the existing pattern:
- `InterviewSchedulingMetricsCard.tsx`
- `SilverMedalistMetricsCard.tsx`
- `TalentCommunityMetricsCard.tsx`

Each card will have sections for:
- Progress Metrics
- AI vs Human Attribution
- Response Times
- SLA Compliance
- Outcome Metrics

### Step 3: Update Index Exports
Add the new components to the barrel export file.

### Step 4: Extend Mock Data
Add the three new metric interfaces to `EnhancedStageMetrics` and populate mock data for `JOB-001` with realistic values.

### Step 5: Update StageDetailsSheet
Add three new cases to the `StageSpecificMetrics` switch statement and update the `hasStageSpecificMetrics` check.

---

## Technical Notes

1. **Consistent Design**: All new cards follow the same visual pattern as existing cards (sectioned cards with icons, metric rows, and color variants)

2. **Response Time Display**: Uses string format for flexibility (e.g., "2m", "4h", "3d")

3. **SLA Percentage Display**: Shows green for high compliance (>80%), amber for medium (60-80%), red for low (<60%)

4. **Stage IDs**: Uses existing IDs already defined in the pipeline schema:
   - `scheduling`
   - `silver-med`
   - `talent-community`

5. **Mock Data**: Will enhance existing `JOB-001` with full stage-specific metrics and progress funnels for all three new stages
