

# Implementation Plan: Orchestration Engine & Job Funnel Explorer

This plan implements two major new modules for the SHIP platform based on your PRD requirements, following the phased approach you outlined.

---

## Overview

We will build:
1. **Orchestration Engine** - Control plane for AI agents, bots, and automation tools
2. **Job Funnel Explorer** - Job-level intelligence cockpit with economics

---

## Phase 1: Fast Value (This Implementation)

### New Pages to Create

| Page | Route | Purpose |
|------|-------|---------|
| Orchestration Engine | `/orchestration` | Agent registry + pipeline overview |
| Job Funnel Explorer | `/jobs` | Job-level funnel intelligence |
| Job Detail View | `/jobs/:jobId` | Individual job deep-dive |

### New Components to Build

| Component | Location | Purpose |
|-----------|----------|---------|
| AgentRegistry | `src/components/orchestration/AgentRegistry.tsx` | Table of AI agents/bots with status |
| PipelineGraph | `src/components/orchestration/PipelineGraph.tsx` | Visual DAG of AI + human workflow |
| AgentPerformanceCard | `src/components/orchestration/AgentPerformanceCard.tsx` | Individual agent metrics |
| JobFunnelTable | `src/components/jobs/JobFunnelTable.tsx` | Searchable/filterable job list |
| JobFunnelVisualization | `src/components/jobs/JobFunnelVisualization.tsx` | Per-job funnel stages |
| AIHumanContributionChart | `src/components/jobs/AIHumanContributionChart.tsx` | Stacked contribution view |
| HITLTimeline | `src/components/jobs/HITLTimeline.tsx` | Timeline of human interventions |
| JobEconomicsCard | `src/components/jobs/JobEconomicsCard.tsx` | Revenue/cost/margin per job |

---

## Detailed Implementation

### 1. Mock Data Extensions

Add new data structures to `src/lib/mockData.ts`:

```text
New exports:
- agents[] - Registry of AI agents, internal bots, third-party tools
- jobs[] - List of jobs with funnel stages and economics
- pipelineStages[] - DAG nodes for orchestration visualization
- hitlEvents[] - Timeline events for job-level HITL tracking
```

**Agent Structure:**
- id, name, type (Phenom AI, Internal Bot, Third-Party Tool)
- status (active, paused, error)
- tasksProcessed, successRate, avgLatency
- lastActive, assignedStages

**Job Structure:**
- jobId, title, employer, roleType, geography
- funnelStages (with candidate counts per stage)
- aiContribution, humanContribution percentages
- revenue, cost, margin
- hitlEvents timeline

---

### 2. Orchestration Engine Page

**Route:** `/orchestration`

**Sections:**

A. **Header & Key Metrics**
   - Total Active Agents
   - AI Processing Rate
   - Human Handoff Rate
   - System Health Score

B. **Agent Registry Table**
   - Columns: Name, Type, Status, Tasks/Day, Success Rate, Latency, Stages
   - Filters: Type, Status
   - Actions: View Details, Pause/Resume

C. **Pipeline Orchestration Graph**
   - Visual representation of hiring stages as connected nodes
   - Each node shows: Stage name, AI agent assigned, Human backup
   - Color coding: Green (AI), Orange (Human), Blue (HITL)
   - Lines showing flow between stages

D. **Agent Performance Cards**
   - Grid of top agents with sparkline trends
   - Precision/recall for matching agents
   - SLA adherence for scheduling agents

E. **HITL Routing Rules Panel**
   - Active rules with trigger counts
   - Quick toggle to pause/resume rules
   - Link to full HITL Queue page

---

### 3. Job Funnel Explorer Page

**Route:** `/jobs`

**Sections:**

A. **Header & Global Filters**
   - Search by Job ID or Title
   - Filters: Role Type, Geography, Employer Tier, Date Range

B. **Key Metrics Row**
   - Total Active Jobs
   - Avg Conversion Rate
   - Avg Time-to-Fill
   - Total Pipeline Value

C. **Jobs Table**
   - Columns: Job ID, Title, Employer, Role, Stage, Candidates, AI%, Days Open, Revenue Potential
   - Click row to navigate to detail view
   - Sort by any column
   - Pagination for large lists

D. **Aggregate Funnel View**
   - Stacked bar chart showing candidates across all funnel stages
   - Split by AI vs Human contribution
   - Similar to existing FunnelChart but with AI/Human breakdown

---

### 4. Job Detail Page

**Route:** `/jobs/:jobId`

