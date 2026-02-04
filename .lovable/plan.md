

## Update Sidebar Layout to Match Reference Design

### Overview
Adjust the sidebar styling to match the provided reference design, focusing on the header section, spacing, and active state styling.

### Visual Changes

| Element | Current | Target |
|---------|---------|--------|
| Logo size | 36px (h-9 w-9) | 48px (h-12 w-12) |
| Logo corner radius | rounded-lg (8px) | rounded-xl (12px) for softer look |
| Header height | h-16 (64px) | h-20 (80px) for more breathing room |
| Header bottom border | Yes | No (cleaner separation) |
| Gap between logo and text | gap-3 (12px) | gap-3 (keep same) |
| SHIP font size | text-lg | text-xl (slightly larger) |
| Section label spacing | Default | Add more top margin (mt-4) |
| Active menu item | Default accent | Brighter, more prominent highlight |

### Files to Update
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/OpsSidebar.tsx`
- `src/components/layout/HITLSidebar.tsx`
- `src/components/layout/CustomerSidebar.tsx`

### Technical Details

**Header Section Changes:**
```tsx
// Updated SidebarHeader - taller, no bottom border
<SidebarHeader className="h-20 px-4 flex items-center justify-start">
  <div className="flex items-center gap-3">
    <img 
      src={swaasaLogo} 
      alt="Swaasa Logo" 
      className="h-12 w-12 rounded-xl object-cover"  // Larger logo
    />
    {!collapsed && (
      <div className="flex flex-col">
        <span className="text-xl font-semibold tracking-tight text-sidebar-foreground">
          SHIP
        </span>
        <span className="text-xs text-muted-foreground">
          Hiring Intelligence
        </span>
      </div>
    )}
  </div>
</SidebarHeader>
```

**Section Label Changes:**
```tsx
// Add top margin to section labels for spacing after header
<SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
  Overview
</SidebarGroupLabel>
```

**Content Padding:**
```tsx
// Adjust SidebarContent padding
<SidebarContent className="px-3">
```

### Implementation Sequence
1. Update `AppSidebar.tsx` with all the styling changes
2. Apply the same changes to `OpsSidebar.tsx`, `HITLSidebar.tsx`, and `CustomerSidebar.tsx`

### Expected Result
- Larger, more prominent logo with softer corners
- More vertical breathing room in the header
- Cleaner look without the header border
- Better visual hierarchy matching the reference design

