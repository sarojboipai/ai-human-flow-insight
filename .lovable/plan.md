
# Redesign AutomationTab to Match Reference Design

## Summary
Redesign the AutomationTab component to match the reference "Automation Center" UI - a clean, full-width table layout with a filter bar, sub-tabs, and pagination instead of the current 3-panel layout.

---

## Current State vs Target State

### Current Layout
```text
+------------+-------------------------+------------+
| Agent List | Stage Automation Table  | Connectors |
| (240px)    |                         | (280px)    |
+------------+-------------------------+------------+
```

### Target Layout (from reference)
```text
+----------------------------------------------------------+
|  Automation center               [Create New Automation] |
+----------------------------------------------------------+
|  [Automations] [Audit History] [Analytics]               |
+----------------------------------------------------------+
|  Search | Last run | Triggers | Actions | Created | Type |
+----------------------------------------------------------+
|  Automation name | Type | Last Run | Triggered | Created |
|  --------------------------------------------------------|
|  Psychologist...  Custom  Feb 5...    152      Prateek   |
|  Psychiatrist...  Custom  Feb 3...    14       Prateek   |
+----------------------------------------------------------+
|                    < 1 2 3 4 >                            |
+----------------------------------------------------------+
```

---

## New Data Model

### AutomationEntry Interface
```typescript
interface AutomationEntry {
  id: string;
  name: string;
  type: "custom" | "system" | "template";
  triggerType: string;         // e.g., "stage_entered", "candidate_matched"
  actionType: string;          // e.g., "send_notification", "update_ats"
  lastRun: string | null;      // Date string or null for N/A
  triggeredCount: number;
  createdBy: string;
  createdAt: string;
  active: boolean;
}
```

---

## Component Structure

### Main Layout
1. **Header Section**
   - Title: "Automation center" (or contextual title in template builder)
   - "Create New Automation" button (primary, top-right)

2. **Sub-tabs** (optional for template builder context)
   - Automations (active)
   - Audit History
   - Analytics

3. **Filter Bar**
   - Search input with search icon
   - Last run date picker
   - All Triggers dropdown
   - All Actions dropdown
   - Created by All dropdown
   - Active & Inactive dropdown
   - All Types dropdown
   - "Clear" link to reset filters

4. **Table**
   | Column | Width | Description |
   |--------|-------|-------------|
   | Automation name | flex | Name of the automation |
   | Type | 100px | Custom / System / Template badge |
   | Last Run | 200px | Formatted date or "N/A" |
   | Triggered | 100px | Trigger count number |
   | Created by | 150px | User name |
   | Active | 80px | Toggle switch |

5. **Pagination**
   - Page numbers with prev/next arrows
   - 10 items per page

---

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/orchestration/AutomationTab.tsx` | **Rewrite** | Replace 3-panel layout with full-width table |
| `src/lib/mockData.ts` | **Modify** | Add `automationEntries` mock data array |

---

## Implementation Details

### 1. Remove 3-Panel Layout
- Remove left sidebar (Agent Registry)
- Remove right sidebar (Connectors)
- Use full-width layout

### 2. Add Filter Bar
```text
+--------------------------------------------------------------+
| [Search for automation] | [Last run] | [Triggers ▼] | ...    |
+--------------------------------------------------------------+
```
- Search: Text input with magnifying glass icon
- Last run date: Date picker or dropdown
- Filters: Select dropdowns for Triggers, Actions, Created by, Status, Types
- Clear: Text link to reset all filters

### 3. Table Redesign
- Clean table with minimal styling (no card wrapper)
- Hover states on rows
- Type column shows badge: "Custom" in muted style
- Last Run shows formatted date with timezone or "N/A"
- Triggered shows numeric count
- Created by shows user name
- Active shows toggle Switch

### 4. Add Pagination
- Use existing Pagination components
- Show page numbers 1, 2, 3, 4 with chevron arrows
- 10 items per page

### 5. Filter State Management
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [triggerFilter, setTriggerFilter] = useState<string>("all");
const [actionFilter, setActionFilter] = useState<string>("all");
const [createdByFilter, setCreatedByFilter] = useState<string>("all");
const [statusFilter, setStatusFilter] = useState<string>("all"); // active, inactive, all
const [typeFilter, setTypeFilter] = useState<string>("all");
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 10;
```

---

## Mock Data Structure

Add to `mockData.ts`:
```typescript
export interface AutomationEntry {
  id: string;
  name: string;
  type: "custom" | "system" | "template";
  triggerType: string;
  actionType: string;
  lastRun: string | null;
  triggeredCount: number;
  createdBy: string;
  createdAt: string;
  active: boolean;
}

export const automationEntries: AutomationEntry[] = [
  {
    id: "auto-001",
    name: "Psychologist_automation",
    type: "custom",
    triggerType: "stage_entered",
    actionType: "send_notification",
    lastRun: "Feb 5, 2026, 1:56 PM GMT+5:30",
    triggeredCount: 152,
    createdBy: "Prateek Saini",
    createdAt: "2026-01-15",
    active: true,
  },
  // ... more entries
];
```

---

## Visual Styling

### Colors & Typography
- Header: Bold text, 18-20px
- Table headers: Muted foreground, 14px, medium weight
- Table cells: Normal text, 14px
- Type badges: Subtle outline style
- Toggle: Standard Switch component

### Spacing
- Filter bar: Gap-2 between filters
- Table: Standard table padding
- Pagination: Centered at bottom with margin-top

---

## Props Interface Update

The `AutomationTab` component will continue to receive the same props but will display data differently:

```typescript
interface AutomationTabProps {
  nodes: Node<StageNodeData>[];
  stageAutomations: StageAutomation[];
  onAutomationsChange: (automations: StageAutomation[]) => void;
  onDirtyChange: () => void;
}
```

For the redesigned UI, we'll also show automations from `automationEntries` mock data, filtered by the current template context.

---

## Technical Notes

1. **Reuse existing components**: Use existing `Table`, `Select`, `Switch`, `Input`, and `Pagination` components

2. **Filter logic**: Implement client-side filtering with useMemo for performance

3. **Pagination logic**: Calculate total pages and slice data accordingly

4. **Empty state**: Show message when no automations match filters

5. **Create button**: Opens dialog or navigates to create automation flow (can be a placeholder for now)
