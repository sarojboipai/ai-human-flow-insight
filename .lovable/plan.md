

## Sort Job Pipeline by Job Title (A-Z)

The Job Pipeline Health table on the `/funnel` page currently displays jobs in the order they come from the database, with JOB-017 pinned to the top. This change will sort all jobs alphabetically by job title in ascending order.

### What will change

The table will display jobs sorted A to Z by their title (e.g., "Anaesthesia Technician" before "Staff Nurse" before "Ward Boy").

### Technical Details

**File: `src/lib/jobPipelineHealthUtils.ts`**
- After mapping jobs to pipeline health rows (and applying the JOB-017 pin logic), add a `.sort()` call on the `mapped` array to sort by `jobTitle` in ascending (A-Z) order using `localeCompare`.
- The JOB-017 pinning logic (lines 60-68) will be removed since alphabetical sorting should take priority, unless you want JOB-017 still pinned -- the default approach here will be pure alphabetical sorting.

**Single change:** Replace the final sorting/pinning block with:
```typescript
mapped.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
```

This ensures consistent alphabetical ordering regardless of filters applied.
