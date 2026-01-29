import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recruiter {
  id: string;
  name: string;
  avatar?: string;
  team: string;
  screened: number;
  interviews: number;
  placements: number;
  revenue: number;
  change: number;
}

interface RecruiterTableProps {
  recruiters: Recruiter[];
  title?: string;
}

export function RecruiterTable({ recruiters, title }: RecruiterTableProps) {
  return (
    <div className="chart-container">
      {title && <h3 className="section-title mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Recruiter</TableHead>
              <TableHead className="text-muted-foreground font-medium">Team</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Screened</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Interviews</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Placements</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Revenue</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruiters.map((recruiter) => (
              <TableRow key={recruiter.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={recruiter.avatar} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {recruiter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{recruiter.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {recruiter.team}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {recruiter.screened}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {recruiter.interviews}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {recruiter.placements}
                </TableCell>
                <TableCell className="text-right font-mono">
                  ₹{recruiter.revenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {recruiter.change > 0 && (
                      <>
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-sm text-success">+{recruiter.change}%</span>
                      </>
                    )}
                    {recruiter.change < 0 && (
                      <>
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">{recruiter.change}%</span>
                      </>
                    )}
                    {recruiter.change === 0 && (
                      <>
                        <Minus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">0%</span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