**Sections:**

A. **Job Header**
   - Job title, employer, role type, geography
   - Status badge, days open
   - Quick actions: View Employer, Export Data

B. **Job Funnel Visualization**
   - Horizontal funnel showing 7 stages
   - Candidate counts with drop-off percentages
   - Time-in-stage indicators

C. **AI vs Human Contribution Panel**
   - Stacked horizontal bar for each stage
   - Shows % AI automated vs Human handled
   - Highlights stages needing more automation

D. **HITL Timeline**
   - Vertical timeline of human intervention events
   - Event details: Type, Assignee, Resolution, Duration
   - Filter by intervention type

E. **Job Unit Economics**
   - Revenue (placement fee)
   - Costs (recruiter time, AI processing)
   - Gross Margin
   - Comparison to average job of same type

F. **Activity Feed**
   - Recent events: candidate stage changes, HITL triggers
   - Real-time feel with timestamps

---

### 5. Navigation Updates

Update `AppSidebar.tsx`:

```text
Add to mainNavItems:
- Job Explorer (/jobs) with Briefcase icon

Add new section "Orchestration":
- Orchestration Engine (/orchestration) with Network icon
```

---

### 6. Routing Updates

Add to `App.tsx`:

```text
<Route path="/orchestration" element={<OrchestrationEngine />} />
<Route path="/jobs" element={<JobFunnelExplorer />} />
<Route path="/jobs/:jobId" element={<JobDetail />} />
```

---

## Visual Design

### Pipeline Graph Approach

Using Recharts with custom node rendering:
- Stages as rectangular nodes arranged left-to-right
- Curved lines connecting stages
- Node color indicates primary handler (AI/Human)
- Badges show agent assignments

### Color Scheme (Consistent with existing)
- AI/Automation: `hsl(173, 58%, 45%)` (teal)
- Human: `hsl(38, 92%, 50%)` (amber)
- HITL: `hsl(199, 89%, 48%)` (blue)
- Success: `hsl(158, 64%, 52%)` (green)
- Warning: `hsl(38, 92%, 50%)` (orange)

---

## Technical Details

### File Structure

```text
src/
  components/
    orchestration/
      AgentRegistry.tsx
      PipelineGraph.tsx
      AgentPerformanceCard.tsx
    jobs/
      JobFunnelTable.tsx
      JobFunnelVisualization.tsx
      AIHumanContributionChart.tsx
      HITLTimeline.tsx
      JobEconomicsCard.tsx
  pages/
    OrchestrationEngine.tsx
    JobFunnelExplorer.tsx
    JobDetail.tsx
  lib/
    mockData.ts (extended)
```

### Dependencies
- All existing dependencies are sufficient
- Recharts for visualizations (already installed)
- React Router for navigation (already installed)
- Lucide icons (already installed)

### Data Model Additions

**Agent Registry:**
```text
interface Agent {
  id: string
  name: string
  type: "phenom" | "internal" | "third-party"
  status: "active" | "paused" | "error"
  description: string
  tasksProcessed: number
  successRate: number
  avgLatencyMs: number
  assignedStages: string[]
  lastActive: string
}
```

**Job with Funnel:**
```text
interface Job {
  id: string
  title: string
  employer: string
  employerTier: "enterprise" | "mid-market" | "smb"
  roleType: "nurse" | "doctor" | "paramedic"
  geography: string
  status: "active" | "filled" | "closed"
  createdAt: string
  daysOpen: number
  funnel: FunnelStage[]
  aiContribution: number
  humanContribution: number
  revenue: number
  cost: number
  margin: number
  hitlEvents: HITLEvent[]
}
```

---

## Phase 2 Preview (Future)

After this implementation, Phase 2 will add:
- Enhanced HITL routing engine with rule builder UI
- Deeper agent performance analytics with drill-down
- Job-level economics with cost attribution
- Predictive margin modeling

---

## Phase 3 Preview (Future)

Phase 3 will add:
- Visual DAG editor (drag-and-drop pipeline design)
- Predictive staffing simulator
- AI confidence auto-routing with feedback loops

---

## Implementation Order

1. Extend mock data with agents and jobs data
2. Create orchestration components (AgentRegistry, PipelineGraph)
3. Create Orchestration Engine page
4. Create job components (JobFunnelTable, charts, timeline)
5. Create Job Funnel Explorer page
6. Create Job Detail page
7. Update navigation sidebar
8. Update routing in App.tsx
9. Test end-to-end navigation and data display

