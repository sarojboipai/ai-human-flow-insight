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
        <SidebarInset className="flex-1 flex flex-col h-screen overflow-hidden">
          <AppHeader searchPlaceholder="Search workflows, agents, connectors..." currentPersona="Operation Manager" />
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
