import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface RecentBid {
  id: string
  tuitionTitle: string
  proposedAmount: number
  originalBudget: number
  status: string
  appliedDate: string
}

interface RecentBidsProps {
  bids: RecentBid[]
  userType: "teacher" | "guardian"
}

export function RecentBids({ bids, userType }: RecentBidsProps) {
  const statusColors: Record<string, string> = {
    applied: "bg-info/10 text-info border-info/20",
    shortlisted: "bg-warning/10 text-warning border-warning/20",
    "demo-scheduled": "bg-primary/10 text-primary border-primary/20",
    hired: "bg-accent/10 text-accent border-accent/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold text-foreground">
            {userType === "teacher" ? "Recent Applications" : "Recent Bids Received"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-0.5">
            {userType === "teacher"
              ? "Your recent tuition applications and their status"
              : "Latest bids on your tuition posts"}
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${userType}/my-bids`}>View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{bid.tuitionTitle}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Applied: {bid.appliedDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">₹{bid.proposedAmount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">of ₹{bid.originalBudget.toLocaleString()}</p>
                </div>
                <Badge variant="outline" className={statusColors[bid.status]}>
                  {bid.status.replace("-", " ")}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={`/${userType}/bids/${bid.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
