"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { BidCard } from "@/components/tuition/bid-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, IndianRupee, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"
import { mockTuitionPosts, mockBids, mockTeachers } from "@/lib/mock-data"

export default function TuitionBidsPage() {
  const params = useParams()
  const [sortBy, setSortBy] = useState("lowest")
  const tuition = mockTuitionPosts.find((t) => t.id === params.id)

  if (!tuition) {
    return (
      <DashboardLayout userType="guardian" userName="Zahidul Islam">
        <p>Tuition not found</p>
      </DashboardLayout>
    )
  }

  // Create sample bids with teacher data
  const bidsWithTeachers = mockBids.map((bid, index) => ({
    ...bid,
    teacher: mockTeachers[index % mockTeachers.length],
  }))

  const allBids = bidsWithTeachers
  const appliedBids = bidsWithTeachers.filter((b) => b.status === "applied")
  const shortlistedBids = bidsWithTeachers.filter((b) => b.status === "shortlisted")
  const demoBids = bidsWithTeachers.filter((b) => b.status === "demo-scheduled")

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/guardian/my-tuitions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Tuitions
          </Link>
        </Button>

        {/* Tuition Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {tuition.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  <Badge variant={tuition.status === "open" ? "default" : "outline"} className="capitalize">
                    {tuition.status}
                  </Badge>
                </div>
                <h1 className="text-xl font-bold text-foreground">{tuition.title}</h1>
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
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tuition.bidsCount} bids received
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Min bid allowed</p>
                <p className="text-lg font-semibold text-foreground">
                  ₹{Math.ceil(tuition.budgetAmount * 0.75).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bids Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Applications Received</CardTitle>
                <CardDescription>Review and compare bids from teachers</CardDescription>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowest">Lowest bid first</SelectItem>
                  <SelectItem value="highest">Highest bid first</SelectItem>
                  <SelectItem value="rating">Highest rating</SelectItem>
                  <SelectItem value="experience">Most experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All ({allBids.length})</TabsTrigger>
                <TabsTrigger value="applied">Applied ({appliedBids.length})</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted ({shortlistedBids.length})</TabsTrigger>
                <TabsTrigger value="demo">Demo ({demoBids.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {allBids.map((bid) => (
                    <BidCard
                      key={bid.id}
                      bid={bid}
                      teacher={bid.teacher!}
                      originalBudget={tuition.budgetAmount}
                      isGuardianView={true}
                      onShortlist={() => console.log("Shortlist", bid.id)}
                      onScheduleDemo={() => console.log("Schedule demo", bid.id)}
                      onReject={() => console.log("Reject", bid.id)}
                      onHire={() => console.log("Hire", bid.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applied" className="mt-4">
                <div className="space-y-4">
                  {appliedBids.length > 0 ? (
                    appliedBids.map((bid) => (
                      <BidCard
                        key={bid.id}
                        bid={bid}
                        teacher={bid.teacher!}
                        originalBudget={tuition.budgetAmount}
                        isGuardianView={true}
                        onShortlist={() => console.log("Shortlist", bid.id)}
                        onReject={() => console.log("Reject", bid.id)}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No new applications</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="shortlisted" className="mt-4">
                <div className="space-y-4">
                  {shortlistedBids.length > 0 ? (
                    shortlistedBids.map((bid) => (
                      <BidCard
                        key={bid.id}
                        bid={bid}
                        teacher={bid.teacher!}
                        originalBudget={tuition.budgetAmount}
                        isGuardianView={true}
                        onScheduleDemo={() => console.log("Schedule demo", bid.id)}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No shortlisted teachers yet</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="demo" className="mt-4">
                <div className="space-y-4">
                  {demoBids.length > 0 ? (
                    demoBids.map((bid) => (
                      <BidCard
                        key={bid.id}
                        bid={bid}
                        teacher={bid.teacher!}
                        originalBudget={tuition.budgetAmount}
                        isGuardianView={true}
                        onHire={() => console.log("Hire", bid.id)}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No demos scheduled</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
