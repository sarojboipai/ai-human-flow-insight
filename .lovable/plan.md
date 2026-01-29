

# Swaasa Orchestration Engine - Implementation Plan

This plan enhances the existing Orchestration Engine with the comprehensive control plane capabilities described in the PRD, transforming it from a dashboard view into a full workflow management system.

---

## Current State vs. Target State

| Feature | Current State | Target State |
|---------|---------------|--------------|
| Workflow Builder | Not implemented | Visual workflow designer with stages, conditions, templates |
| Agent Registry | Basic table view with status | Full CRUD, health monitoring, cost metadata, capability tagging |
| HITL Rules Engine | Fully implemented in `/hitl` | Already complete - link integration needed |
| Automation Connectors | Not implemented | Connector configuration UI, event triggers, credential management |
| Execution Telemetry | Not implemented | Real-time execution logs, trace monitoring |

---

## Architecture Overview

The enhanced Orchestration Engine will use a tabbed interface similar to the HITL Queue:

```text
+------------------------------------------------------------------+
|  Orchestration Engine                                             |
|  Control plane for AI + Human hiring workflows                    |
+------------------------------------------------------------------+
|  [Tabs: Workflows | Agents | Connectors | Telemetry]             |
+------------------------------------------------------------------+
```

The existing HITL Rules Engine (`/hitl`) remains separate but deeply linked.

---

## New Components to Build

| Component | Location | Purpose |
|-----------|----------|---------|
| WorkflowBuilder | `src/components/orchestration/WorkflowBuilder.tsx` | Visual workflow designer |
| WorkflowCard | `src/components/orchestration/WorkflowCard.tsx` | Workflow summary card |
| WorkflowStageNode | `src/components/orchestration/WorkflowStageNode.tsx` | Individual stage in builder |
| WorkflowConditionEditor | `src/components/orchestration/WorkflowConditionEditor.tsx` | IF/ELSE condition builder |
| WorkflowTemplates | `src/components/orchestration/WorkflowTemplates.tsx` | Pre-built workflow templates |
| AgentDetailDialog | `src/components/orchestration/AgentDetailDialog.tsx` | Full agent CRUD form |
| AgentHealthMonitor | `src/components/orchestration/AgentHealthMonitor.tsx` | Real-time agent health |
| ConnectorRegistry | `src/components/orchestration/ConnectorRegistry.tsx` | External system connectors |
| ConnectorConfigDialog | `src/components/orchestration/ConnectorConfigDialog.tsx` | Connector setup form |
| ExecutionTelemetry | `src/components/orchestration/ExecutionTelemetry.tsx` | Execution trace logs |
| ExecutionTimeline | `src/components/orchestration/ExecutionTimeline.tsx` | Visual execution trace |

---

## Data Model Extensions

### Workflow Entity

```text
interface Workflow {
  id: string
  name: string
  description: string
  version: number
  status: "draft" | "active" | "paused" | "archived"
  jobType: "frontline" | "professional" | "enterprise"
  stages: WorkflowStage[]
  conditions: WorkflowCondition[]
  createdBy: string
  createdAt: string
  updatedAt: string
  executionCount: number
  successRate: number
}
```

### WorkflowStage Entity

```text
interface WorkflowStage {
  id: string
  name: string
  type: "intake" | "match" | "outreach" | "interview" | "offer" | "join"
  assignedActor: "ai" | "human" | "hybrid"
  agentId: string | null
  humanBackup: string
  slaHours: number
  retryPolicy: { maxRetries: number; backoffMinutes: number }
  conditions: StageCondition[]
  position: { x: number; y: number }
}
```

### Connector Entity

```text
interface Connector {
  id: string
  name: string
  type: "ats" | "messaging" | "calendar" | "crm" | "webhook" | "billing"
  provider: string  // e.g., "greenhouse", "whatsapp", "calendly"
  status: "connected" | "disconnected" | "error"
  lastSync: string
  eventSubscriptions: string[]
  config: Record<string, any>
}
```

### Execution Log Entity

```text
interface ExecutionLog {
  id: string
  workflowId: string
  jobId: string
  candidateId: string
  currentStage: string
  status: "running" | "completed" | "failed" | "paused"
  startedAt: string
  completedAt: string | null
  traceEvents: TraceEvent[]
  aiActions: number
  humanActions: number
}
```

---

## Page Implementation

### Enhanced Orchestration Engine Page

The `/orchestration` page will be restructured with tabs:

