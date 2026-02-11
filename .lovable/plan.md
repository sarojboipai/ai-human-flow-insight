

## Add Role-Based Access Settings Section to Settings Page

### What You Will See
A new **"Roles & Access Control"** section on the Settings page (between Security and the bottom of the page) that displays:

- A table/list of the four personas (Executive, Operation Manager, HITL Reviewer, Customer) with their permissions
- Each role shows which sections of the app they can access (e.g., Dashboard, Pipeline, Orchestration, HITL Queue, etc.)
- Toggle switches to visually enable/disable access per role (non-functional, for display only)
- A note indicating "Contact admin to modify role permissions"

This is a **visual mockup only** -- no real authentication or enforcement will be added.

### Technical Details

**File: `src/pages/Settings.tsx`**
- Add a new section card using the existing `chart-container` pattern with a `Shield` or `Users` icon
- Define a static array of roles and their permission sets:
  - **Executive**: Dashboard, Job Pipeline, AOP x WBR, Human Activity, AI Activity, Human vs AI, Revenue & Costs, Staffing Planner
  - **Operation Manager**: Ops Dashboard, Pipeline Config, Job Orchestration, Job List, Recruiters, AI Performance
  - **HITL Reviewer**: HITL Queue, HITL Analytics, Audit Log
  - **Customer**: Customer Dashboard, Business View
- Each role rendered as an expandable or inline card showing its allowed sections with `Switch` toggles (default checked, read-only style)
- No new files or database changes needed

