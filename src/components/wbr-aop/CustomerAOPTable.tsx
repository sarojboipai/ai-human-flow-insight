import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { CustomerAOPPerformance } from "@/lib/wbrAopData";

interface CustomerAOPTableProps {
  data: CustomerAOPPerformance[];
}

type SortKey = keyof CustomerAOPPerformance;

export function CustomerAOPTable({ data }: CustomerAOPTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const SortHeader = ({ label, sortField }: { label: string; sortField: SortKey }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium text-xs hover:bg-transparent"
      onClick={() => handleSort(sortField)}
    >
      {label}
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  );

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Customer-Level AOP Performance</h2>
        <p className="text-sm text-muted-foreground">
          Enterprise customer scorecard against annual targets
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">
            Enterprise Customer Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><SortHeader label="Customer" sortField="name" /></TableHead>
                <TableHead className="text-right"><SortHeader label="AOP Jobs" sortField="aopJobs" /></TableHead>
                <TableHead className="text-right"><SortHeader label="Actual Jobs" sortField="actualJobs" /></TableHead>
                <TableHead className="text-right"><SortHeader label="Placements" sortField="placements" /></TableHead>
                <TableHead className="text-right"><SortHeader label="Revenue" sortField="revenue" /></TableHead>
                <TableHead className="text-right"><SortHeader label="SLA %" sortField="slaPercent" /></TableHead>
                <TableHead className="text-right"><SortHeader label="AI %" sortField="aiPercent" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {row.aopJobs.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.actualJobs.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.placements.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">{row.revenue}</TableCell>
                  <TableCell className="text-right">{row.slaPercent}%</TableCell>
                  <TableCell className="text-right">{row.aiPercent}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
