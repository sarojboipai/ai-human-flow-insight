
# Job Progress Pipeline Widget

This plan adds a visual workflow diagram to the Customer Dashboard showing the progress of posted jobs through the hiring pipeline.

---

## Overview

**What We're Building:**
A horizontal flowchart widget that visualizes the hiring pipeline stages from job posting to candidate outcomes. The design follows the reference image with:
- Connected stage boxes with icons
- A decision diamond node
- Branching paths for different candidate outcomes (Highly Qualified, Qualified, Knockout)
- Color-coded badges indicating handler type (AI, Human, Hybrid)

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/JobProgressPipeline.tsx` | Create | New visual pipeline component |
| `src/pages/CustomerDashboard.tsx` | Modify | Add the pipeline widget below existing metrics |

---

## Pipeline Structure

```text
+----------+     +----------+     +----------+     +----------+     +----------+     +----------+
|   ATS    | --> | Jobs in  | --> |   Job    | --> |Expression| --> |   Pre-   | --> |  Voice   |
|  Source  |     |  System  |     | Discovery|     |    of    |     |screening |     |  Agent   |
|          |     |          |     |          |     | Interest |     | Questions|     | Screening|
+----------+     +----------+     +----------+     +----------+     +----------+     +----------+
                                                                                           |
                                                                                           v
                                                          +------- Highly Qualified --> [Scheduling]
                                                          |
                                                   [Decision] ---- Qualified --------> [Silver Medalist]
                                                          |
                                                          +------- Knockout ---------> [Talent Community]
```

---

## Component Features

### Stage Nodes
- Rounded rectangle boxes with light blue border
- Icon at top center
- Stage name below icon
- Colored badge indicating handler type:
  - Purple (C) = Candidate-driven
  - Yellow (AE) = AI + Human hybrid  
  - Orange (X+) = AI screened

### Decision Node
- Diamond shape rotated 45 degrees
- Dark background with person icon
- "Decision" label below

### Connecting Lines
- Dashed lines between stages
- Small dots at connection points
- Labeled branches for outcomes (Highly Qualified, Qualified, Knockout)

### Outcome Nodes
- Same style as stage nodes
- Color-coded labels on connecting lines

---

## Implementation Details

### 1. Create JobProgressPipeline Component

The component will:
- Accept an optional `jobId` prop to show specific job data
- Display mock pipeline stages with current candidate counts
- Use flexbox for horizontal layout with overflow scroll
- Include SVG/CSS for the decision diamond and connecting lines

### 2. Update CustomerDashboard

Add the new widget below the existing metric cards:

```text
Current Layout:
- Header with search and navigation
- 3 metric cards (Active Jobs, Total Candidates, Interviews Scheduled)

New Layout:
- Header with search and navigation
- 3 metric cards
- Job Progress Pipeline widget (new)
```

---

## Mock Data for Pipeline

The widget will display these stages with sample data:

| Stage | Handler | Candidates |
|-------|---------|------------|
| ATS Source | - | 500 |
| Jobs in System | Candidate | 485 |
| Job Discovery | Candidate | 420 |
| Expression of Interest | Candidate | 380 |
| Pre-screening Questions | AI+Human | 290 |
| Voice Agent Screening | AI | 145 |
| Decision | - | 145 |
| Scheduling | AI+Human | 52 |
| Silver Medalist | AI+Human | 43 |
| Talent Community | Candidate | 50 |

---

## Visual Styling

- **Node borders**: Light blue (`border-sky-200`)
- **Node background**: White with subtle shadow
- **Connecting lines**: Dashed gray lines with dots at endpoints
- **Decision diamond**: Dark slate background rotated 45 degrees
- **Branch labels**: Colored text (green for Highly Qualified, blue for Qualified, red for Knockout)
- **Handler badges**: Circular colored badges matching the reference
