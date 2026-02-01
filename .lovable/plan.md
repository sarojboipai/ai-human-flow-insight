

# Standardize Header and Increase Board Height

This plan adjusts the Pipeline Board Dialog to have a more compact header and maximize the board canvas area.

---

## Problem

Looking at the current implementation:
- The DialogHeader uses `px-6 py-4` padding, making it unnecessarily tall
- The dialog content structure doesn't properly use flexbox to maximize the board area
- The board area doesn't fill all available space below the header

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/PipelineBoardDialog.tsx` | Modify | Reduce header padding, add proper flex layout |

---

## Specific Changes

### 1. Dialog Content Structure

Change from:
```tsx
<DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] p-0 gap-0">
```

To:
```tsx
<DialogContent className="max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] p-0 gap-0 flex flex-col">
```

### 2. Compact Header

Change from:
```tsx
<DialogHeader className="px-6 py-4 border-b">
```

To:
```tsx
<DialogHeader className="px-4 py-2 border-b shrink-0">
```

Also reduce:
- Title font size from `text-lg` to `text-base`
- Job ID font size from `text-sm` to `text-xs`
- Legend text sizes remain compact

### 3. Board Container

Change from:
```tsx
<div className="flex-1 h-full">
```

To:
```tsx
<div className="flex-1 min-h-0">
```

The `min-h-0` is crucial for flexbox to allow the container to shrink and fill available space properly.

---

## Visual Comparison

| Element | Before | After |
|---------|--------|-------|
| Header padding | `py-4` (16px vertical) | `py-2` (8px vertical) |
| Title size | `text-lg` | `text-base` |
| Job ID size | `text-sm` | `text-xs` |
| Board area | Limited by header | Maximized with flexbox |
| Overall header height | ~80px | ~48px |

---

## Result

- Header will be approximately half its current height
- The React Flow canvas will fill all remaining space
- The diagram will be more centered and visible immediately on open

