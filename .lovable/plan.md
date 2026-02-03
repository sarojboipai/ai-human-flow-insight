
# Fix Back Button Navigation in Pipeline Template Builder

## Problem
The back button on the Pipeline Template Builder page navigates to `/ops/orchestration`, but this route does not exist. The correct destination is `/ops/pipeline-config`.

## Root Cause
The navigation paths in `PipelineTemplateBuilder.tsx` reference an old/incorrect route (`/ops/orchestration`) that was likely renamed to `/ops/pipeline-config` but the references were not updated.

---

## Technical Changes

**File:** `src/pages/PipelineTemplateBuilder.tsx`

Update all three occurrences of `/ops/orchestration` to `/ops/pipeline-config`:

| Line | Current | Fixed |
|------|---------|-------|
| 427 | `navigate("/ops/orchestration")` | `navigate("/ops/pipeline-config")` |
| 453 | `navigate("/ops/orchestration")` | `navigate("/ops/pipeline-config")` |
| 462 | `navigate("/ops/orchestration")` | `navigate("/ops/pipeline-config")` |

---

## Affected Navigation Points

1. **Back button** (line 462) - Header back arrow
2. **Save Draft success** (line 427) - After saving draft
3. **Publish success** (line 453) - After publishing template

---

## Result
Clicking the back button (and completing save/publish actions) will correctly navigate to the Pipeline Config page where templates are listed.
