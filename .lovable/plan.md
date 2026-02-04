

## Adjust Sidebar Header Padding to 8px

### Overview
Change the sidebar header left padding so the logo starts 8px from the sidebar edge instead of the current 24px.

### Technical Change
Update `SidebarHeader` padding from `px-6` to `px-2` across all sidebar components.

| File | Change |
|------|--------|
| `src/components/layout/AppSidebar.tsx` | `px-6` → `px-2` |
| `src/components/layout/OpsSidebar.tsx` | `px-6` → `px-2` |
| `src/components/layout/HITLSidebar.tsx` | `px-6` → `px-2` |
| `src/components/layout/CustomerSidebar.tsx` | `px-6` → `px-2` |

### Code Change
```tsx
// Before
<SidebarHeader className="h-16 border-b border-sidebar-border px-6 flex items-center justify-start">

// After
<SidebarHeader className="h-16 border-b border-sidebar-border px-2 flex items-center justify-start">
```

### Result
The logo will start 8px from the left edge of the sidebar. Note that the navigation items below (Dashboard, etc.) will appear more indented than the logo since they have additional nested padding.

