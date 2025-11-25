import Link from "next/link"
import { MapPin, Clock, Users, Calendar, IndianRupee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TuitionPost } from "@/lib/types"

interface TuitionCardProps {
  tuition: TuitionPost
  showBidButton?: boolean
  userType: "teacher" | "guardian"
}

export function TuitionCard({ tuition, showBidButton = true, userType }: TuitionCardProps) {
  const daysRemaining = Math.ceil((new Date(tuition.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {tuition.subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
              <Badge variant={tuition.status === "open" ? "default" : "outline"} className="text-xs capitalize">
                {tuition.status.replace("-", " ")}
              </Badge>
            </div>

            <Link href={`/${userType}/tuition/${tuition.id}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                {tuition.title}
              </h3>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                <span className="font-medium text-foreground">₹{tuition.budgetAmount.toLocaleString()}</span>
                <span>/ {tuition.budgetType}</span>
              </span>
              {tuition.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {tuition.location.area}, {tuition.location.city}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {tuition.schedule.daysPerWeek} days/week
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {tuition.bidsCount} bids
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
              </span>
              <span>
                {tuition.level} • {tuition.board}
              </span>
            </div>
          </div>

          {showBidButton && userType === "teacher" && tuition.status === "open" && (
            <div className="flex-shrink-0">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href={`/teacher/tuition/${tuition.id}/bid`}>Place Bid</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
