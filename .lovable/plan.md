

# Remove HITL Queue from Home Page Sidebar

This plan removes the "HITL Queue" navigation item from the Admin sidebar on the home page.

---

## Overview

The HITL Queue is accessible via the dedicated HITL persona (through the "Change Persona" dropdown), so it doesn't need to appear in the main Admin sidebar navigation.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Remove HITL Queue from operationsItems array |

---

## Specific Changes

### 1. Remove HITL Queue item from operationsItems array

**Before (lines 56-72):**
```tsx
const operationsItems = [
  {
    title: "Recruiter Dashboard",
    url: "/recruiters",
    icon: Users,
  },
  {
    title: "AI Performance",
    url: "/ai-performance",
    icon: Bot,
  },
  {
    title: "HITL Queue",
    url: "/hitl",
    icon: Zap,
  },
];
```

**After:**
```tsx
const operationsItems = [
  {
    title: "Recruiter Dashboard",
    url: "/recruiters",
    icon: Users,
  },
  {
    title: "AI Performance",
    url: "/ai-performance",
    icon: Bot,
  },
];
```

### 2. Remove unused Zap import

Remove `Zap` from the lucide-react imports since it's no longer used.

---

## Result

- The Operations section will show only "Recruiter Dashboard" and "AI Performance"
- HITL Queue remains accessible via the HITL persona dropdown in the header
- Clean, focused navigation for the Admin view

