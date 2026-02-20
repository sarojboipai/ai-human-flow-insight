

## Per-Node Task Attribution (AI Agent Task + Human Task)

### What This Does
Adds two new collapsible sections to the Node Properties Panel in the Pipeline Config Workflow Builder. When you click any pipeline node, the right-side configuration sheet will now show:
- **AI Agent Task** section -- toggle on/off, select agent, describe the AI task, set execution mode and confidence threshold
- **Human Task** section -- toggle on/off, select role, describe the human task, set assignment mode and SLA
- **Attribution badges** on each node in the canvas showing the task ownership (AI, Human, Hybrid, or HITL)

### Changes

#### 1. Expand the Node Data Model
**File: `src/components/orchestration/WorkflowTab.tsx` and `src/pages/PipelineTemplateBuilder.tsx`**

Add new fields to the `StageNodeData` interface:
- `aiEnabled`, `aiAgentId`, `aiTaskDescription`, `executionMode`, `confidenceThreshold`
- `humanEnabled`, `humanRole`, `humanTaskDescription`, `assignmentType`, `humanSlaHours`

Update `nodesToStages` in `PipelineTemplateBuilder.tsx` to serialize these new fields into workflow stage data when saving.

#### 2. Rebuild the NodeConfigPanel
**File: `src/components/orchestration/NodeConfigPanel.tsx`**

Replace the current conditional AI/Human sections with two always-visible, toggle-gated sections for non-entry/exit nodes:

**AI Agent Task Section:**
- Enable toggle ("AI performs this stage")
- Agent selector dropdown (from Agent Registry)
- Task description textarea
- Execution mode selector: Fully Automated / Human Review After AI / Confidence-based routing
- Confidence threshold slider (0-100%, shown only when mode = confidence-based)

**Human Task Section:**
- Enable toggle ("Human involved in this stage")
- Role selector: Recruiter, Sourcer, Hiring Manager, Ops Specialist, HITL Reviewer, Custom Role
- Task description textarea
- Assignment type: Auto-assign, Round robin, Manual pick, Queue based
- Human SLA duration picker (hours)

**Attribution summary** at the top of each section showing computed badge (AI Only / Human Only / Hybrid / HITL).

#### 3. Add Attribution Badges to Canvas Nodes
**Files: All editable node components under `src/components/orchestration/pipeline-nodes/`**
- `EditableAINode.tsx`, `EditableHumanNode.tsx`, `EditableAutomationNode.tsx`, `EditableStageNode.tsx`

Add small colored badges at the bottom of each node:
- Orange "AI" badge when `aiEnabled` is true
- Blue "Human" badge when `humanEnabled` is true  
- Green "Hybrid" badge when both are enabled
- Show task descriptions as tooltips on hover

#### 4. Persist to Workflow Save
**File: `src/pages/PipelineTemplateBuilder.tsx`**

Update the `nodesToStages` function and `buildWorkflowData` to include the new task attribution fields so they persist when saving/publishing a pipeline template.

### Technical Details

**Updated `StageNodeData` interface:**
```text
StageNodeData {
  // existing fields...
  label, stageType, icon, agentId, humanRole, slaHours

  // NEW: AI Task fields
  aiEnabled?: boolean
  aiAgentId?: string
  aiTaskDescription?: string
  executionMode?: "fully_automated" | "human_review" | "confidence_based"
  confidenceThreshold?: number  // 0-100

  // NEW: Human Task fields
  humanEnabled?: boolean
  humanTaskDescription?: string
  assignmentType?: "auto_assign" | "round_robin" | "manual_pick" | "queue_based"
  humanSlaHours?: number
}
```

**NodeConfigPanel structure (for non-entry/exit nodes):**
```text
+---------------------------+
| Configure Node            |
| [NODE_TYPE badge]         |
| Stage Name: [input]       |
|---------------------------|
| Attribution: [AI/Human/   |
|   Hybrid badge]           |
|---------------------------|
| AI Agent Task        [ON] |
|   Agent: [dropdown]       |
|   Task: [textarea]        |
|   Mode: [select]          |
|   Confidence: [slider]    |
|---------------------------|
| Human Task           [ON] |
|   Role: [dropdown]        |
|   Task: [textarea]        |
|   Assignment: [select]    |
|   SLA: [input] hours      |
|---------------------------|
| SLA Threshold (hours)     |
|   [input]                 |
+---------------------------+
```

**Files to create/modify:**
- `src/components/orchestration/NodeConfigPanel.tsx` -- major rewrite with new sections
- `src/components/orchestration/WorkflowTab.tsx` -- update StageNodeData interface
- `src/pages/PipelineTemplateBuilder.tsx` -- update StageNodeData interface and nodesToStages
- `src/components/orchestration/pipeline-nodes/EditableAINode.tsx` -- add attribution badges
- `src/components/orchestration/pipeline-nodes/EditableHumanNode.tsx` -- add attribution badges
- `src/components/orchestration/pipeline-nodes/EditableAutomationNode.tsx` -- add attribution badges
- `src/components/orchestration/pipeline-nodes/EditableStageNode.tsx` -- add attribution badges
