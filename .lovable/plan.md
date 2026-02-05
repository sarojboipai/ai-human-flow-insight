
# Stage Metrics & In-Stage Progress Tracking Enhancement

## Summary
Extend the existing `StageDetailsSheet` component and `EnhancedStageMetrics` data model to include comprehensive stage-specific metrics and in-stage progress funnels for each of the 5 pipeline stages defined in the PRD.

---

## Current State

The existing `StageDetailsSheet` displays:
- AI/Human/HITL attribution bar
- Volume metrics (Sent, Appeared, Qualified)
- Conversion/Drop-off rates
- Additional metrics (Disqualified, Pending, Delay Cause)
- Channel breakdown (optional)
- Handler & Response time

This generic structure needs to be enhanced with **stage-specific metrics** and **in-stage progress funnels**.

---

## Proposed Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│  StageDetailsSheet (Enhanced)                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Header: Stage Name + SLA Badge                                        │  │
│  │  Subtitle: Avg Time in Stage | SLA Threshold                           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  AI vs Human vs HITL Attribution Bar                                   │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  📊 Core Metrics (Stage-Specific)                                      │  │
│  │  ├── Reach & Awareness / Search & Discovery / Intent / etc.           │  │
│  │  ├── Quality Metrics                                                   │  │
│  │  └── AI vs Human Breakdown                                             │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  ⏳ In-Stage Progress Funnel                                           │  │
│  │  ├── Step 1: Label ─────────────────────────────────── 100% (1,234)   │  │
│  │  ├── Step 2: Label ───────────────────────────── 85% (1,049)          │  │
│  │  ├── Step 3: Label ──────────────────────── 72% (887)                 │  │
│  │  ├── Step 4: Label ─────────────────── 58% (714)                      │  │
│  │  └── Step 5: Label ────────────── 45% (554)                           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Conversion Analysis (Existing)                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Changes Required

### 1. Extend Data Model
**File: `src/lib/mockData.ts`**

Add new interface for stage-specific metrics and in-stage progress:

```typescript
// In-stage progress step
interface ProgressStep {
  label: string;
  count: number;
  percentage: number;
}

// Stage-specific metrics by stage type
interface JobsSwaasaMetrics {
  // Reach & Awareness
  jobImpressions: number;
  uniqueCandidateViews: number;
  jobCTR: number; // Impressions → Clicks
  saveRate: number;
  shareRate: number;
  // Quality
  matchScoreAvg: number;
  contentQualityScore: number;
  // AI vs Human
  aiRankedImpressions: number;
  manualBoosted: number;
  hitlOverrideRate: number;
}

interface JobDiscoveryMetrics {
  // Search & Discovery
  searchSessions: number;
  searchResultCTR: number;
  filterUsageRate: number;
  recommendationClickRate: number;
  // Matching
  aiMatchConfidence: number;
  top10RelevanceScore: number;
  coldStartRate: number;
  // Operational
  searchLatency: string;
  rankingConfidenceDrift: number;
}

interface EOIMetrics {
  // Intent
  eoiClickRate: number;
  leadCaptureRate: number;
  consentCompletionRate: number;
  // Lead Quality
  intentScore: number;
  fraudDetectionRate: number;
  duplicateLeadRate: number;
  // AI vs Human
  aiAutoQualified: number;
  hitlReviewedLeads: number;
}

interface PreScreenMetrics {
  // Screening
  questionStartRate: number;
  completionRate: number;
  knockoutRate: number;
  passRate: number;
  // Quality
  falseRejectionRate: number;
  resumeParseConfidence: number;
  eligibilityScoreDistribution: Record<string, number>;
  // AI vs Human
  aiAutoReject: number;
  hitlOverride: number;
  manualApproval: number;
}

interface VoiceScreeningMetrics {
  // Engagement
  callAttemptRate: number;
  callConnectRate: number;
  avgCallDuration: string;
  // Screening Outcome
  aiPassRate: number;
  humanPassRate: number;
  dropOffDuringCall: number;
  // Quality
  speechRecognitionConfidence: number;
  responseConfidenceScore: number;
  hiringManagerFitScore: number;
  // AI vs Human
  aiFullyScreened: number;
  hitlReview: number;
  humanInterview: number;
}

// Updated EnhancedStageMetrics interface
interface EnhancedStageMetrics {
  // ... existing fields ...
  
  // Stage-specific metrics (only one populated based on stage type)
  jobsSwaasaMetrics?: JobsSwaasaMetrics;
  jobDiscoveryMetrics?: JobDiscoveryMetrics;
  eoiMetrics?: EOIMetrics;
  preScreenMetrics?: PreScreenMetrics;
  voiceScreeningMetrics?: VoiceScreeningMetrics;
  
  // In-stage progress funnel
  progressFunnel?: ProgressStep[];
}
```

### 2. Create Reusable Components
**New File: `src/components/customer/stage-metrics/InStageProgressFunnel.tsx`**

A visual funnel component showing micro-progression within a stage:

