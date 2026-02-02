

# Align Sidebar and App Header Heights

Ensure the sidebar header section and the main app header are aligned at the same height (h-16 / 64px) across all pages.

---

## Current Issue

| Component | Current Height | Notes |
|-----------|----------------|-------|
| AppHeader | `h-16` (64px) | Fixed height |
| SidebarHeader | Variable | Uses `p-4` padding, height depends on content |

The sidebar header and app header are misaligned because they use different height strategies.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Set SidebarHeader to `h-16` with centered content |
| `src/components/layout/CustomerSidebar.tsx` | Modify | Set SidebarHeader to `h-16` with centered content |
| `src/components/layout/OpsSidebar.tsx` | Modify | Set SidebarHeader to `h-16` with centered content |
| `src/components/layout/HITLSidebar.tsx` | Modify | Set SidebarHeader to `h-16` with centered content |

---

## Technical Details

### All Sidebar Headers

Change the SidebarHeader from:
```tsx
<SidebarHeader className="border-b border-sidebar-border p-4">
```

To:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border px-4 flex items-center">
```

This ensures:
- Fixed height of `h-16` (64px) matching the AppHeader
- Horizontal padding `px-4` for consistent spacing
- Flexbox with `items-center` to vertically center the logo and text

---

## Result

Both the sidebar header and the main app header will have identical heights (64px), creating perfect horizontal alignment across the top of the application for all personas.

