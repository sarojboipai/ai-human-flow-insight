

# Combine Job Explorer and Funnel Analytics

This plan merges the "Job Explorer" (`/jobs`) and "Funnel Analytics" (`/funnel`) pages into a single unified page with tabbed navigation.

---

## Overview

Currently, these are two separate pages:
- **Job Explorer** (`/jobs`): Job-level intelligence with jobs table, aggregate funnel chart, and job metrics
- **Funnel Analytics** (`/funnel`): Overall funnel metrics, conversion rates, time-to-stage, and drop-off analysis

We will combine them into a single page called **"Jobs & Funnel"** with two tabs.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/FunnelAnalytics.tsx` | Modify | Rename to combined page with tabs for both views |
| `src/pages/JobFunnelExplorer.tsx` | Delete | Content moved into FunnelAnalytics tabs |
| `src/App.tsx` | Modify | Remove `/jobs` route (keep `/jobs/:jobId` for detail view) |
| `src/components/layout/AppSidebar.tsx` | Modify | Remove "Job Explorer" nav item, rename "Funnel Analytics" to "Jobs & Funnel" |

---

## Implementation Details

### 1. Updated FunnelAnalytics Page Structure

The page will use the existing Tabs component with two tabs:

```text
+------------------------------------------------------------------+
|  Jobs & Funnel                                                    |
|  Job-level intelligence and funnel analytics                      |
+------------------------------------------------------------------+
|  [Tabs: Job Explorer | Funnel Analytics]                         |
+------------------------------------------------------------------+

Tab 1: Job Explorer (current JobFunnelExplorer content)
- Key metrics: Active Jobs, Avg Conversion, Avg Days Open, Pipeline Value
- Aggregate Funnel - AI vs Human Split chart
- Jobs Pipeline table (clickable rows to /jobs/:jobId)

Tab 2: Funnel Analytics (current FunnelAnalytics content)
- Key metrics: Overall Conversion, Avg Time to Hire, Pipeline Volume, Drop-off Rate
- Hiring Pipeline Funnel chart
- Stage Conversion Rates bar chart
- Time to Stage breakdown
- Top Drop-off Reasons
```

### 2. Navigation Update

In `AppSidebar.tsx`, update the mainNavItems:

**Before:**
```text
- Job Explorer (/jobs)
- Funnel Analytics (/funnel)
```

**After:**
```text
- Jobs & Funnel (/funnel)
```

This consolidates two menu items into one, making the sidebar cleaner.

### 3. Routing Update

In `App.tsx`:
- Remove the `/jobs` route (since Job Explorer is now a tab within `/funnel`)
- Keep `/jobs/:jobId` route for the job detail page (unchanged)

The job detail page will continue to work - clicking a job row in the table will still navigate to `/jobs/:jobId`.

---

## Technical Details

### Combined Page Layout

```text
<DashboardLayout
  title="Jobs & Funnel"
  subtitle="Job-level intelligence and funnel analytics"
>
  <Tabs defaultValue="jobs">
    <TabsList>
      <TabsTrigger value="jobs">Job Explorer</TabsTrigger>
      <TabsTrigger value="funnel">Funnel Analytics</TabsTrigger>
    </TabsList>
    
    <TabsContent value="jobs">
      {/* Current JobFunnelExplorer content */}
    </TabsContent>
    
    <TabsContent value="funnel">
      {/* Current FunnelAnalytics content */}
    </TabsContent>
  </Tabs>
</DashboardLayout>
```

### Filters Location

The role type and geography filters will remain in the header area, applying to both tabs for consistency.

---

## Files to Modify

### 1. `src/pages/FunnelAnalytics.tsx`
- Add imports for Tab components and Job Explorer components
- Add imports for jobs mock data
- Wrap existing content in TabsContent
- Add first TabsContent with Job Explorer content
- Update page title to "Jobs & Funnel"

### 2. `src/components/layout/AppSidebar.tsx`
- Remove "Job Explorer" item from mainNavItems array
- Rename "Funnel Analytics" to "Jobs & Funnel"

### 3. `src/App.tsx`
- Remove the import for JobFunnelExplorer
- Remove the `/jobs` route

### 4. `src/pages/JobFunnelExplorer.tsx`
- Delete this file (content integrated into FunnelAnalytics)

---

## Navigation Flow After Change

```text
Sidebar "Jobs & Funnel" → /funnel page
  └─ Tab: Job Explorer (default)
  └─ Tab: Funnel Analytics
       └─ Click job row → /jobs/:jobId (Job Detail page)
```

