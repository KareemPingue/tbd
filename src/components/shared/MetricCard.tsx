
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
}

export function MetricCard({ label, value, delta }: MetricCardProps) {
  const isDeltaPositive = delta?.startsWith("+");
  const isDeltaNegative = delta?.startsWith("-");
  
  return (
    <Card className="p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
        {delta && (
          <div className="flex items-center gap-1">
            {isDeltaPositive && <ArrowUp className="h-4 w-4 text-green-500" />}
            {isDeltaNegative && <ArrowDown className="h-4 w-4 text-red-500" />}
            <span 
              className={cn(
                "text-sm",
                isDeltaPositive ? "text-green-500" : 
                isDeltaNegative ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {delta}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
