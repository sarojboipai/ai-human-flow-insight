import { Bot, Shield, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { strategicLevers } from "@/lib/wbrAopData";

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  shield: Shield,
  clock: Clock,
  target: Target,
};

export function StrategicLeversPanel() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Strategic Ops Levers</h2>
        <p className="text-sm text-muted-foreground">
          Current operational control settings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategicLevers.map((lever) => {
          const Icon = iconMap[lever.icon] || Target;
          return (
            <Card key={lever.id} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-medium">
                    {lever.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-1">{lever.value}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lever.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
