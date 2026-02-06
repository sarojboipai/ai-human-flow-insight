
# Plan: Add Complete Stage Metrics for All Jobs

## Overview

Currently, only **Senior ICU Nurse (JOB-001)** has fully populated stage-specific metrics with detailed data for each of the 8 hiring stages. The other 9 jobs (JOB-002 through JOB-010) are missing these detailed metrics. This plan will add complete enhanced stage metrics to all jobs to match the data richness of JOB-001.

---

## Current State Analysis

| Job | Enhanced Stage Metrics | Stage-Specific Metrics | Progress Funnels |
|-----|------------------------|------------------------|------------------|
| JOB-001 (Senior ICU Nurse) | Yes (8 stages) | Yes (all 8 types) | Yes (all 8) |
| JOB-002 (General Physician) | Partial (8 stages) | No | No |
| JOB-003 (Emergency Paramedic) | Partial (8 stages) | No | No |
| JOB-004 to JOB-010 | No | No | No |

---

## Implementation

### Single File Change

**File:** `src/lib/mockData.ts`

### Changes Required

For each of the 9 jobs (JOB-002 through JOB-010), add complete `enhancedStageMetrics` objects with:

1. **8 Stage Objects** per job:
   - `jobs-ankura` (Jobs in Swaasa)
   - `job-discovery` (Job Discovery)
   - `expression` (Expression of Interest)
   - `prescreen` (Pre-Screen Questions)
   - `voice-agent` (Voice Agent Screening)
   - `scheduling` (Interview Scheduling)
   - `silver-med` (Silver Medalist)
   - `talent-community` (Talent Community)

2. **Each Stage Object** will include:
   - Base metrics: `sent`, `appeared`, `qualified`, `disqualified`, `pending`
   - Handler info: `avgResponseTime`, `handler`
   - Attribution: `aiPercentage`, `humanPercentage`, `hitlPercentage`
   - SLA info: `avgTimeInStage`, `slaThreshold`, `slaStatus`
   - Conversion: `conversionRate`, `dropOffRate`
   - Stage-specific metrics object (e.g., `jobsSwaasaMetrics`, `voiceScreeningMetrics`)
   - `progressFunnel` array with step-by-step progression

3. **Data Generation Approach**:
   - Derive numbers proportionally from each job's existing `funnel` data
   - Apply realistic variance based on job type (nurse, doctor, paramedic, technician)
   - Apply variance based on employer tier (enterprise, mid-market, smb)
   - Ensure SLA statuses reflect the job's `daysOpen` and performance

---

## Jobs to Update

| Job ID | Title | Employer | Type |
|--------|-------|----------|------|
| JOB-002 | General Physician | Oasis Fertility | Doctor |
| JOB-003 | Emergency Paramedic | Manipal Hospitals | Paramedic |
| JOB-004 | Lab Technician | KIMS Hospital | Technician |
| JOB-005 | Pediatric Nurse | Yashoda Hospitals | Nurse |
| JOB-006 | Cardiologist | Aster CMI Hospital | Doctor |
| JOB-007 | Radiologist | Apollo Hospitals | Doctor |
| JOB-008 | Staff Nurse | Fortis Healthcare | Nurse |
| JOB-009 | Anesthesiologist | Max Healthcare | Doctor |
| JOB-010 | Medical Officer | Narayana Health | Doctor |

---

## Technical Details

### Stage-Specific Metrics to Add

For each job and each stage, the following metrics objects will be populated:

1. **Jobs in Swaasa** (`jobsSwaasaMetrics`):
   - Job impressions, unique views, CTR, save/share rates
   - Match score, content quality, AI rankings

2. **Job Discovery** (`jobDiscoveryMetrics`):
   - Search sessions, CTR, filter usage, recommendations
   - AI match confidence, relevance scores, latency

3. **Expression of Interest** (`eoiMetrics`):
   - Click rate, lead capture, consent completion
   - Intent score, fraud detection, AI qualification

4. **Pre-Screen Questions** (`preScreenMetrics`):
   - Question start/completion rates, knockout/pass rates
   - False rejection, resume parse confidence, AI auto-reject

5. **Voice Agent Screening** (`voiceScreeningMetrics`):
   - Call attempt/connect rates, duration
   - AI/human pass rates, speech recognition, fit scores

6. **Interview Scheduling** (`interviewSchedulingMetrics`):
   - Invites sent, scheduled, completed, no-show rate
   - AI/human scheduling split, response times, SLA compliance

7. **Silver Medalist** (`silverMedalistMetrics`):
   - Candidates tagged, re-engagement, conversions
   - Tagging rates, response times, retention scores

8. **Talent Community** (`talentCommunityMetrics`):
   - Community members, engagement rates, activation
   - Moderation split, response times, hire rates

### Progress Funnel Examples

Each stage will have a micro-funnel showing internal progression, such as:

```text
Voice Agent Stage:
  Call Scheduled (100%)
  Call Dialed (96%)
  Call Connected (84%)
  Questions Asked (78%)
  AI Evaluation Completed (71%)
  Final Outcome (62%)
```

---

## Estimated Effort

- **File changes**: 1 file (`mockData.ts`)
- **Lines to add**: Approximately 1,500-2,000 lines of mock data
- **Complexity**: Medium (repetitive data structure, requires proportional calculations)

---

## Outcome

After implementation:
- All 10 jobs will display the same level of detailed stage metrics
- Clicking any stage node in the Job Workflow Explorer will show complete analytics
- Each stage will have AI/Human/HITL attribution, SLA compliance, conversion metrics, stage-specific KPIs, and in-stage progress funnels
