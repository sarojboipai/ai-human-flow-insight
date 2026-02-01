

# Remove Orchestration Section from Admin Sidebar

This plan removes the "Orchestration" navigation section from the Admin sidebar.

---

## Overview

The Orchestration Engine section will be removed from the Admin page sidebar to streamline the navigation.

---

## Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/components/layout/AppSidebar.tsx` | Modify | Remove orchestrationItems array and its SidebarGroup |

---

## Specific Changes

### 1. Remove orchestrationItems array (lines 47-53)

Delete:
```tsx
const orchestrationItems = [
  {
    title: "Orchestration Engine",
    url: "/orchestration",
    icon: Network,
  },
];
```

### 2. Remove Orchestration SidebarGroup (lines 133-155)

Delete the entire Orchestration section:
```tsx
<SidebarGroup>
  <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
    Orchestration
  </SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      {orchestrationItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.url)}
            tooltip={item.title}
          >
            <NavLink to={item.url}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
```

### 3. Remove unused Network import

Remove `Network` from the lucide-react imports since it will no longer be used.

---

## Result

- The sidebar will show: Overview, Operations, and Business sections
- The Orchestration Engine page still exists and can be accessed directly via URL if needed
- Cleaner, more focused Admin navigation

