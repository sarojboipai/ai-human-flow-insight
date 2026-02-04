
# Consolidate Pipelines into Single Table

## Summary
Combine all pipeline views (Active, Paused, Draft) into one unified table and remove the Templates and Import buttons from the header.

---

## Changes Overview

### Before
```text
┌──────────────────────────────────────────────────────────────┐
│  [Create Pipeline]  [Templates]  [Import]     [Search...]   │
├──────────────────────────────────────────────────────────────┤
│  Active Pipelines (3)                                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Table with 3 rows                                      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Paused Pipelines (1)                                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Table with 1 row                                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Draft Pipelines (2)                                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Table with 2 rows                                      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### After
```text
┌──────────────────────────────────────────────────────────────┐
│  [Create Pipeline]                            [Search...]    │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Pipeline  │ Status │ Type │ ... │ Actions             │  │
│  ├───────────┼────────┼──────┼─────┼─────────────────────┤  │
│  │ Pipeline1 │ Active │ Bulk │ ... │ [Edit] [Pause]      │  │
│  │ Pipeline2 │ Active │ Fast │ ... │ [Edit] [Pause]      │  │
│  │ Pipeline3 │ Paused │ Niche│ ... │ [Edit] [Play]       │  │
│  │ Pipeline4 │ Draft  │ Bulk │ ... │ [Edit] [Delete]     │  │
│  │ ...       │ ...    │ ...  │ ... │ ...                 │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Changes Required

### 1. Update WorkflowList Component
**File: `src/components/orchestration/WorkflowList.tsx`**

- Remove Templates button and its dialog state/import
- Remove Import button
- Remove separate sections for Active/Paused/Draft
- Pass all `filteredWorkflows` to a single `PipelineTable`
- Pass both `onToggleStatus` and `onDelete` to the table

### 2. Update PipelineTable Component
**File: `src/components/orchestration/PipelineTable.tsx`**

- Add a "Status" column to display Active/Paused/Draft
- Update actions column to show:
  - Delete button for Draft workflows
  - Play/Pause button for Active/Paused workflows
- Accept both `onToggleStatus` and `onDelete` props always
- Determine which action to show based on workflow status

---

## Updated Table Structure

| Column | Description |
|--------|-------------|
| Pipeline | Name + version badge |
| **Status** | NEW - Shows Active/Paused/Draft with colored badge |
| Type | Bulk/Fast Track/Niche |
| Profession | Nurse/Technician/etc. |
| Zone | Zone 1/2/3/4 |
| Tier | Tier 1/2/3 |
| Industry | Hospital/Lab/Pharma |
| Jobs | Count of assigned jobs |
| AI/Human | Split visualization |
| Success | Success rate % |
| SLA | Green/Amber/Red indicator |
| Updated | Last update date |
| Actions | Edit + (Delete or Play/Pause) |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/orchestration/WorkflowList.tsx` | Remove Templates/Import buttons, remove separate table sections, use single table |
| `src/components/orchestration/PipelineTable.tsx` | Add Status column, update action logic based on workflow status |

---

## Technical Details

### Status Badge Colors
```typescript
const statusColors = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  paused: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};
```

### Action Logic
```typescript
// In Actions column
{workflow.status === "draft" ? (
  <Button onClick={() => onDelete?.(workflow)}>
    <Trash2 />
  </Button>
) : (
  <Button onClick={() => onToggleStatus?.(workflow)}>
    {workflow.status === "paused" ? <Play /> : <Pause />}
  </Button>
)}
```

### Props Update
```typescript
interface PipelineTableProps {
  workflows: Workflow[];
  onToggleStatus?: (workflow: Workflow) => void;
  onDelete?: (workflow: Workflow) => void;
  // Remove showDeleteAction - determine from workflow.status instead
}
```
