import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  FileText, 
  RefreshCw, 
  Users, 
  Search, 
  Heart, 
  ClipboardList, 
  Phone,
  Calendar,
  Award,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  Timer
} from "lucide-react";
import type { StageMetrics } from "@/lib/mockData";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  fileText: FileText,
  refresh: RefreshCw,
  users: Users,
  search: Search,
  heart: Heart,
  clipboard: ClipboardList,
  phone: Phone,
  calendar: Calendar,
  award: Award,
  userPlus: UserPlus,
};

const handlerNames: Record<string, string> = {
  R: "Recruiter",
  C: "Candidate",
  H: "Hiring Team",
  AE: "Auto Engine",
  "X+": "X+ Intelligence",
};

const handlerColors: Record<string, string> = {
  R: "bg-orange-100 text-orange-600",
  C: "bg-purple-100 text-purple-600",
  H: "bg-emerald-100 text-emerald-600",
  AE: "bg-amber-100 text-amber-600",
  "X+": "bg-gradient-to-r from-orange-100 to-rose-100 text-orange-600",
};

interface StageDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageName: string;
  stageIcon?: string;
  metrics: StageMetrics | null;
}

export function StageDetailsSheet({ 
  open, 
  onOpenChange, 
  stageName, 
  stageIcon,
  metrics 
}: StageDetailsSheetProps) {
  const Icon = stageIcon ? iconMap[stageIcon] : Briefcase;
  
  if (!metrics) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {stageName}
            </SheetTitle>
            <SheetDescription>Stage details</SheetDescription>
          </SheetHeader>
          <div className="mt-6 text-center text-muted-foreground">
            No detailed metrics available for this stage.
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const sentPercent = 100;
  const appearedPercent = Math.round((metrics.appeared / metrics.sent) * 100);
  const qualifiedPercent = Math.round((metrics.qualified / metrics.appeared) * 100);
  const disqualifiedPercent = Math.round((metrics.disqualified / metrics.appeared) * 100);
  const pendingPercent = Math.round((metrics.pending / metrics.sent) * 100);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            {stageName}
          </SheetTitle>
          <SheetDescription>Screening metrics and conversion rates</SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Screenings Overview Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Screenings Overview</h4>
              
              {/* Sent */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    Sent
                  </span>
                  <span className="font-semibold">{metrics.sent} <span className="text-muted-foreground font-normal">({sentPercent}%)</span></span>
                </div>
                <Progress value={sentPercent} className="h-2" />
              </div>

              {/* Appeared */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Appeared
                  </span>
                  <span className="font-semibold">{metrics.appeared} <span className="text-muted-foreground font-normal">({appearedPercent}%)</span></span>
                </div>
                <Progress value={appearedPercent} className="h-2" />
              </div>

              {/* Qualified */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Qualified
                  </span>
                  <span className="font-semibold">{metrics.qualified} <span className="text-muted-foreground font-normal">({qualifiedPercent}%)</span></span>
                </div>
                <Progress value={qualifiedPercent} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Additional Metrics</h4>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Disqualified
                </span>
                <span className="font-semibold">{metrics.disqualified} <span className="text-muted-foreground font-normal">({disqualifiedPercent}%)</span></span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-amber-500" />
                  Pending
                </span>
                <span className="font-semibold">{metrics.pending} <span className="text-muted-foreground font-normal">({pendingPercent}%)</span></span>
              </div>
            </CardContent>
          </Card>

          {/* Handler & Response Time */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Avg Response Time
                </span>
                <span className="font-semibold">{metrics.avgResponseTime}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Handler</span>
                <span className={`${handlerColors[metrics.handler]} text-xs font-bold px-2 py-1 rounded-full`}>
                  {metrics.handler} – {handlerNames[metrics.handler]}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}