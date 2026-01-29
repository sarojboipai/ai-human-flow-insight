import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  default: "border-border",
  primary: "border-primary/30 bg-primary/5",
  success: "border-success/30 bg-success/5",
  warning: "border-warning/30 bg-warning/5",
  info: "border-info/30 bg-info/5",
};

const iconVariantStyles = {
  default: "bg-secondary text-foreground",
  primary: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  info: "bg-info/20 text-info",
};

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = "default",
  className,
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const isNeutral = change === 0;

  return (
    <div
      className={cn(
        "metric-card border animate-slide-up",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="metric-label">{title}</p>
          <p className="metric-value">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive && <TrendingUp className="h-3.5 w-3.5 text-success" />}
              {isNegative && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
              {isNeutral && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive && "text-success",
                  isNegative && "text-destructive",
                  isNeutral && "text-muted-foreground"
                )}
              >
                {isPositive && "+"}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconVariantStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
