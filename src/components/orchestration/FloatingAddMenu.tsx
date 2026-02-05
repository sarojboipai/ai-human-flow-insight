import React, { useState } from "react";
import { Plus, Zap, User, HelpCircle, GitBranch, CheckSquare, MessageSquare, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NodeOption {
  type: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "trigger" | "stage" | "condition" | "action" | "output";
  iconColor?: string;
  description?: string;
}

const nodeOptions: NodeOption[] = [
  {
    type: "triggerNode",
    label: "Trigger",
    icon: Zap,
    category: "trigger",
    iconColor: "emerald",
    description: "Start point for workflow",
  },
  {
    type: "stageCardNode",
    label: "Candidate Details",
    icon: User,
    category: "stage",
    iconColor: "purple",
    description: "Collect candidate information",
  },
  {
    type: "stageCardNode",
    label: "Screening Questions",
    icon: HelpCircle,
    category: "stage",
    iconColor: "coral",
    description: "Ask screening questions",
  },
  {
    type: "conditionNode",
    label: "Condition",
    icon: GitBranch,
    category: "condition",
    iconColor: "amber",
    description: "Branch based on criteria",
  },
  {
    type: "actionNode",
    label: "Update Status",
    icon: CheckSquare,
    category: "action",
    iconColor: "green",
    description: "Update candidate status",
  },
  {
    type: "actionNode",
    label: "Send Message",
    icon: MessageSquare,
    category: "action",
    iconColor: "blue",
    description: "Send notification or message",
  },
  {
    type: "outputNode",
    label: "Output",
    icon: Flag,
    category: "output",
    iconColor: "muted",
    description: "End point for workflow path",
  },
];

interface FloatingAddMenuProps {
  onAddNode: (option: NodeOption, position: { x: number; y: number }) => void;
  canvasCenter?: { x: number; y: number };
}

export function FloatingAddMenu({ onAddNode, canvasCenter = { x: 400, y: 300 } }: FloatingAddMenuProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: NodeOption) => {
    onAddNode(option, canvasCenter);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>Add Node</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Triggers
        </DropdownMenuLabel>
        {nodeOptions
          .filter((o) => o.category === "trigger")
          .map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4 text-emerald-600" />
              {option.label}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Stages
        </DropdownMenuLabel>
        {nodeOptions
          .filter((o) => o.category === "stage")
          .map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4 text-violet-600" />
              {option.label}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Logic
        </DropdownMenuLabel>
        {nodeOptions
          .filter((o) => o.category === "condition")
          .map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4 text-amber-600" />
              {option.label}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Actions
        </DropdownMenuLabel>
        {nodeOptions
          .filter((o) => o.category === "action")
          .map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4 text-blue-600" />
              {option.label}
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Outputs
        </DropdownMenuLabel>
        {nodeOptions
          .filter((o) => o.category === "output")
          .map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4 text-muted-foreground" />
              {option.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
