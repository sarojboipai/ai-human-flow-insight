

## Make Pipeline Board Nodes Draggable with Position Persistence

### Problem
Currently, the Pipeline Board dialog renders nodes using the memoized `nodesWithHandlers` directly in the ReactFlow component (line 360), ignoring the stateful `nodes` from `useNodesState`. This means any drag movements are visually lost. Additionally, there is no persistence -- positions reset every time the dialog opens.

### Solution
Two changes in `src/components/customer/PipelineBoardDialog.tsx`:

1. **Use stateful nodes for rendering**: Pass the `nodes` state (from `useNodesState`) to ReactFlow instead of the raw `nodesWithHandlers`. This allows React Flow's drag behavior to actually update and retain positions during the session.

2. **Persist positions to localStorage**: 
   - When nodes are dragged (`onNodesChange`), save updated positions to `localStorage` keyed by job ID (e.g., `pipeline-positions-P-139798`).
   - When the dialog opens, check localStorage for saved positions and apply them to the initial nodes before passing to `useNodesState`.
   - This ensures positions survive closing/reopening the dialog.

3. **Re-sync on job change**: Use a `useEffect` to reset nodes/edges when the selected job changes, merging any saved positions from localStorage.

### Technical Details

**File: `src/components/customer/PipelineBoardDialog.tsx`**

- Add a helper function `loadSavedPositions(jobId, nodes)` that reads from localStorage and overrides node positions if found.
- Add a helper function `savePositions(jobId, nodes)` that writes current node positions to localStorage.
- Wrap `onNodesChange` to also persist positions after drag ends.
- Replace `nodes={nodesWithHandlers}` with `nodes={nodes}` (the stateful version) on the ReactFlow component.
- Add `useEffect` watching `job?.id` to re-initialize `nodes` and `edges` when the job changes, since `useNodesState` only uses its argument as the initial value.

**localStorage key format**: `pipeline-node-positions-{jobId}`  
**Stored data**: `{ [nodeId]: { x, y } }`

