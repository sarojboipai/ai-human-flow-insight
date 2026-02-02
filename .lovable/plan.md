
# Create Operation Manager Dedicated Pages with Sidebar

This plan creates a complete Operation Manager persona experience with a dedicated sidebar (matching the reference image structure) and sub-pages similar to the existing RecruiterDashboard and AIPerformance pages.

---

## Overview

Based on the sidebar reference image, the Operation Manager will have:
- **ORCHESTRATION** section: Orchestration Engine
- **OPERATIONS** section: Recruiter Dashboard, AI Performance

This mirrors the Admin's Operations module but in a dedicated persona context with its own layout.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/OpsSidebar.tsx` | Create | Sidebar with two groups matching reference image |
| `src/components/layout/OpsLayout.tsx` | Create | Layout wrapper using OpsSidebar |
| `src/pages/OpsDashboard.tsx` | Create | Landing dashboard at `/ops` |
| `src/pages/OpsRecruiterDashboard.tsx` | Create | Recruiter metrics page with similar widgets |
| `src/pages/OpsAIPerformance.tsx` | Create | AI performance page with similar widgets |
| `src/App.tsx` | Modify | Add routes for `/ops/*` pages |
| `src/components/layout/DashboardLayout.tsx` | Modify | Update persona dropdown to route to `/ops` |
| `src/components/layout/HITLLayout.tsx` | Modify | Update persona dropdown to route to `/ops` |
| `src/pages/CustomerDashboard.tsx` | Modify | Update persona dropdown to route to `/ops` |
| `src/pages/CustomerBusiness.tsx` | Modify | Update persona dropdown to route to `/ops` |

---

## Sidebar Navigation Structure

Following the reference image exactly:

```text
+----------------------------------+
|  [Network Icon]  Operations      |
|               Control Center     |
+----------------------------------+
|  ORCHESTRATION                   |
|  - Orchestration Engine          |
+----------------------------------+
|  OPERATIONS                      |
|  - Recruiter Dashboard           |
|  - AI Performance                |
+----------------------------------+
|                                  |
|  Settings (footer)               |
+----------------------------------+
```

Routes:
- `/ops` - Dashboard landing
- `/ops/orchestration` - Orchestration Engine (using existing OrchestrationEngine content)
- `/ops/recruiters` - Recruiter Dashboard
- `/ops/ai-performance` - AI Performance

---

## Page Content Details

### 1. OpsDashboard (`/ops`)

A landing page with key operational metrics and quick navigation:

**Metric Cards (4):**
- Active Workflows - count from mock data
- Active Agents - count from mock data  
- Connected Systems - count from mock data
- HITL Rules - count from mock data

**Quick Actions Section:**
Cards linking to each sub-page with icons and descriptions

**System Health Overview:**
Mini versions of key charts showing current status

---

### 2. OpsRecruiterDashboard (`/ops/recruiters`)

Similar content to RecruiterDashboard.tsx but using OpsLayout:

**Key Metrics (4):**
- Total Recruiters
- Avg Placements/Recruiter
- Revenue/Recruiter
- Productivity Index

**Charts:**
- Weekly Productivity Trend (Line Chart)
- Team Performance (Bar Chart)

**Tables:**
- Individual Performance (RecruiterTable component)

**Benchmarks:**
- Performance Benchmarks grid

---

### 3. OpsAIPerformance (`/ops/ai-performance`)

Similar content to AIPerformance.tsx but using OpsLayout:

**Key Metrics (4):**
- Match Precision
- Match Recall
- Avg Confidence
- Override Rate

**Charts:**
- Weekly Performance Trend (Line Chart)
- AI Health Score (Radar Chart)

**Detailed Sections:**
- Core AI Metrics with progress bars
- Bias & Fairness Metrics
- AI Failure Detection grid

---

## Technical Implementation

### OpsSidebar Component

```tsx
// Navigation items matching the reference image exactly
const orchestrationItems = [
  { title: "Orchestration Engine", url: "/ops/orchestration", icon: Network }
];

const operationsItems = [
  { title: "Recruiter Dashboard", url: "/ops/recruiters", icon: Users },
  { title: "AI Performance", url: "/ops/ai-performance", icon: Bot }
];
```

Features:
- Uses existing Sidebar components
- Network icon in header (matches orchestration theme)
- Two distinct SidebarGroups with labels
- Active state highlighting
- Collapsible icon mode support

### OpsLayout Component

Pattern from HITLLayout:
- Wraps with SidebarProvider
- Header with search, notifications, persona switcher
- OpsSidebar integrated
- Main content area with proper spacing

### Route Structure

```tsx
// In App.tsx
<Route path="/ops" element={<OpsDashboard />} />
<Route path="/ops/orchestration" element={<OpsOrchestrationEngine />} />
<Route path="/ops/recruiters" element={<OpsRecruiterDashboard />} />
<Route path="/ops/ai-performance" element={<OpsAIPerformance />} />
```

---

## Component Reuse Strategy

To avoid code duplication, the Ops pages will:

1. **Import shared components**: MetricCard, RecruiterTable, charts
2. **Import shared mock data**: recruiters, agents, workflows, aiPerformanceMetrics
3. **Use OpsLayout** instead of DashboardLayout
4. **Same widget structure** with minor context-specific adjustments

---

## Persona Dropdown Updates

All layouts will update the "Operation Manager" option:

```tsx
// Before
<DropdownMenuItem onClick={() => navigate("/orchestration")}>
  Operation Manager
</DropdownMenuItem>

// After  
<DropdownMenuItem onClick={() => navigate("/ops")}>
  Operation Manager
</DropdownMenuItem>
```

---

## Result

- Operation Manager has a dedicated sidebar matching the reference image structure
- Three sub-pages with rich dashboards and widgets
- Consistent layout pattern with HITL and Customer personas
- Seamless persona switching between all four roles
- Reuses existing components for consistency
