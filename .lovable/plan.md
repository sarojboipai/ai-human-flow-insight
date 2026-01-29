

# HITL Rule Engine Implementation Plan

This plan implements a comprehensive Human-in-the-Loop (HITL) Rule Engine with full CRUD capabilities, real-time task routing, rule simulation, and analytics - covering all three phases (H1, H2, H3) in a single implementation.

---

## Overview

The HITL Rule Engine is a governance and safety layer that determines when AI decisions require human review. It provides:

1. **Rule Builder UI** - Create/edit/delete rules with IF-THEN logic
2. **Rule Execution Engine** - Evaluate rules and route tasks
3. **HITL Task Queue** - Inbox for recruiters to review and resolve tasks
4. **Audit & Logging** - Complete trail of rule triggers and outcomes
5. **Rule Simulator** - Test rules against historical data
6. **Analytics Dashboard** - HITL volume metrics and performance

---

## New Pages and Routes

| Page | Route | Purpose |
|------|-------|---------|
| HITL Rules Manager | `/hitl/rules` | Full rule CRUD and management |
| HITL Task Detail | `/hitl/tasks/:taskId` | Individual task review screen |

The existing `/hitl` page will be enhanced significantly.

---

## Components to Build

| Component | Location | Purpose |
|-----------|----------|---------|
| RuleBuilderDialog | `src/components/hitl/RuleBuilderDialog.tsx` | Modal form for creating/editing rules |
| RuleCard | `src/components/hitl/RuleCard.tsx` | Individual rule display with actions |
| RulesTable | `src/components/hitl/RulesTable.tsx` | Full rules list with filters/sorting |
| RuleSimulator | `src/components/hitl/RuleSimulator.tsx` | Test rules against historical data |
| TaskCard | `src/components/hitl/TaskCard.tsx` | Individual task in queue view |
| TaskDetailPanel | `src/components/hitl/TaskDetailPanel.tsx` | Full task review interface |
| TaskAssignmentDialog | `src/components/hitl/TaskAssignmentDialog.tsx` | Assign task to recruiter |
| HITLAnalytics | `src/components/hitl/HITLAnalytics.tsx` | Charts and metrics dashboard |
| AuditLogTable | `src/components/hitl/AuditLogTable.tsx` | Rule trigger history |
| AlertConfigPanel | `src/components/hitl/AlertConfigPanel.tsx` | Slack/Email webhook settings |

---

## Data Model Extensions

### Enhanced Rule Entity

```text
interface HITLRuleV2 {
  id: string
  name: string
  description: string
  ruleType: "confidence" | "business" | "anomaly" | "sla"
  conditionMetric: string  // e.g., "ai_confidence", "employer_tier", "drop_off_rate"
  operator: ">" | "<" | "=" | ">=" | "<=" | "!="
  thresholdValue: string | number
  actionType: "route_to_queue" | "alert" | "escalate" | "block"
  targetQueue: "recruiter_review" | "ops_escalation" | "enterprise_priority"
  priority: 1 | 2 | 3 | 4 | 5  // 1 = highest
  status: "active" | "paused" | "draft"
  triggerCount: number
  lastTriggered: string | null
  createdAt: string
  updatedAt: string
  createdBy: string
  version: number
}
```

### Enhanced HITL Task Entity

```text
interface HITLTask {
  id: string
  ruleId: string
  ruleName: string
  candidateId: string
  jobId: string
  aiAgentId: string | null
  aiDecision: string
  confidenceScore: number
  status: "pending" | "assigned" | "in_review" | "approved" | "rejected" | "escalated"
  priority: "high" | "medium" | "low"
  assignedTo: string | null
  assignedAt: string | null
  resolution: string | null
  resolvedAt: string | null
  dueAt: string | null
  createdAt: string
  metadata: Record<string, any>
}
```

### Audit Log Entity

```text
interface HITLAuditLog {
  id: string
  ruleId: string
  taskId: string
  eventType: "rule_triggered" | "task_created" | "task_assigned" | "task_resolved" | "task_escalated"
  actor: string  // "system" or user id
  details: string
  snapshot: Record<string, any>  // AI decision at time of trigger
  timestamp: string
}
```

### Rule Simulation Result

```text
interface SimulationResult {
  ruleId: string
  totalCandidates: number
  matchedCandidates: number
  routingPercentage: number
  sampleMatches: Array<{candidateId: string, jobId: string, score: number}>
}
```

---

## Page Implementations

### 1. Enhanced HITL Queue Page (`/hitl`)

**Layout Structure:**

