

# Complete PRD Alignment - Pipeline Terminology & Rule Types

Update remaining components to use "Pipeline" terminology instead of "Workflow" and add new rule types per the PRD specifications.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/WorkflowList.tsx` | Modify | Rename button labels from "Workflow" to "Pipeline", update section titles |
| `src/components/orchestration/WorkflowBuilderDialog.tsx` | Modify | Update dialog title/text to "Pipeline", add Profession and Job Zone fields |
| `src/components/orchestration/WorkflowCard.tsx` | Minor | Update section labels from "Workflows" to "Pipelines" |
| `src/components/orchestration/HITLRulesPanel.tsx` | Modify | Rename "HITL Routing Rules" to "Routing Rules" |
| `src/components/hitl/RulesTable.tsx` | Modify | Add new rule type filters (posting, sourcing, outreach, interview) |
| `src/lib/mockData.ts` | Modify | Extend RuleType to include new PRD rule types, add sample rules |

---

## Changes by Component

### 1. WorkflowList.tsx - Terminology Updates

**Current:**
- Button: "Create Workflow"
- Search: "Search workflows..."
- Section titles: "Active Workflows", "Paused Workflows", "Draft Workflows"
- Empty state: "No workflows found"

**Updated:**
- Button: "Create Pipeline"
- Search: "Search pipelines..."
- Section titles: "Active Pipelines", "Paused Pipelines", "Draft Pipelines"
- Empty state: "No pipelines found"

### 2. WorkflowBuilderDialog.tsx - Pipeline Builder

**Updates:**
- Dialog title: "Create New Pipeline" / "Edit Pipeline"
- Add Profession dropdown (Nurse, Doctor, Pharmacist, Technician)
- Add Job Zone dropdown (1, 2, 3, 4)
- Add Hiring Type dropdown (Bulk, Fast Track)
- Update labels from "Workflow" to "Pipeline"

**New Fields:**
```tsx
// Add after jobType state
const [profession, setProfession] = useState<"nurse" | "doctor" | "pharmacist" | "technician">("nurse");
const [jobZone, setJobZone] = useState<1 | 2 | 3 | 4>(1);
const [hiringType, setHiringType] = useState<"bulk" | "fast_track">("bulk");
```

### 3. HITLRulesPanel.tsx - Title Update

**Current:**
```tsx
<CardTitle className="text-lg flex items-center gap-2">
  <Zap className="h-5 w-5 text-blue-500" />
  HITL Routing Rules
</CardTitle>
```

**Updated:**
```tsx
<CardTitle className="text-lg flex items-center gap-2">
  <Zap className="h-5 w-5 text-blue-500" />
  Routing Rules
</CardTitle>
```

### 4. RulesTable.tsx - Extended Rule Types

**Current Rule Types:**
- confidence
- business
- anomaly
- sla

**New Rule Types (per PRD):**
- posting (Job Posting thresholds)
- sourcing (Candidate sourcing thresholds)
- outreach (Outreach delivery thresholds)
- interview (Interview scheduling thresholds)

**Filter Button Update:**
```tsx
// Extend filter options
{(["all", "confidence", "business", "anomaly", "sla", "posting", "sourcing", "outreach", "interview"] as const).map((type) => (
  // ... existing button code
))}
```

**New Rule Type Colors:**
```tsx
const ruleTypeColors: Record<RuleType, string> = {
  // existing...
  posting: "bg-violet-500/20 text-violet-500 border-violet-500/30",
  sourcing: "bg-teal-500/20 text-teal-500 border-teal-500/30",
  outreach: "bg-pink-500/20 text-pink-500 border-pink-500/30",
  interview: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
};
```

### 5. mockData.ts - Extended Rule Types & Sample Rules

**Update RuleType:**
```tsx
export type RuleType = 
  | "confidence" 
  | "business" 
  | "anomaly" 
  | "sla"
  | "posting"    // NEW
  | "sourcing"   // NEW
  | "outreach"   // NEW
  | "interview"; // NEW
