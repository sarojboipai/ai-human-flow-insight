

## Add Edit and Delete Actions to Job List

### What You Will See
- A new **Actions** column on the right side of the job table with a three-dot menu on each row
- Clicking the menu shows two options: **Edit** and **Delete**
- **Edit** opens a dialog pre-filled with the job's current data, allowing you to update and save
- **Delete** shows a confirmation prompt before removing the job

### Technical Details

**1. New Component: `EditJobDialog.tsx`** (`src/components/ops/EditJobDialog.tsx`)
- Reuses the same form layout as `AddJobDialog` but pre-populated with existing job data
- Accepts a `job` prop and an `open`/`onOpenChange` control
- On submit, calls `supabase.from("jobs").update({...}).eq("id", job.id)`
- Invalidates the `["jobs"]` query cache on success

**2. Update `OpsJobList.tsx`**
- Add an "Actions" column header to the table
- Add a `DropdownMenu` (three-dot icon button) in each row with "Edit" and "Delete" options
- Stop click propagation on the actions cell so it doesn't trigger row navigation
- **Edit**: Opens `EditJobDialog` with the selected job's data
- **Delete**: Opens an `AlertDialog` confirmation; on confirm, calls `supabase.from("jobs").delete().eq("id", job.id)` and invalidates the query cache

**3. No database changes needed**
- INSERT, UPDATE, and DELETE RLS policies are already in place on the `jobs` table