**Tab 1: Workflows (NEW)**
```text
+------------------------------------------------------------------+
| [+ Create Workflow] [Templates] [Import]        [Search...]       |
+------------------------------------------------------------------+
| Active Workflows (3)                                              |
+------------------------------------------------------------------+
| [Workflow Card: Frontline Hiring v2.1]          [Edit] [Pause]   |
| [Workflow Card: Enterprise Physician v1.0]      [Edit] [Pause]   |
| [Workflow Card: Bulk Paramedic v1.3]            [Edit] [Pause]   |
+------------------------------------------------------------------+
| Draft Workflows (1)                                               |
+------------------------------------------------------------------+
| [Workflow Card: New ICU Process - Draft]        [Edit] [Delete]  |
+------------------------------------------------------------------+
```

**Tab 2: Agents (ENHANCED)**
```text
+------------------------------------------------------------------+
| [+ Register Agent]                              [Filter by Type]  |
+------------------------------------------------------------------+
| Agent Registry Table (existing, enhanced)                         |
| + Health Status (latency sparkline, error rate)                   |
| + Cost per Call                                                   |
| + Capability Tags                                                 |
| + Fallback Agent Configuration                                    |
+------------------------------------------------------------------+
| Agent Health Overview                                             |
| [Real-time health cards for each active agent]                    |
+------------------------------------------------------------------+
```

**Tab 3: Connectors (NEW)**
```text
+------------------------------------------------------------------+
| [+ Add Connector]                               [Filter by Type]  |
+------------------------------------------------------------------+
| Connected Systems                                                 |
+------------------------------------------------------------------+
| [ATS] Greenhouse           Connected    Last sync: 5 mins ago    |
| [Messaging] WhatsApp       Connected    2,450 messages/day       |
| [Calendar] Calendly        Connected    340 bookings/day         |
| [CRM] Salesforce           Disconnected Credentials expired      |
+------------------------------------------------------------------+
| Event Subscriptions                                               |
| - ON interview_scheduled -> Update ATS status                     |
| - ON candidate_joined -> Trigger invoice                          |
| - ON SLA_breach -> Send Slack alert                               |
+------------------------------------------------------------------+
```

**Tab 4: Telemetry (NEW)**
```text
+------------------------------------------------------------------+
| Execution Overview                    [Time: Last 24h v]          |
+------------------------------------------------------------------+
| [Workflows Running] [Completed] [Failed] [Avg Duration]           |
+------------------------------------------------------------------+
| Live Execution Trace                                              |
| Timeline showing current workflow executions with stage markers   |
+------------------------------------------------------------------+
| Recent Executions Log                                             |
| Table with workflow, job, candidate, duration, status             |
+------------------------------------------------------------------+
```

---

## Workflow Builder UI

The Workflow Builder will be a visual interface for creating hiring workflows:

```text
+------------------------------------------------------------------+
|  Workflow: [Frontline Hiring v2.1]              [Save] [Publish]  |
|  Status: Draft                                                    |
+------------------------------------------------------------------+
| Canvas Area (Drag & Drop)                                         |
|                                                                   |
|   [Intake]  -->  [Match]  -->  [Outreach]  -->  [Interview]      |
|      |            |              |                |               |
|      v            v              v                v               |
|   AI Agent    AI Agent       Hybrid          Human + AI          |
|   CV Parser   Matcher        Outreach Bot    Calendar Bot        |
|                                                                   |
|                              [+ Add Stage]                        |
+------------------------------------------------------------------+
| Stage Properties Panel (shown when stage selected)                |
| - Stage Name                                                      |
| - Assigned Actor (AI / Human / Hybrid)                           |
| - AI Agent Selector                                               |
| - Human Backup Team                                               |
| - SLA Timer (hours)                                               |
| - Retry Policy                                                    |
| - Exit Conditions                                                 |
+------------------------------------------------------------------+
```

**Workflow Templates:**
- Frontline Hiring (Nurse, Paramedic) - High automation
- Professional Hiring (Physician) - Balanced hybrid
- Enterprise Hiring (Senior roles) - Human-heavy with AI assist

---

## Navigation Updates

Update sidebar to reflect the enhanced Orchestration section:

```text
Orchestration
  - Orchestration Engine (/orchestration) - Main control plane with tabs
  - HITL Queue (/hitl) - Move to Orchestration section (from Operations)
```

This groups the related workflow and governance tools together.

---

## File Structure

