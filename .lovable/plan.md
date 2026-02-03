

# Persist Pipelines & Table View for Active Pipelines

This implementation adds state persistence for newly created pipelines and converts the Active Pipelines display from card format to a table format optimized for Operations Managers.

---

## Overview

When a pipeline is saved as draft or published, it will be added to the workflow list and displayed in the appropriate section. Active pipelines will use a table format showing key operational metrics.

---

## Current State Analysis

| Component | Current Behavior |
|-----------|-----------------|
| `PipelineTemplateBuilder.tsx` | Save/Publish actions show toast but don't persist data |
| `WorkflowList.tsx` | Uses local state initialized from `mockWorkflows`, displays all in cards |
| `WorkflowCard.tsx` | Card-based display with detailed metrics |

---

## Changes

### 1. Create Pipeline Table Component

**File:** `src/components/orchestration/PipelineTable.tsx` (New)

A table view for active/paused pipelines with columns relevant to Operations Managers:

| Column | Data |
|--------|------|
| Pipeline Name | Name + version badge |
| Type | Bulk / Fast Track / Niche |
| Profession | Nurse / Doctor / etc. |
| Zone | 1, 2, 3, 4 |
| Location | Tier 1, 2, 3 |
| Industry | Hospital / Diagnostic Lab / Pharma |
| Jobs | Count of active jobs using this pipeline |
| AI/Human Split | Visual indicator of stage distribution |
| Success Rate | Percentage with color coding |
| SLA Status | Green/Amber/Red indicator |
| Last Updated | Date + author |
| Actions | Edit, Pause/Activate buttons |

### 2. Create Shared Workflow Context

**File:** `src/contexts/WorkflowContext.tsx` (New)

A React Context to share workflow state between `WorkflowList` and `PipelineTemplateBuilder`:

```typescript
interface WorkflowContextType {
  workflows: Workflow[];
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
}
```

This enables the builder page to add/update pipelines that immediately appear in the list.

### 3. Update PipelineTemplateBuilder.tsx

Modify save/publish handlers to persist pipeline data:

**Save Draft:**
- Creates new workflow with `status: "draft"`
- Adds to workflow context
- Navigates back with success message

**Publish:**
- Creates new workflow with `status: "active"` 
- Adds to workflow context
- Navigates back with success message

Include the new metadata fields (locationTier, industry, jobZone) in the persisted data.

### 4. Update WorkflowList.tsx

**Changes:**
- Consume workflow context instead of local state
- Use `PipelineTable` for Active and Paused sections
- Keep `WorkflowCard` for Draft section (allows delete action)

**Layout:**
```text
Active Pipelines (Table View)
├── Sortable columns
├── Row click → Edit in builder
└── Inline actions

Paused Pipelines (Table View)
└── Same format as Active

Draft Pipelines (Card View)
└── Shows stages, allows delete
```

### 5. Extend Workflow Interface

**File:** `src/lib/mockData.ts`

Add new metadata fields to `Workflow` interface:

```typescript
export interface Workflow {
  // ... existing fields
  profession?: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone?: 1 | 2 | 3 | 4;
  locationTier?: "tier_1" | "tier_2" | "tier_3";
  industry?: "hospital" | "diagnostic_lab" | "pharmaceuticals";
  nodePositions?: Record<string, { x: number; y: number }>;
  connections?: Array<{ source: string; target: string }>;
}
```

---

## Pipeline Table Columns (Detail)

| Column | Width | Content |
|--------|-------|---------|
| Pipeline | 200px | Icon + Name + `v{version}` |
| Type | 100px | Badge (Bulk/Fast Track/Niche) |
| Profession | 100px | Text |
| Zone | 60px | Zone 1-4 |
| Tier | 80px | Tier 1-3 |
| Industry | 120px | Hospital/Lab/Pharma |
| Jobs | 60px | Count with link |
| AI/Human | 100px | Mini bar chart (visual) |
| Success | 80px | Percentage + color |
| Updated | 100px | Relative date |
| Actions | 100px | Edit, Pause/Play icons |

---

## Data Flow

### Creating a New Pipeline

```text
User creates pipeline in builder
        ↓
Clicks "Save Draft"
        ↓
Builder creates Workflow object with:
  - status: "draft"
  - All metadata fields
  - Node positions
  - Connections
        ↓
Adds to WorkflowContext
        ↓
Navigates to /ops/orchestration
        ↓
WorkflowList displays new draft in Draft section
```

### Publishing a Pipeline

```text
User clicks "Publish" in builder
        ↓
Validation passes
        ↓
Builder creates Workflow object with:
  - status: "active"
  - All metadata fields
        ↓
Adds to WorkflowContext
        ↓
Navigates to /ops/orchestration
        ↓
WorkflowList displays new pipeline in Active table
```

### Editing an Existing Pipeline

```text
User clicks Edit on row/card
        ↓
Navigates to /ops/template-builder/{id}
        ↓
Builder loads existing workflow data
        ↓
User makes changes
        ↓
Save/Publish updates workflow in context
        ↓
Returns to list with updated data
```

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/contexts/WorkflowContext.tsx` | Create | Shared state for workflows across pages |
| `src/components/orchestration/PipelineTable.tsx` | Create | Table view component for active/paused pipelines |
| `src/pages/PipelineTemplateBuilder.tsx` | Modify | Add context integration, persist data on save/publish |
| `src/components/orchestration/WorkflowList.tsx` | Modify | Use context, render table for active/paused |
| `src/lib/mockData.ts` | Modify | Extend Workflow interface with new metadata |
| `src/App.tsx` | Modify | Wrap relevant routes with WorkflowProvider |

---

## Table Visual Design

The table will use existing UI components for consistency:

- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `@/components/ui/table`
- `Badge` for status and type indicators
- `Button` with icon variants for actions
- Hover states for row highlighting
- Sortable column headers (click to sort)

---

## Result

- **Save Draft**: Pipeline appears in "Draft Pipelines" section
- **Publish**: Pipeline appears in "Active Pipelines" table
- **Active Pipelines**: Displayed in dense table format with all operational metrics
- **Paused Pipelines**: Same table format as Active
- **Draft Pipelines**: Displayed as cards (allows full preview before publishing)

