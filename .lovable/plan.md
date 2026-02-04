
# Job Pipeline Threshold Rules Implementation Plan

## Summary
Add comprehensive threshold rules to the Rules module covering all 6 pipeline stages (Job Posting, Sourcing, Outreach, Job Application, Screening, Interview) with 3 thresholds each, totaling 18 new configurable rules. This involves extending the data model and adding new mock data.

---

## What Will Be Added

### New Rule Categories
- **Job Posting** (3 rules): Time to Publish, Data Completeness, Channel Distribution
- **Sourcing** (3 rules): Candidate Supply Gap, Profile Quality, Duplicate/Spam Rate
- **Outreach** (3 rules): Delivery Failure, Response Rate Drop, Opt-out/Negative Sentiment
- **Application** (3 rules): Conversion Drop, Incomplete Applications, Fraud Detection
- **Screening** (3 rules): AI Confidence Low, High Rejection Rate, SLA Breach
- **Interview** (3 rules): Scheduling Delay, No-show Rate, Feedback Missing

### New Actions Available
| Action | Description |
|--------|-------------|
| Route to AI Agent | Escalate to a specialized AI agent (e.g., JD Enrichment AI, Scheduling Agent) |
| Trigger Automation | Trigger external automation (WhatsApp, SMS, CRM) |
| Retry with Fallback | Retry via automation connector, fallback to HITL |

### New HITL Queues
| Queue | Purpose |
|-------|---------|
| Content HITL | For JD enrichment and content issues |
| Ops Admin HITL | For posting and operational issues |
| Human Sourcer HITL | For sourcing quality issues |
| QA HITL | For deduplication and quality assurance |
| Compliance HITL | For fraud detection and compliance |
| Hiring Manager HITL | For interview feedback and recalibration |
| Human Screening Pool | For screening SLA breaches |

---

## Files to Modify

### 1. `src/lib/mockData.ts`
- Add `"application"` and `"screening"` to `RuleType`
- Add new action types: `"route_to_ai_agent"`, `"trigger_automation"`, `"retry_with_fallback"`
- Add new target queues for specialized HITL teams
- Add condition metrics for application and screening stages
- Add 12+ new rules to `hitlRulesV2` array covering all thresholds

### 2. `src/components/hitl/RulesTable.tsx`
- Add color styling for new rule types (application, screening)
- Update filter buttons to include new categories

### 3. `src/components/hitl/RuleBuilderDialog.tsx`
- Add new rule type options to dropdown
- Update action type dropdown with new actions
- Add conditional UI for AI agent selection when "route_to_ai_agent" is selected

---

## Technical Details

### Type Updates
```text
RuleType = "confidence" | "business" | "anomaly" | "sla" 
         | "posting" | "sourcing" | "outreach" | "interview"
         | "application" | "screening"

ActionType = "route_to_queue" | "alert" | "escalate" | "block"
           | "route_to_ai_agent" | "trigger_automation" | "retry_with_fallback"

TargetQueue = "recruiter_review" | "ops_escalation" | "enterprise_priority"
            | "content_hitl" | "ops_admin_hitl" | "human_sourcer_hitl"
            | "qa_hitl" | "compliance_hitl" | "hiring_manager_hitl"
            | "human_screening_pool" | "outreach_hitl" | "recruiter_hitl"
```

### New Condition Metrics
```text
application:
  - application_conversion_rate: "Application Conversion (%)"
  - incomplete_application_rate: "Incomplete Applications (%)"
  - fraud_risk_score: "Fraud Risk Score"

screening:
  - screening_confidence: "Screening AI Confidence"
  - rejection_rate: "Rejection Rate (%)"
  - screening_time: "Screening Time (hours)"
```

### New Rules to Add (12 rules)
| ID | Name | Stage | Trigger | Action |
|----|------|-------|---------|--------|
| rule-017 | Channel Distribution Failure | Posting | distribution_failures >= 1 | Retry, then Ops Admin HITL |
| rule-018 | High Spam/Duplicate Rate | Sourcing | spam_rate > 20% | QA HITL |
| rule-019 | Low Outreach Response | Outreach | response_rate < 15% | Outreach Optimization AI, then Recruiter HITL |
| rule-020 | Candidate Opt-out Alert | Outreach | optout_rate > X% | Pause campaign, Recruiter HITL |
| rule-021 | Application Conversion Drop | Application | conversion < 30% | UX Optimization AI, then Ops HITL |
| rule-022 | Incomplete Applications | Application | incomplete > 25% | Follow-up Nudging AI, then Recruiter HITL |
| rule-023 | Fraud/Bot Detection | Application | fraud_detected = true | Compliance HITL |
| rule-024 | AI Screening Confidence Low | Screening | confidence < 0.7 | HITL Screening Queue |
| rule-025 | High Screening Rejection | Screening | rejection_rate > 70% | Recalibration AI, then Hiring Manager HITL |
| rule-026 | Screening SLA Breach | Screening | screening_time > 12 | Auto-assign Human Screening Pool |
| rule-027 | Interview Feedback Missing | Interview | feedback_delay > 48 | Nudging Agent, then Hiring Manager HITL |
| rule-028 | Interview Scheduling Retry | Interview | scheduling_failed = true | Scheduling AI, then Recruiter HITL |

---

## Expected Outcome
After implementation, the Rules tab in Pipeline Config will display:
- 28+ configurable rules across 10 categories
- Filter buttons for all 10 rule types (including new Application and Screening)
- New action types available when creating/editing rules
- More specific HITL queue routing options
- Full coverage of all pipeline stage thresholds as specified
