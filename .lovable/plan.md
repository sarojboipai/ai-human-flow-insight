
# Fix HITL Page Responsiveness Issue

The HITL Queue page content is being clipped on the right side because the layout lacks proper width constraints to handle wide content like the tasks table.

---

## Problem Analysis

Looking at the screenshot, multiple elements are being cut off:
1. The "Completed Today" metric card is partially hidden
2. The table's rightmost columns are clipped
3. Content extends beyond the visible viewport

The root cause is that in flexbox layouts, child elements with `flex-1` don't automatically constrain their children's width. Without `min-w-0` or `overflow-hidden`, the content can push beyond the container boundaries.

---

## Solution

Add proper overflow handling to the layouts and table components to ensure content stays within bounds while remaining scrollable when needed.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/HITLLayout.tsx` | Modify | Add `overflow-hidden` and `min-w-0` to SidebarInset and main |
| `src/components/layout/DashboardLayout.tsx` | Modify | Same fix for consistency |
| `src/components/layout/OpsLayout.tsx` | Modify | Same fix for consistency |
| `src/components/layout/CustomerLayout.tsx` | Modify | Same fix for consistency |
| `src/components/hitl/TasksQueue.tsx` | Modify | Add `overflow-x-auto` wrapper to ensure table scrolls horizontally |

---

## Technical Details

### 1. Layout Files (All 4 layouts)

Update the `SidebarInset` and `main` elements to properly constrain content:

**Current:**
```tsx
<SidebarInset className="flex-1">
  <AppHeader ... />
  <main className="flex-1 p-6">
    {children}
  </main>
</SidebarInset>
```

**Updated:**
```tsx
<SidebarInset className="flex-1 overflow-hidden">
  <AppHeader ... />
  <main className="flex-1 p-6 overflow-auto">
    {children}
  </main>
</SidebarInset>
```

Key changes:
- `overflow-hidden` on `SidebarInset`: Prevents content from expanding beyond its bounds
- `overflow-auto` on `main`: Allows the main content area to scroll when content exceeds available space

### 2. TasksQueue Component

Wrap the table in a proper scrollable container:

**Current:**
```tsx
<div className="rounded-lg border border-border">
  <Table>
    ...
  </Table>
</div>
```

**Updated:**
```tsx
<div className="rounded-lg border border-border overflow-x-auto">
  <Table>
    ...
  </Table>
</div>
```

This ensures the table scrolls horizontally on smaller screens rather than clipping.

---

## Why This Works

1. **`overflow-hidden` on SidebarInset**: This creates a new formatting context that prevents child content from overflowing the flex container
2. **`overflow-auto` on main**: Enables scrolling within the main content area when content exceeds bounds
3. **`overflow-x-auto` on table container**: Specifically allows horizontal scrolling for wide tables

---

## Result

- All 4 persona layouts will handle overflow consistently
- Tables with many columns will scroll horizontally instead of being clipped
- Metric cards and other wide content will remain visible within the viewport
- The page will be responsive across different screen sizes
