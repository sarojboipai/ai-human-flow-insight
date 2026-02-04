

## Add HITL Notification System Based on Task Priorities

### Overview
Implement a notification dropdown for the HITL persona that displays system-generated notifications based on task priorities. The notification bell in the header will show a badge count and reveal a popover with priority-sorted task alerts.

### User Experience

When a HITL user clicks the bell icon in the header:
1. A popover opens showing recent notifications
2. Notifications are color-coded by priority (high = red, medium = amber, low = blue)
3. High-priority items appear at the top
4. Each notification shows the task ID, candidate name, rule that triggered it, and time
5. Clicking a notification could navigate to the HITL Queue or dismiss it

### Visual Design

```text
+----------------------------------+
|  Notifications            (12)   |
+----------------------------------+
| [!] HIGH  HITL-001 - Amit Verma  |
|     Low AI Confidence  - 2h ago  |
|----------------------------------+
| [!] HIGH  HITL-002 - Neha Gupta  |
|     Enterprise Employer - 4h ago |
|----------------------------------+
| [o] MED   HITL-003 - Dr. Rajesh  |
|     Senior Doctor Roles - 6h ago |
|----------------------------------+
| [ ] LOW   HITL-005 - Kiran Joshi |
|     Low AI Confidence  - 1d ago  |
+----------------------------------+
|       Mark all as read           |
+----------------------------------+
```

### Technical Implementation

#### 1. Create Notification Types and Mock Data

**File: `src/lib/mockData.ts`**

Add a new interface and mock data for HITL notifications:

```typescript
export interface HITLNotification {
  id: string;
  taskId: string;
  type: "new_task" | "priority_escalation" | "sla_warning" | "assignment";
  title: string;
  message: string;
  priority: TaskPriority;
  isRead: boolean;
  createdAt: string;
  relatedCandidate?: string;
  relatedJob?: string;
}

export const hitlNotifications: HITLNotification[] = [
  // Generate from hitlTasks - high priority pending tasks, SLA warnings, etc.
];
```

#### 2. Create Notifications Component

**File: `src/components/hitl/NotificationsPopover.tsx`**

A new component that:
- Uses Popover from shadcn/ui
- Displays notifications in a scrollable list
- Shows priority badges with color coding
- Shows unread count on the bell icon
- Provides "Mark all as read" action
- Links to relevant HITL tasks

Key features:
- Sorted by priority (high first, then medium, then low)
- Secondary sort by recency
- Shows notification type icon
- Truncates long messages
- Shows relative timestamps

#### 3. Update AppHeader for HITL Persona

**File: `src/components/layout/AppHeader.tsx`**

Modify the header to:
- Import the new `NotificationsPopover` component
- Conditionally render it when `currentPersona === "HITL"`
- Replace the static bell button with the interactive popover for HITL
- Keep the existing static bell for other personas

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/lib/mockData.ts` | Modify | Add HITLNotification interface and mock data |
| `src/components/hitl/NotificationsPopover.tsx` | Create | New notification popover component |
| `src/components/layout/AppHeader.tsx` | Modify | Integrate notifications for HITL persona |

### Component Structure

```text
AppHeader
  |
  +-- (HITL persona)
  |     +-- NotificationsPopover
  |           +-- Popover
  |           |     +-- PopoverTrigger (Bell icon with count badge)
  |           |     +-- PopoverContent
  |           |           +-- Header with title and count
  |           |           +-- ScrollArea with notification items
  |           |           +-- Footer with "Mark all read" button
  |
  +-- (Other personas)
        +-- Static Bell Button (existing)
```

### Mock Notification Data Strategy

Generate notifications from existing `hitlTasks`:
- **New Task** notifications for pending tasks
- **Priority Escalation** for high-priority tasks
- **SLA Warning** for tasks with short due times or "OVERDUE"
- **Assignment** for recently assigned tasks

This ensures notifications are contextually relevant to the HITL queue.

### Priority Color Scheme (consistent with existing)

- **High**: `bg-destructive/20 text-destructive` (red tones)
- **Medium**: `bg-warning/20 text-warning` (amber tones)
- **Low**: `bg-muted text-muted-foreground` (gray tones)

