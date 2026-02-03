

# Operations Manager Console - Implementation Plan

Transform the existing Ops pages into a comprehensive Operations Manager Console with enhanced dashboard widgets, Job Pipeline module (replacing Workflows), specialized pipeline templates, and improved navigation structure per the PRD.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/OpsSidebar.tsx` | Modify | Update navigation labels (Human Activity, AI Activity) and add filter dropdown |
| `src/pages/OpsDashboard.tsx` | Major Update | Add comprehensive widgets: Pipeline SLA Status, AI vs Human Distribution, HITL Queue Volume, Top Templates |
| `src/pages/OpsOrchestrationEngine.tsx` | Major Update | Rename Workflows tab to "Job Pipeline", update terminology, enhance templates |
| `src/pages/OpsRecruiterDashboard.tsx` | Modify | Rename to "Human Activity" and add job pipeline + enterprise filters |
| `src/pages/OpsAIPerformance.tsx` | Modify | Rename to "AI Activity" and add additional filter dropdowns |
| `src/lib/mockData.ts` | Modify | Add pipeline templates data with profession/tier/zone metadata |
| `src/components/orchestration/WorkflowTemplatesDialog.tsx` | Major Update | Rename to pipeline templates with PRD-specified templates |
| `src/components/orchestration/PipelineTemplatesDialog.tsx` | Create | New specialized pipeline template selector per PRD |

---

## Feature Implementation

### 1. Navigation Updates (OpsSidebar)

Update sidebar labels to match PRD terminology:

**Current Navigation:**
```text
OVERVIEW
  - Dashboard
ORCHESTRATION  
  - Orchestration Engine
OPERATIONS
  - Recruiter Dashboard
  - AI Performance
```

**Updated Navigation:**
```text
OVERVIEW
  - Dashboard
ORCHESTRATION  
  - Orchestration Engine
OPERATIONS
  - Human Activity
  - AI Activity
```

### 2. Enhanced Dashboard (OpsDashboard)

Add comprehensive operational widgets per PRD Section 4.1:

**New Widget Layout:**
```text
+------------------+------------------+------------------+------------------+
| Active Pipelines | AI vs Human      | HITL Queue       | Pipeline SLA     |
| (existing)       | Distribution     | Volume           | Status           |
+------------------+------------------+------------------+------------------+
|        Top Hiring Templates in Use (New Card)                            |
+--------------------------------------------------------------------------+
|        Pipeline SLA Overview (New Card with status breakdown)            |
+--------------------------------------------------------------------------+
|        Quick Actions (existing, updated text)                            |
+--------------------------------------------------------------------------+
```

**New Metrics to Add:**
- AI vs Human Task Distribution (donut chart showing percentage split)
- HITL Queue Volume (count with trend)
- Pipeline SLA Status (Green/Amber/Red breakdown)
- Top Hiring Templates in Use (table showing template usage stats)

**New Filters to Add:**
- Customer / Enterprise dropdown
- Job Role filter
- City Tier filter
- Date Range selector

### 3. Orchestration Engine - Job Pipeline Module

Transform the current Workflows tab into "Job Pipeline" with enhanced features:

**Tab Rename:**
```tsx
// From:
<TabsTrigger value="workflows">Workflows</TabsTrigger>

// To:
<TabsTrigger value="job-pipeline">Job Pipeline</TabsTrigger>
```

**Updated Tabs Structure:**
```text
[Job Pipeline] [Agents] [Rules]
     ^             ^        ^
  Pipelines    Agent    HITL Rules
  Templates   Registry  (existing)
