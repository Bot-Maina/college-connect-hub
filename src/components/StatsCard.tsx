import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  trendUp = true 
}: StatsCardProps) => {
  return (
    <Card className="hover:shadow-soft transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-xs mt-2",
                trendUp ? "text-green-600" : "text-destructive"
              )}>
                {trend}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
            <Icon className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
