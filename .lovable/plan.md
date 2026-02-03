
# Job Pipeline Template Builder (Miro-like Configuration Board)

Implementation plan for a visual pipeline template builder that enables Operations Managers to configure reusable hiring workflows using an interactive drag-and-drop canvas.

---

## Overview

This feature adds a full-screen, Miro-like template builder canvas to the Orchestration Engine. It leverages the existing React Flow infrastructure (already used in `PipelineBoardDialog.tsx`) and extends the pipeline configuration system with visual editing capabilities.

---

## Architecture

The implementation builds on three existing patterns:

| Existing Component | Purpose | Reuse Strategy |
|-------------------|---------|----------------|
| `PipelineBoardDialog.tsx` | React Flow canvas with custom nodes | Adapt canvas architecture for editing mode |
| `WorkflowBuilderDialog.tsx` | Pipeline form + stage configuration | Extend with visual node placement |
| `WorkflowTemplatesDialog.tsx` | Template selection cards | Keep for template selection entry point |

---

## New Files to Create

### 1. Template Builder Canvas Page
**File:** `src/pages/PipelineTemplateBuilder.tsx`

Full-screen template builder with:
- React Flow canvas (infinite zoom, pan, MiniMap)
- Drag-from-sidebar stage nodes
- Right-panel node configuration
- Header with metadata & actions (Save Draft, Publish)

### 2. Stage Palette Sidebar
**File:** `src/components/orchestration/StagePalette.tsx`

Left sidebar with draggable stage nodes:
- Job Posting, Sourcing, Outreach, Application
- Screening, Interview, Offer, Joining
- Decision Gateway node

### 3. Node Configuration Panel
**File:** `src/components/orchestration/NodeConfigPanel.tsx`

Right sidebar when a node is selected:
- Stage Name (editable)
- Stage Type (AI / Automation / Human)
- Assigned Agent (dropdown from Agent Registry)
- Human Role (Recruiter, Hiring Manager, QA)
- SLA Threshold
- Metrics to Track

### 4. Template Metadata Header
**File:** `src/components/orchestration/TemplateMetadataForm.tsx`

Collapsible header form with required fields:
- Template Name
- Hiring Type: Bulk / Fast Track / Niche
- Profession: Nurse / Doctor / Pharmacist / Technician
- Job Zone: 1 / 2 / 3 / 4
- Default SLA Profile
- Default AI Coverage Target (%)
- Optional: Enterprise Override Allowed, Compliance Requirement

### 5. Editable Node Components
**File:** `src/components/orchestration/pipeline-nodes/` (new directory)

Canvas-specific node variants with:
- Delete button (×)
- Connection handles (top, bottom, left, right)
- Edit indicator on hover
- Resize handles (Phase 2)

Node types to create:
- `EditableStageNode.tsx` - Standard stage node
- `EditableAINode.tsx` - AI agent stage
- `EditableHumanNode.tsx` - Human task stage
- `EditableDecisionNode.tsx` - Decision gateway (diamond shape)
- `EditableEntryExitNode.tsx` - Start/End terminals

---

## Files to Modify

### 1. WorkflowList.tsx
Add "Create Template" button that opens the full-screen builder:

```tsx
// Add to header actions
<Button variant="outline" className="gap-2" onClick={() => navigate("/ops/template-builder")}>
  <LayoutGrid className="h-4 w-4" />
  Create Template
</Button>
```

### 2. App.tsx (Router)
Add new route for the template builder:

```tsx
<Route path="/ops/template-builder" element={<PipelineTemplateBuilder />} />
<Route path="/ops/template-builder/:templateId" element={<PipelineTemplateBuilder />} />
```

### 3. mockData.ts
Extend `Workflow` interface with template metadata:

```tsx
export interface PipelineTemplate extends Workflow {
  templateType: "global" | "enterprise-specific";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;
  hiringType: "bulk" | "fast_track" | "niche";
  defaultAICoverage: number;
  defaultSLAProfile: string;
  enterpriseOverrideAllowed: boolean;
  complianceRequired: boolean;
  nodePositions: Record<string, { x: number; y: number }>;
  connections: Array<{ source: string; target: string; condition?: string }>;
}
```

### 4. WorkflowTemplatesDialog.tsx
Update template selection to include option to open visual editor:

```tsx
<Button onClick={() => handleOpenBuilder(template)}>
  Edit in Canvas
</Button>
```

---

## Canvas Interaction Specifications

### Drag & Drop
- Stages dragged from left palette onto canvas
- Auto-snap to grid (20px grid)
- Drop creates node at cursor position

### Connections
- Click + drag from source handle to target handle
- Connection lines appear with arrow indicators
- Conditional connections show label (e.g., "Score < 0.7")

### Node Selection
- Single click selects node, opens config panel
- Multi-select with Shift+Click or marquee selection
- Delete selected with Backspace/Delete key

### Validation
Red border indicators on nodes when:
- No agent assigned to AI/Automation node
- No human role assigned to Human node
- No SLA threshold configured
- Orphan node (no connections)

---

## Component Hierarchy