```

Note: Removing "Connectors" and "Telemetry" tabs to match PRD which specifies only 3 sub-modules.

**Pipeline Templates (per PRD Section 5.2):**

| Template Name | Hiring Type | Profession | Job Zone | Default AI % |
|---------------|-------------|------------|----------|--------------|
| Nurse Hiring - Tier 1 City | Bulk | Nurse | 1 | 85% |
| Doctor Hiring - Tier 1 City | Fast Track | Doctor | 1 | 55% |
| Nurse Hiring - Tier 2 City | Bulk | Nurse | 2 | 80% |
| Technician Hiring - Standard | Bulk | Technician | 1 | 90% |

**Template Metadata Fields:**
```tsx
interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  hiringType: "bulk" | "fast_track";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  defaultAICoverage: number;
  defaultHITLRuleset: string;
  stages: PipelineStage[];
}
```

### 4. Pipeline Configuration UI Enhancements

Add Miro-like board characteristics per PRD:

**Stage Types (Node Colors):**
- AI Stage (Orange)
- Automation Stage (Green)
- Human Stage (Blue)
- Decision Gateway (Black diamond)

**Pipeline Stages Examples:**
1. Job Discovery (optional per enterprise)
2. Expression of Interest
3. AI Resume Screening
4. AI Fit Score
5. Human Review
6. Scheduling Agent
7. Interview
8. Offer Generation
9. Joining Confirmation

**Enterprise-Specific Variations:**
- KIMS Hospital: No Job Discovery stage (entry = Expression of Interest)
- Other enterprises: Full workflow

### 5. Agents Module Updates

The existing AgentRegistry aligns with PRD requirements but needs metadata fields:

**Add Agent Configuration Fields:**
```tsx
interface ExtendedAgent {
  // Existing fields...
  capabilities: ("screening" | "outreach" | "scheduling" | "scoring")[];
  inputContract: string[]; // resume, profile, job description
  outputSchema: string[]; // fit score, decision, ranking
  rateLimits: { requestsPerMinute: number; concurrentTasks: number };
  fallbackAgentId: string | null;
}
```

### 6. Rules Module Enhancements

Add threshold rules per PRD Appendix (Job Pipeline Threshold Rules):

**Rule Categories by Stage:**

| Stage | Threshold | Trigger | Action |
|-------|-----------|---------|--------|
| Job Posting | Time to Publish | Job not published within 10 mins | Escalate to HITL |
| Sourcing | Candidate Supply Gap | Sourced < 50 within 24 hrs | Activate Sourcing Agent |
| Outreach | Delivery Failure | Failure rate > 10% | Switch to Alternate Channel |
| Screening | AI Confidence Low | Confidence < 0.7 | Route to HITL Queue |
| Interview | Scheduling Delay | Not scheduled within 24 hrs | Trigger Scheduling Agent |

**New Rule Types to Add:**
```tsx
type ExtendedRuleType = 
  | "confidence"      // existing
  | "business"        // existing
  | "anomaly"         // existing
  | "sla"             // existing
  | "posting"         // new
  | "sourcing"        // new
  | "outreach"        // new
  | "interview";      // new
```

### 7. Human Activity Page Updates

Rename "Recruiter Dashboard" to "Human Activity" and add filters:

**New Filters:**
- Job Pipeline dropdown
- Enterprise Customer dropdown
- Role Type dropdown

**Metrics (already aligned with PRD):**
- Tasks completed (existing)
- Average handling time (to add)
- Queue backlog (to add)
- SLA compliance (existing via Effort Utilization)
- Human override decisions (to add)

### 8. AI Activity Page Updates

Rename "AI Performance" to "AI Activity" and add metrics:

**New Metrics to Add:**
- AI tasks executed (count)
- Automation success rate (percentage)
- Error / failure events (count with severity)

---

## Data Structure Updates

### New Pipeline Template Interface

```tsx
export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  hiringType: "bulk" | "fast_track";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  defaultAICoverage: number;
  defaultHITLRuleset: string;
  characteristics: string[];
  stages: WorkflowStage[];
  icon: string;
}
```

### Pipeline Templates Data

```tsx
export const pipelineTemplates: PipelineTemplate[] = [
  {
    id: "template-nurse-t1",
    name: "Nurse Hiring - Tier 1 City",
    description: "High-volume nurse hiring for metro hospitals",
    hiringType: "bulk",
    profession: "nurse",
    jobZone: 1,
    defaultAICoverage: 85,
    defaultHITLRuleset: "standard-nursing",
    characteristics: ["6 stages", "High automation", "AI-first"],
    stages: [/* standard 6-stage pipeline */],
    icon: "Zap",
  },
  {
    id: "template-doctor-t1",
    name: "Doctor Hiring - Tier 1 City",
    description: "Premium physician recruitment with human checkpoints",
    hiringType: "fast_track",
    profession: "doctor",
    jobZone: 1,
    defaultAICoverage: 55,
    defaultHITLRuleset: "enterprise-physician",
    characteristics: ["6 stages", "Human-heavy", "Mandatory approvals"],
    stages: [/* physician pipeline with more human stages */],
    icon: "Users",
  },
  // ... additional templates
];
```

### Dashboard KPIs Data

```tsx
export const opsDashboardKPIs = {
  activePipelines: 12,
  aiTaskDistribution: 68,
  humanTaskDistribution: 32,
  hitlQueueVolume: 47,
  hitlQueueTrend: 12, // % change
  pipelineSLAStatus: {
    green: 8,
    amber: 3,
    red: 1,
  },
  topTemplates: [
    { name: "Nurse Hiring - Tier 1", activeJobs: 24, aiCoverage: 85 },
    { name: "Doctor Hiring - Tier 1", activeJobs: 8, aiCoverage: 55 },
    { name: "Technician Standard", activeJobs: 15, aiCoverage: 90 },
  ],
};
```

---

## File Structure

```text
src/
  components/
    layout/
      OpsSidebar.tsx                    (update - rename nav items)
    orchestration/
      WorkflowList.tsx                  (update - rename to pipeline terminology)
      WorkflowCard.tsx                  (update - add template metadata display)
      WorkflowTemplatesDialog.tsx       (major update - rename to PipelineTemplatesDialog)
      WorkflowBuilderDialog.tsx         (update - add profession/zone fields)
  pages/
    OpsDashboard.tsx                    (major update - add widgets and filters)
    OpsOrchestrationEngine.tsx          (update - rename tabs, remove unused tabs)
    OpsRecruiterDashboard.tsx           (update - rename title, add filters)
    OpsAIPerformance.tsx                (update - rename title, add metrics)
  lib/
    mockData.ts                         (update - add pipeline templates, ops KPIs)
