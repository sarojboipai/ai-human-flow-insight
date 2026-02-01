
# Interactive Pipeline Board Overlay

This plan adds a full-screen modal with a zoomable, pannable Miro-like board showing the job progress pipeline when clicking "View Pipeline".

---

## Overview

**What We're Building:**
An interactive pipeline diagram that opens in a dialog overlay when clicking "View Pipeline" on a job row. The diagram will be built with React Flow, providing:
- Zoomable and pannable canvas (like Miro)
- Zoom controls (+ / - / fit-to-view / lock)
- Custom node designs matching the reference image
- Multiple flow paths (ATS integration, candidate journey, decision branches)

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Add `@xyflow/react` dependency |
| `src/components/customer/PipelineBoardDialog.tsx` | Create | New dialog component with React Flow canvas |
| `src/components/customer/pipeline-nodes/` | Create | Custom node components for the flow |
| `src/components/customer/CustomerJobsTable.tsx` | Modify | Wire "View Pipeline" button to open dialog |

---

## Pipeline Diagram Structure

Based on the reference image, the diagram will have two parallel flows converging at a Decision node:

```text
                    +-----------+
                    |    ATS    |
                    +-----------+
                          |
                    +-----------+     +--------------+     +--------------+     +--------------+
                    | Post a Job| --> | Application  | --> | Application  | --> | Interview &  | --> Continue in ATS
                    |    (R)    |     |   Details    |     | Status Update|     |   Decision   |
                    +-----------+     |     (R)      |     |     (R)      |     |    (R,H)     |
                          |           +--------------+     +--------------+     +--------------+
                    Real-time Sync           |                    |
                          |           API Application Push   Status Update
                          v                  v                    v
+--------+    +-----------+    +-----------+    +-----------+    +-----------+    +-----------+
| Phenom | -> |  Jobs in  | -> |   Job     | -> |Expression | -> |Pre-screen | -> |Voice Agent| 
|        |    |  Phenom   |    | Discovery |    |of Interest|    | Questions |    | Screening |
+--------+    |    (C)    |    |    (C)    |    |    (C)    |    |   (AE)    |    |   (X+)    |
              +-----------+    +-----------+    +-----------+    +-----------+    +-----------+
                                                                                        |
                                                                                        v
                                                                                 +------------+
                                                                    Highly      |  Decision  |
                                                                   Qualified -> +------------+
                                                                        |             |
                                                                        v             | Qualified
                                                                 +------------+       v
                                                                 | Scheduling |   +------------+
                                                                 |   (AE)     |   |Silver Med  |
                                                                 +------------+   |   (AE)     |
                                                                                  +------------+
                                                                        |
                                                                   Knockout
                                                                        v
                                                                 +------------+
                                                                 |  Talent    |
                                                                 | Community  |
                                                                 |    (C)     |
                                                                 +------------+
```

---

## Component Design

### PipelineBoardDialog
- Full-screen modal dialog (nearly full viewport)
- React Flow canvas with:
  - Zoom controls (bottom-left: +, -, fit, lock)
  - MiniMap (optional for navigation)
  - Pan and zoom enabled by default
- Legend at top showing handler types:
  - (R) Recruiter - Orange
  - (C) Candidate - Purple  
  - (H) Hiring Team - Green
  - (AE) Auto Engine - Yellow/Amber
  - (X+) X+ Intelligence - Orange gradient
- Job title and ID in header
- Close button

### Custom Nodes

**StageNode**: Standard rectangular stage box
- Icon at top
- Stage name
- Handler badge in corner

**SourceNode**: Special node for ATS/Phenom source
- Different styling (colored background like Phenom blue)
- Icon and label

**DecisionNode**: Diamond-shaped decision point
- Rotated square with dark background
- Person icon

**OutcomeNode**: End-stage nodes
- Similar to StageNode but smaller

### Custom Edges
- Dashed gray lines for standard connections
- Labeled edges for branches ("Highly Qualified", "Qualified", "Knockout")
- Curved paths for multi-level connections

---

## React Flow Configuration

```text
Node Types:
- stageNode: For main pipeline stages
- sourceNode: For ATS/Phenom sources  
- decisionNode: For decision diamond
- outcomeNode: For final outcomes

Edge Types:
- default: Dashed gray connector
- labeled: Edge with text label
```

---

## Zoom Controls

Following the reference image (bottom-left corner):
- "+" button: Zoom in
- "-" button: Zoom out
- Fit-to-view button: Reset to see entire diagram
- Lock button: Toggle pan/zoom lock
- "React Flow" attribution (can be hidden with pro license or kept)

---

## Implementation Details

### 1. Install React Flow
Add `@xyflow/react` (the latest version of React Flow) to dependencies.

### 2. Create Pipeline Nodes
Create custom node components that match the visual style:
- Light blue borders for candidate-facing nodes
- Orange/pink borders for recruiter nodes
- Handler badges (R, C, H, AE, X+) with appropriate colors

### 3. Define Node Positions
Position nodes on a coordinate grid to match the reference layout:
- Top row: ATS integration flow (recruiter-facing)
- Bottom row: Candidate journey flow
- Right side: Decision branching

### 4. Create Dialog Component
Full-screen dialog with:
- Header showing job info and legend
- React Flow canvas filling remaining space
- Zoom controls overlay

### 5. Update CustomerJobsTable
Change "View Pipeline" button to open the dialog with job data instead of navigating to a new page.

---

## Visual Styling

| Element | Style |
|---------|-------|
| Stage nodes | White bg, rounded corners, light blue border |
| Source nodes | Colored background (Phenom blue, ATS gray) |
| Decision node | Dark slate, rotated 45 degrees |
| Outcome nodes | White bg, colored branch labels |
| Connectors | Dashed gray lines |
| Handler badges | Circular, color-coded |
| Legend | Horizontal pills at top |

---

## Technical Notes

- React Flow v12 (@xyflow/react) is the latest version
- Nodes and edges defined as arrays with position coordinates
- Custom node components receive data props for content
- fitView option will auto-center the diagram on open
- Controls component provides built-in zoom buttons
