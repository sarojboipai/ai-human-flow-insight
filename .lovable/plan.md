

# Add Pagination to Rules Table

## Summary
Add pagination controls to the Rules table to display 10 rules per page, improving navigation and readability for large rule sets.

---

## Changes Overview

### Pagination Features
- Display 10 rules per page
- Show current page info (e.g., "Showing 1-10 of 25 rules")
- Previous/Next navigation buttons
- Page number indicators with ellipsis for many pages

---

## Visual Layout

```text
┌────────────────────────────────────────────────────────────────┐
│ [Search rules...]                          [Filter: All Types] │
├────────────────────────────────────────────────────────────────┤
│ Stage    │ Name      │ Type   │ Condition │ Action │ ...      │
├──────────┼───────────┼────────┼───────────┼────────┼──────────┤
│ Row 1    │ ...       │ ...    │ ...       │ ...    │ ...      │
│ Row 2    │ ...       │ ...    │ ...       │ ...    │ ...      │
│ ...      │ ...       │ ...    │ ...       │ ...    │ ...      │
│ Row 10   │ ...       │ ...    │ ...       │ ...    │ ...      │
├────────────────────────────────────────────────────────────────┤
│         Showing 1-10 of 25 rules                               │
│                                                                │
│              [← Previous]  1  2  3  [Next →]                   │
└────────────────────────────────────────────────────────────────┘
```

---

## File to Modify

### `src/components/hitl/RulesTable.tsx`

1. **Add pagination state**:
   - `currentPage` state starting at 1
   - `RULES_PER_PAGE` constant set to 10

2. **Add pagination calculation logic**:
   ```typescript
   const RULES_PER_PAGE = 10;
   const [currentPage, setCurrentPage] = useState(1);
   
   const totalPages = Math.ceil(filteredRules.length / RULES_PER_PAGE);
   const startIndex = (currentPage - 1) * RULES_PER_PAGE;
   const endIndex = startIndex + RULES_PER_PAGE;
   const paginatedRules = filteredRules.slice(startIndex, endIndex);
   ```

3. **Reset page when filters change**:
   - Reset `currentPage` to 1 when `searchQuery` or `filterType` changes

4. **Import pagination components**:
   ```typescript
   import {
     Pagination,
     PaginationContent,
     PaginationItem,
     PaginationLink,
     PaginationNext,
     PaginationPrevious,
     PaginationEllipsis,
   } from "@/components/ui/pagination";
   ```

5. **Update table body to use `paginatedRules`**:
   - Change `filteredRules.map(...)` to `paginatedRules.map(...)`

6. **Add pagination UI below the table**:
   ```tsx
   {/* Pagination */}
   {filteredRules.length > RULES_PER_PAGE && (
     <div className="flex items-center justify-between pt-4">
       <p className="text-sm text-muted-foreground">
         Showing {startIndex + 1}-{Math.min(endIndex, filteredRules.length)} of {filteredRules.length} rules
       </p>
       <Pagination>
         <PaginationContent>
           <PaginationItem>
             <PaginationPrevious 
               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
               className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
             />
           </PaginationItem>
           {/* Page numbers */}
           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
             <PaginationItem key={page}>
               <PaginationLink
                 onClick={() => setCurrentPage(page)}
                 isActive={currentPage === page}
                 className="cursor-pointer"
               >
                 {page}
               </PaginationLink>
             </PaginationItem>
           ))}
           <PaginationItem>
             <PaginationNext
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
             />
           </PaginationItem>
         </PaginationContent>
       </Pagination>
     </div>
   )}
   ```

---

## Technical Details

### Pagination Logic
- **Page calculation**: `totalPages = Math.ceil(filteredRules.length / 10)`
- **Slice bounds**: `startIndex = (currentPage - 1) * 10`, `endIndex = startIndex + 10`
- **Reset on filter**: When search or type filter changes, reset to page 1

### Edge Cases Handled
- Hide pagination when total rules ≤ 10
- Disable Previous button on first page
- Disable Next button on last page
- Reset to page 1 when filters narrow results

### Using Existing UI Components
The project already has pagination components in `src/components/ui/pagination.tsx` that will be used.

