

# Plan: Create All Remaining Database Tables for Existing Entities

## Overview

Create database tables for all major entities currently stored as mock data, seed them with existing records, and optionally create hooks to read from the database. The `jobs` and `candidates` tables already exist.

---

## Entities to Create

### 1. Recruiters Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "1" |
| name | text | Recruiter name |
| team | text | "Nursing", "Doctors", "Paramedic" |
| screened | integer | Candidates screened |
| interviews | integer | Interviews conducted |
| placements | integer | Placements made |
| revenue | numeric | Revenue generated |
| change | numeric | % change metric |
| created_at | timestamptz | Default now() |

5 records to seed.

### 2. Agents Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "agent-001" |
| name | text | Agent name |
| type | text | "phenom", "internal", "third-party" |
| status | text | "active", "paused", "error" |
| description | text | What the agent does |
| tasks_processed | integer | Count |
| success_rate | numeric | Percentage |
| avg_latency_ms | integer | Milliseconds |
| assigned_stages | jsonb | Array of stage names |
| last_active | text | Relative time string |
| created_at | timestamptz | Default now() |

7 records to seed.

### 3. Pipeline Stages Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "stage-1" |
| name | text | Stage name |
| primary_handler | text | "ai", "human", "hybrid" |
| agents | jsonb | Array of agent names |
| human_backup | text | Backup team |
| avg_processing_time | text | e.g. "2 mins" |
| throughput | integer | Count |
| created_at | timestamptz | Default now() |

6 records to seed.

### 4. HITL Rules V2 Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "rule-001" |
| name | text | Rule name |
| description | text | Description |
| rule_type | text | "confidence", "business", etc. |
| stage | text | Hiring stage |
| condition_metric | text | Metric being evaluated |
| operator | text | ">", "<", "=", etc. |
| threshold_value | text | Stored as text for flexibility |
| action_type | text | "route_to_queue", "alert", etc. |
| target_queue | text | Queue identifier |
| priority | integer | 1-5 |
| status | text | "active", "paused", "draft" |
| trigger_count | integer | Times triggered |
| last_triggered | text | Relative timestamp |
| created_by | text | Creator name |
| version | integer | Rule version |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

29 records to seed.

### 5. HITL Tasks Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "HITL-001" |
| rule_id | text | Reference to rule |
| rule_name | text | Denormalized rule name |
| candidate_id | text | Candidate reference |
| candidate_name | text | Candidate name |
| job_id | text | Job reference |
| job_title | text | Denormalized job title |
| ai_agent_id | text | Agent that made decision |
| ai_decision | text | What AI decided |
| confidence_score | numeric | 0-1 score |
| status | text | "pending", "assigned", etc. |
| priority | text | "high", "medium", "low" |
| assigned_to | text | Assignee name |
| assigned_at | text | When assigned |
| resolution | text | How resolved |
| resolved_at | text | When resolved |
| due_at | text | Deadline |
| metadata | jsonb | Extra key-value data |
| created_at | timestamptz | Default now() |

8 records to seed.

### 6. HITL Audit Logs Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "log-001" |
| rule_id | text | Rule reference |
| rule_name | text | Denormalized |
| task_id | text | Task reference |
| event_type | text | "rule_triggered", "task_created", etc. |
| actor | text | Who/what performed the action |
| details | text | Description |
| snapshot | jsonb | State snapshot |
| timestamp | text | Relative time |
| created_at | timestamptz | Default now() |

10 records to seed.

### 7. Workflows Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "wf-001" |
| name | text | Workflow name |
| description | text | Description |
| version | integer | Version number |
| status | text | "draft", "active", "paused", "archived" |
| job_type | text | "frontline", "professional", "enterprise" |
| stages | jsonb | Array of stage objects |
| automations | jsonb | Array of automation objects |
| created_by | text | Creator |
| execution_count | integer | Times executed |
| success_rate | numeric | Percentage |
| profession | text | Nullable |
| job_zone | integer | Nullable |
| location_tier | text | Nullable |
| industry | text | Nullable |
| hiring_type | text | Nullable |
| node_positions | jsonb | Nullable |
| connections | jsonb | Nullable |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

7+ records to seed.

### 8. Pipeline Templates Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "template-nurse-t1" |
| name | text | Template name |
| description | text | Description |
| hiring_type | text | "bulk", "fast_track" |
| profession | text | "nurse", "doctor", etc. |
| job_zone | integer | 1-4 |
| default_ai_coverage | integer | Percentage |
| default_hitl_ruleset | text | Ruleset name |
| characteristics | jsonb | Array of strings |
| stages | jsonb | Array of stage objects |
| icon | text | Icon name |
| created_at | timestamptz | Default now() |

5 records to seed.

### 9. Customer Workflow Schemas Table

| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | e.g. "cust-001" |
| customer_name | text | Customer name |
| workflow_id | text | Associated workflow |
| stages | jsonb | Array of stage objects |
| outcome_stages | jsonb | Array of outcome stage objects |
| created_at | timestamptz | Default now() |

6 records to seed.

---

## What Won't Be Tabled

The following are derived/aggregate data computed from other entities and don't need their own tables:
- `funnelData`, `trendData`, `aiWorkloadData`, `stageWorkload` (dashboard chart data)
- `revenueMetrics`, `dashboardKPIs`, `aiPerformanceMetrics` (computed KPIs)
- `hitlVolumeData`, `rulePerformanceData`, `resolutionOutcomes` (analytics summaries)
- `aggregateFunnelData`, `jobPipelineHealth` (derived from jobs)
- `historicalCandidates` (simulation data)
- `conditionMetrics`, `operators`, `actionTypes`, `targetQueues` (static enum-like lookups)

---

## Security

All tables will have RLS enabled with public read access (SELECT). Tables that need to be editable (workflows, rules, tasks) will also get public INSERT, UPDATE, and DELETE policies since there's no authentication yet.

## Implementation Approach

1. Create all 9 tables in a single database migration
2. Seed all tables with existing mock data using INSERT statements
3. The frontend will continue using mock data for now -- creating hooks for each table can be done incrementally as needed

---

## Technical Details

- All tables use `text` primary keys to match existing mock IDs
- Complex nested structures (stages, automations, metadata) stored as JSONB
- `updated_at` triggers will be added for tables that need them (workflows, rules)
- Foreign key references are intentionally omitted to keep the schema flexible and match the current loose coupling in mock data

