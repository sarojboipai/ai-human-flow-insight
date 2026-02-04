
# Align Sidebar Header with Navigation Items

## Overview
Adjust the sidebar header padding to align the logo/brand section with the navigation items below (Dashboard, Pipeline Config, etc.).

## Problem
The header uses `px-4` (16px padding) while the content area uses `px-2` (8px padding), causing the logo to appear more indented than the navigation menu items.

## Solution
Change the `SidebarHeader` padding from `px-4` to `px-2` across all sidebar components to match the `SidebarContent` padding.

---

## Technical Changes

### Update All Sidebar Components

| File | Change |
|------|--------|
| `OpsSidebar.tsx` | Line 68: Change `px-4` to `px-2` |
| `AppSidebar.tsx` | Line 81: Change `px-4` to `px-2` |
| `HITLSidebar.tsx` | Line 49: Change `px-4` to `px-2` |
| `CustomerSidebar.tsx` | Line 44: Change `px-4` to `px-2` |

### Code Change
```tsx
// Before:
<SidebarHeader className="h-16 border-b border-sidebar-border px-4 flex items-center justify-start">

// After:
<SidebarHeader className="h-16 border-b border-sidebar-border px-2 flex items-center justify-start">
```

---

## Result
The logo and brand text in the sidebar header will align horizontally with the navigation items below, creating a cleaner, more consistent left edge throughout the sidebar.
