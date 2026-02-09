import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WBRMetricsSection } from "@/components/wbr-aop/WBRMetricsSection";
import { AOPTargetDashboard } from "@/components/wbr-aop/AOPTargetDashboard";
import { WBRAOPAlignmentInsights } from "@/components/wbr-aop/WBRAOPAlignmentInsights";
import { CustomerAOPTable } from "@/components/wbr-aop/CustomerAOPTable";
import { StrategicLeversPanel } from "@/components/wbr-aop/StrategicLeversPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { jobs, enterpriseCustomers } from "@/lib/mockData";
import {
  wbrDurationOptions,
  calculateWBRKPIs,
  calculateAOPVariance,
  calculateCustomerAOPPerformance,
  generateRiskFlags,
} from "@/lib/wbrAopData";

export default function WBRAOPCockpit() {
  const [duration, setDuration] = useState("this-week");
  const [customer, setCustomer] = useState("all");

  const filteredJobs = useMemo(() => {
    if (customer === "all") return jobs;
    const custName = enterpriseCustomers.find((c) => c.id === customer)?.name;
    return jobs.filter((j) => j.employer === custName);
  }, [customer]);

  const kpis = useMemo(() => calculateWBRKPIs(filteredJobs), [filteredJobs]);
  const aopVariance = useMemo(() => calculateAOPVariance(filteredJobs), [filteredJobs]);
  const customerPerformance = useMemo(() => calculateCustomerAOPPerformance(), []);
  const riskFlags = useMemo(() => generateRiskFlags(kpis, aopVariance), [kpis, aopVariance]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">WBR + AOP Unified Cockpit</h1>
        <p className="text-muted-foreground">
          Real-time operations aligned with annual hiring and revenue targets
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 mb-6 -mx-6 px-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-[160px] h-9 bg-secondary/50 border-none">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {wbrDurationOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={customer} onValueChange={setCustomer}>
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
      </div>

      {/* Section 1: WBR Operations Overview */}
      <WBRMetricsSection kpis={kpis} />

      <Separator className="my-8" />

      {/* Section 2: AOP Target vs Actual */}
      <AOPTargetDashboard rows={aopVariance} />

      <Separator className="my-8" />

      {/* Section 3: WBR vs AOP Alignment */}
      <WBRAOPAlignmentInsights kpis={kpis} riskFlags={riskFlags} />

      <Separator className="my-8" />

      {/* Section 4: Customer-Level AOP */}
      <CustomerAOPTable data={customerPerformance} />

      <Separator className="my-8" />

      {/* Section 5: Strategic Levers */}
      <StrategicLeversPanel />
    </DashboardLayout>
  );
}
