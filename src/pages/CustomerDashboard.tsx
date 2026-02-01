import { CustomerSidebar } from "@/components/layout/CustomerSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Bell, Search, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CustomerSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger className="-ml-2" />
            
            <div className="flex-1 flex items-center gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search candidates, employers, recruiters..."
                  className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCog className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orchestration")}>
                    Operation Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/hitl")}>
                    HITL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer")}>
                    Customer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Customer Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your customer portal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Active Jobs</h3>
                <p className="text-3xl font-bold mt-2">24</p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Total Candidates</h3>
                <p className="text-3xl font-bold mt-2">1,234</p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-sm font-medium text-muted-foreground">Interviews Scheduled</h3>
                <p className="text-3xl font-bold mt-2">18</p>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
