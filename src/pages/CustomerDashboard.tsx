import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Bell, Search, User, LayoutDashboard, Users, FileText, Settings, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { id: "recruiter", label: "Recruiter Dashboard", icon: LayoutDashboard },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "jobs", label: "Jobs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recruiter");

  const renderContent = () => {
    switch (activeTab) {
      case "recruiter":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>
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
          </div>
        );
      case "candidates":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Candidates</h2>
            <p className="text-muted-foreground">Manage and view all candidates.</p>
          </div>
        );
      case "jobs":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Jobs</h2>
            <p className="text-muted-foreground">View and manage job postings.</p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-muted-foreground">Configure your preferences.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarContent className="pt-4">
            <div className="px-4 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Main
              </Button>
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex-1 flex items-center gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
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
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Operation Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    HITL
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer")}>
                    Customer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