```

**New Sample Rules (per PRD Appendix):**
```tsx
// Add to hitlRulesV2 array
{
  id: "rule-006",
  name: "Job Posting Delay",
  description: "Escalate if job not published within 10 minutes",
  ruleType: "posting",
  conditionMetric: "time_to_publish",
  operator: ">",
  thresholdValue: 10,
  actionType: "route_to_queue",
  targetQueue: "ops_admin",
  priority: 2,
  status: "active",
  // ...
},
{
  id: "rule-007",
  name: "Candidate Supply Gap",
  description: "Activate sourcing agent when supply is low",
  ruleType: "sourcing",
  conditionMetric: "sourced_candidates_24h",
  operator: "<",
  thresholdValue: 50,
  actionType: "activate_agent",
  targetQueue: "sourcing_agent",
  priority: 2,
  status: "active",
  // ...
},
{
  id: "rule-008",
  name: "Outreach Delivery Failure",
  description: "Switch to alternate channel on high failure rate",
  ruleType: "outreach",
  conditionMetric: "delivery_failure_rate",
  operator: ">",
  thresholdValue: 10,
  actionType: "switch_channel",
  targetQueue: "whatsapp_agent",
  priority: 1,
  status: "active",
  // ...
},
{
  id: "rule-009",
  name: "Interview Scheduling Delay",
  description: "Trigger scheduling agent if not scheduled in 24 hours",
  ruleType: "interview",
  conditionMetric: "time_since_screening",
  operator: ">",
  thresholdValue: 24,
  actionType: "activate_agent",
  targetQueue: "scheduling_agent",
  priority: 2,
  status: "active",
  // ...
}
```

---

## UI Updates Summary

### Job Pipeline Tab
```text
Before:
[Create Workflow] [Templates] [Import]
"Active Workflows (3)"

After:
[Create Pipeline] [Templates] [Import]
"Active Pipelines (3)"
```

### Pipeline Builder Dialog
```text
Before:
+--------------------------------+
| Create New Workflow            |
| - Name                         |
| - Description                  |
| - Job Type                     |
| - Status                       |
| - Stages                       |
+--------------------------------+

After:
+--------------------------------+
| Create New Pipeline            |
| - Name                         |
| - Description                  |
| - Profession  | Job Zone       |
| - Hiring Type | Job Type       |
| - Status                       |
| - Stages                       |
+--------------------------------+
```

### Rules Tab Filters
```text
Before:
[All] [Confidence] [Business] [Anomaly] [SLA]

After:
[All] [Confidence] [Business] [Anomaly] [SLA] [Posting] [Sourcing] [Outreach] [Interview]
```

---

## Files to Modify

| File | Lines Changed |
|------|---------------|
| `src/components/orchestration/WorkflowList.tsx` | ~15 |
| `src/components/orchestration/WorkflowBuilderDialog.tsx` | ~50 |
| `src/components/orchestration/HITLRulesPanel.tsx` | ~2 |
| `src/components/hitl/RulesTable.tsx` | ~20 |
| `src/lib/mockData.ts` | ~50 |

---

## Acceptance Criteria

| Requirement | Implementation |
|-------------|----------------|
| "Workflow" renamed to "Pipeline" in Job Pipeline tab | Button labels, section titles, search placeholder updated |
| Pipeline builder has Profession/Zone fields | New dropdown fields in WorkflowBuilderDialog |
| "HITL Routing Rules" renamed to "Routing Rules" | HITLRulesPanel title updated |
| New rule types per PRD Appendix | RuleType extended with posting, sourcing, outreach, interview |
| Rule filters include new types | RulesTable filter buttons updated |
| Sample rules for new types | mockData.ts includes example rules for each new type |

---

## Result

After implementation:

- Job Pipeline tab uses "Pipeline" terminology consistently
- Pipeline builder includes Profession, Job Zone, and Hiring Type fields per PRD
- Rules module supports all PRD-specified threshold rule categories
- All components align with PRD terminology and functionality requirements

