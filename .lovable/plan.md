
# Change Persona Selector to Labeled Dropdown

## Overview
Replace the icon-only persona selector (UserCog icon) with a labeled dropdown button that shows the current persona name (e.g., "Admin", "Operation Manager", "HITL", "Customer").

## Current State
- Persona selector uses only a `UserCog` icon as the trigger
- No visual indication of which persona is currently active
- `AppHeader` receives only `searchPlaceholder` as a prop

---

## Technical Changes

### 1. Update AppHeader Component (src/components/layout/AppHeader.tsx)

**Add new prop for current persona:**
```typescript
interface AppHeaderProps {
  searchPlaceholder?: string;
  currentPersona?: "Admin" | "Operation Manager" | "HITL" | "Customer";
}
```

**Replace icon-only button with labeled dropdown trigger:**
```typescript
<DropdownMenuTrigger asChild>
  <Button variant="ghost" className="gap-2">
    <UserCog className="h-4 w-4" />
    <span>{currentPersona || "Admin"}</span>
    <ChevronDown className="h-4 w-4" />
  </Button>
</DropdownMenuTrigger>
```

### 2. Update All Layout Components

Pass the `currentPersona` prop to `AppHeader` in each layout:

| Layout | Persona Value |
|--------|---------------|
| `DashboardLayout.tsx` | `"Admin"` |
| `OpsLayout.tsx` | `"Operation Manager"` |
| `HITLLayout.tsx` | `"HITL"` |
| `CustomerLayout.tsx` | `"Customer"` |

---

## New Dropdown Appearance

```text
+----------------------------------+
| [UserCog] Admin [ChevronDown] ▼  |
+----------------------------------+
| Admin                            |
| Operation Manager                |
| HITL                             |
| Customer                         |
+----------------------------------+
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/layout/AppHeader.tsx` | Add `currentPersona` prop, add `ChevronDown` icon, update trigger to show label |
| `src/components/layout/DashboardLayout.tsx` | Pass `currentPersona="Admin"` |
| `src/components/layout/OpsLayout.tsx` | Pass `currentPersona="Operation Manager"` |
| `src/components/layout/HITLLayout.tsx` | Pass `currentPersona="HITL"` |
| `src/components/layout/CustomerLayout.tsx` | Pass `currentPersona="Customer"` |

---

## Result
Users will see which persona is currently active in the header and can click the labeled dropdown to switch between personas. This provides better UX than the current icon-only approach.
