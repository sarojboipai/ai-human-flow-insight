
# Add 10 Rows and Pagination to Job Pipeline Health Table

## Overview
Expand the Job Pipeline Health table on the Job Explorer tab to display 10 rows of data with pagination controls for navigating through results.

## Current State
- The `jobs` array in `mockData.ts` contains 6 jobs (JOB-001 to JOB-006)
- The `JobPipelineHealthTable` component displays all rows without pagination
- No page state or pagination controls exist

---

## Technical Changes

### 1. Expand Mock Data (src/lib/mockData.ts)

Add 4 additional jobs (JOB-007 through JOB-010) to reach 10 total rows:

| Job ID | Title | Customer | Stage | AI % | SLA Risk |
|--------|-------|----------|-------|------|----------|
| JOB-007 | Radiologist | Apollo Hospitals | Human Review | 55% | At Risk |
| JOB-008 | Staff Nurse | Fortis Healthcare | AI Match Generated | 80% | On Track |
| JOB-009 | Anesthesiologist | Max Healthcare | Interview Scheduled | 62% | On Track |
| JOB-010 | Medical Officer | Narayana Health | Offer Extended | 70% | SLA Breach |

Each new job will include:
- Full funnel stages with AI/Human split
- HITL events where applicable
- Varied SLA risk states for realistic data

### 2. Add Pagination to Table Component (src/components/dashboard/JobPipelineHealthTable.tsx)

**New imports:**
```typescript
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
```

**Add state and pagination logic:**
```typescript
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const totalPages = Math.ceil(data.length / itemsPerPage);
const paginatedData = data.slice(
  (currentPage - 1) * itemsPerPage, 
  currentPage * itemsPerPage
);
```

**Add pagination controls below table:**
- Previous/Next buttons
- Page number indicators
- "Showing X-Y of Z jobs" text

---

## Updated Component Structure

```text
+------------------------------------------+
| Job Pipeline Health                       |
+------------------------------------------+
| Table with 5 rows per page                |
| - Job ID, Title, Customer, Stage, etc.   |
+------------------------------------------+
| Showing 1-5 of 10 jobs                   |
| [Previous] [1] [2] [Next]                |
+------------------------------------------+
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Add 4 new jobs (JOB-007 to JOB-010) |
| `src/components/dashboard/JobPipelineHealthTable.tsx` | Add pagination state, logic, and UI controls |

---

## Result
The Job Pipeline Health table will display 10 jobs with 5 rows per page, and users can navigate between pages using Previous/Next buttons and page number links. Row click functionality to open the job workflow dialog will continue to work correctly.
