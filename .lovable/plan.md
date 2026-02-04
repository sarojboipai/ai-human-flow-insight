

# Add Stage Selection to Rule Builder Dialog

## Summary
Add a Stage selection dropdown to the Rule Builder dialog, allowing users to specify which hiring stage a rule applies to. This provides clearer categorization independent of the rule type.

---

## Hiring Stages to Add

| Value | Display Label |
|-------|---------------|
| cross_stage | Cross-Stage |
| job_posting | Job Posting |
| sourcing | Sourcing |
| outreach | Outreach |
| application | Application |
| screening | Screening |
| interview | Interview |

---

## Changes Required

### 1. Data Model Update (`src/lib/mockData.ts`)

Add a new `HiringStage` type and update `HITLRuleV2` interface:

```typescript
export type HiringStage = 
  | "cross_stage" 
  | "job_posting" 
  | "sourcing" 
  | "outreach" 
  | "application" 
  | "screening" 
  | "interview";

export interface HITLRuleV2 {
  // ... existing fields
  stage: HiringStage; // New field
}
```

Add stage values to existing mock rules in `hitlRulesV2` array.

### 2. Rule Builder Dialog (`src/components/hitl/RuleBuilderDialog.tsx`)

Add a Stage dropdown between Description and Rule Type:

```text
┌──────────────────────────────────────────┐
│ Rule Name                                │
│ [Low AI Confidence                     ] │
├──────────────────────────────────────────┤
│ Description                              │
│ [Route candidates with low AI...       ] │
├──────────────────────────────────────────┤
│ Stage                          ← NEW     │
│ [Screening                           ▼ ] │
├──────────────────────────────────────────┤
│ Rule Type                                │
│ [Confidence Based                    ▼ ] │
├──────────────────────────────────────────┤
│ Condition Builder                        │
│ IF [AI Confidence Score ▼] [< ▼] [0.7 ] │
└──────────────────────────────────────────┘
```

- Add `stage` to form state with default "cross_stage"
- Create stages options array
- Add Select dropdown for stage selection
- Include stage in saved rule data

### 3. Rules Table (`src/components/hitl/RulesTable.tsx`)

Update to use the new `stage` field from the rule instead of deriving it from `ruleType`:

```typescript
// Before: Derived from ruleType
{ruleTypeToStage[rule.ruleType]}

// After: Use rule.stage directly
{stageLabels[rule.stage]}
```

### 4. Parent Components Update

Update save handlers in `OpsPipelineConfig.tsx` and `OrchestrationEngine.tsx` to include the `stage` field when creating new rules.

---

## Visual Layout of New Field

The Stage dropdown will appear after Description and before Rule Type:

```text
Stage
┌────────────────────────────────────┐
│ Screening                        ▼ │
└────────────────────────────────────┘
```

Options when expanded:
- Cross-Stage
- Job Posting
- Sourcing  
- Outreach
- Application
- Screening
- Interview

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/mockData.ts` | Add `HiringStage` type, add `stage` field to `HITLRuleV2`, update mock data |
| `src/components/hitl/RuleBuilderDialog.tsx` | Add stage field to form, add Stage dropdown UI |
| `src/components/hitl/RulesTable.tsx` | Update to use `rule.stage` instead of derived value |
| `src/pages/OpsPipelineConfig.tsx` | Add default stage when creating new rules |
| `src/pages/OrchestrationEngine.tsx` | Add default stage when creating new rules |

