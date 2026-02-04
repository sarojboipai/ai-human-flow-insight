
# Align Logo Box to the Left in Sidebar Headers

## Overview
Add explicit left alignment to the sidebar header content across all persona sidebars to ensure the logo box stays aligned to the left edge.

## Current State
- The `SidebarHeader` uses `flex items-center` which vertically centers content
- No explicit horizontal alignment is set, relying on flexbox default
- When the sidebar transitions or in certain states, the content may not appear flush left

---

## Technical Changes

### Update All Sidebar Components

Add `justify-start` to the `SidebarHeader` className in each sidebar file to explicitly enforce left alignment:

| File | Current Classes | Updated Classes |
|------|-----------------|-----------------|
| `HITLSidebar.tsx` | `h-16 border-b border-sidebar-border px-4 flex items-center` | `h-16 border-b border-sidebar-border px-4 flex items-center justify-start` |
| `AppSidebar.tsx` | `h-16 border-b border-sidebar-border px-4 flex items-center` | `h-16 border-b border-sidebar-border px-4 flex items-center justify-start` |
| `OpsSidebar.tsx` | `h-16 border-b border-sidebar-border px-4 flex items-center` | `h-16 border-b border-sidebar-border px-4 flex items-center justify-start` |
| `CustomerSidebar.tsx` | `h-16 border-b border-sidebar-border px-4 flex items-center` | `h-16 border-b border-sidebar-border px-4 flex items-center justify-start` |

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/layout/HITLSidebar.tsx` | Add `justify-start` to SidebarHeader className (line 49) |
| `src/components/layout/AppSidebar.tsx` | Add `justify-start` to SidebarHeader className (line 81) |
| `src/components/layout/OpsSidebar.tsx` | Add `justify-start` to SidebarHeader className (line 68) |
| `src/components/layout/CustomerSidebar.tsx` | Add `justify-start` to SidebarHeader className (line 44) |

---

## Result
The logo box in the sidebar header will be explicitly left-aligned across all personas (Admin, Ops, HITL, Customer), ensuring consistent positioning regardless of sidebar state.
