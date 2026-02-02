
# Add Company Column to Jobs Pipeline Table

Add a new "Company" column to the Jobs Pipeline table displaying hospital/employer names including Ankura Hospital, Oasis Fertility, and other Indian hospitals.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/lib/mockData.ts` | Modify | Update employer names to include Ankura Hospital, Oasis Fertility, and other Indian hospitals |
| `src/components/customer/CustomerJobsTable.tsx` | Modify | Add Company column to table header and body |

---

## Technical Details

### 1. mockData.ts - Update Employer Names

Replace some existing employer names with the requested hospitals:

| Job ID | Current Employer | New Employer |
|--------|-----------------|--------------|
| JOB-001 | Apollo Hospitals | Ankura Hospital |
| JOB-002 | Fortis Healthcare | Oasis Fertility |
| JOB-003 | Max Healthcare | Manipal Hospitals |
| JOB-004 | Narayana Health | KIMS Hospital |
| JOB-005 | Rainbow Hospitals | Yashoda Hospitals |
| JOB-006 | Medanta | Aster CMI Hospital |

### 2. CustomerJobsTable.tsx - Add Company Column

**Add to TableHeader (after Title column):**
```tsx
<TableHead>Company</TableHead>
```

**Add to TableBody (after Title cell):**
```tsx
<TableCell>{job.employer}</TableCell>
```

---

## Result

The Jobs Pipeline table will display:
- Job ID
- Title
- **Company** (new column with Indian hospital names)
- Current Stage
- Candidates
- Days Open
- View Pipeline button
