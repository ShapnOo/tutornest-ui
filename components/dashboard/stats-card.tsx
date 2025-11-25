import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: LucideIcon
  iconColor?: string
  footer?: {
    left: { label: string; value: string | number }
    right: { label: string; value: string | number }
  }
}

export function StatsCard({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  footer,
}: StatsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
            {change && (
              <p
                className={cn(
                  "text-xs mt-1 flex items-center gap-1",
                  changeType === "positive" && "text-accent",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground",
                )}
              >
                {changeType === "positive" && "↗"}
                {changeType === "negative" && "↘"}
                {change}
              </p>
            )}
          </div>
          {Icon && (
            <div className={cn("p-2 rounded-lg bg-secondary", iconColor)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        {footer && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <div className="text-xs">
              <span className="text-muted-foreground">{footer.left.label}: </span>
              <span className="font-medium text-foreground">{footer.left.value}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">{footer.right.label}: </span>
              <span className="font-medium text-foreground">{footer.right.value}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
