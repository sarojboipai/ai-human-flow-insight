

# Add Location & Industry Fields to Template Configuration

Add two new configuration fields (Location and Industry) and simplify the existing Job Zone field.

---

## Current State vs New State

| Current | New |
|---------|-----|
| Job Zone combines zone + tier concept (Zone 1 Metro, Zone 2 Tier 1, etc.) | Job Zone is standalone (Zone 1, 2, 3, 4) |
| No Location field | Location Tier (Tier 1, Tier 2, Tier 3) |
| No Industry field | Industry (Hospital, Diagnostic Lab, Pharmaceuticals) |

---

## Changes

### 1. Update TemplateMetadata Interface

Add two new fields to the interface:

```typescript
export interface TemplateMetadata {
  name: string;
  hiringType: "bulk" | "fast_track" | "niche";
  profession: "nurse" | "doctor" | "pharmacist" | "technician";
  jobZone: 1 | 2 | 3 | 4;                                        // Simplified labels
  locationTier: "tier_1" | "tier_2" | "tier_3";                  // NEW
  industry: "hospital" | "diagnostic_lab" | "pharmaceuticals";   // NEW
  defaultSLAProfile: string;
  defaultAICoverage: number;
  enterpriseOverrideAllowed: boolean;
  complianceRequired: boolean;
}
```

### 2. Update Form Layout

Reorganize the grid to accommodate the new fields (7 fields in first row):

| Template Name | Hiring Type | Profession | Job Zone | Location | Industry | SLA Profile |
|---------------|-------------|------------|----------|----------|----------|-------------|
| (span 2)      | (span 1)    | (span 1)   | (span 1) | (span 1) | (span 1) | (span 1)    |

### 3. Field Options

**Job Zone** (simplified):
- Zone 1
- Zone 2
- Zone 3
- Zone 4

**Location Tier** (new):
- Tier 1 (Metro)
- Tier 2 (Urban)
- Tier 3 (Rural)

**Industry** (new):
- Hospital
- Diagnostic Lab
- Pharmaceuticals

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/orchestration/TemplateMetadataForm.tsx` | Add `locationTier` and `industry` fields to interface and form, update Job Zone labels |
| `src/pages/PipelineTemplateBuilder.tsx` | Add default values for new fields in `DEFAULT_METADATA` |

---

## Updated Collapsed Header Preview

When collapsed, show key metadata:
```
Template Configuration: Nurse Tier 1 Bulk Hiring • nurse • Zone 1 • Tier 1 • Hospital
```

