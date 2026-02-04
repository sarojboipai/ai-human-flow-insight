

# Replace Filter Buttons with Filter Dropdown

## Summary
Replace the current row of individual filter buttons (All, Confidence, Business, Anomaly, etc.) with a single "Filter" button that opens a dropdown menu to select the rule type filter.

---

## Current State
The Rules table currently displays 11 individual buttons horizontally for filtering by rule type:
- All, Confidence, Business, Anomaly, SLA, Posting, Sourcing, Outreach, Interview, Application, Screening

This takes up significant horizontal space and wraps on smaller screens.

---

## Proposed Change
Replace with a single filter button that:
- Shows a filter icon with the current filter label (e.g., "All Types" or the selected type)
- Opens a dropdown menu when clicked
- Lists all filter options with the selected one highlighted
- Shows a badge indicator when a filter other than "All" is active

---

## Visual Layout

```text
Before:
┌─────────────────────┐ ┌─────┐┌────────────┐┌──────────┐┌─────────┐...
│ 🔍 Search rules...  │ │ All ││ Confidence ││ Business ││ Anomaly │...
└─────────────────────┘ └─────┘└────────────┘└──────────┘└─────────┘...

After:
┌─────────────────────┐ ┌────────────────────┐
│ 🔍 Search rules...  │ │ 🔽 Filter: All     │
└─────────────────────┘ └────────────────────┘
                              ↓ (on click)
                        ┌──────────────────┐
                        │ ✓ All Types      │
                        │   Confidence     │
                        │   Business       │
                        │   Anomaly        │
                        │   SLA            │
                        │   Posting        │
                        │   Sourcing       │
                        │   Outreach       │
                        │   Interview      │
                        │   Application    │
                        │   Screening      │
                        └──────────────────┘
```

---

## File to Modify

### `src/components/hitl/RulesTable.tsx`
- Import `Filter` icon from lucide-react
- Import `DropdownMenu` components (already imported)
- Replace the filter buttons section (lines 128-142) with a DropdownMenu
- Add a badge/indicator when a specific filter is active

---

## Technical Details

### Filter Button Implementation
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="gap-2">
      <Filter className="h-4 w-4" />
      {filterType === "all" ? "All Types" : filterType}
      {filterType !== "all" && (
        <Badge variant="secondary" className="ml-1 h-5 w-5 p-0">1</Badge>
      )}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    {filterOptions.map((type) => (
      <DropdownMenuItem
        key={type}
        onClick={() => setFilterType(type)}
        className={filterType === type ? "bg-accent" : ""}
      >
        {type === "all" ? "All Types" : type}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Expected Outcome
- Cleaner, more compact filter UI
- Single dropdown button replaces 11 individual buttons
- Visual indicator shows when a filter is active
- Better responsive behavior on smaller screens

