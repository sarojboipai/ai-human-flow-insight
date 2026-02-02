import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enterpriseCustomers } from "@/lib/mockData";

interface GlobalFiltersProps {
  duration: string;
  onDurationChange: (value: string) => void;
  customer: string;
  onCustomerChange: (value: string) => void;
}

const durationOptions = [
  { value: "today", label: "Today" },
  { value: "7days", label: "Last 7 days" },
  { value: "30days", label: "Last 30 days" },
  { value: "quarter", label: "Last Quarter" },
  { value: "custom", label: "Custom Range" },
];

export function GlobalFilters({
  duration,
  onDurationChange,
  customer,
  onCustomerChange,
}: GlobalFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Duration Selector - Segmented Control Style */}
      <div className="flex items-center gap-1 rounded-lg bg-secondary/50 p-1">
        {durationOptions.slice(0, 4).map((option) => (
          <Button
            key={option.value}
            variant={duration === option.value ? "default" : "ghost"}
            size="sm"
            className={`h-8 px-3 text-xs ${
              duration === option.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onDurationChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Customer Selector */}
      <Select value={customer} onValueChange={onCustomerChange}>
        <SelectTrigger className="w-[200px] h-9 bg-secondary/50 border-none">
          <SelectValue placeholder="All Customers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Customers</SelectItem>
          {enterpriseCustomers.map((cust) => (
            <SelectItem key={cust.id} value={cust.id}>
              {cust.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
