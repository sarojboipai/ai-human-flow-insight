

# Hide Role Type and Status Columns

Remove the "Role Type" and "Status" columns from the Jobs Pipeline table on the /funnel page.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/CustomerJobsTable.tsx` | Modify | Remove Role Type and Status columns from table header and body |

---

## Technical Details

### CustomerJobsTable.tsx

**Remove from TableHeader:**
- Line 74: Delete `<TableHead>Role Type</TableHead>`
- Line 78: Delete `<TableHead>Status</TableHead>`

**Remove from TableBody:**
- Line 87: Delete `<TableCell className="capitalize">{job.roleType}</TableCell>`
- Line 95: Delete `<TableCell>{getStatusBadge(job.status)}</TableCell>`

**Optional cleanup:**
- The `getStatusBadge` helper function (lines 16-23) can be removed since it will no longer be used

---

## Resulting Table Columns

The Jobs Pipeline table will display:
- Job ID
- Title
- Current Stage
- Candidates
- Days Open
- View Pipeline button

