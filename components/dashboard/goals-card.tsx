import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Goal {
  label: string
  current: number
  target: number
}

interface GoalsCardProps {
  title: string
  description: string
  goals: Goal[]
}

export function GoalsCard({ title, description, goals }: GoalsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0
            return (
              <div key={goal.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground">{goal.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