```text
┌─────────────────────────────────────────────────────────────┐
│  ⏳ In-Stage Progress                                       │
├─────────────────────────────────────────────────────────────┤
│  Job Published        ████████████████████████  100%  (523) │
│  Job Indexed          ██████████████████████    95%   (497) │
│  Job Ranked by AI     █████████████████         85%   (445) │
│  Job Viewed           ████████████              62%   (324) │
│  Apply Clicked        ██████                    38%   (199) │
└─────────────────────────────────────────────────────────────┘
```

### 3. Create Stage-Specific Metric Cards
**New Files:**
- `src/components/customer/stage-metrics/JobsSwaasaMetricsCard.tsx`
- `src/components/customer/stage-metrics/JobDiscoveryMetricsCard.tsx`
- `src/components/customer/stage-metrics/EOIMetricsCard.tsx`
- `src/components/customer/stage-metrics/PreScreenMetricsCard.tsx`
- `src/components/customer/stage-metrics/VoiceScreeningMetricsCard.tsx`

Each card displays the relevant metrics for that stage type in organized sections.

### 4. Update StageDetailsSheet
**File: `src/components/customer/StageDetailsSheet.tsx`**

- Add a `stageId` prop to identify which stage-specific metrics to render
- Conditionally render the appropriate metric card based on stage type
- Add the `InStageProgressFunnel` component

### 5. Add Mock Data
**File: `src/lib/mockData.ts`**

Populate the enhanced metrics for existing job records with stage-specific data.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/lib/mockData.ts` | Modify | Extend `EnhancedStageMetrics` interface and add mock data |
| `src/components/customer/stage-metrics/InStageProgressFunnel.tsx` | Create | Visual funnel showing micro-progression |
| `src/components/customer/stage-metrics/JobsSwaasaMetricsCard.tsx` | Create | Jobs in Swaasa specific metrics |
| `src/components/customer/stage-metrics/JobDiscoveryMetricsCard.tsx` | Create | Job Discovery specific metrics |
| `src/components/customer/stage-metrics/EOIMetricsCard.tsx` | Create | Expression of Interest specific metrics |
| `src/components/customer/stage-metrics/PreScreenMetricsCard.tsx` | Create | Pre-Screen Questions specific metrics |
| `src/components/customer/stage-metrics/VoiceScreeningMetricsCard.tsx` | Create | Voice Agent Screening specific metrics |
| `src/components/customer/stage-metrics/index.ts` | Create | Barrel export file |
| `src/components/customer/StageDetailsSheet.tsx` | Modify | Integrate new components, add stage type detection |
| `src/components/customer/PipelineBoardDialog.tsx` | Modify | Pass `stageId` to StageDetailsSheet |

---

## Visual Layout for Each Stage Card

### Jobs in Swaasa Metrics Card
```text
┌─────────────────────────────────────────────────────────────┐
│  📊 Reach & Awareness                                       │
├─────────────────────────────────────────────────────────────┤
│  Job Impressions         12,450    Unique Views       8,234 │
│  Job CTR                  3.2%     Save Rate          12.5% │
│  Share Rate               2.1%                              │
├─────────────────────────────────────────────────────────────┤
│  📈 Quality Metrics                                         │
├─────────────────────────────────────────────────────────────┤
│  Match Score Avg           78%     Content Quality      85% │
├─────────────────────────────────────────────────────────────┤
│  🤖 AI vs Human                                             │
├─────────────────────────────────────────────────────────────┤
│  AI-ranked                 85%     Manual Boosted      12%  │
│  HITL Override Rate         3%                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Stage ID to Metrics Type Mapping

| Stage ID | Metrics Type | Progress Funnel Steps |
|----------|--------------|----------------------|
| `jobs-ankura` | `jobsSwaasaMetrics` | Published → Indexed → Ranked → Viewed → Apply Clicked |
| `job-discovery` | `jobDiscoveryMetrics` | Search Triggered → Results Generated → Filters Applied → Card Viewed → Job Opened → Interest Clicked |
| `expression` | `eoiMetrics` | Interest Clicked → Details Submitted → Consent Given → Lead Scored → Routed to Pipeline |
| `prescreen` | `preScreenMetrics` | Questions Loaded → Started → Completed → Auto-Scored → Passed/Failed/Escalated |
| `voice-agent` | `voiceScreeningMetrics` | Call Scheduled → Dialed → Connected → Questions Asked → AI Evaluated → Final Outcome |

---

## Technical Notes

1. **Stage Detection**: The `StageDetailsSheet` will receive `stageId` and use a mapping to determine which metric card to render

2. **Graceful Fallback**: If stage-specific metrics are not available, the sheet falls back to the existing generic display

3. **Progress Funnel Calculation**: Percentages are calculated relative to the first step (100%) for visual consistency

4. **Responsive Design**: All metric cards use the existing `Card` and grid patterns for consistent styling

5. **Color Coding**: Use existing semantic colors:
   - Green/Emerald for positive metrics (pass rates, high scores)
   - Amber for warning metrics (drop-off, at-risk)
   - Blue for informational metrics
   - Orange for AI-related metrics
