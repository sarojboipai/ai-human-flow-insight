
# Rename Sidebar Items on Admin Page

A simple rename of two navigation items in the Admin sidebar.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Rename sidebar menu items |

---

## Technical Details

### Changes to AppSidebar.tsx

Update the `operationsItems` array (lines 46-57):

| Current Name | New Name |
|--------------|----------|
| Recruiter Dashboard | Human Activity |
| AI Performance | AI Activity |

```tsx
// Before
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

// After
const operationsItems = [
  {
    title: "Human Activity",
    url: "/recruiters",
    icon: Users,
  },
  {
    title: "AI Activity",
    url: "/ai-performance",
    icon: Bot,
  },
];
```

---

## Result

The Admin sidebar under the "Operations" section will display:
- **Human Activity** (instead of "Recruiter Dashboard")
- **AI Activity** (instead of "AI Performance")

The URLs and icons remain unchanged.
