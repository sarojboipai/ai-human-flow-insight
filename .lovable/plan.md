

# Admin Dashboard - Customer-Aware Hiring Operations Control Center

Enhance the Admin Dashboard with customer-scoped data behavior, improved Job Pipeline Health table with Job Title column, and customer-specific workflow variations in the Pipeline Board Dialog.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/Index.tsx` | Modify | Add customer filtering logic to filter all dashboard data by selected customer |
| `src/lib/mockData.ts` | Modify | Add customer workflow schemas, helper functions for customer filtering, and update job data |
| `src/components/dashboard/JobPipelineHealthTable.tsx` | Modify | Add Job Title column per PRD requirements |
| `src/components/customer/PipelineBoardDialog.tsx` | Modify | Implement customer-specific workflow rendering based on workflow schema |

---

## Feature Implementation

### 1. Customer-Scoped Dashboard Filtering

When a customer is selected from the dropdown, the entire dashboard refreshes to show only that customer's data:

- **KPI Cards**: Recalculated based on filtered jobs
- **Hiring Activity Trends**: Filtered by customer
- **Workload Chart**: Recalculated from filtered jobs
- **AI Evaluation Metrics**: Customer-specific values
- **Revenue Intelligence**: Customer-specific revenue data
- **Job Pipeline Health Table**: Shows only selected customer's jobs

**Implementation in Index.tsx:**

```tsx
// Filter jobs based on selected customer
const filteredJobs = useMemo(() => {
  if (customer === "all") return jobs;
  const selectedCustomer = enterpriseCustomers.find(c => c.id === customer);
  return jobs.filter(job => job.employer === selectedCustomer?.name);
}, [customer]);

// Recalculate all metrics based on filtered jobs
const filteredKPIs = useMemo(() => ({
  activeJobPipelines: filteredJobs.filter(j => j.status === "active").length,
  candidatesInPipeline: filteredJobs.reduce((acc, job) => acc + job.funnel[0].candidates, 0),
  aiAutomationCoverage: calculateAIAutomationCoverage(filteredJobs),
  hiringSLACompliance: calculateSLACompliance(filteredJobs),
  grossMargin: calculateGrossMargin(filteredJobs),
}), [filteredJobs]);
```

---

### 2. Job Pipeline Health Table Enhancement

Add the **Job Title** column as specified in the PRD:

| Column | Description |
|--------|-------------|
| Job ID | Unique identifier (existing) |
| **Job Title** | Role title - **NEW** |
| Enterprise Customer | Hospital name (existing) |
| Funnel Stage | Current stage (existing) |
| Bottleneck | Delay-causing stage (existing) |
| AI vs Human | Workload split (existing) |
| SLA Risk | Status indicator (existing) |
| Action | Open dialog button (existing) |

**Data Structure Update:**

```tsx
export interface JobPipelineHealthRow {
  jobId: string;
  jobTitle: string;    // NEW FIELD
  customer: string;
  currentStage: string;
  bottleneckStage: string;
  aiPercentage: number;
  humanPercentage: number;
  slaRisk: "green" | "amber" | "red";
  slaDetails: string;
}
```

---

### 3. Customer-Specific Workflow Schemas

Each enterprise customer has a configurable workflow schema that determines which stages appear in their pipeline:

**Example Workflow Definitions:**

```text
+----------------------------------------------------------+
| ANKURA HOSPITAL (Full Workflow)                          |
+----------------------------------------------------------+
Jobs -> Discovery -> Expression -> Pre-screen -> Voice -> Decision -> Outcomes

+----------------------------------------------------------+
| KIMS HOSPITAL (No Discovery Stage)                       |
+----------------------------------------------------------+
Jobs -> Expression -> Pre-screen -> Voice -> Decision -> Outcomes

+----------------------------------------------------------+
| OASIS FERTILITY (No Pre-screen Stage)                    |
+----------------------------------------------------------+
Jobs -> Discovery -> Expression -> Voice -> Decision -> Outcomes
```

**Workflow Schema Data Structure:**

```tsx
interface WorkflowStage {
  id: string;
  type: "source" | "candidate" | "automation" | "ai" | "recruiter" | "decision" | "outcome";
  label: string;
  icon: string;
}

interface CustomerWorkflowSchema {
  customerId: string;
  customerName: string;
  workflowId: string;
  stages: WorkflowStage[];
}

