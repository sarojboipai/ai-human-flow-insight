

# Job Workflow Explorer Overlay - Implementation Plan

Transform the existing PipelineBoardDialog into a comprehensive Job Workflow Explorer Overlay with enhanced PRD-compliant analytics, new node types, and rich stage-level metrics.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/PipelineBoardDialog.tsx` | Major Update | Add job context header, enhanced node structure, mini-map |
| `src/components/customer/StageDetailsSheet.tsx` | Major Update | Expand to show AI/Human/HITL attribution, SLA indicators, enhanced metrics |
| `src/components/customer/pipeline-nodes/CandidateNode.tsx` | Create | New purple node for candidate journey steps |
| `src/components/customer/pipeline-nodes/AIAgentNode.tsx` | Create | New orange node for AI automated steps |
| `src/components/customer/pipeline-nodes/RecruiterNode.tsx` | Create | New blue node for human recruiter steps |
| `src/components/customer/pipeline-nodes/AutomationNode.tsx` | Create | New green node for automation engine actions |
| `src/components/customer/pipeline-nodes/index.ts` | Update | Export new node types |
| `src/lib/mockData.ts` | Update | Add stage-specific metrics for all jobs with AI/Human/HITL split |
| `src/pages/Index.tsx` | Update | Wire up handleJobClick to open the workflow explorer |

---

## Visual Architecture

```text
+-----------------------------------------------------------------------+
| [Job Title] - [Job ID]                        [Legend] [X]            |
| [Customer: Ankura Hospital] [Status: Active] [Days Open: 14]          |
+-----------------------------------------------------------------------+
|                                                                       |
|  +-------+    +----------+    +----------+    +----------+            |
|  |Ankura | -> | Jobs in  | -> |   Job    | -> |Expression|            |
|  |Hospital|   | Ankura   |    | Discovery|    |of Interest            |
|  +-------+    +----------+    +----------+    +----------+            |
|       |           |               |               |                   |
|       v           v               v               v                   |
|  +----------+    +----------+    +---------+                          |
|  |Pre-screen| -> |Voice Agent| -> |Decision|                          |
|  |Questions |    |Screening  |    |  Node  |                          |
|  +----------+    +----------+    +---------+                          |
|                                      |                                |
|                       +-----------------------------------+           |
|                       |              |                    |           |
|                       v              v                    v           |
|                  +----------+  +----------+  +----------+             |
|                  |Scheduling|  |Silver Med|  |Talent    |             |
|                  |          |  |          |  |Community |             |
|                  +----------+  +----------+  +----------+             |
|                                                                       |
+-----------------------------------------------------------------------+
| [Zoom Controls]                                    [Mini-map]         |
+-----------------------------------------------------------------------+
```

---

## Technical Details

### 1. New Node Types (per PRD color coding)

| Node Type | Color | Icon | Purpose |
|-----------|-------|------|---------|
| CandidateNode | Purple (#a855f7) | User | Candidate journey steps |
| AIAgentNode | Orange (#f97316) | Bot | AI automated processing |
| RecruiterNode | Blue (#3b82f6) | Users | Human recruiter actions |
| DecisionNode | Black (#1e293b) | GitBranch | Qualification branching |
| AutomationNode | Green (#10b981) | Zap | Scheduling/CRM actions |

Each node will display:
- Stage name
- AI/Human/HITL percentage badges
- SLA indicator (colored border: green/amber/red)
- Click handler to open analytics panel

### 2. Enhanced Stage Details Sheet

The right-side panel (StageDetailsSheet) will be expanded to include:

**Header Section:**
- Stage name with icon
- SLA status badge (On Track/At Risk/Breached)
- Avg time in stage

**Metrics Cards:**
```tsx
interface EnhancedStageMetrics {
  // Volume metrics
  sent: number;
  appeared: number;
  qualified: number;
  disqualified: number;
  pending: number;
  
  // AI/Human/HITL attribution
  aiPercentage: number;
  humanPercentage: number;
  hitlPercentage: number;
  
  // SLA metrics
  avgTimeInStage: string;
  slaThreshold: string;
  slaStatus: "green" | "amber" | "red";
  delayCause?: string;
  
  // Stage-specific metrics
  conversionRate: number;
  dropOffRate: number;
  
  // Handler info
  handler: string;
  avgResponseTime: string;
}
```

**Attribution Bar:**
- Visual bar showing 78% AI | 15% Human | 7% HITL

**Charts Section (per stage type):**
- Pre-screen: Questions answered breakdown
- Voice Agent: AI confidence score distribution
- Discovery: Channel breakdown (App, Web, WhatsApp)

### 3. PipelineBoardDialog Enhancements

**Header Updates:**
```tsx
// Add job context to header
<DialogHeader>
  <DialogTitle>{job.title}</DialogTitle>
  <div className="flex gap-4 text-sm text-muted-foreground">
    <span>Customer: {job.employer}</span>
    <Badge variant={job.status === "active" ? "default" : "secondary"}>
      {job.status}
    </Badge>
    <span>Days Open: {job.daysOpen}</span>
  </div>
