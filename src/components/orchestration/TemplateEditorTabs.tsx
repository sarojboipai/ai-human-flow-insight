import { Workflow, Settings2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type TemplateEditorTab = "workflow" | "automation" | "rules";

interface TemplateEditorTabsProps {
  activeTab: TemplateEditorTab;
  onTabChange: (tab: TemplateEditorTab) => void;
  isDirtyWorkflow?: boolean;
  isDirtyAutomation?: boolean;
  isDirtyRules?: boolean;
}

const tabs: { id: TemplateEditorTab; label: string; icon: React.ReactNode }[] = [
  { id: "workflow", label: "Workflow", icon: <Workflow className="h-4 w-4" /> },
  { id: "automation", label: "Automation", icon: <Settings2 className="h-4 w-4" /> },
  { id: "rules", label: "Rules", icon: <Shield className="h-4 w-4" /> },
];

export function TemplateEditorTabs({
  activeTab,
  onTabChange,
  isDirtyWorkflow,
  isDirtyAutomation,
  isDirtyRules,
}: TemplateEditorTabsProps) {
  const getDirtyState = (tabId: TemplateEditorTab) => {
    switch (tabId) {
      case "workflow":
        return isDirtyWorkflow;
      case "automation":
        return isDirtyAutomation;
      case "rules":
        return isDirtyRules;
      default:
        return false;
    }
  };

  return (
    <div className="border-b bg-muted/30">
      <div className="flex items-center gap-1 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDirty = getDirtyState(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative",
                "hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "text-foreground bg-background border-b-2 border-primary -mb-px"
                  : "text-muted-foreground"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isDirty && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] bg-warning/20 text-warning border-warning/30"
                >
                  •
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
