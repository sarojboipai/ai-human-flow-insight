
# Redesign Workflow Tab to Match Reference UI

## Summary
Redesign the Workflow tab to match the reference design featuring a clean vertical flow layout, enriched node cards with icons and descriptions, edge labels for decision paths, and a workflow description area.

---

## Current State vs Target State

### Current Layout
```text
+------------------+-------------------------+------------------+
| Stage Palette    |    ReactFlow Canvas     |  Node Config     |
| (264px sidebar)  |  (horizontal layout)    | (right sidebar)  |
+------------------+-------------------------+------------------+
```

### Target Layout (from reference)
```text
+-------------------------------------------------------------------+
|  [Workflow Description]                        [Edit workflow]    |
|  Type description...                           Production Live    |
+-------------------------------------------------------------------+
|                                                                   |
|                     +----------------+                            |
|                     | Trigger        | (teal, lightning icon)    |
|                     | jobId: P-139434|                            |
|                     +----------------+                            |
|                            |                                      |
|                     +----------------+                            |
|                     | Candidate V2   | (purple, user icon)        |
|                     | First name...  |                            |
|                     +----------------+                            |
|                            |                                      |
|                     +----------------+                            |
|                     | Screening      | (coral, questions icon)    |
|                     | 2 Questions    |                            |
|                     +----------------+                            |
|                            |                                      |
|                     +----------------+                            |
|                     | Condition      | (amber, branch icon)       |
|                     | Qualified/KO   |                            |
|                     +----------------+                            |
|                        /         \                                |
|               Qualified           Knockout                        |
|                  |                   |                            |
|            [Update Status]    [Update Status]                     |
|                  |                   |                            |
|            [Message]           [Message]                          |
|                  |                   |                            |
|            Apply Now         Search More Jobs                     |
+-------------------------------------------------------------------+
|                                              [+] [-] [fullscreen] |
+-------------------------------------------------------------------+
```

---

## Key Design Changes

### 1. Remove Fixed Sidebars
- Remove the left Stage Palette sidebar (replace with floating add button or overlay)
- Keep right NodeConfigPanel as a slide-out drawer/sheet instead of fixed sidebar

### 2. Workflow Description Area
- Add editable description textarea in top-left corner of canvas
- Clean, bordered input that floats over the canvas

### 3. Node Card Redesign
All nodes will have a consistent card design:
- White background with subtle border
- Left-aligned icon in colored circle
- Title and subtitle/metadata text
- Rounded corners (rounded-xl)
- Shadow on hover/selection

### 4. Node Types with New Visual Style

| Node Type | Icon | Color Scheme | Subtitle Example |
|-----------|------|--------------|------------------|
| Trigger | Zap (lightning) | Teal/Emerald | "en_%, external" + "jobId: P-139434" |
| Candidate Details | User | Purple/Violet | "First name, Last name, Email..." |
| Screening Questions | HelpCircle | Coral/Orange | "2 Questions" |
| Condition | GitBranch | Amber/Yellow | Shows Qualified/Knockout conditions |
| Update Status | CheckSquare | Green/Blue | "Type: Screening Status" |
| Message | MessageSquare | Blue/Orange | "Elements: Text Message, Button" |

### 5. Edge Labels
- Decision node outputs show colored labels: "Qualified" (green), "Knockout" (orange/red)
- Bottom outputs can show action labels: "Apply Now", "Search More Jobs"

