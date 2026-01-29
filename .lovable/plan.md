

# Reorganize HITL Queue and HITL Rules

This plan moves the HITL Queue to the Operations section in the sidebar and relocates the HITL Rules functionality as a new tab within the Orchestration Engine.

---

## Overview

**Current State:**
- HITL Queue is under the "Orchestration" section in the sidebar
- HITL Rules is a tab within the HITL Queue page (`/hitl`)

**Target State:**
- HITL Queue moves to the "Operations" section in the sidebar
- HITL Rules becomes a 5th tab in the Orchestration Engine page

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Move HITL Queue from orchestrationItems to operationsItems |
| `src/pages/OrchestrationEngine.tsx` | Modify | Add "HITL Rules" as a 5th tab with rules management UI |
| `src/pages/HITLQueue.tsx` | Modify | Remove "Rules" tab (keep Queue, Analytics, Audit Log tabs) |

---

## Implementation Details

### 1. Sidebar Navigation Update

Move HITL Queue from orchestrationItems to operationsItems:

**Before:**
```text
Orchestration
  - Orchestration Engine
  - HITL Queue

Operations
  - Recruiter Dashboard
  - AI Performance
```

**After:**
```text
Orchestration
  - Orchestration Engine

Operations
  - Recruiter Dashboard
  - AI Performance
  - HITL Queue
```

### 2. Orchestration Engine - Add HITL Rules Tab

Add a 5th tab called "HITL Rules" to the Orchestration Engine:

```text
[Tabs: Workflows | Agents | Connectors | Telemetry | HITL Rules]
```

The HITL Rules tab will include:
- Rules table (RulesTable component)
- Create/Edit rule functionality (RuleBuilderDialog)
- Rule simulator (RuleSimulator)
- Import/Export buttons

### 3. HITL Queue Page - Remove Rules Tab

Simplify the HITL Queue page to focus on task management:

**Before (4 tabs):**
```text
[Queue | Rules | Analytics | Audit Log]
```

**After (3 tabs):**
```text
[Queue | Analytics | Audit Log]
```

The header button showing "X Active Rules" will be removed since rules are now in Orchestration.

---

## Technical Details

### Sidebar Changes (AppSidebar.tsx)

```text
// orchestrationItems - remove HITL Queue
const orchestrationItems = [
  {
    title: "Orchestration Engine",
    url: "/orchestration",
    icon: Network,
  },
];

// operationsItems - add HITL Queue
const operationsItems = [
  {
    title: "Recruiter Dashboard",
    url: "/recruiters",
    icon: Users,
  },
  {
    title: "AI Performance",
    url: "/ai-performance",
    icon: Bot,
  },
  {
    title: "HITL Queue",
    url: "/hitl",
    icon: Zap,
  },
];
```

### Orchestration Engine Changes (OrchestrationEngine.tsx)

- Import HITL components: `RulesTable`, `RuleBuilderDialog`, `RuleSimulator`
- Import HITL data: `hitlRulesV2`, `HITLRuleV2`
- Add state for rules management
- Add 5th tab "hitl-rules" with the rules UI
- Update TabsList from 4 columns to 5 columns

Tab structure:
```text
<TabsTrigger value="hitl-rules" className="gap-2">
  <Zap className="h-4 w-4" />
  <span className="hidden sm:inline">HITL Rules</span>
</TabsTrigger>

<TabsContent value="hitl-rules">
  {/* Rules table, create button, simulator */}
</TabsContent>
```

### HITL Queue Changes (HITLQueue.tsx)

- Remove imports for: `RulesTable`, `RuleBuilderDialog`, `RuleSimulator`
- Remove rules-related state: `rules`, `ruleDialogOpen`, `editingRule`, `simulatingRule`, `showSimulator`
- Remove all rule handler functions
- Remove "Rules" tab trigger and content
- Remove the header button that links to rules
- Keep only Queue, Analytics, and Audit Log tabs

---

## Updated Page Layouts

### Orchestration Engine (after change)

```text
+------------------------------------------------------------------+
|  Orchestration Engine                                             |
|  Control plane for AI agents, workflows, and automation systems   |
+------------------------------------------------------------------+
|  [Workflows | Agents | Connectors | Telemetry | HITL Rules]      |
+------------------------------------------------------------------+

HITL Rules Tab:
+------------------------------------------------------------------+
| [+ Create Rule]  [Import]  [Export]           [Search rules...]   |
+------------------------------------------------------------------+
| Rules Table                                                       |
| Name | Type | Condition | Action | Priority | Triggers | Status   |
+------------------------------------------------------------------+
| [Open Rule Simulator] button or simulator panel                   |
+------------------------------------------------------------------+
```

### HITL Queue (after change)

```text
+------------------------------------------------------------------+
|  HITL Queue                                                       |
|  Human-in-the-Loop review tasks                                   |
+------------------------------------------------------------------+
|  [Tabs: Queue | Analytics | Audit Log]                           |
+------------------------------------------------------------------+
| Key Metrics: Pending | High Priority | Avg Resolution | Completed |
+------------------------------------------------------------------+
| Tab content based on selection                                    |
+------------------------------------------------------------------+
```

---

## Files to Modify

### 1. `src/components/layout/AppSidebar.tsx`
- Remove HITL Queue from `orchestrationItems` array
- Add HITL Queue to `operationsItems` array

### 2. `src/pages/OrchestrationEngine.tsx`
- Add imports for HITL components and data
- Add useState for rules management (rules array, dialog state, simulator state)
- Add rule handler functions (create, edit, delete, toggle status, simulate)
- Expand TabsList to 5 columns
- Add "HITL Rules" TabsTrigger
- Add "hitl-rules" TabsContent with full rules management UI

### 3. `src/pages/HITLQueue.tsx`
- Remove HITL rules-related imports
- Remove rules state and handler functions
- Remove "Rules" tab from TabsList and TabsContent
- Remove header button linking to rules
- Keep Queue, Analytics, and Audit Log functionality

---

## Logical Grouping Rationale

- **Orchestration Engine**: Contains system configuration and governance rules (Workflows, Agents, Connectors, Telemetry, HITL Rules). This is where admins configure HOW the system behaves.

- **Operations (HITL Queue)**: Contains day-to-day operational tasks that recruiters work on. This is where users DO the work of reviewing AI decisions.

This separation aligns with the PRD's distinction between configuration (Orchestration) and execution (Operations).

