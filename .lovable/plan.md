

# Activate Filters in Jobs Pipeline Table

Add functional filter controls to the Jobs Pipeline table allowing users to filter by Company, Stage, and Location.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/CustomerJobsTable.tsx` | Modify | Add filter state, filter UI popover, and filter logic for Company, Stage, and Location |

---

## Technical Details

### CustomerJobsTable.tsx

**1. Add new imports:**
```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
```

**2. Add filter state variables:**
```tsx
const [companyFilter, setCompanyFilter] = useState<string[]>([]);
const [stageFilter, setStageFilter] = useState<string[]>([]);
const [locationFilter, setLocationFilter] = useState<string[]>([]);
```

**3. Define filter options from data:**
- **Companies**: Ankura Hospital, Oasis Fertility, Manipal Hospitals, KIMS Hospital, Yashoda Hospitals, Aster CMI Hospital
- **Stages**: Candidate Lead, Profile Completed, AI Matched, Recruiter Contacted, Interview Scheduled, Offer Released, Placement Confirmed
- **Locations**: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Gurugram

**4. Update filter logic:**
```tsx
const filteredJobs = jobs.filter((job) => {
  const matchesSearch = 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.id.toLowerCase().includes(searchQuery.toLowerCase());
  
  const matchesCompany = companyFilter.length === 0 || 
    companyFilter.includes(job.employer);
  
  const jobCurrentStage = currentStage(job);
  const matchesStage = stageFilter.length === 0 || 
    (jobCurrentStage && stageFilter.includes(jobCurrentStage));
  
  const matchesLocation = locationFilter.length === 0 || 
    locationFilter.includes(job.geography);
  
  return matchesSearch && matchesCompany && matchesStage && matchesLocation;
});
```

**5. Replace static Filters button with Popover containing checkboxes**

---

## Filter UI Layout

```text
+---------------------------+
| Company                   |
| [ ] Ankura Hospital       |
| [ ] Oasis Fertility       |
| [ ] Manipal Hospitals     |
| [ ] KIMS Hospital         |
| [ ] Yashoda Hospitals     |
| [ ] Aster CMI Hospital    |
+---------------------------+
| Stage                     |
| [ ] Candidate Lead        |
| [ ] Profile Completed     |
| [ ] AI Matched            |
| [ ] Recruiter Contacted   |
| [ ] Interview Scheduled   |
| [ ] Offer Released        |
| [ ] Placement Confirmed   |
+---------------------------+
| Location                  |
| [ ] Mumbai                |
| [ ] Delhi                 |
| [ ] Bangalore             |
| [ ] Chennai               |
| [ ] Hyderabad             |
| [ ] Gurugram              |
+---------------------------+
| [Clear All Filters]       |
+---------------------------+
```

---

## Result

The Filters button will:
- Open a dropdown popover with three filter sections
- Allow multi-select checkboxes for Company, Stage, and Location
- Show a badge with active filter count when filters are applied
- Include a "Clear All" button to reset all filters

