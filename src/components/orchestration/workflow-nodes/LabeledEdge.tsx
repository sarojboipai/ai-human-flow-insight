import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { cn } from "@/lib/utils";

interface LabeledEdgeData {
  label?: string;
  color?: "emerald" | "orange" | "blue" | "muted";
}

const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  muted: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
};

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const edgeData = data as LabeledEdgeData | undefined;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
  });

  const colorKey = edgeData?.color || "muted";
  const colors = colorStyles[colorKey] || colorStyles.muted;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: colorKey === "emerald" ? "#10b981" : 
                  colorKey === "orange" ? "#f97316" : 
                  colorKey === "blue" ? "#3b82f6" : 
                  "#94a3b8",
        }}
      />
      {edgeData?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium border",
              colors.bg,
              colors.text,
              colors.border
            )}
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
