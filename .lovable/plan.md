

# Move "Human vs AI" to Operations Section

Relocate the "Human vs AI" navigation item from the Overview section to the Operations section, positioning it below "AI Activity".

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Move "Human vs AI" from mainNavItems to operationsItems |

---

## Technical Details

### Current Structure

**Overview Section (mainNavItems)**
- Dashboard
- Jobs & Funnel
- Human vs AI ← Currently here

**Operations Section (operationsItems)**
- Human Activity
- AI Activity

### New Structure

**Overview Section (mainNavItems)**
- Dashboard
- Jobs & Funnel

**Operations Section (operationsItems)**
- Human Activity
- AI Activity
- Human vs AI ← Moved here

---

## Code Changes

**Remove from mainNavItems (lines 28-44)**
```typescript
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs & Funnel",
    url: "/funnel",
    icon: TrendingUp,
  },
  // "Human vs AI" removed from here
];
```

**Add to operationsItems (lines 46-57)**
```typescript
const operationsItems = [
  {
    title: "Human Activity",
    url: "/human-activity",
    icon: Users,
  },
  {
    title: "AI Activity",
    url: "/ai-performance",
    icon: Bot,
  },
  {
    title: "Human vs AI",    // Added here
    url: "/human-ai",
    icon: GitBranch,
  },
];
```

---

## Result

The sidebar will display:
- **Overview**: Dashboard, Jobs & Funnel
- **Operations**: Human Activity, AI Activity, Human vs AI
- **Business**: Revenue & Costs, Staffing Planner

This groups the comparative "Human vs AI" view logically with the individual activity dashboards under Operations.

