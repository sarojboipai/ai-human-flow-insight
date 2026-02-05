import {
  LayoutDashboard,
  Briefcase,
  Settings,
} from "lucide-react";
import swaasaLogo from "@/assets/swaasa-logo.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const customerNavItems = [
  {
    title: "Dashboard",
    url: "/customer",
    icon: LayoutDashboard,
  },
  {
    title: "Business",
    url: "/customer/business",
    icon: Briefcase,
  },
];

export function CustomerSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-16 border-b border-sidebar-border px-2 flex items-center justify-start">
        <div className="flex items-center gap-3">
          <img 
            src={swaasaLogo} 
            alt="Swaasa Logo" 
            className="h-9 w-9 rounded-lg object-cover"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
                SWAASA
              </span>
              <span className="text-xs text-muted-foreground">
                Hiring Intelligence
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customerNavItems.map((item) => (
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
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <NavLink to="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
