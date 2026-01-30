

# Add Workflow Creation Actions and Additional Workflows

This plan adds functional "Create Workflow" capabilities to the Orchestration Engine, including a dialog for creating new workflows, workflow templates, and additional workflow data for the listing.

---

## Overview

**Current State:**
- "Create Workflow" button exists but shows only a toast notification
- "Templates" button shows a toast notification
- Only 4 workflows in mock data (3 active/paused, 1 draft)

**Target State:**
- Functional "Create Workflow" dialog with form to define workflow details
- "Templates" dialog with pre-built workflow templates users can select
- 8+ workflows in mock data for a richer listing

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/WorkflowBuilderDialog.tsx` | Create | Dialog form for creating/editing workflows |
| `src/components/orchestration/WorkflowTemplatesDialog.tsx` | Create | Dialog with pre-built workflow templates |
| `src/components/orchestration/WorkflowList.tsx` | Modify | Wire up Create and Templates buttons with dialogs |
| `src/lib/mockData.ts` | Modify | Add 4+ additional workflow entries |

---

## New Components

### 1. WorkflowBuilderDialog

A dialog form for creating and editing workflows with these fields:

```text
+------------------------------------------------------------------+
|  Create New Workflow                                    [X]       |
+------------------------------------------------------------------+
| Workflow Name*                                                    |
| [__________________________________________________]              |
|                                                                   |
| Description                                                       |
| [__________________________________________________]              |
|                                                                   |
| Job Type*                  Status*                                |
| [Frontline v]              [Draft v]                              |
|                                                                   |
| Initial Stages (can add more after creation)                      |
| +---------------------------------------------------------------+ |
| | [x] Profile Screening    Actor: [AI v]     SLA: [4] hours     | |
| | [x] Skills Matching      Actor: [AI v]     SLA: [2] hours     | |
| | [x] Initial Outreach     Actor: [Hybrid v] SLA: [24] hours    | |
| | [x] Interview Scheduling Actor: [Hybrid v] SLA: [48] hours    | |
| | [x] Offer Process        Actor: [Human v]  SLA: [72] hours    | |
| | [x] Onboarding           Actor: [Hybrid v] SLA: [168] hours   | |
| +---------------------------------------------------------------+ |
|                                                                   |
|                              [Cancel]  [Create Workflow]          |
+------------------------------------------------------------------+
```

**Form Fields:**
- Workflow name (required)
- Description (optional)
- Job type: Frontline, Professional, Enterprise
- Status: Draft, Active, Paused
- Stages checklist with actor assignment and SLA configuration

### 2. WorkflowTemplatesDialog

A dialog showing pre-built workflow templates that can be cloned:

```text
+------------------------------------------------------------------+
|  Workflow Templates                                     [X]       |
+------------------------------------------------------------------+
| Choose a template to start with. You can customize after.        |
|                                                                   |
| +-------------------------------------------------------------+  |
| | [Icon] Frontline Hiring                          [Use This] |  |
| | Standard workflow for nurse and paramedic positions         |  |
| | 6 stages | High automation | AI-first approach              |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | [Icon] Professional Hiring                       [Use This] |  |
| | Balanced workflow for mid-level clinical roles              |  |
| | 6 stages | Hybrid approach | Human checkpoints              |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | [Icon] Enterprise Hiring                         [Use This] |  |
| | Premium workflow for senior physician roles                 |  |
| | 6 stages | Human-heavy | Mandatory approvals                |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | [Icon] Bulk Hiring                               [Use This] |  |
| | High-volume workflow for rapid bulk placements              |  |
| | 6 stages | Maximum automation | Fast processing             |  |
| +-------------------------------------------------------------+  |
|                                                                   |
| +-------------------------------------------------------------+  |
| | [Icon] Blank Workflow                            [Use This] |  |
| | Start from scratch with no pre-defined stages               |  |
| | 0 stages | Custom configuration                             |  |
| +-------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

**Templates Available:**
1. Frontline Hiring - AI-first, 6 stages
2. Professional Hiring - Hybrid approach
3. Enterprise Hiring - Human-heavy
4. Bulk Hiring - Maximum automation
5. Blank Workflow - Start from scratch

---

## Additional Workflows for Mock Data

Add 4 more workflows to provide a richer listing:

```text
1. Locum Physician Placement (active, professional)
   - Short-term physician placements with expedited process
   - 5 stages, hybrid approach

2. Nursing Agency Float Pool (active, frontline)
   - For floating nurses across multiple facilities
   - 6 stages, AI-heavy

3. Allied Health Specialist (paused, professional)
   - For lab technicians, radiologists, therapists
   - 6 stages, balanced hybrid

4. Executive Healthcare Search (draft, enterprise)
   - C-suite and director-level healthcare positions
   - 6 stages, fully human-driven
```

