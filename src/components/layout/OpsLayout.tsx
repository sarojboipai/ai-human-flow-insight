import { ReactNode } from "react";
import { OpsSidebar } from "./OpsSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "./AppHeader";

interface OpsLayoutProps {
  children: ReactNode;
}

export function OpsLayout({ children }: OpsLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <OpsSidebar />
        <SidebarInset className="flex-1">
          <AppHeader searchPlaceholder="Search workflows, agents, connectors..." />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
