

# Consolidate Pipeline Creation to Visual Builder

Simplify the UX by making "Create Pipeline" the single CTA that opens the React Flow canvas directly.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/WorkflowList.tsx` | Modify | Change "Create Pipeline" to navigate to visual builder, remove separate "Visual Builder" button |
| `src/components/orchestration/WorkflowBuilderDialog.tsx` | Keep | Retain for quick-edit scenarios (inline metadata changes) |
| `src/components/orchestration/WorkflowCard.tsx` | Modify | Update "Edit" action to navigate to visual builder with template ID |

---

## Before vs After

### Current (Confusing)
```text
[Create Pipeline]  →  Opens modal form (WorkflowBuilderDialog)
[Visual Builder]   →  Opens React Flow canvas (/ops/template-builder)
[Templates]        →  Opens template selection dialog
```

### After (Unified)
```text
[Create Pipeline]  →  Opens React Flow canvas (/ops/template-builder)
[Templates]        →  Opens template selection, then navigates to canvas with pre-filled data
```

---

## Changes

### 1. WorkflowList.tsx

**Remove**:
- "Visual Builder" button (line 130-133)
- `WorkflowBuilderDialog` component and related state (`createDialogOpen`, `handleOpenCreate`)

**Update**:
- "Create Pipeline" button navigates directly to `/ops/template-builder`
- "Templates" selection navigates to `/ops/template-builder?template={templateId}`
- Edit action on pipeline cards navigates to `/ops/template-builder/{pipelineId}`

```tsx
// Before
<Button className="gap-2" onClick={handleOpenCreate}>
  <Plus className="h-4 w-4" />
  Create Pipeline
</Button>
<Button variant="outline" className="gap-2" onClick={() => navigate("/ops/template-builder")}>
  <LayoutGrid className="h-4 w-4" />
  Visual Builder
</Button>

// After
<Button className="gap-2" onClick={() => navigate("/ops/template-builder")}>
  <Plus className="h-4 w-4" />
  Create Pipeline
</Button>
```

### 2. WorkflowCard.tsx - Edit Action

Update edit button to navigate to visual builder instead of opening dialog:

```tsx
// Before
onEdit={() => onEdit(workflow)}

// After
onEdit={() => navigate(`/ops/template-builder/${workflow.id}`)}
```

### 3. Template Selection Flow

When a template is selected from the Templates dialog:

```tsx
// Navigate to builder with template data in URL
const handleSelectTemplate = (template: WorkflowTemplate) => {
  navigate(`/ops/template-builder?template=${template.id}`);
};
```

---

## Updated Button Layout

```text
+-------------------+  +-------------+  +----------+
| + Create Pipeline |  | Templates   |  | Import   |
+-------------------+  +-------------+  +----------+
        ↓                    ↓
   /ops/template-builder    Template dialog → /ops/template-builder?template=xyz
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/orchestration/WorkflowList.tsx` | Remove Visual Builder button, update Create Pipeline to navigate, remove dialog state |
| `src/components/orchestration/WorkflowCard.tsx` | Update Edit action to navigate to builder |
| `src/pages/PipelineTemplateBuilder.tsx` | Add support for loading existing pipeline via URL param |

---

## Result

- Single "Create Pipeline" CTA opens the React Flow canvas
- Editing existing pipelines opens them in the visual builder
- Templates pre-fill the canvas with template stages
- Cleaner, more intuitive UX aligned with PRD

