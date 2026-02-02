

# Align Sidebar Header Logo to the Left

Ensure the SHIP logo and branding text in the sidebar header is explicitly left-aligned across all persona views.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Add `justify-start` to SidebarHeader className |
| `src/components/layout/CustomerSidebar.tsx` | Modify | Add `justify-start` to SidebarHeader className |
| `src/components/layout/OpsSidebar.tsx` | Modify | Add `justify-start` to SidebarHeader className |
| `src/components/layout/HITLSidebar.tsx` | Modify | Add `justify-start` to SidebarHeader className |

---

## Technical Details

### Current State
All four sidebars have:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border px-4 flex items-center">
```

### Updated State
Add `justify-start` for explicit left alignment:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border px-4 flex items-center justify-start">
```

### Files to Update

1. **AppSidebar.tsx** (Admin view) - Line 81
2. **CustomerSidebar.tsx** (Customer view) - Line 44
3. **OpsSidebar.tsx** (Ops Manager view) - Line 62
4. **HITLSidebar.tsx** (HITL view) - Line 49

---

## Result

The sidebar header containing the logo and "SHIP / Hiring Intelligence" text will be explicitly aligned to the left edge across all four persona views (Admin, Customer, Ops, HITL).