```text
src/
  components/
    orchestration/
      AgentRegistry.tsx (existing, enhanced)
      AgentPerformanceCard.tsx (existing)
      AgentDetailDialog.tsx (NEW)
      AgentHealthMonitor.tsx (NEW)
      PipelineGraph.tsx (existing, integrated into workflows)
      HITLRulesPanel.tsx (existing)
      WorkflowBuilder.tsx (NEW)
      WorkflowCard.tsx (NEW)
      WorkflowStageNode.tsx (NEW)
      WorkflowConditionEditor.tsx (NEW)
      WorkflowTemplates.tsx (NEW)
      WorkflowSimulator.tsx (NEW)
      ConnectorRegistry.tsx (NEW)
      ConnectorConfigDialog.tsx (NEW)
      ConnectorEventSubscriptions.tsx (NEW)
      ExecutionTelemetry.tsx (NEW)
      ExecutionTimeline.tsx (NEW)
      ExecutionLogTable.tsx (NEW)
  pages/
    OrchestrationEngine.tsx (enhanced with tabs)
  lib/
    mockData.ts (extended with workflows, connectors, executions)
```

---

## Mock Data Additions

### Workflows Data

```text
workflows: Workflow[] = [
  {
    id: "wf-001",
    name: "Frontline Hiring",
    description: "Standard workflow for nurse and paramedic positions",
    version: 2,
    status: "active",
    jobType: "frontline",
    stages: [...],
    executionCount: 1245,
    successRate: 87.4
  },
  // ... more workflows
]
```

### Connectors Data

```text
connectors: Connector[] = [
  {
    id: "conn-001",
    name: "Greenhouse ATS",
    type: "ats",
    provider: "greenhouse",
    status: "connected",
    lastSync: "5 mins ago",
    eventSubscriptions: ["candidate_stage_change", "offer_accepted"]
  },
  // WhatsApp, Calendly, Slack, etc.
]
```

### Execution Logs Data

```text
executionLogs: ExecutionLog[] = [
  {
    id: "exec-001",
    workflowId: "wf-001",
    jobId: "JOB-001",
    candidateId: "CAN-45892",
    currentStage: "Interview Scheduling",
    status: "running",
    startedAt: "2 hours ago",
    aiActions: 5,
    humanActions: 1,
    traceEvents: [...]
  },
  // ... more executions
]
```

---

## Implementation Phases

### Phase 1: Enhanced Orchestration Page Structure

1. Restructure OrchestrationEngine.tsx with Tabs component
2. Move current content to "Agents" tab
3. Create placeholder tabs for Workflows, Connectors, Telemetry
4. Update navigation to move HITL to Orchestration section

### Phase 2: Agent Registry Enhancements

1. Add AgentDetailDialog for full CRUD operations
2. Add health monitoring with sparkline charts
3. Add cost metadata display
4. Add capability tagging system
5. Add fallback agent configuration

### Phase 3: Workflow Builder

1. Extend mockData with workflow entities
2. Create WorkflowCard for workflow list view
3. Create WorkflowBuilder canvas component
4. Create WorkflowStageNode for individual stages
5. Create WorkflowTemplates panel
6. Add workflow CRUD operations

### Phase 4: Connectors Module

1. Add connector data models to mockData
2. Create ConnectorRegistry component
3. Create ConnectorConfigDialog
4. Create event subscription management UI

### Phase 5: Telemetry Dashboard

1. Add execution log data models
2. Create ExecutionTelemetry dashboard
3. Create ExecutionTimeline visualization
4. Create ExecutionLogTable with filtering

---

## Technical Considerations

### State Management
- Use React useState for local UI state
- Mock data for demonstration (production would use Supabase)
- Toast notifications for all CRUD operations

### Drag-and-Drop for Workflow Builder
- Use native HTML5 drag-and-drop API
- Visual feedback during drag operations
- Snap-to-grid positioning for stages

### Real-time Telemetry Simulation
- Use setInterval to simulate live updates
- Animate execution progress indicators

---

## Success Criteria

- Orchestration Engine has 4 tabs: Workflows, Agents, Connectors, Telemetry
- Users can view and manage workflow definitions
- Agent registry shows health status, costs, and capabilities
- Connectors display with connection status and event subscriptions
- Telemetry shows execution traces and logs
- HITL Queue is linked from Orchestration section
- All existing functionality preserved

---

## KPIs Enabled by This Implementation

With the enhanced Orchestration Engine, the platform can track:

- AI task execution rate (via telemetry)
- HITL escalation rate (via HITL integration)
- Workflow completion time (via execution logs)
- SLA compliance rate (via workflow SLA configuration)
- Cost per orchestrated hire (via agent cost metadata)