```text
PipelineTemplateBuilder (Page)
├── TemplateMetadataForm (Header)
│   ├── Template Name Input
│   ├── Profession Select
│   ├── Job Zone Select
│   ├── Hiring Type Select
│   └── SLA Profile Select
├── StagePalette (Left Sidebar)
│   ├── AI Stages Section
│   ├── Human Stages Section
│   ├── Automation Stages Section
│   └── Decision Gateway
├── ReactFlow Canvas (Center)
│   ├── EditableStageNodes
│   ├── Connectors
│   ├── Controls (zoom/pan)
│   └── MiniMap
└── NodeConfigPanel (Right Sidebar)
    ├── Stage Name
    ├── Stage Type
    ├── Agent Assignment
    ├── Human Role
    └── SLA Configuration
```

---

## Data Flow

### Creating a Template
1. User opens `/ops/template-builder`
2. Fills metadata form (template name, profession, zone)
3. Drags stages from palette onto canvas
4. Connects stages with flow lines
5. Configures each node via right panel
6. Clicks "Save Draft" or "Publish"

### Editing Existing Template
1. User clicks "Edit in Canvas" on template card
2. Route to `/ops/template-builder/:templateId`
3. Canvas loads with saved node positions and connections
4. User modifies stages, connections, or config
5. Saves with version increment

### Publishing
Validation checks before publish:
- Start and End nodes present
- No orphan nodes
- All AI stages have agents assigned
- All Human stages have roles assigned
- SLA thresholds configured on all stages

---

## Technical Requirements

### React Flow Configuration
```tsx
const flowConfig = {
  nodeTypes: {
    aiStage: EditableAINode,
    humanStage: EditableHumanNode,
    automationStage: EditableAutomationNode,
    decisionGateway: EditableDecisionNode,
    entryExit: EditableEntryExitNode,
  },
  edgeTypes: {
    conditional: ConditionalEdge,
  },
  defaultEdgeOptions: {
    type: "smoothstep",
    animated: true,
  },
  snapToGrid: true,
  snapGrid: [20, 20],
  fitView: true,
};
```

### State Management
Local state with React useState for MVP, structured as:

```tsx
interface TemplateBuilderState {
  metadata: TemplateMetadata;
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  isDirty: boolean;
  validationErrors: ValidationError[];
}
```

---

## Stage Library (Default Palette)

| Stage | Type | Icon | Default Actor |
|-------|------|------|---------------|
| Job Posting | entry | Briefcase | Automation |
| Sourcing | ai | Search | AI |
| Outreach | ai | Send | AI |
| Application | candidate | FileText | Candidate |
| Screening | ai | Bot | AI |
| Interview | human | Calendar | Human |
| Offer | human | Award | Human |
| Joining Confirmation | exit | CheckCircle | Automation |
| Decision Gateway | decision | GitBranch | N/A |

---

## Implementation Phases

### Phase 1: Core Builder (This Implementation)
- Full-screen canvas with React Flow
- Stage palette with drag-and-drop
- Node configuration panel
- Template metadata form
- Save/Publish functionality
- Validation before publish

### Phase 2: Advanced Features (Future)
- Conditional edge labels
- Parallel branch support
- Enterprise-specific overrides
- Template versioning with rollback
- Collaborative editing

---

## Acceptance Criteria

| Requirement | Implementation |
|------------|----------------|
| Ops Manager can create templates via canvas | `PipelineTemplateBuilder` page with React Flow |
| Nodes can be dragged, connected, configured | `StagePalette` + React Flow drag-drop + `NodeConfigPanel` |
| Agents and human roles mapped per stage | Agent dropdown from `agents` in mockData |
| Templates can be cloned and versioned | Version tracking in template interface |
| Published templates instantiate into pipelines | Save action creates `PipelineTemplate` entity |

---

## File Summary

| File | Type | Lines (est.) |
|------|------|-------------|
| `src/pages/PipelineTemplateBuilder.tsx` | New | ~350 |
| `src/components/orchestration/StagePalette.tsx` | New | ~120 |
| `src/components/orchestration/NodeConfigPanel.tsx` | New | ~200 |
| `src/components/orchestration/TemplateMetadataForm.tsx` | New | ~150 |
| `src/components/orchestration/pipeline-nodes/EditableStageNode.tsx` | New | ~80 |
| `src/components/orchestration/pipeline-nodes/EditableAINode.tsx` | New | ~80 |
| `src/components/orchestration/pipeline-nodes/EditableHumanNode.tsx` | New | ~80 |
| `src/components/orchestration/pipeline-nodes/EditableDecisionNode.tsx` | New | ~70 |
| `src/components/orchestration/pipeline-nodes/EditableEntryExitNode.tsx` | New | ~60 |
| `src/components/orchestration/pipeline-nodes/index.ts` | New | ~15 |
| `src/components/orchestration/WorkflowList.tsx` | Modify | +10 |
| `src/lib/mockData.ts` | Modify | +40 |
| `src/App.tsx` | Modify | +5 |

**Total: ~1,260 lines of new/modified code**
