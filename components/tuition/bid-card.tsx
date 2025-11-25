"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageSquare, Calendar, IndianRupee } from "lucide-react"
import type { TuitionBid, TeacherProfile } from "@/lib/types"

interface BidCardProps {
  bid: TuitionBid
  teacher: TeacherProfile
  originalBudget: number
  onShortlist?: () => void
  onScheduleDemo?: () => void
  onReject?: () => void
  onHire?: () => void
  isGuardianView?: boolean
}

export function BidCard({
  bid,
  teacher,
  originalBudget,
  onShortlist,
  onScheduleDemo,
  onReject,
  onHire,
  isGuardianView = false,
}: BidCardProps) {
  const savings = originalBudget - bid.proposedAmount
  const savingsPercent = ((savings / originalBudget) * 100).toFixed(0)

  const statusColors: Record<string, string> = {
    applied: "bg-info text-info-foreground",
    shortlisted: "bg-warning text-warning-foreground",
    "demo-scheduled": "bg-primary text-primary-foreground",
    hired: "bg-accent text-accent-foreground",
    rejected: "bg-destructive text-destructive-foreground",
    withdrawn: "bg-muted text-muted-foreground",
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={teacher.photo || "/placeholder.svg"} alt={teacher.fullName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {teacher.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-foreground">{teacher.fullName}</h4>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium">{teacher.ratingAvg}</span>
                <span className="text-muted-foreground">({teacher.ratingCount})</span>
              </div>
              {teacher.verificationStatus === "verified" && (
                <Badge variant="outline" className="text-xs text-accent border-accent">
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{teacher.headline}</p>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{teacher.experienceYears} years exp</span>
              <span>•</span>
              <span>{teacher.subjects.slice(0, 3).join(", ")}</span>
              <span>•</span>
              <span>{teacher.totalStudentsTaught} students taught</span>
            </div>

            {/* Bid Details */}
            <div className="flex items-center gap-4 mt-3 p-3 bg-secondary rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Bid Amount</p>
                <p className="text-lg font-bold text-foreground flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {bid.proposedAmount.toLocaleString()}
                </p>
              </div>
              {savings > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">You Save</p>
                  <p className="text-sm font-medium text-accent">
                    ₹{savings.toLocaleString()} ({savingsPercent}%)
                  </p>
                </div>
              )}
              <Badge className={statusColors[bid.status]}>{bid.status.replace("-", " ")}</Badge>
            </div>

            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{bid.message}</p>

            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Available from {new Date(bid.availableStartDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {isGuardianView && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
            {bid.status === "applied" && (
              <>
                <Button variant="outline" size="sm" onClick={onShortlist}>
                  Shortlist
                </Button>
                <Button variant="outline" size="sm" className="text-destructive bg-transparent" onClick={onReject}>
                  Reject
                </Button>
              </>
            )}
            {bid.status === "shortlisted" && (
              <Button size="sm" className="bg-primary" onClick={onScheduleDemo}>
                Schedule Demo
              </Button>
            )}
            {bid.status === "demo-scheduled" && (
              <Button size="sm" className="bg-accent text-accent-foreground" onClick={onHire}>
                Hire Teacher
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
