

# Fix Sidebar Header Left Padding

## Problem Identified
The `SidebarHeader` component in `src/components/ui/sidebar.tsx` has a **default `p-2` padding** built into its base styles:

```tsx
className={cn("flex flex-col gap-2 p-2", className)}
```

When we add `pl-[8px]` in the OpsSidebar, it should override the left padding. However, `p-2` applies padding on all sides (8px), and the `tailwind-merge` library should handle this. The issue is that `pl-[8px]` equals 8px which is the same as `p-2`, so there's no visible difference.

Looking at the screenshot, the extra spacing is likely coming from the **inner `div`** element that contains the logo:

```tsx
<SidebarHeader className="... pl-[8px] ...">
  <div className="flex items-center gap-3">  <!-- This div has no padding but... -->
```

The actual distance also includes any margin from the logo image itself.

---

## Solution
Override the default `p-2` on SidebarHeader with explicit `p-0` and then apply only the left padding we need:

### File: `src/components/layout/OpsSidebar.tsx`

Change line 68 from:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border pl-[8px] flex items-center justify-start">
```

To:
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border p-0 pl-[8px] flex items-center justify-start">
```

This will:
1. Reset all padding to 0 with `p-0`
2. Apply only 8px left padding with `pl-[8px]`
3. Remove default top, right, and bottom padding that might affect alignment

### File: `src/components/layout/AppSidebar.tsx`

Apply the same fix for consistency across all sidebars.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/layout/OpsSidebar.tsx` | Add `p-0` before `pl-[8px]` on SidebarHeader |
| `src/components/layout/AppSidebar.tsx` | Add `p-0` before `pl-[8px]` on SidebarHeader |

---

## Technical Note
The `cn()` function uses `tailwind-merge` which properly handles conflicting Tailwind classes. By adding `p-0` first, we explicitly reset the base padding, then `pl-[8px]` sets only the left padding to exactly 8 pixels.

