
# Pipeline Template Editor - Multi-Mode Configuration (Workflow / Automation / Rules)

## Summary
Transform the Pipeline Template Builder into a multi-tab editor with three dedicated configuration modes: **Workflow**, **Automation**, and **Rules**. A tab selector bar below the header enables seamless navigation between modes while preserving shared template state.

---

## Current State

The `PipelineTemplateBuilder` is a single-page canvas for designing workflows with:
- Left sidebar: Stage palette for drag-and-drop
- Center: React Flow canvas for pipeline visualization
- Right sidebar: Node configuration panel
- Header: Back button, template name, validation status, Save/Publish buttons

The codebase already has components for agents (`AgentRegistry.tsx`), connectors (`ConnectorRegistry.tsx`), and rules (`RulesTable.tsx`, `HITLRulesPanel.tsx`) but they're not integrated into the template builder.

---

## Proposed Architecture

```text
+--------------------------------------------------------------------------------+
|  Header: Back | Edit Template | Template Name + Unsaved Badge                  |
|                                            Validation Status | Save | Publish  |
+--------------------------------------------------------------------------------+
|  [ Workflow ]  [ Automation ]  [ Rules ]    <-- Tab Selector Bar               |
+--------------------------------------------------------------------------------+
|                                                                                  |
|  +------------------+   +----------------------------------------+   +--------+ |
|  | Left Panel       |   | Main Content Area (varies by tab)       |   | Right  | |
|  | (varies by tab)  |   |                                        |   | Panel  | |
|  +------------------+   +----------------------------------------+   +--------+ |
|                                                                                  |
+--------------------------------------------------------------------------------+
```

### Tab Content Breakdown

| Tab | Left Panel | Main Content | Right Panel |
|-----|------------|--------------|-------------|
| **Workflow** | Stage Palette | React Flow Canvas | Node Config |
| **Automation** | Agent List | Automation Mapping Table | Connector Config |
| **Rules** | Rule Categories | Rules Table | Rule Builder |

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/PipelineTemplateBuilder.tsx` | Modify | Add tab state, restructure to render content based on active tab |
| `src/components/orchestration/TemplateEditorTabs.tsx` | Create | Reusable tab selector component |
| `src/components/orchestration/WorkflowTab.tsx` | Create | Extract current canvas logic into dedicated component |
| `src/components/orchestration/AutomationTab.tsx` | Create | Automation configuration page with agent-to-stage mapping |
| `src/components/orchestration/RulesTab.tsx` | Create | Rules configuration page with template-specific rules |
| `src/lib/mockData.ts` | Modify | Add template-specific rules interface if needed |

---

## Component Details

### 1. TemplateEditorTabs Component
A sticky segmented control below the header with three tabs:
- Uses visual highlighting for active tab
- Shows unsaved indicator per tab if that section has changes
- Click navigates between modes without page reload

```text
+-----------------------------------------------------------+
|  [  Workflow  ]  [  Automation  ]  [  Rules  ]            |
+-----------------------------------------------------------+
```

### 2. WorkflowTab Component
Extract current canvas functionality into a dedicated component:
- Stage Palette (left)
- React Flow Canvas (center)
- Node Config Panel (right)
- All drag-and-drop, node editing, and connection logic

### 3. AutomationTab Component

**Left Panel - Agent Registry (compact)**
- List of available AI agents
- Status indicators (active/paused/error)
- Quick filter by capability

**Main Content - Automation Mapping Table**
| Stage | Assigned Agent | Action Type | Confidence Threshold | Escalation Target | Enabled |
|-------|----------------|-------------|---------------------|-------------------|---------|
| Profile Screening | Phenom CV Parser | Screen | 85% | Human Recruiter | Toggle |
| Skills Matching | Skills Matcher AI | Match | 90% | Technical Team | Toggle |

**Right Panel - Connector Configuration**
- Integration connectors list (ATS, CRM, WhatsApp)
- Credential status
- Last sync time
- Quick configure button

### 4. RulesTab Component

**Left Panel - Rule Categories**
- Filter by rule type: Confidence, Business, SLA, Volume, Cost, Compliance
- Filter by stage: All stages from workflow

**Main Content - Rules Table**
- Reuse existing `RulesTable` component with modifications
- Show rules specific to this template
- Allow add/edit/delete/simulate

**Right Panel - Rule Builder**
- Inline rule creation/editing form
- Condition builder with metric, operator, threshold
- Action selector: Queue, Alert, Escalate, AI Agent, Automation

---

## State Management Strategy

### Shared Template State (in PipelineTemplateBuilder)
```typescript
interface TemplateState {
  metadata: TemplateMetadata;
  
