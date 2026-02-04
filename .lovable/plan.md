
## Goal
Make the sidebar header (logo + “Operations / Control Center”, etc.) line up vertically with the left edge of the navigation items (e.g., “Dashboard”, “Pipeline Config”).

## Why it’s still not aligning
Even though we changed `SidebarHeader` to `px-2`, the nav items are still more indented because they sit inside:

- `SidebarContent className="px-2"` (8px)
- `SidebarGroup` has `p-2` (8px)
- `SidebarMenuButton` has `p-2` (8px)

So the nav item icon/text effectively starts at ~24px from the sidebar edge, while the header content starts at ~8px (only `SidebarHeader`’s base `p-2`).

That’s why the header still looks “too far left” compared to “Dashboard / Pipeline Config”.

## Implementation approach
Adjust the sidebar header horizontal padding to match the nav item start position.

### What we’ll change
In each sidebar component, change the `SidebarHeader` horizontal padding to `px-6` (24px).  
This matches the combined indentation created by `SidebarContent px-2` + `SidebarGroup p-2` + `SidebarMenuButton p-2`.

### Files to update
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/OpsSidebar.tsx`
- `src/components/layout/HITLSidebar.tsx`
- `src/components/layout/CustomerSidebar.tsx`

### Concrete code change
Replace:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border px-2 flex items-center justify-start">
```

With:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border px-6 flex items-center justify-start">
```

## Visual result expected
- The left edge of the logo block aligns with the left edge of the “Dashboard / Pipeline Config” content.
- Works consistently across all personas (Admin, Ops, HITL, Customer).
- No layout changes to the rest of the sidebar; this is strictly a padding alignment fix.

## Quick verification checklist (after implementation)
1. Go to `/ops` and confirm the “Operations” header aligns with “Dashboard”.
2. Check the expanded and collapsed sidebar states.
3. Repeat quickly for Admin (`/`), HITL (`/hitl`), Customer (`/customer`) to confirm consistent alignment.
