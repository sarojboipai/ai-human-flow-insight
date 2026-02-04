

# Adjust Sidebar Header Left Padding

## Summary
Set the left padding between the logo and the sidebar edge to exactly 8 pixels.

---

## Current State
The `SidebarHeader` uses `px-2` which applies 8px (0.5rem) padding on both left and right sides. This should already be correct, but to ensure precise 8px spacing, we'll use explicit pixel values.

---

## Change Required

### File: `src/components/orchestration/OpsSidebar.tsx`

Update the `SidebarHeader` className from `px-2` to `pl-2 pr-2` or use inline style for exact pixel control:

**Option A - Using Tailwind (8px = 0.5rem = px-2)**
```tsx
// Line 68 - Current
<SidebarHeader className="h-16 border-b border-sidebar-border px-2 flex items-center justify-start">

// Already correct at 8px, but if need explicit control, use:
<SidebarHeader className="h-16 border-b border-sidebar-border pl-2 flex items-center justify-start">
```

**Option B - Using custom pixel value via Tailwind's arbitrary value**
```tsx
<SidebarHeader className="h-16 border-b border-sidebar-border pl-[8px] flex items-center justify-start">
```

Since `px-2` in Tailwind equals exactly 8px (0.5rem), the current code should work. If spacing appears different, it may be due to the inner `div` or browser rendering. We'll use `pl-[8px]` for absolute precision.

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/layout/OpsSidebar.tsx` | Change `px-2` to `pl-[8px]` on SidebarHeader to ensure exactly 8px left margin for the logo |

