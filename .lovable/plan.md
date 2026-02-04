
# Hide Template Metadata & Add Creation Dialog

## Summary
Remove the inline Template Metadata Form from the Pipeline Template Builder's default view. When creating a new pipeline, display a dialog first to collect the required metadata (name, hiring type, profession, job zone, location, industry, SLA profile), then navigate the user directly to the canvas.

---

## Current Flow
```text
User clicks "Create Pipeline"
         |
         v
   Opens Builder Page
         |
         v
  [Metadata Form visible at top]
         |
         v
      Canvas Area
```

## New Flow
```text
User clicks "Create Pipeline"
         |
         v
  [Dialog appears with metadata fields]
         |
         v
   User fills in details
         |
         v
   Clicks "Create" button
         |
         v
  Opens Builder Page (no metadata form)
         |
         v
      Canvas Area directly
```

---

## Changes Required

### 1. Create New Dialog Component
**New file: `src/components/orchestration/CreatePipelineDialog.tsx`**

A dialog with the same fields as the current metadata form:
- Template Name (required)
- Hiring Type dropdown
- Profession dropdown
- Job Zone dropdown
- Location Tier dropdown
- Industry dropdown
- SLA Profile dropdown

The dialog will have:
- Cancel button to close
- Create button to navigate to builder with metadata passed via URL state

### 2. Update WorkflowList Component
**File: `src/components/orchestration/WorkflowList.tsx`**

- Add state for the new dialog: `createDialogOpen`
- Change "Create Pipeline" button to open the dialog instead of navigating directly
- Handle dialog submission by navigating to `/ops/template-builder` with metadata in navigation state

### 3. Update PipelineTemplateBuilder Page
**File: `src/pages/PipelineTemplateBuilder.tsx`**

- Remove the `<TemplateMetadataForm>` component from the JSX (hide from view)
- Read initial metadata from `location.state` when creating new pipelines
- Keep metadata state for internal use (saving/publishing)
- When editing existing pipelines, load metadata from the workflow data (as currently done)

---

## Dialog Layout

```text
┌─────────────────────────────────────────────────────────────────┐
│  Create New Pipeline                                        [X] │
├─────────────────────────────────────────────────────────────────┤
│  Configure the basic settings for your new pipeline template.  │
│                                                                 │
│  Template Name *                                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ e.g., Nurse Tier 1 Bulk Hiring                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Hiring Type *   │  │ Profession *    │  │ Job Zone *      │ │
│  │ [Bulk       v]  │  │ [Nurse      v]  │  │ [Zone 1     v]  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Location *      │  │ Industry *      │  │ SLA Profile     │ │
│  │ [Tier 1     v]  │  │ [Hospital   v]  │  │ [Standard   v]  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                   [Cancel]     [Create Pipeline]│
└─────────────────────────────────────────────────────────────────┘
```

---

## Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/CreatePipelineDialog.tsx` | Create | New dialog component with metadata form fields |
| `src/components/orchestration/WorkflowList.tsx` | Modify | Add dialog state, change Create button behavior |
| `src/pages/PipelineTemplateBuilder.tsx` | Modify | Remove inline metadata form, read from location state |

---

## Technical Details

### Navigation with State
```typescript
// In WorkflowList - when dialog submits
navigate("/ops/template-builder", { 
  state: { 
    metadata: {
      name: "Nurse Tier 1 Bulk Hiring",
      hiringType: "bulk",
      profession: "nurse",
      jobZone: 1,
      locationTier: "tier_1",
      industry: "hospital",
      defaultSLAProfile: "standard",
    }
  }
});
```

### Reading State in Builder
```typescript
// In PipelineTemplateBuilder
const location = useLocation();
const initialMetadata = location.state?.metadata;

// Use initialMetadata when setting up the page
useEffect(() => {
  if (!templateId && !templateParam && initialMetadata) {
    setMetadata({
      ...DEFAULT_METADATA,
      ...initialMetadata,
    });
  }
}, []);
```

### Header Display
The builder header will still show the template name and metadata summary, but users won't be able to edit inline. They can only view what was set in the dialog.

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Direct URL access to /ops/template-builder (no state) | Show the dialog or redirect back to pipeline config |
| Editing existing pipeline | Load from workflow data, no dialog needed |
| Using a template | Load from template data, no dialog needed |
| User cancels dialog | Stay on Pipeline Config page |

