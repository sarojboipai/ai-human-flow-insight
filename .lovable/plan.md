
# Remove Job Orchestration Tab and Page

## Overview
Remove the "Job Orchestration" navigation item from the Ops sidebar and delete the associated page and route.

---

## Technical Changes

### 1. Remove from Sidebar Navigation
**File:** `src/components/layout/OpsSidebar.tsx`

- Remove the `GitBranch` icon import (line 6)
- Remove the "Job Orchestration" item from `orchestrationItems` array (lines 39-43)

**Current orchestrationItems:**
```typescript
const orchestrationItems = [
  {
    title: "Pipeline Config",
    url: "/ops/pipeline-config",
    icon: Network,
  },
  {
    title: "Job Orchestration",
    url: "/ops/job-orchestration",
    icon: GitBranch,
  },
];
```

**Updated:**
```typescript
const orchestrationItems = [
  {
    title: "Pipeline Config",
    url: "/ops/pipeline-config",
    icon: Network,
  },
];
```

### 2. Remove Route from App.tsx
**File:** `src/App.tsx`

- Remove the import for `OpsJobOrchestration` (line 28)
- Remove the route `<Route path="/ops/job-orchestration" element={<OpsJobOrchestration />} />` (line 55)

### 3. Delete the Page File
**File:** `src/pages/OpsJobOrchestration.tsx`

- Delete this file entirely

---

## Summary of Changes

| File | Action |
|------|--------|
| `src/components/layout/OpsSidebar.tsx` | Remove "Job Orchestration" nav item and GitBranch import |
| `src/App.tsx` | Remove route and import for OpsJobOrchestration |
| `src/pages/OpsJobOrchestration.tsx` | Delete file |

---

## Result
The "Job Orchestration" tab will no longer appear in the Ops sidebar. The Orchestration section will only contain "Pipeline Config". Any users navigating to `/ops/job-orchestration` will be shown the 404 page.
