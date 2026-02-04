import { Bell, ChevronDown, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { NotificationsPopover } from "@/components/hitl/NotificationsPopover";

interface AppHeaderProps {
  currentPersona?: "Admin" | "Operation Manager" | "HITL" | "Customer";
}

export function AppHeader({ currentPersona = "Admin" }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <SidebarTrigger className="-ml-2" />
      
      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {currentPersona === "HITL" ? (
          <NotificationsPopover />
        ) : (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <UserCog className="h-4 w-4" />
              <span>{currentPersona}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/")}>
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/ops")}>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
