

# Rebrand Recruiter Dashboard to Human Activity

Transform the current recruiter-focused page into a leadership-oriented "Human Activity" dashboard that provides executive visibility into human workforce effort, productivity, and operational efficiency.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/App.tsx` | Modify | Change route from `/recruiters` to `/human-activity` |
| `src/components/layout/AppSidebar.tsx` | Modify | Update navigation URL from `/recruiters` to `/human-activity` |
| `src/pages/RecruiterDashboard.tsx` | Modify | Update title, description, metrics, and section headers |

---

## Technical Details

### 1. Route Changes

**App.tsx (line 39)**
```tsx
// Before
<Route path="/recruiters" element={<RecruiterDashboard />} />

// After
<Route path="/human-activity" element={<RecruiterDashboard />} />
```

**AppSidebar.tsx (line 49)**
```tsx
// Before
{ title: "Human Activity", url: "/recruiters", icon: Users }

// After
{ title: "Human Activity", url: "/human-activity", icon: Users }
```

### 2. Page Content Updates (RecruiterDashboard.tsx)

**Page Header (lines 46-50)**

| Current | New |
|---------|-----|
| "Recruiter Dashboard" | "Human Activity" |
| "Track recruiter productivity and performance metrics" | "Evaluate human workforce effort, productivity, and operational contribution" |

**Metric Cards (lines 78-110)**

| Current Metric | New Metric | New Value | Purpose |
|----------------|------------|-----------|---------|
| Total Recruiters | Active Team Members | 32 | Total human workforce count |
| Avg Placements/Recruiter | Tasks Completed/Person | 28.4 | Individual productivity measure |
| Revenue/Recruiter | Human Contribution Value | ₹14.2K | Value generated per person |
| Productivity Index | Effort Utilization | 87% | Overall workforce efficiency |

**Section Headers**

| Current | New |
|---------|-----|
| "Weekly Productivity Trend" | "Weekly Effort Trend" |
| "Team Performance" | "Team Contribution" |
| "Individual Performance" | "Team Member Activity" |
| "Performance Benchmarks" | "Activity Benchmarks" |

**Chart Data Labels**

| Current | New |
|---------|-----|
| "Screened" | "Tasks Processed" |
| "Interviews" | "Reviews Completed" |
| "Placements" | "Outcomes Delivered" |

**Benchmark Section Updates (lines 194-198)**

| Current Benchmark | New Benchmark |
|-------------------|---------------|
| "Profiles Screened/Day" | "Tasks Processed/Day" |
| "Interviews/Week" | "Reviews/Week" |
| "Placements/Month" | "Outcomes/Month" |
| "Response Time (hrs)" | "Avg Response Time (hrs)" |

---

## Result

The page will display:
- **Title**: "Human Activity"
- **Description**: "Evaluate human workforce effort, productivity, and operational contribution"
- Executive-level metrics focused on human workforce performance
- Charts renamed to reflect general human activity rather than recruiter-specific tasks
- Consistent terminology that speaks to leadership audience (CEO, Admin, Leaders)

This aligns the page content with the sidebar label "Human Activity" and provides a higher-level operational view suitable for executive stakeholders.

