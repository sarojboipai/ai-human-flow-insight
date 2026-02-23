

## Fix Node Click Details: Inline Side Panel

### Problem
The `StageDetailsSheet` uses a Radix `Sheet` component nested inside a Radix `Dialog`. This causes portal and z-index conflicts -- the sheet renders behind the dialog overlay and is not visible when clicking nodes.

### Solution
Replace the `Sheet`-based overlay with an **inline side panel** that renders directly inside the dialog's flex layout. When a node is clicked, the panel slides in from the right within the same container, avoiding all portal/z-index issues.

### Changes

#### 1. Create a new `StageDetailsPanel` component
**File: `src/components/customer/StageDetailsPanel.tsx`** (new file)

- Copy all the content/logic from `StageDetailsSheet` (SLA badge, attribution bar, AI Agent card, Human card, conversion analysis, volume metrics, stage-specific metrics)
- Remove the `Sheet`/`SheetContent` wrapper -- render as a plain `div` with a left border, background, and `overflow-y-auto`
- Add a close button (X icon) at the top-right
- Accept the same props: `stageName`, `stageIcon`, `stageId`, `metrics`, plus an `onClose` callback

#### 2. Update `PipelineBoardDialog` layout
**File: `src/components/customer/PipelineBoardDialog.tsx`**

- Change the main content area from a single `div` wrapping ReactFlow to a `flex` row:
  - Left: ReactFlow canvas (`flex-1`)
  - Right: `StageDetailsPanel` (400px wide, shown only when `selectedNodeId` is set)
- Remove `StageDetailsSheet` import and usage
- Add `onPaneClick` to ReactFlow to close the panel when clicking empty canvas space

Layout:
```text
+-----------------------------------------------+
| Dialog Header (job info, legend)               |
+------------------------------+-----------------+
|                              |                 |
|   ReactFlow Canvas           | Stage Details   |
|   (flex-1, full height)      | Panel (w-[400]) |
|                              | scroll-y        |
|                              |                 |
+------------------------------+-----------------+
```

### Files
- `src/components/customer/StageDetailsPanel.tsx` -- new file (extracted from StageDetailsSheet, rendered as a div)
- `src/components/customer/PipelineBoardDialog.tsx` -- replace Sheet with inline panel in flex layout, add onPaneClick