```text
+------------------------------------------------------------------+
|  HITL Queue                                    [Configure Rules]  |
|  Human-in-the-Loop review tasks                                   |
+------------------------------------------------------------------+
|  [Tabs: Queue | Rules | Analytics | Audit Log]                   |
+------------------------------------------------------------------+

Tab 1: Queue (Default)
+------------------------------------------------------------------+
| Key Metrics Row                                                   |
| [Pending] [High Priority] [Avg Resolution] [Completed Today]      |
+------------------------------------------------------------------+
| Queue Filters: [Status v] [Priority v] [Assignee v] [Search...]   |
+------------------------------------------------------------------+
| Task Queue Table                                                  |
| ID | Candidate | Job | Rule | Priority | Assignee | Status | Due  |
+------------------------------------------------------------------+

Tab 2: Rules
+------------------------------------------------------------------+
| [+ Create Rule]  [Import]  [Export]           [Search rules...]   |
+------------------------------------------------------------------+
| Rules by Type                                                     |
| [Confidence] [Business] [Anomaly] [SLA]                          |
+------------------------------------------------------------------+
| Rules Table with inline enable/disable toggles                    |
| Name | Type | Condition | Action | Priority | Triggers | Status   |
+------------------------------------------------------------------+

Tab 3: Analytics
+------------------------------------------------------------------+
| HITL Volume Over Time (Area Chart)                               |
+------------------------------------------------------------------+
| [Tasks Created] [Tasks Resolved] [Resolution Rate]               |
+------------------------------------------------------------------+
| Rule Performance Table                                           |
| Rule | Trigger Count | Override Rate | False Positive % | Avg Time|
+------------------------------------------------------------------+
| Human Override Analysis (Pie Chart)                              |
+------------------------------------------------------------------+

Tab 4: Audit Log
+------------------------------------------------------------------+
| Filters: [Date Range] [Event Type] [Rule] [Actor]                |
+------------------------------------------------------------------+
| Audit Log Table                                                  |
| Timestamp | Event | Rule | Task | Actor | Details                |
+------------------------------------------------------------------+
```

### 2. Rule Builder Dialog

**Form Fields:**

```text
+--------------------------------------------------+
|  Create HITL Rule                            [X] |
+--------------------------------------------------+
| Rule Name: [________________________________]    |
| Description: [______________________________]    |
+--------------------------------------------------+
| Rule Type: [Confidence v]                        |
|   - Confidence Based                             |
|   - Business Critical                            |
|   - Anomaly Based                                |
|   - SLA Based                                    |
+--------------------------------------------------+
| Condition Builder:                               |
| IF [ai_confidence v] [< v] [0.7_______]         |
+--------------------------------------------------+
| Action:                                          |
| THEN [Route to Queue v]                          |
|      Target: [Recruiter Review v]                |
+--------------------------------------------------+
| Priority: [1 (Highest) v]                        |
| Status:   [Active v]                             |
+--------------------------------------------------+
|                          [Cancel] [Save Rule]    |
+--------------------------------------------------+
```

**Condition Metrics Available:**

| Category | Metrics |
|----------|---------|
| Confidence | `ai_confidence`, `match_confidence`, `interview_prediction` |
| Business | `employer_tier`, `role_type`, `role_level`, `salary_range` |
| Anomaly | `drop_off_rate`, `response_rate`, `conversion_rate` |
| SLA | `time_to_interview`, `time_in_stage`, `days_open` |

### 3. Rule Simulator Panel

**Features:**

- Select a rule to simulate
- Choose date range for historical data
- Run simulation to see:
  - Total candidates evaluated
  - Number that would match rule
  - Percentage routed to humans
  - Sample of matching candidates (5-10)
- Compare current rule vs. modified threshold

### 4. Task Detail Panel/Page

**Layout:**

```text
+------------------------------------------------------------------+
| Task HITL-001                                    [Assign] [Close] |
| Created 2 hours ago | Due in 4 hours                             |
+------------------------------------------------------------------+
| Task Details                   | AI Decision Snapshot            |
| Rule: Low AI Confidence        | Agent: Skills Matcher AI        |
| Candidate: CAN-45892          | Confidence: 0.62                 |
| Job: JOB-001 Senior ICU Nurse | Decision: Matched                |
| Priority: High                 | Reason: Skills gap 35%           |
+------------------------------------------------------------------+
| Candidate Profile              | Job Requirements                 |
| Name: [Redacted]              | Title: Senior ICU Nurse          |
| Experience: 8 years            | Employer: Apollo Hospitals       |
| Skills: [list]                 | Requirements: [list]             |
+------------------------------------------------------------------+
| Actions                                                           |
| [Approve AI Decision] [Override & Reject] [Escalate to Ops]      |
+------------------------------------------------------------------+
| Resolution Notes:                                                 |
| [____________________________________________]                    |
+------------------------------------------------------------------+
| Activity Timeline                                                 |
| - Task created (2 hours ago)                                      |
| - Assigned to Priya Sharma (1 hour ago)                          |
| - Priya started review (30 mins ago)                             |
+------------------------------------------------------------------+
```

