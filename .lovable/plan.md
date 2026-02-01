
# Simplified Customer Sidebar

This plan creates a dedicated sidebar for the Customer page that only shows the 4 requested navigation items.

---

## Overview

**Current State:**
- Customer page uses the shared `AppSidebar` component
- AppSidebar shows all navigation items (Command Center, Jobs & Funnel, Human vs AI, Orchestration Engine, Recruiter Dashboard, AI Performance, HITL Queue, Revenue & Costs, Staffing Planner)

**Target State:**
- Customer page uses a new `CustomerSidebar` component
- Only 4 items visible: Command Center, Hiring Funnel, Recruiter Dashboard, Revenue & Costs

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/CustomerSidebar.tsx` | Create | New simplified sidebar component for customer pages |
| `src/pages/CustomerDashboard.tsx` | Modify | Import and use CustomerSidebar instead of AppSidebar |

---

## Implementation Details

### 1. Create CustomerSidebar Component

Create a new sidebar with only the required navigation items:

```text
Navigation Items:
- Command Center (/)
- Hiring Funnel (/funnel)  
- Recruiter Dashboard (/recruiters)
- Revenue & Costs (/revenue)
```

The component will:
- Follow the same structure as AppSidebar
- Include the SHIP header with logo
- Have a single "Navigation" group with all 4 items
- Include Settings in the footer

### 2. Update CustomerDashboard

Replace the AppSidebar import with CustomerSidebar:

```text
- import { AppSidebar } from "@/components/layout/AppSidebar";
+ import { CustomerSidebar } from "@/components/layout/CustomerSidebar";
```

---

## CustomerSidebar Structure

```text
+----------------------------------+
| [Logo] SHIP                      |
|        Hiring Intelligence       |
+----------------------------------+
| NAVIGATION                       |
|   Command Center                 |
|   Hiring Funnel                  |
|   Recruiter Dashboard            |
|   Revenue & Costs                |
+----------------------------------+
|   Settings                       |
+----------------------------------+
```

---

## Why Create a Separate Component?

Creating a dedicated `CustomerSidebar` component instead of modifying `AppSidebar`:
- Keeps the admin/operator navigation intact
- Makes it easy to customize customer-specific navigation in the future
- Follows separation of concerns - different user roles see different navigation
- No risk of breaking existing pages that use AppSidebar
