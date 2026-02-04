

# Remove Active Column & Add Stage Column to Rules Table

## Summary
Modify the Rules Table to remove the "Active" toggle column and add a new "Stage" column that displays which hiring stage each rule applies to.

---

## Changes Overview

### Column Changes
| Remove | Add |
|--------|-----|
| Active (Switch toggle) | Stage (hiring stage label) |

### Hiring Stage Mapping
Rules will be mapped to stages based on their `ruleType`:

| ruleType | Stage Display |
|----------|--------------|
| posting | Job Posting |
| sourcing | Sourcing |
| outreach | Outreach |
| application | Application |
| screening | Screening |
| interview | Interview |
| confidence | Cross-Stage |
| business | Cross-Stage |
| anomaly | Cross-Stage |
| sla | Cross-Stage |

---

## File to Modify

### `src/components/hitl/RulesTable.tsx`

1. **Remove the Switch import** (no longer needed)

2. **Add stage mapping constant**:
   ```tsx
   const ruleTypeToStage: Record<RuleType, string> = {
     posting: "Job Posting",
     sourcing: "Sourcing",
     outreach: "Outreach",
     application: "Application",
     screening: "Screening",
     interview: "Interview",
     confidence: "Cross-Stage",
     business: "Cross-Stage",
     anomaly: "Cross-Stage",
     sla: "Cross-Stage",
   };
   ```

3. **Update table header**: Replace "Active" with "Stage"

4. **Update table body**:
   - Remove the Switch cell
   - Add Stage cell with the mapped stage name

5. **Update colSpan**: Change from 9 to 9 (stays same since we remove one and add one)

---

## Visual Layout

### Before
| Active | Name | Type | Condition | Action | Priority | Triggers | Last Triggered | ... |
|--------|------|------|-----------|--------|----------|----------|----------------|-----|
| [Switch] | ... | ... | ... | ... | ... | ... | ... | ... |

### After
| Stage | Name | Type | Condition | Action | Priority | Triggers | Last Triggered | ... |
|-------|------|------|-----------|--------|----------|----------|----------------|-----|
| Job Posting | ... | posting | ... | ... | ... | ... | ... | ... |
| Sourcing | ... | sourcing | ... | ... | ... | ... | ... | ... |
| Cross-Stage | ... | confidence | ... | ... | ... | ... | ... | ... |

---

## Technical Details

### Stage Cell Styling
The Stage column will use a simple text display with subtle styling to differentiate pipeline stages from cross-stage rules:
- Pipeline stages: Normal text
- Cross-Stage: Muted text color

### No Data Model Changes
The stage is derived from the existing `ruleType` field - no changes needed to `mockData.ts`.

