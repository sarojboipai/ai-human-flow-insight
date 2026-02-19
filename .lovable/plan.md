

## HITL Review Queue Enhancement

This plan transforms the existing HITL Review Queue from a basic task list into a fully actionable issue management system with enriched context, SLA tracking, resolution workflows, and external tool integration.

---

### What Changes for Users

**Review Queue Table**
- New columns: Customer Name, Stage, SLA Timer (color-coded green/amber/red), Source (AI/Automation/Manual)
- Default sort: Priority (High to Low), then Created Date (newest first)
- Row visual states: high-priority rows get a red-tinted left border, in-progress rows get blue, fixed rows get green, ignored rows get grey
- Status values updated to: Pending, In Progress, Fixed, Ignored (replacing approved/rejected/escalated)

**Right-Side Overlay Panel (redesigned)**
- Section 1 -- Issue Summary: Job Title, Customer, Stage, Rule Triggered, Priority, Created Time, SLA Remaining
- Section 2 -- "What is the issue?": Auto-generated problem explanation based on rule type (e.g., "SEO score is below required threshold (72/100)")
- Section 3 -- "What needs to be resolved?": Contextual required action guidance
- Section 4 -- "Open in Source Tool" button: Deep link to external system (opens in new tab)
- Section 5 -- Resolution: Comment box + two action buttons ("Mark as Fixed" and "Ignore Issue" with confirmation modal)

**SLA Tracking**
- Visual SLA timer in the table (green/amber/red indicators)
- SLA timestamps tracked: created, first viewed, action time, resolution time

**Notifications**
- Leverages the existing in-app notification system to surface new HITL tasks with rule context and deep links

---

### Technical Details

**1. Update HITLTask interface (`src/lib/mockData.ts`)**
- Add fields: `customerName`, `stage`, `source` (AI/Automation/Manual), `externalLink`, `resolutionComment`, `issueDescription`, `requiredAction`, `firstViewedAt`, `actionedAt`, `slaDeadline`
- Update `TaskStatus` type to include `"fixed"` and `"ignored"` (keep backward-compatible with existing statuses)
- Update mock data to populate new fields for all existing tasks

**2. Update TasksQueue table (`src/components/hitl/TasksQueue.tsx`)**
- Add Customer Name, Stage, SLA Timer columns
- Replace "Candidate" column with "Job Title" as the primary identifier
- Add row-level visual states (left-border color coding by status/priority)
- Change default sort to priority desc, then createdAt desc
- Add status filter options for Fixed/Ignored

**3. Redesign TaskDetailPanel (`src/components/hitl/TaskDetailPanel.tsx`)**
- Restructure into 5 sections per the PRD: Issue Summary, Problem Explanation, Required Action, External CTA, Resolution
- Replace Approve/Reject/Escalate buttons with "Mark as Fixed" and "Ignore Issue"
- Add confirmation modal for "Ignore Issue" requiring a mandatory comment
- Add "Open in Source Tool" button that opens `externalLink` in a new tab
- Track `firstViewedAt` on panel open

**4. Update HITLQueue page (`src/pages/HITLQueue.tsx`)**
- Update handler functions to support new resolution types ("fixed"/"ignored")
- Update metric cards to reflect new status terminology

**5. Update notification mock data (`src/lib/mockData.ts`)**
- Ensure new HITL task notifications include customer name, rule triggered, and priority context

All changes use existing UI components (Sheet, Badge, Button, Table, Dialog) and follow established patterns.