export const customerWorkflowSchemas: CustomerWorkflowSchema[] = [
  {
    customerId: "cust-001",
    customerName: "Ankura Hospital",
    workflowId: "wf-ankura",
    stages: [
      { id: "source", type: "source", label: "Ankura\nHospital", icon: "hospital" },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nAnkura", icon: "eye" },
      { id: "job-discovery", type: "candidate", label: "Job\nDiscovery", icon: "search" },
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart" },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send" },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone" },
      { id: "decision", type: "decision", label: "Decision", icon: "branch" },
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar" },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck" },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user" },
    ],
  },
  {
    customerId: "cust-004", // KIMS Hospital
    customerName: "KIMS Hospital",
    workflowId: "wf-kims",
    stages: [
      { id: "source", type: "source", label: "KIMS\nHospital", icon: "hospital" },
      { id: "jobs-ankura", type: "candidate", label: "Jobs in\nKIMS", icon: "eye" },
      // NO job-discovery stage
      { id: "expression", type: "candidate", label: "Expression\nof Interest", icon: "heart" },
      { id: "prescreen", type: "automation", label: "Pre-screen\nQuestions", icon: "send" },
      { id: "voice-agent", type: "ai", label: "Voice Agent\nScreening", icon: "phone" },
      { id: "decision", type: "decision", label: "Decision", icon: "branch" },
      { id: "scheduling", type: "automation", label: "Interview\nScheduling", icon: "calendar" },
      { id: "silver-med", type: "recruiter", label: "Silver\nMedalist", icon: "userCheck" },
      { id: "talent-community", type: "candidate", label: "Talent\nCommunity", icon: "user" },
    ],
  },
  // ... other customers with varying workflows
];
```

---

### 4. Dynamic Workflow Rendering in PipelineBoardDialog

The dialog dynamically builds nodes based on the customer's workflow schema:

**Key Changes:**

1. Look up customer workflow schema based on job's employer
2. Generate nodes dynamically from schema stages
3. Auto-rewire edges between stages (skip missing stages)
4. Update source node to show correct customer branding

**Node Building Logic:**

```tsx
const buildNodesFromSchema = (job: Job, schema: CustomerWorkflowSchema): Node[] => {
  const metrics = job.enhancedStageMetrics || {};
  let xPosition = 50;
  
  return schema.stages.map((stage, index) => {
    const node = {
      id: stage.id,
      type: getNodeType(stage.type),
      position: calculatePosition(index, stage.type),
      data: {
        label: stage.label.replace('Ankura', job.employer.split(' ')[0]),
        icon: stage.icon,
        aiPercentage: metrics[stage.id]?.aiPercentage,
        humanPercentage: metrics[stage.id]?.humanPercentage,
        hitlPercentage: metrics[stage.id]?.hitlPercentage,
        slaStatus: metrics[stage.id]?.slaStatus,
        onClick: () => handleNodeClick(stage.id),
      },
    };
    return node;
  });
};

const buildEdgesFromSchema = (schema: CustomerWorkflowSchema): Edge[] => {
  const edges: Edge[] = [];
  const mainStages = schema.stages.filter(s => s.type !== "outcome");
  
  for (let i = 0; i < mainStages.length - 1; i++) {
    edges.push({
      id: `e-${mainStages[i].id}-${mainStages[i+1].id}`,
      source: mainStages[i].id,
      target: mainStages[i+1].id,
      style: { stroke: getEdgeColor(mainStages[i].type) },
    });
  }
  
  // Add decision node outcomes
  // ...
  
  return edges;
};
```

---

### 5. Helper Functions for Customer Filtering

Add utility functions to mockData.ts for calculating customer-specific metrics:

```tsx
// Filter jobs by customer
export const getJobsByCustomer = (customerName: string | "all") => {
  if (customerName === "all") return jobs;
  return jobs.filter(job => job.employer === customerName);
};

// Calculate KPIs for filtered jobs
export const calculateCustomerKPIs = (filteredJobs: Job[]) => ({
  activeJobPipelines: filteredJobs.filter(j => j.status === "active").length,
  candidatesInPipeline: filteredJobs.reduce((acc, job) => 
    acc + job.funnel[0].candidates, 0),
  aiAutomationCoverage: Math.round(
    filteredJobs.reduce((acc, job) => acc + job.aiContribution, 0) / 
    (filteredJobs.length || 1)
  ),
  hiringSLACompliance: Math.round(
    (filteredJobs.filter(j => j.daysOpen <= 21).length / 
    (filteredJobs.length || 1)) * 100
  ),
  grossMargin: Math.round(
    filteredJobs.reduce((acc, job) => acc + job.margin, 0) / 
    (filteredJobs.length || 1) * 10
  ) / 10,
});

// Get workflow schema for a customer
export const getCustomerWorkflowSchema = (customerName: string) => {
  return customerWorkflowSchemas.find(
    schema => schema.customerName === customerName
  ) || customerWorkflowSchemas[0]; // Default to first schema
};
```

---

## Updated File Structure

```text
src/
  pages/
    Index.tsx                        (update - add filtering logic)
  components/
    dashboard/
      JobPipelineHealthTable.tsx     (update - add Job Title column)
      GlobalFilters.tsx              (exists - no changes needed)
    customer/
      PipelineBoardDialog.tsx        (update - dynamic workflow rendering)
  lib/
    mockData.ts                      (update - add schemas, helpers)
```

---

## Data Flow Diagram

```text
User selects Customer
        |
        v
+-------------------+
| GlobalFilters     |
| customer state    |
+-------------------+
        |
        v
+-------------------+
| Index.tsx         |
| - Filter jobs     |
| - Recalc KPIs     |
| - Update charts   |
+-------------------+
        |
        +---> KPI Cards (filtered)
        |
        +---> Hiring Activity Chart (filtered)
        |
        +---> Workload Chart (filtered)
        |
        +---> AI Evaluation (filtered)
        |
        +---> Revenue Panel (filtered)
        |
        v
+------------------------+
| JobPipelineHealthTable |
| (filtered rows)        |
+------------------------+
        |
        | User clicks row
        v
+------------------------+
| PipelineBoardDialog    |
| - Get job.employer     |
| - Lookup workflow      |
| - Build dynamic nodes  |
| - Auto-wire edges      |
+------------------------+
```

---

## Acceptance Criteria Verification

| Requirement | Implementation |
|-------------|----------------|
| Admin can switch customers and entire dashboard updates | Customer state filters all data via useMemo hooks |
| Job Pipeline Health table shows Job Title column | Added jobTitle field to interface and table column |
| Clicking a job opens Pipeline Board with accurate job data | Job passed to dialog with employer-specific workflow lookup |
| Workflow stages differ per customer | CustomerWorkflowSchema defines per-customer stages |
| Node-level metrics reflect the selected job | enhancedStageMetrics keyed by stage ID |

---

## Result

When complete, the Admin Dashboard will:

- Dynamically filter all metrics when a customer is selected
- Show Job Title in the pipeline health table for quick role identification
- Render customer-specific workflows in the Pipeline Board Dialog
- Automatically skip missing stages and rewire connections
- Maintain accurate job-level metrics per stage

