

## Move "Job List" Under Orchestration in Ops Sidebar

### Change
Move the "Job List" navigation item from the "Overview" section to the **"Orchestration"** section in the Operations Manager sidebar, positioning it after "Job Orchestration".

### Technical Detail

**File: `src/components/layout/OpsSidebar.tsx`**
- Add a new entry to the `orchestrationItems` array:
  ```
  { title: "Job List", url: "/ops/jobs", icon: List }
  ```
- This places it under the "Orchestration" group alongside "Pipeline Config" and "Job Orchestration"

All other planned changes (new route, page, dialog, RLS policies) remain the same as previously approved.

