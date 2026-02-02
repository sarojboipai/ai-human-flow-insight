
# Make Header Position Consistent Across All Personas

This plan creates a shared `CustomerLayout` component and refactors Customer pages to use it, ensuring all 4 personas have consistent header behavior.

---

## Problem Identified

The header with notification, persona switcher, and profile icons is implemented differently:

| Persona | Implementation | Issue |
|---------|----------------|-------|
| Admin | `DashboardLayout.tsx` | Uses shared layout component |
| Operation Manager | `OpsLayout.tsx` | Uses shared layout component |
| HITL | `HITLLayout.tsx` | Uses shared layout component |
| Customer | Inline in each page | Header duplicated in `CustomerDashboard.tsx` and `CustomerBusiness.tsx` |

The Customer pages have the header code copied inline rather than using a shared layout, which can lead to inconsistencies if one is modified without the other.

---

## Solution

Create a `CustomerLayout.tsx` component following the same pattern as the other layouts, then refactor Customer pages to use it.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/CustomerLayout.tsx` | Create | Shared layout with header for Customer pages |
| `src/pages/CustomerDashboard.tsx` | Modify | Use CustomerLayout instead of inline header |
| `src/pages/CustomerBusiness.tsx` | Modify | Use CustomerLayout instead of inline header |

---

## Technical Details

### 1. CustomerLayout Component

Create a new layout component that:
- Uses `CustomerSidebar`
- Has the standard header structure (identical to other layouts)
- Search placeholder: "Search jobs, candidates..."
- Wraps children in main content area

```tsx
// Structure matches OpsLayout and HITLLayout exactly
<SidebarProvider>
  <div className="min-h-screen flex w-full">
    <CustomerSidebar />
    <SidebarInset className="flex-1">
      <header>
        <!-- SidebarTrigger, Search, Bell, UserCog, User dropdowns -->
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </SidebarInset>
  </div>
</SidebarProvider>
```

### 2. CustomerDashboard Refactor

Remove:
- All imports related to header (Bell, Search, User, UserCog, DropdownMenu, etc.)
- SidebarProvider wrapper
- Header JSX block
- SidebarInset wrapper

Keep:
- Page-specific content (metrics cards, CustomerJobsTable)
- Title/subtitle section

Result:
```tsx
import { CustomerLayout } from "@/components/layout/CustomerLayout";

export default function CustomerDashboard() {
  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1>Customer Dashboard</h1>
        <p>Welcome to your customer portal</p>
      </div>
      {/* Metrics and table content */}
    </CustomerLayout>
  );
}
```

### 3. CustomerBusiness Refactor

Same approach - remove header code, wrap content in CustomerLayout.

---

## Result

- All 4 personas now use a consistent layout pattern
- Headers are identical across all personas (same height, spacing, positioning)
- Future header changes only need to be made in one place per persona
- Cleaner, more maintainable code structure
