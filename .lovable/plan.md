

## Add AI Agent & Human Task Details to Stage Details Panel

### What This Does
When you click a node in the customer pipeline board and the stage details sheet opens, it will now show two new sections:
- **AI Agent Involved** -- which AI agent handles this stage and what it does
- **Human Involved** -- which human role is responsible and what they do

These appear as cards between the Attribution Bar and the stage-specific metrics, giving full transparency into who does what at each stage.

### Changes

#### 1. Extend the EnhancedStageMetrics data model
**File: `src/lib/mockData.ts`**

Add new optional fields to the `EnhancedStageMetrics` interface:
- `aiAgentName?: string` -- e.g. "Sourcing Agent", "Voice Screening Agent"
- `aiTaskDescription?: string` -- e.g. "Auto-source candidates from job boards"
- `humanRoleName?: string` -- e.g. "Recruiter", "Hiring Manager"
- `humanTaskDescription?: string` -- e.g. "College outreach for nursing institutes"

Then populate these fields across all existing mock data entries (all jobs' `enhancedStageMetrics`) with realistic values per stage. For example:
- **Sourcing stage**: AI Agent = "Sourcing Agent" doing "Automated candidate search across job boards", Human = "Sourcer" doing "College outreach and referral follow-ups"
- **Voice Screening stage**: AI Agent = "Voice Screening Agent" doing "Automated phone screening with NLP analysis", Human = "Recruiter" doing "Manual interview for edge cases"
- **Interview Scheduling**: AI Agent = "Scheduling Agent" doing "AI-powered slot suggestion and auto-booking", Human = "Recruiter" doing "Manual calendar coordination for senior roles"

#### 2. Add AI Agent & Human Task cards to StageDetailsSheet
**File: `src/components/customer/StageDetailsSheet.tsx`**

Add two new card sections right after the Attribution Bar card:

**AI Agent Card** (shown when `metrics.aiAgentName` exists):
- Orange-themed card with Bot icon
- Agent name in bold
- Task description below
- AI percentage badge

**Human Task Card** (shown when `metrics.humanRoleName` exists):
- Blue-themed card with Users icon
- Role name in bold
- Task description below
- Human percentage badge

Layout:
```text
+----------------------------------+
| [Attribution Bar - existing]     |
+----------------------------------+
| AI Agent Involved                |
| [Bot icon] Sourcing Agent        |
| "Auto-source candidates from..." |
| [85% badge]                      |
+----------------------------------+
| Human Involved                   |
| [Users icon] Recruiter           |
| "College outreach for nursing.." |
| [12% badge]                      |
+----------------------------------+
| [Stage-specific metrics - exist] |
+----------------------------------+
```

### Technical Details

**Updated `EnhancedStageMetrics` interface (additions only):**
```text
EnhancedStageMetrics {
  // ... existing fields unchanged
  aiAgentName?: string;
  aiTaskDescription?: string;
  humanRoleName?: string;
  humanTaskDescription?: string;
}
```

**Files to modify:**
- `src/lib/mockData.ts` -- add 4 fields to interface + populate in all mock data entries
- `src/components/customer/StageDetailsSheet.tsx` -- add two new card sections after the Attribution Bar
