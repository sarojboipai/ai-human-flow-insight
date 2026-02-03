

# Rename HITL Rules to Rules

A simple terminology update to rename "HITL Rules" to "Rules" throughout the Ops Orchestration Engine page for cleaner, PRD-aligned naming.

---

## Changes Required

| Location | Current Text | New Text |
|----------|--------------|----------|
| Line 46 (Metrics card title) | `"HITL Rules"` | `"Active Rules"` |
| Line 144 (Page subtitle) | `"Configure job pipelines, AI agents, and HITL rules"` | `"Configure job pipelines, AI agents, and rules"` |
| Line 198 (Section title) | `"HITL Rules"` | `"Rules"` |

---

## File to Modify

`src/pages/OpsOrchestrationEngine.tsx`

---

## Result

After the change, all references to "HITL Rules" will be simplified to "Rules" or "Active Rules", providing a cleaner and more concise interface that aligns with the PRD specification of having three modules: Job Pipeline, Agents, and Rules.

