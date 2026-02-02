

# Add Node Click Details to Pipeline Board

Add interactive click functionality to the React Flow pipeline nodes so that clicking on a stage (like "Pre-screen Questions") displays detailed metrics in a side panel.

---

## Approach

When a user clicks on a pipeline stage node, a side panel (Sheet) will slide in from the right showing:
- Stage name and icon
- Key metrics: Screenings Sent, Appeared, Qualified
- Progress bars for visual representation
- Breakdown of AI vs Human handling

This provides job-specific intelligence at the node level within the pipeline visualization.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/PipelineBoardDialog.tsx` | Modify | Add node click handler, state for selected node, and Sheet component for details panel |
| `src/components/customer/pipeline-nodes/StageNode.tsx` | Modify | Make nodes clickable with cursor pointer and visual feedback |
| `src/lib/mockData.ts` | Modify | Add pre-screen stage metrics data to jobs |

---

## Technical Details

### 1. Add Stage Metrics Data (mockData.ts)

Add detailed stage metrics to each job for nodes that need drill-down:

```typescript
export interface StageMetrics {
  sent: number;
  appeared: number;
  qualified: number;
  disqualified: number;
  pending: number;
  avgResponseTime: string;
}

// Add to each job
stageMetrics: {
  "prescreen": { sent: 98, appeared: 72, qualified: 45, disqualified: 18, pending: 9, avgResponseTime: "4 hours" },
  "voice-agent": { sent: 45, appeared: 38, qualified: 28, disqualified: 8, pending: 2, avgResponseTime: "15 mins" },
  // ... other stages
}
```

### 2. Make StageNode Clickable (StageNode.tsx)

Add click handler prop and visual hover state:

```tsx
interface StageNodeData {
  label: string;
  icon?: string;
  handlers?: string[];
  borderColor?: string;
  onClick?: () => void;  // NEW
}

// Add to the component
<div 
  className={`relative bg-white rounded-lg border-2 ${borderClass} shadow-sm px-4 py-3 min-w-[140px] cursor-pointer hover:shadow-md transition-shadow`}
  onClick={data.onClick}
>
```

### 3. Add Details Panel (PipelineBoardDialog.tsx)

Add Sheet component and node click handling:

```tsx
// State for selected node
const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

// Node click handler
const handleNodeClick = useCallback((nodeId: string) => {
  setSelectedNodeId(nodeId);
}, []);

// Update nodes with onClick handlers
const nodesWithHandlers = useMemo(() => {
  return initialNodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      onClick: () => handleNodeClick(node.id),
    }
  }));
}, [handleNodeClick]);

// Get metrics for selected stage
const getStageMetrics = (nodeId: string) => {
  return job?.stageMetrics?.[nodeId] || null;
};
```

### 4. Details Panel UI

The Sheet component will display:

```text
+---------------------------+
| Pre-screen Questions    X |
+---------------------------+
| Screenings Overview       |
|                           |
| Sent         98    100%   |
| [=========================]|
|                           |
| Appeared     72     73%   |
| [==================      ]|
|                           |
| Qualified    45     63%   |
| [==============          ]|
|                           |
| Disqualified 18     25%   |
| Pending       9     12%   |
|                           |
+---------------------------+
| Avg Response: 4 hours     |
| Handler: Auto Engine (AE) |
+---------------------------+
```

---

## Implementation Flow

```text
User clicks "Pre-screen Questions" node
        |
        v
StageNode onClick fires
        |
        v
handleNodeClick(nodeId) called
        |
        v
selectedNodeId state updated
        |
        v
Sheet opens with metrics for that stage
```

---

## Result

- Clicking any stage node in the pipeline board opens a details panel
- Pre-screen Questions node shows: Sent (98), Appeared (72), Qualified (45)
- Visual progress bars show conversion rates at each step
- Panel can be closed by clicking X or outside the panel
- Other nodes (Voice Agent, Interview, etc.) also show relevant metrics when clicked

