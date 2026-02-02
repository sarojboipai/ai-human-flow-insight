
# Remove Orchestration Section from Admin Sidebar

This plan removes the "ORCHESTRATION" section from the Admin page sidebar, since the Orchestration Engine is now accessible through the dedicated Operation Manager persona.

---

## Overview

The Orchestration Engine functionality has been moved to the Operation Manager persona (`/ops/orchestration`), so it no longer needs to appear in the Admin sidebar.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Remove orchestrationItems array and its SidebarGroup |

---

## Specific Changes

### 1. Remove orchestrationItems array (lines 47-53)

Delete:
```tsx
const orchestrationItems = [
  {
    title: "Orchestration Engine",
    url: "/orchestration",
    icon: Network,
  },
];
```

### 2. Remove Orchestration SidebarGroup (lines 133-155)

Delete the entire SidebarGroup that renders the orchestration navigation.

### 3. Remove unused Network import

Remove `Network` from the lucide-react imports since it's no longer used.

---

## Result

- Admin sidebar will show only: Overview, Operations, and Business sections
- Orchestration Engine remains accessible via Operation Manager persona (`/ops/orchestration`)
- Cleaner separation of Admin and Operation Manager responsibilities
