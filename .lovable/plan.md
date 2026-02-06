
# Plan: Reorder In-Stage Progress Funnel to First Position

## Overview

This change will swap the order of the first two sections in the stage details panel, placing the In-Stage Progress Funnel before the Attribution Bar.

---

## Current Layout Order

1. **Attribution Bar** (AI vs Human vs HITL) - lines 265-274
2. Stage-Specific Metrics
3. In-Stage Progress Funnel - lines 281-284
4. Conversion Analysis
5. Volume Metrics / Additional Metrics
6. Channel Breakdown
7. Handler & Response Time

---

## New Layout Order

1. **In-Stage Progress Funnel** (moved to 1st position)
2. **Attribution Bar** (moved to 2nd position)
3. Stage-Specific Metrics
4. Conversion Analysis
5. Volume Metrics / Additional Metrics
6. Channel Breakdown
7. Handler & Response Time

---

## Implementation

### File to Modify

**`src/components/customer/StageDetailsSheet.tsx`**

### Change

Reorder the JSX blocks in lines 264-284 so that:
- In-Stage Progress Funnel renders first (currently at lines 281-284)
- Attribution Bar Card renders second (currently at lines 265-274)
- Stage-Specific Metrics stays in 3rd position

**New code order:**
```tsx
<div className="mt-6 space-y-6">
  {/* In-Stage Progress Funnel (if available) */}
  {metrics.progressFunnel && metrics.progressFunnel.length > 0 && (
    <InStageProgressFunnel steps={metrics.progressFunnel} />
  )}

  {/* AI/Human/HITL Attribution Bar */}
  <Card>
    <CardContent className="pt-6">
      <AttributionBar 
        aiPercentage={metrics.aiPercentage}
        humanPercentage={metrics.humanPercentage}
        hitlPercentage={metrics.hitlPercentage}
      />
    </CardContent>
  </Card>

  {/* Stage-Specific Metrics (if available) */}
  {hasStageSpecificMetrics && (
    <StageSpecificMetrics stageId={stageId} metrics={metrics} />
  )}
  
  {/* Rest of the components... */}
```

---

## Outcome

- The In-Stage Progress funnel will be the first component users see when opening the stage details panel
- The Attribution Bar (AI vs Human vs HITL) will appear immediately after the progress funnel
- This order applies to all 8 hiring stages
