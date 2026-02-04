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
        <SidebarInset className="flex-1 flex flex-col h-screen overflow-hidden">
          <AppHeader currentPersona="HITL" />
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
