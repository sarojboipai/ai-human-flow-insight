
## Custom Workflow Nodes for Anaesthesia Technician (Chandan Hospital)

### What Changes
When you click on the "Anaesthesia Technician" job (P-139819) in the Pipeline Health table, the Job Workflow Explorer will now show a custom pipeline with these 7 stages instead of the default Ankura Hospital flow:

**Job Post -> Marketing -> Sourcing -> Application -> Prescreening -> Interview Scheduling -> Hire**

### What You Will See
- A new horizontal flow with 7 distinct nodes representing the custom pipeline
- No decision/branching nodes -- this is a simple linear flow
- The final "Hire" node shown as an outcome node
- Clicking each node will still open the stage details sheet

### Technical Details

**File: `src/lib/mockData.ts`**
- Add a new `CustomerWorkflowSchema` entry for **"Chandan Hospital"** to the `customerWorkflowSchemas` array
- The schema will define 7 main stages in a linear sequence:
  1. **Source** node: "Chandan Hospital" (type: source)
  2. **Job Post** (type: candidate, icon: briefcase)
  3. **Marketing** (type: automation, icon: megaphone)
  4. **Sourcing** (type: ai, icon: search)
  5. **Application** (type: candidate, icon: clipboard)
  6. **Prescreening** (type: automation, icon: send)
  7. **Interview Scheduling** (type: automation, icon: calendar)
- One outcome stage: **Hire** (type: outcome, icon: check)
- Positions will be evenly spaced horizontally for a clean linear layout
- No decision node, so no branching edges -- all edges connect sequentially, with the last stage connecting to "Hire"

**File: `src/components/customer/PipelineBoardDialog.tsx`**
- Update the edge-building logic in `buildEdgesFromSchema` to handle schemas without a decision node -- connect the last main stage directly to the first outcome stage when no decision node exists
- Update `getNodeMetadata` to include labels for the new node IDs (job-post, marketing, sourcing, application, prescreening)

**File: `src/lib/mockData.ts`** (enhancedStageMetrics)
- Add mock `enhancedStageMetrics` entries for the Anaesthesia Technician job (P-139819) keyed by the new stage IDs so clicking nodes shows meaningful data in the details sheet

No database changes are needed -- this is purely a UI/mock-data update.
