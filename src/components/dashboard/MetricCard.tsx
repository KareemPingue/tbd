
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  description?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  description,
}: MetricCardProps) {
  return (
    <div className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <div className="flex items-center space-x-1">
            {change.trend === "up" ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : change.trend === "down" ? (
              <ArrowDown className="h-4 w-4 text-red-500" />
            ) : null}
            <span
              className={cn(
                "text-sm",
                change.trend === "up"
                  ? "text-green-500"
                  : change.trend === "down"
                  ? "text-red-500"
                  : "text-muted-foreground"
              )}
            >
              {change.value}% from last period
            </span>
          </div>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
