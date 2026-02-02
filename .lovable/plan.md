
# Create CustomerJobFunnelTable - Customer-Specific Jobs Pipeline

This plan creates a new `CustomerJobFunnelTable` component tailored for the Customer persona, based on the Admin's `JobFunnelTable` but without internal metrics.

---

## Columns Comparison

| Column | Admin (JobFunnelTable) | Customer (CustomerJobFunnelTable) | Reason |
|--------|------------------------|-----------------------------------|--------|
| Job ID | Yes | Yes | Useful for reference |
| Title | Yes | Yes | Core info |
| Employer | Yes | **No** | Customer IS the employer |
| Role Type | Yes | Yes | Core info |
| Current Stage | Yes | Yes | Core info |
| Candidates | Yes | Yes | Core info |
| AI % | Yes | **No** | Internal metric |
| Days Open | Yes | Yes | Useful for customer |
| Revenue | Yes | **No** | Internal metric |
| Status | Yes | Yes | Core info |

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/CustomerJobFunnelTable.tsx` | Create | New customer-specific table without Employer, AI %, Revenue columns |
| `src/pages/CustomerDashboard.tsx` | Modify | Replace `CustomerJobsTable` with `CustomerJobFunnelTable` |

---

## Technical Details

### 1. CustomerJobFunnelTable Component

A new component based on `JobFunnelTable` with these differences:

- **Removed columns**: Employer, AI %, Revenue
- **Click behavior**: Row click navigates to Job Detail page (`/jobs/:id`) - same as Admin
- **Search**: Searches by job title and ID only (no employer search needed)

```tsx
// Columns shown:
// Job ID | Title | Role Type | Current Stage | Candidates | Days Open | Status

<TableRow
  key={job.id}
  className="cursor-pointer hover:bg-muted/50"
  onClick={() => navigate(`/jobs/${job.id}`)}
>
  <TableCell>{job.id}</TableCell>
  <TableCell>{job.title}</TableCell>
  <TableCell>{job.roleType}</TableCell>
  <TableCell><Badge>{currentStage(job)}</Badge></TableCell>
  <TableCell>{totalCandidates(job)}</TableCell>
  <TableCell>{job.daysOpen}</TableCell>
  <TableCell>{getStatusBadge(job.status)}</TableCell>
</TableRow>
```

### 2. CustomerDashboard Update

Replace the import and usage:

```tsx
// Before
import { CustomerJobsTable } from "@/components/customer/CustomerJobsTable";
<CustomerJobsTable />

// After
import { CustomerJobFunnelTable } from "@/components/customer/CustomerJobFunnelTable";
import { jobs } from "@/lib/mockData";
<CustomerJobFunnelTable jobs={jobs} />
```

---

## Behavior Changes

| Feature | Before (CustomerJobsTable) | After (CustomerJobFunnelTable) |
|---------|---------------------------|--------------------------------|
| Row click | No action | Navigates to Job Detail |
| View Pipeline button | Opens dialog | Removed (row click instead) |
| Columns | 7 columns | 7 columns (different set) |

---

## Result

- Customer sees a clean table without internal business metrics
- Consistent navigation pattern with row-click to Job Detail
- No redundant "Employer" column since customer IS the employer
- Hides AI % and Revenue which are internal operational metrics