  // Workflow state
  nodes: Node<StageNodeData>[];
  edges: Edge[];
  
  // Automation state
  stageAutomations: StageAutomation[];
  
  // Rules state
  templateRules: HITLRuleV2[];
  
  // Dirty tracking per section
  isDirtyWorkflow: boolean;
  isDirtyAutomation: boolean;
  isDirtyRules: boolean;
}
```

### Unsaved Changes Warning
When switching tabs with unsaved changes:
- Show confirmation dialog
- Options: "Save Changes", "Discard", "Cancel"

### Unified Save/Publish
- Save Draft: Saves all three sections together
- Publish: Validates all sections before activating

---

## Validation Per Tab

### Workflow Tab Validation
- Has start and end nodes
- All nodes connected
- AI/Automation nodes have agents assigned
- Human nodes have roles assigned

### Automation Tab Validation
- All stages have at least one assigned actor
- AI stages have valid confidence thresholds
- Escalation targets are configured

### Rules Tab Validation
- No duplicate rule conditions
- Valid thresholds for all rules
- At least one rule per critical stage (optional warning)

---

## StageAutomation Interface (New)

```typescript
interface StageAutomation {
  stageId: string;
  stageName: string;
  assignedAgentId: string | null;
  actionType: 'screen' | 'match' | 'outreach' | 'schedule' | 'notify';
  confidenceThreshold: number;
  escalationTarget: string;
  enabled: boolean;
  integrations: {
    connectorId: string;
    trigger: AutomationTrigger;
    action: AutomationAction;
  }[];
}
```

---

## Visual Design

### Tab Selector Bar
- Background: `bg-muted/30`
- Active tab: `bg-background` with bottom border accent
- Inactive tabs: Subtle text, no background
- Hover: Slight background highlight

### Automation Tab Layout
```text
+------------+--------------------------------------------------+------------+
| Agent List |  Stage Automation Mapping Table                  | Connectors |
| (240px)    |  +------------------------------------------+    | (280px)    |
|            |  | Stage | Agent | Action | Threshold | ... |    |            |
| [Agents]   |  |-------|-------|--------|-----------|-----|    | [ATS]      |
| - Parser   |  | Screen| Parser| Screen | 85%       | ... |    | [CRM]      |
| - Matcher  |  | Match | Match | Match  | 90%       | ... |    | [WhatsApp] |
| - Outreach |  +------------------------------------------+    |            |
+------------+--------------------------------------------------+------------+
```

### Rules Tab Layout
```text
+------------+--------------------------------------------------+------------+
| Categories |  Rules Table                                     | Rule Form  |
| (200px)    |  +------------------------------------------+    | (320px)    |
|            |  | Stage | Name | Type | Condition | ... |      |            |
| [Types]    |  |-------|------|------|-----------|-----|      | [Builder]  |
| - Confidence |  | All   | Low AI | Conf | <70%    | ... |    |            |
| - Business |  | Screen| SLA  | SLA  | >24h      | ... |      | Condition: |
| - SLA      |  +------------------------------------------+    | Action:    |
+------------+--------------------------------------------------+------------+
```

---

## Implementation Steps

### Phase 1: Tab Infrastructure
1. Create `TemplateEditorTabs` component
2. Add tab state to `PipelineTemplateBuilder`
3. Extract current canvas into `WorkflowTab` component
4. Wire up tab switching with content rendering

### Phase 2: Automation Tab
1. Create `AutomationTab` component
2. Build stage-to-agent mapping table
3. Add connector configuration panel
4. Implement automation state management

### Phase 3: Rules Tab
1. Create `RulesTab` component
2. Adapt existing `RulesTable` for template context
3. Add inline rule builder/editor
4. Implement template-specific rule filtering

### Phase 4: Integration
1. Implement unified Save/Publish across all tabs
2. Add unsaved changes warnings
3. Cross-tab validation
4. Test full workflow

---

## Technical Notes

1. **State Lifting**: All template state (nodes, edges, automations, rules) will be managed at the `PipelineTemplateBuilder` level and passed down as props to tab components.

2. **URL Routing**: Consider adding tab to URL (`?tab=workflow`) for direct linking, but initial implementation will use local state only.

3. **Reusable Components**: Leverage existing `AgentRegistry`, `ConnectorRegistry`, and `RulesTable` components with minimal modifications.

4. **Workflow Context**: Continue using `WorkflowContext` for persistence, extending the `Workflow` interface to include automations and rules if not already present.

5. **Performance**: Each tab component will be lazy-rendered to avoid loading all content upfront.
