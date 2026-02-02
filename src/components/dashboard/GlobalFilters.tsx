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
      {/* Duration Selector - Dropdown */}
      <Select value={duration} onValueChange={onDurationChange}>
        <SelectTrigger className="w-[160px] h-9 bg-secondary/50 border-none">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          {durationOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
