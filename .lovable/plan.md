
# Replace Sidebar Logo with Swaasa Logo Across All Pages

Replace the icon-based logos in all four sidebar components with the uploaded Swaasa logo image for consistent branding across all personas.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/assets/swaasa-logo.png` | Create | Add logo image to assets folder |
| `src/components/layout/AppSidebar.tsx` | Modify | Replace BarChart3 icon with Swaasa logo |
| `src/components/layout/CustomerSidebar.tsx` | Modify | Replace BarChart3 icon with Swaasa logo |
| `src/components/layout/OpsSidebar.tsx` | Modify | Replace Network icon with Swaasa logo |
| `src/components/layout/HITLSidebar.tsx` | Modify | Replace ListTodo icon with Swaasa logo |

---

## Technical Details

### 1. Create Assets Folder and Add Logo

```
src/assets/swaasa-logo.png  ← Copy uploaded logo here
```

### 2. AppSidebar.tsx Changes

**Add import**
```tsx
import swaasaLogo from "@/assets/swaasa-logo.png";
```

**Remove BarChart3 from imports (line 9)**

**Replace icon container (lines 83-85)**
```tsx
// Before
<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
  <BarChart3 className="h-5 w-5 text-primary-foreground" />
</div>

// After
<img 
  src={swaasaLogo} 
  alt="Swaasa Logo" 
  className="h-9 w-9 rounded-lg object-cover"
/>
```

### 3. CustomerSidebar.tsx Changes

**Add import**
```tsx
import swaasaLogo from "@/assets/swaasa-logo.png";
```

**Remove BarChart3 from imports (line 5)**

**Replace icon container (lines 46-48)**
```tsx
// Before
<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
  <BarChart3 className="h-5 w-5 text-primary-foreground" />
</div>

// After
<img 
  src={swaasaLogo} 
  alt="Swaasa Logo" 
  className="h-9 w-9 rounded-lg object-cover"
/>
```

### 4. OpsSidebar.tsx Changes

**Add import**
```tsx
import swaasaLogo from "@/assets/swaasa-logo.png";
```

**Replace icon container (lines 63-65)**
```tsx
// Before
<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
  <Network className="h-5 w-5 text-primary-foreground" />
</div>

// After
<img 
  src={swaasaLogo} 
  alt="Swaasa Logo" 
  className="h-9 w-9 rounded-lg object-cover"
/>
```

### 5. HITLSidebar.tsx Changes

**Add import**
```tsx
import swaasaLogo from "@/assets/swaasa-logo.png";
```

**Replace icon container (lines 50-52)**
```tsx
// Before
<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
  <ListTodo className="h-5 w-5 text-primary-foreground" />
</div>

// After
<img 
  src={swaasaLogo} 
  alt="Swaasa Logo" 
  className="h-9 w-9 rounded-lg object-cover"
/>
```

---

## Result

All four persona sidebars (Admin, Customer, Operations, HITL) will display the Swaasa "S" logo in the header instead of generic Lucide icons, providing consistent branding across the entire application.

| Sidebar | Current Icon | New Logo |
|---------|--------------|----------|
| AppSidebar (Admin) | BarChart3 | Swaasa Logo |
| CustomerSidebar | BarChart3 | Swaasa Logo |
| OpsSidebar | Network | Swaasa Logo |
| HITLSidebar | ListTodo | Swaasa Logo |