---

## Updated WorkflowList Component

Wire up the buttons to open dialogs:

```text
<div className="flex gap-2">
  <Button onClick={() => setCreateDialogOpen(true)}>
    <Plus className="h-4 w-4" />
    Create Workflow
  </Button>
  <Button variant="outline" onClick={() => setTemplatesDialogOpen(true)}>
    <FileText className="h-4 w-4" />
    Templates
  </Button>
  <Button variant="outline">
    <Download className="h-4 w-4" />
    Import
  </Button>
</div>

{/* Dialogs */}
<WorkflowBuilderDialog
  open={createDialogOpen}
  onOpenChange={setCreateDialogOpen}
  workflow={editingWorkflow}
  onSave={handleSaveWorkflow}
/>
<WorkflowTemplatesDialog
  open={templatesDialogOpen}
  onOpenChange={setTemplatesDialogOpen}
  onSelectTemplate={handleSelectTemplate}
/>
```

Add state management for:
- Creating new workflows (CRUD operations)
- Editing existing workflows
- Selecting templates
- Toggling workflow status

---

## Technical Details

### WorkflowBuilderDialog Component Structure

```text
interface WorkflowBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow?: Workflow | null;  // For editing
  onSave: (workflow: Partial<Workflow>) => void;
}
```

Form state includes:
- name, description, jobType, status
- stages array with checkboxes for each stage type
- Actor assignment (ai/human/hybrid) per stage
- SLA hours per stage

### WorkflowTemplatesDialog Component Structure

```text
interface WorkflowTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: WorkflowTemplate) => void;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  jobType: Workflow["jobType"];
  stages: WorkflowStage[];
  characteristics: string[];  // e.g., "AI-first", "6 stages"
}
```

### State Management in WorkflowList

```text
const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
const [createDialogOpen, setCreateDialogOpen] = useState(false);
const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

const handleSaveWorkflow = (workflowData: Partial<Workflow>) => {
  if (workflowData.id) {
    // Update existing
    setWorkflows(prev => prev.map(w => 
      w.id === workflowData.id ? { ...w, ...workflowData } : w
    ));
  } else {
    // Create new
    const newWorkflow: Workflow = {
      id: `wf-${String(workflows.length + 1).padStart(3, "0")}`,
      ...workflowData,
      version: 1,
      executionCount: 0,
      successRate: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      createdBy: "Current User",
    };
    setWorkflows(prev => [...prev, newWorkflow]);
  }
};

const handleSelectTemplate = (template: WorkflowTemplate) => {
  setEditingWorkflow({
    ...template,
    name: `${template.name} (Copy)`,
    status: "draft",
  });
  setTemplatesDialogOpen(false);
  setCreateDialogOpen(true);
};
```

---

## Files to Create

### 1. `src/components/orchestration/WorkflowBuilderDialog.tsx`
- Dialog with form for workflow creation/editing
- Stage selection with actor and SLA configuration
- Validation for required fields
- Save handler with toast notifications

### 2. `src/components/orchestration/WorkflowTemplatesDialog.tsx`
- Grid of template cards
- "Use This" button to select template
- Template preview with stage count and characteristics

---

## Files to Modify

### 1. `src/components/orchestration/WorkflowList.tsx`
- Import new dialog components
- Add state for dialogs and workflow CRUD
- Wire up Create and Templates buttons
- Pass onEdit callback to WorkflowCard

### 2. `src/lib/mockData.ts`
- Add 4 new workflow entries to the workflows array
- Include diverse job types, statuses, and stage configurations

---

## Stage Type Definitions for Templates

Default stages available for selection:

| Stage | Type | Default Actor | Default SLA |
|-------|------|---------------|-------------|
| Profile Screening | intake | ai | 4 hours |
| Skills Matching | match | ai | 2 hours |
| Initial Outreach | outreach | hybrid | 24 hours |
| Interview Scheduling | interview | hybrid | 48 hours |
| Offer Process | offer | human | 72 hours |
| Onboarding | join | hybrid | 168 hours |

---

## Success Criteria

- "Create Workflow" button opens a dialog with form fields
- Users can define workflow name, description, job type, and status
- Users can select which stages to include with actor assignments
- "Templates" button shows pre-built workflow options
- Selecting a template pre-fills the create form
- New workflows appear in the listing after creation
- Workflow listing shows 8+ workflows with variety
- Edit button on cards opens the builder dialog for editing
- Toggle status and delete actions update the listing

