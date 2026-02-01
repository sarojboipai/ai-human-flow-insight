
# Jobs Pipeline Widget for Customer Dashboard

This plan adds a Jobs Pipeline table widget to the Customer Dashboard, displaying a list of jobs posted by the customer's company.

---

## Overview

**What We're Building:**
A table widget showing the customer's jobs pipeline with key metrics. The design follows the reference image with:
- Search and filter functionality
- Columns: Job ID, Title, Employer, Role Type, Current Stage, Candidates, AI %, Days Open, Revenue, Status
- Color-coded tier badges and status badges
- Clickable rows for detailed job view

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/customer/CustomerJobsTable.tsx` | Create | New table component for customer's jobs |
| `src/pages/CustomerDashboard.tsx` | Modify | Add the jobs table widget below the pipeline |

---

## Component Design

### Table Columns
| Column | Data | Styling |
|--------|------|---------|
| Job ID | JOB-001 format | Monospace, small font |
| Title | Job title | Bold font |
| Employer | Company + tier badge | Enterprise (purple), Mid-Market (blue), SMB (gray) |
| Role Type | nurse/doctor/etc | Capitalized |
| Current Stage | Last funnel stage | Secondary badge |
| Candidates | Number | Right-aligned |
| AI % | Percentage | Teal color |
| Days Open | Number | Right-aligned |
| Revenue | Currency (INR) | Right-aligned |
| Status | active/filled/closed | Colored badges |

### Features
- Search input to filter by job title, ID, or employer
- Filter button (placeholder for future filter functionality)
- Hoverable rows that navigate to job detail page
- Responsive table with horizontal scroll on small screens

---

## Mock Data Usage

The component will import and use the existing `jobs` array from `src/lib/mockData.ts` which contains 6 sample jobs with healthcare employers:
- Apollo Hospitals (Enterprise)
- Fortis Healthcare (Enterprise)
- Max Healthcare (Mid-Market)
- Narayana Health (Mid-Market)
- Rainbow Hospitals (SMB)
- Medanta (Enterprise)

---

## Visual Styling

Following the reference image:
- **Card container**: Rounded border with subtle shadow
- **Header**: "Jobs Pipeline" title with search input and filters button
- **Tier badges**: Outlined badges with colors matching tier level
- **Status badges**: 
  - Active: Green/emerald background
  - Filled: Blue background
  - Closed: Gray/muted
- **AI percentage**: Teal/cyan color for visibility
- **Revenue**: Formatted as ₹XXK

---

## Implementation Details

### 1. Create CustomerJobsTable Component

The component will:
- Import jobs data from mockData
- Implement search filtering by job title, ID, and employer
- Calculate current stage from funnel data
- Format revenue in INR with K suffix
- Navigate to job detail on row click

### 2. Update CustomerDashboard

Add the new widget below the Job Progress Pipeline:
- Import and render `CustomerJobsTable`
- Pass jobs data filtered for customer context (or use all jobs for demo)
