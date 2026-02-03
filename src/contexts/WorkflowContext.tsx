import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Workflow, workflows as mockWorkflows } from "@/lib/mockData";

interface WorkflowContextType {
  workflows: Workflow[];
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  getWorkflow: (id: string) => Workflow | undefined;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);

  const addWorkflow = useCallback((workflow: Workflow) => {
    setWorkflows((prev) => [...prev, workflow]);
  }, []);

  const updateWorkflow = useCallback((id: string, updates: Partial<Workflow>) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, ...updates, updatedAt: new Date().toISOString().split("T")[0] }
          : w
      )
    );
  }, []);

  const deleteWorkflow = useCallback((id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const getWorkflow = useCallback(
    (id: string) => workflows.find((w) => w.id === id),
    [workflows]
  );

  return (
    <WorkflowContext.Provider
      value={{ workflows, addWorkflow, updateWorkflow, deleteWorkflow, getWorkflow }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflows() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error("useWorkflows must be used within a WorkflowProvider");
  }
  return context;
}
