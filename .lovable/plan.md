
# Fix Header Asset Positioning Consistency Across All Personas

This plan extracts the header into a shared component to ensure the notification bell, persona switcher, and profile icons are always positioned identically across Admin, Operation Manager, HITL, and Customer pages.

---

## Problem

The header (notification bell, persona changer, profile) is duplicated across 4 layout files:
- `DashboardLayout.tsx` (Admin)
- `OpsLayout.tsx` (Operation Manager)
- `HITLLayout.tsx` 
- `CustomerLayout.tsx`

While the code looks identical, having 4 copies means:
1. Risk of inconsistencies if one is modified without others
2. Harder to maintain
3. Potential for subtle differences in positioning

---

## Solution

Create a single `AppHeader` component that all layouts use, guaranteeing identical positioning across all personas.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppHeader.tsx` | Create | Shared header component with notification, persona, profile |
| `src/components/layout/DashboardLayout.tsx` | Modify | Replace inline header with AppHeader |
| `src/components/layout/OpsLayout.tsx` | Modify | Replace inline header with AppHeader |
| `src/components/layout/HITLLayout.tsx` | Modify | Replace inline header with AppHeader |
| `src/components/layout/CustomerLayout.tsx` | Modify | Replace inline header with AppHeader |

---

## Technical Details

### 1. AppHeader Component

A new shared component containing all header elements:

```tsx
interface AppHeaderProps {
  searchPlaceholder?: string;
}

export function AppHeader({ searchPlaceholder = "Search..." }: AppHeaderProps) {
  // Contains:
  // - SidebarTrigger (hamburger menu)
  // - Search input with customizable placeholder
  // - Notification bell with indicator dot
  // - Persona switcher (UserCog icon) dropdown
  // - Profile (User icon) dropdown
}
```

Features:
- Accepts `searchPlaceholder` prop to customize per persona
- Fixed header structure: `sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b px-6`
- All icons positioned with `flex items-center gap-2`
- Consistent sizing: `h-5 w-5` for all icons
- Consistent button styling: `variant="ghost" size="icon"`

### 2. Layout File Updates

Each layout file will be simplified:

**Before (duplicated in each file):**
```tsx
<header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
  <SidebarTrigger className="-ml-2" />
  {/* 50+ lines of header code */}
</header>
```

**After (in each file):**
```tsx
<AppHeader searchPlaceholder="Search candidates, employers, recruiters..." />
```

### 3. Search Placeholder Per Persona

| Persona | Search Placeholder |
|---------|-------------------|
| Admin | "Search candidates, employers, recruiters..." |
| Operation Manager | "Search workflows, agents, connectors..." |
| HITL | "Search tasks, candidates..." |
| Customer | "Search jobs, candidates..." |

---

## Result

- All 4 personas will have identical header positioning
- Single source of truth for header styling
- Easy to update header globally in one place
- Each persona can still customize the search placeholder
- Eliminates code duplication (removes ~200 lines of duplicated code)
