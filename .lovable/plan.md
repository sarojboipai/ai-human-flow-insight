

## Fix: Missing Icon Mappings Crashing Anaesthesia Technician Pipeline

### Root Cause
The Chandan Hospital workflow uses icon names (`"check"`, `"briefcase"`, `"clipboard"`, `"megaphone"`, `"search"`) that don't exist in the `iconMap` of the respective node components. When React tries to render `undefined` as a component, it crashes with "Element type is invalid."

### Changes

**1. `src/components/customer/pipeline-nodes/OutcomeNode.tsx`**
- Add `Check` from lucide-react to imports
- Add `"check": Check` to `iconMap`

**2. `src/components/customer/pipeline-nodes/CandidateNode.tsx`**
- Add `Briefcase`, `ClipboardList` from lucide-react
- Add `"briefcase": Briefcase` and `"clipboard": ClipboardList` to `iconMap`

**3. `src/components/customer/pipeline-nodes/AutomationNode.tsx`**
- Add `Megaphone` from lucide-react
- Add `"megaphone": Megaphone` to `iconMap`

**4. `src/components/customer/pipeline-nodes/AIAgentNode.tsx`**
- Add `Search` from lucide-react
- Add `"search": Search` to `iconMap`

These are small, targeted additions -- just importing the missing Lucide icons and registering them in each node's `iconMap`. No logic changes needed.
