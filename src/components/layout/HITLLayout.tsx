import { ReactNode } from "react";
import { HITLSidebar } from "./HITLSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "./AppHeader";

interface HITLLayoutProps {
  children: ReactNode;
}

export function HITLLayout({ children }: HITLLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <HITLSidebar />
        <SidebarInset className="flex-1">
          <AppHeader searchPlaceholder="Search tasks, candidates..." />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