```

---

## UI Component Updates

### Dashboard Widget Grid

```text
Row 1: [4 KPI Cards - Active Pipelines, AI/Human Split, HITL Queue, SLA Status]

Row 2: [Top Templates Table Card spanning full width]
       - Template Name | Active Jobs | AI Coverage % | HITL Ruleset

Row 3: [Filters: Customer | Job Role | City Tier | Date Range]

Row 4: [Quick Actions Grid - 3 cards as existing]

Row 5: [System Health - 3 status cards as existing]
```

### Orchestration Engine Tabs

```text
Before: [Workflows] [Agents] [Connectors] [Telemetry] [HITL Rules]
After:  [Job Pipeline] [Agents] [Rules]
```

---

## Key Interactions

### Create Pipeline from Template Flow

1. Ops Manager clicks "Templates" button in Job Pipeline tab
2. PipelineTemplatesDialog opens showing templates by profession/zone
3. Ops Manager selects template (e.g., "Nurse Tier 1")
4. Dialog pre-fills pipeline builder with template stages
5. Ops Manager customizes stages on Miro-like board
6. Assigns AI agents and human roles per stage
7. Adds threshold rules (links to Rules tab)
8. Clicks "Publish to Phenom Backend"

### Enterprise-Specific Override Flow

1. Select Enterprise from Customer dropdown (e.g., "KIMS Hospital")
2. Dashboard filters to show only KIMS data
3. In Job Pipeline, create new pipeline
4. System auto-loads KIMS-specific schema (no Job Discovery stage)
5. Entry Stage defaults to "Expression of Interest"
6. Save as enterprise-specific override

---

## Acceptance Criteria

| Requirement | Implementation |
|-------------|----------------|
| Navigation shows Human Activity / AI Activity | OpsSidebar label updates |
| Dashboard has 5 widget types per PRD | New cards: HITL Queue, SLA Status, Templates |
| Orchestration has 3 sub-tabs | Job Pipeline, Agents, Rules |
| Pipeline templates have profession/zone metadata | PipelineTemplate interface with metadata |
| Enterprise filters available | Customer dropdown in dashboard and filters |
| KIMS Hospital flow skips Job Discovery | customerWorkflowSchemas already supports this |

---

## Result

When complete, the Operations Manager Console will:

- Display comprehensive operational metrics on the dashboard
- Provide specialized pipeline templates by profession and city tier
- Enable rapid pipeline configuration without engineering dependency
- Support enterprise-specific workflow variations
- Consolidate all orchestration into three focused modules
- Use consistent "Human Activity" and "AI Activity" terminology