### 6. Simplified Controls
- Remove MiniMap (cleaner look)
- Keep zoom controls in bottom-right corner
- Add fullscreen toggle option

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/workflow-nodes/TriggerNode.tsx` | Create | New trigger node matching reference design |
| `src/components/orchestration/workflow-nodes/StageCardNode.tsx` | Create | Universal stage card (Candidate, Screening, etc.) |
| `src/components/orchestration/workflow-nodes/ConditionNode.tsx` | Create | Condition node with Qualified/Knockout display |
| `src/components/orchestration/workflow-nodes/ActionNode.tsx` | Create | Update Status / Message node |
| `src/components/orchestration/workflow-nodes/OutputNode.tsx` | Create | Terminal output node (Apply Now, Search More) |
| `src/components/orchestration/workflow-nodes/index.ts` | Create | Barrel export for new nodes |
| `src/components/orchestration/WorkflowCanvas.tsx` | Create | New clean canvas component with floating controls |
| `src/components/orchestration/FloatingAddMenu.tsx` | Create | Floating button to add nodes (replaces palette) |
| `src/pages/PipelineTemplateBuilder.tsx` | Modify | Update workflow tab to use new components |
| `src/components/orchestration/StagePalette.tsx` | Keep | Keep as optional, can toggle visibility |

---

## New Node Data Interfaces

### Enhanced StageNodeData
```typescript
interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;           // Second line of text
  description?: string;        // Additional details
  nodeCategory: "trigger" | "stage" | "condition" | "action" | "output";
  icon: string;
  iconColor: string;           // Tailwind color class
  iconBgColor: string;         // Tailwind background color
  metadata?: Record<string, string>; // Key-value pairs to display
  
  // Condition-specific
  conditions?: {
    qualified: string;
    knockout: string;
  };
  
  // Action-specific
  actionType?: string;
  status?: string;
  
  // UI state
  isSelected?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
}
```

---

## Node Component Designs

### 1. TriggerNode (Entry Point)
```text
+---------------------------------------------+
| [⚡]  Trigger                               |
|       en_%, external                        |
|       jobId: in P-139434                    |
+---------------------------------------------+
```
- Teal/emerald icon background
- Lightning bolt icon
- Shows trigger configuration as subtitle

### 2. StageCardNode (Generic Stage)
```text
+---------------------------------------------+
| [👤]  Candidate Details V2                  |
|       First name, Last name, Email address, |
|       Phone number                          |
+---------------------------------------------+
```
- Purple icon background for candidate
- Coral/orange for screening
- Shows configured fields as subtitle

### 3. ConditionNode (Decision)
```text
+---------------------------------------------+
| [↗️]  Condition                              |
|       Qualified: Are you currently in       |
|         $(location) or... is Yes            |
|       Knockout: Are you currently in        |
+---------------------------------------------+
        |                    |
   [Qualified]          [Knockout]
   (green)              (orange)
```
- Amber/yellow icon
- Shows both condition paths inline
- Edge labels in green/orange colors

### 4. ActionNode (Update Status / Message)
```text
+---------------------------------------------+
| [✓]  Update Status                          |
|      Type: Screening Status                 |
|      Status: Screening Knockout             |
+---------------------------------------------+
```
- Green checkmark for status updates
- Blue/orange message icon for messages

### 5. OutputNode (Terminal)
```text
        [Apply Now]
           [🔗]
```
- Small label with external link icon
- Green for positive outcome, orange for alternative

---

## Edge Configuration

### Labeled Edges for Decisions
```typescript
const edgeTypes = {
  labeled: LabeledEdge,  // Custom edge with text label
};

// Edge with label
{
  id: 'e1-2',
  source: 'condition-1',
  target: 'update-1',
  sourceHandle: 'qualified',
  type: 'labeled',
  data: { label: 'Qualified', color: 'emerald' }
}
```

### LabeledEdge Component
- Smooth step edge with text label at midpoint
- Color-coded: green for "Qualified", orange for "Knockout"

---

## Canvas Layout

### Vertical Flow
- Default node placement: top-to-bottom
- Auto-layout algorithm for new nodes
- Center-aligned primary flow
- Branches spread left/right from decision nodes

### Floating Elements
1. **Workflow Description** - Top-left floating textarea
2. **Add Node Button** - Bottom-center or floating action button
3. **Zoom Controls** - Bottom-right (existing)

### Background
- Clean white/light gray (no dots for cleaner look, or very subtle dots)
- Option to toggle grid visibility

---

## Implementation Steps

### Phase 1: Create New Node Components
1. Create `workflow-nodes/` directory
2. Build TriggerNode with new visual style
3. Build StageCardNode with icon + subtitle layout
4. Build ConditionNode with dual-path display
5. Build ActionNode for status/message actions
6. Build OutputNode for terminals
7. Create barrel export

### Phase 2: Create LabeledEdge Component
1. Build custom edge with label rendering
2. Support color variants (green, orange, blue)
3. Position label at edge midpoint

### Phase 3: Update WorkflowTab/Canvas
1. Replace sidebar layout with full-width canvas
2. Add floating workflow description textarea
3. Update nodeTypes to use new components
4. Configure edgeTypes with labeled edges
5. Remove MiniMap, simplify controls

### Phase 4: Floating Add Menu
1. Create FloatingAddMenu component
2. Position as floating button or bottom action bar
3. Show node type options on click
4. Add node at appropriate position on selection

### Phase 5: Integrate with PipelineTemplateBuilder
1. Update workflow tab rendering
2. Keep NodeConfigPanel as sheet/drawer (opens on click)
3. Update node data structure for new format
4. Test drag/drop and connections

---

## Technical Notes

1. **Backward Compatibility**: Keep old node types as fallback, migrate data on load

2. **Vertical Layout**: Use dagre library for auto-layout algorithm (already used in React Flow examples)

3. **Edge Labels**: Use React Flow's EdgeLabelRenderer for label positioning

4. **Description Persistence**: Add `workflowDescription` field to template metadata

5. **Node Selection**: Click opens side drawer instead of fixed right panel

6. **Palette Alternative**: Floating button or keyboard shortcut (press "A" to add) instead of permanent sidebar

7. **Performance**: Lazy render nodes off-screen, virtualize large workflows