---

## Navigation Updates

Update the sidebar to include HITL sub-navigation:

```text
Operations
  - Recruiter Dashboard
  - AI Performance
  - HITL Queue (existing link)
    - When clicked, shows tabs for Queue/Rules/Analytics/Audit
```

Update the "Configure Rules" button on `/hitl` to open the Rules tab directly.

---

## File Structure

```text
src/
  components/
    hitl/
      RuleBuilderDialog.tsx
      RuleCard.tsx
      RulesTable.tsx
      RuleSimulator.tsx
      TaskCard.tsx
      TaskDetailPanel.tsx
      TaskAssignmentDialog.tsx
      HITLAnalytics.tsx
      AuditLogTable.tsx
      AlertConfigPanel.tsx
  pages/
    HITLQueue.tsx (enhanced with tabs)
  lib/
    mockData.ts (extended with new data structures)
```

---

## Mock Data Additions

### Extended Rules Data

```text
hitlRulesV2: HITLRuleV2[] = [
  {
    id: "rule-001",
    name: "Low AI Confidence",
    description: "Route candidates with low AI match confidence for human review",
    ruleType: "confidence",
    conditionMetric: "ai_confidence",
    operator: "<",
    thresholdValue: 0.7,
    actionType: "route_to_queue",
    targetQueue: "recruiter_review",
    priority: 1,
    status: "active",
    triggerCount: 342,
    lastTriggered: "10 mins ago",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-28",
    createdBy: "Saroj",
    version: 3
  },
  // ... more rules for each type
]
```

### Tasks Data

```text
hitlTasks: HITLTask[] = [
  {
    id: "HITL-001",
    ruleId: "rule-001",
    ruleName: "Low AI Confidence",
    candidateId: "CAN-45892",
    jobId: "JOB-001",
    aiAgentId: "agent-002",
    aiDecision: "Matched",
    confidenceScore: 0.62,
    status: "pending",
    priority: "high",
    assignedTo: "Priya Sharma",
    assignedAt: "1 hour ago",
    resolution: null,
    resolvedAt: null,
    dueAt: "4 hours",
    createdAt: "2 hours ago",
    metadata: { skillGap: "35%", roleMatch: "72%" }
  },
  // ... more tasks
]
```

### Audit Logs Data

```text
hitlAuditLogs: HITLAuditLog[] = [
  {
    id: "log-001",
    ruleId: "rule-001",
    taskId: "HITL-001",
    eventType: "rule_triggered",
    actor: "system",
    details: "Rule triggered due to confidence score 0.62 < 0.7",
    snapshot: { aiDecision: "Matched", score: 0.62 },
    timestamp: "2 hours ago"
  },
  // ... more logs
]
```

### Simulation Data

```text
historicalCandidates: Array for simulation testing
simulationResults: Pre-computed results for demo
```

---

## Technical Details

### Form Validation with Zod

```text
const ruleSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  ruleType: z.enum(["confidence", "business", "anomaly", "sla"]),
  conditionMetric: z.string().min(1),
  operator: z.enum([">", "<", "=", ">=", "<=", "!="]),
  thresholdValue: z.union([z.string(), z.number()]),
  actionType: z.enum(["route_to_queue", "alert", "escalate", "block"]),
  targetQueue: z.enum(["recruiter_review", "ops_escalation", "enterprise_priority"]),
  priority: z.number().min(1).max(5),
  status: z.enum(["active", "paused", "draft"])
})
```

### State Management

- Use React useState for local UI state
- Rules and tasks stored in mock data (would be Supabase in production)
- Toast notifications for CRUD operations

### Charts for Analytics

Using existing Recharts library:
- Area chart for HITL volume over time
- Bar chart for rule trigger comparison
- Pie chart for resolution outcomes

---

## Implementation Order

1. **Data Layer**: Extend mockData.ts with HITLRuleV2, HITLTask, and audit log structures
2. **Rule Components**: Build RuleBuilderDialog, RulesTable, RuleCard
3. **Task Components**: Build TaskCard, TaskDetailPanel, TaskAssignmentDialog
4. **Analytics Components**: Build HITLAnalytics, AuditLogTable
5. **Rule Simulator**: Build simulation panel with mock historical data
6. **Page Enhancement**: Restructure HITLQueue.tsx with Tabs component
7. **Integration**: Wire up all components with mock data
8. **Polish**: Add loading states, empty states, and animations

---

## Success Criteria

- Rules can be created, edited, and deleted via the UI
- Rules display with proper priority ordering
- HITL tasks show correct rule attribution
- Recruiters can assign, review, and resolve tasks
- Audit logs capture all rule triggers and task actions
- Simulator shows realistic routing percentages
- Analytics display meaningful HITL metrics

