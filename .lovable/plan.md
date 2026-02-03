
# Fix Back to Dashboard Button on Ops Job Detail Page

## Problem
The "Back to Dashboard" link on the Ops Job Detail page is not working. The link is rendered as an inline-flex element that may not be properly registering clicks.

## Solution
Convert the text-based `Link` to a proper `Button` component for better clickability and visual consistency. This matches the pattern used in the "job not found" fallback state on the same page.

---

## Technical Changes

**File:** `src/pages/OpsJobDetail.tsx`

**Current (lines 59-62):**
```tsx
<Link to="/ops" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
  <ArrowLeft className="h-4 w-4 mr-1" />
  Back to Dashboard
</Link>
```

**Updated:**
```tsx
<Link to="/ops" className="block mb-4">
  <Button variant="ghost" size="sm" className="gap-1 -ml-2">
    <ArrowLeft className="h-4 w-4" />
    Back to Dashboard
  </Button>
</Link>
```

---

## Why This Works

| Issue | Solution |
|-------|----------|
| Inline-flex may have click targeting issues | Wrap in block-level container |
| Small text is hard to click | Use Button component with proper padding and hit area |
| Inconsistent with fallback state | Matches the Button pattern already used when job is not found |

---

## Result
The back button will be a proper clickable Button component that navigates to `/ops` (the Ops Dashboard) when clicked.