</DialogHeader>
```

**Node Configuration:**
- Update nodes to use new node types based on handler
- Add AI/Human/HITL percentages to node data
- Add SLA indicators per node

**Mini-map:**
```tsx
import { MiniMap } from "@xyflow/react";

<MiniMap 
  nodeColor={(node) => {
    switch (node.type) {
      case "candidateNode": return "#a855f7";
      case "aiAgentNode": return "#f97316";
      case "recruiterNode": return "#3b82f6";
      case "automationNode": return "#10b981";
      default: return "#94a3b8";
    }
  }}
/>
```

### 4. MockData Enhancements

Add comprehensive stage metrics for each job:

```tsx
// Enhanced stage metrics structure
stageMetrics: {
  "jobs-ankura": {
    sent: 245,
    appeared: 189,
    qualified: 156,
    // ... existing fields
    aiPercentage: 85,
    humanPercentage: 12,
    hitlPercentage: 3,
    slaStatus: "green",
    avgTimeInStage: "1 day",
    slaThreshold: "3 days",
    conversionRate: 77.1,
    dropOffRate: 22.9,
    channels: {
      app: 45,
      web: 30,
      whatsapp: 15,
      jobBoards: 10
    }
  },
  // ... other stages
}
```

### 5. Index.tsx Integration

Wire up the workflow explorer:

```tsx
import { PipelineBoardDialog } from "@/components/customer/PipelineBoardDialog";
import { jobs } from "@/lib/mockData";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleJobClick = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setDialogOpen(true);
    }
  };

  return (
    <>
      {/* ... existing dashboard content */}
      <JobPipelineHealthTable 
        data={jobPipelineHealth}
        onJobClick={handleJobClick}
      />
      
      <PipelineBoardDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        job={selectedJob}
      />
    </>
  );
};
```

---

## Node Interaction Flow

1. **Click Stage Node** - Opens StageDetailsSheet with full analytics
2. **Hover Node** - Shows quick tooltip with key metrics
3. **Zoom Controls** - Standard ReactFlow zoom in/out/fit
4. **Mini-map** - Navigate large workflows quickly
5. **Pan Canvas** - Drag to explore workflow

---

## Stage-Specific Metrics Panels

### Jobs in Ankura
- Total Jobs Posted
- Active vs Closed breakdown
- Source distribution (ATS, API, Manual)

### Job Discovery
- Job Views count
- Search Impressions
- Click-through Rate (CTR)
- Channel breakdown chart

### Expression of Interest
- Candidates Expressed Interest
- Source Breakdown (Swaasa App, WhatsApp Bot, Job Boards, Recruiter Outreach)
- Conversion Rate (Discovery to Interest)

### Pre-screen Questions
- Screening Invites Sent
- Candidates Appeared
- Candidates Cleared
- Drop-off Rate
- AI vs Human Screening Split bar

### Voice Agent Screening (AI)
- Voice Screening Invites
- Candidates Appeared/Cleared
- AI Confidence Score histogram
- Human Override Rate (HITL)

### Decision Node
- Qualified Candidates
- Knockout Candidates
- Qualification Rate
- Rule Engine Criteria badges

### Outcomes (Scheduling/Silver Medalist/Talent Community)
- Stage-specific metrics
- Re-engagement rates
- Future job reuse rates

---

## File Structure

```text
src/
  components/
    customer/
      PipelineBoardDialog.tsx (update)
      StageDetailsSheet.tsx (update)
      pipeline-nodes/
        index.ts (update)
        SourceNode.tsx (exists)
        StageNode.tsx (exists)
        DecisionNode.tsx (exists)
        OutcomeNode.tsx (exists)
        CandidateNode.tsx (new)
        AIAgentNode.tsx (new)
        RecruiterNode.tsx (new)
        AutomationNode.tsx (new)
  pages/
    Index.tsx (update)
  lib/
    mockData.ts (update)
```

---

## Result

When completed, Admins will be able to:
- Click any job row in the Pipeline Health Table to open the workflow explorer
- See the complete hiring journey visualized as an interactive node-based canvas
- Click individual stages to view detailed analytics including AI/Human/HITL split
- Identify bottlenecks via SLA indicators on each stage
- Navigate the workflow using zoom, pan, and mini-map controls
- Understand exactly where candidates drop off and why

