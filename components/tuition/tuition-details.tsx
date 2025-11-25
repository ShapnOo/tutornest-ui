"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockTuitionPosts, mockBids, mockTeachers } from "@/lib/mock-data"
import { Calendar, MapPin, Clock, Users, Pencil, Eye, PlusCircle, Tag } from "lucide-react"

interface TuitionDetailsProps {
  tuitionId: string
  userType: "guardian" | "teacher"
}

export function TuitionDetails({ tuitionId, userType }: TuitionDetailsProps) {
  const tuition = useMemo(() => mockTuitionPosts.find((t) => t.id === tuitionId) ?? mockTuitionPosts[0], [tuitionId])

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(tuition.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  )

  const schedule = `${tuition.schedule.daysPerWeek} days/week | ${tuition.schedule.timeSlot}`
  const mode = tuition.mode.join(", ")
  const budgetValue = tuition.budgetAmount.toLocaleString()
  const budgetType = tuition.budgetType.replace("-", " ")

  const bids = mockBids
    .filter((b) => b.tuitionPostId === tuition.id)
    .map((b) => ({
      ...b,
      teacher: mockTeachers.find((t) => t.id === b.teacherId),
    }))

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-background border-primary/20">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="capitalize">
                  {tuition.status.replace("-", " ")}
                </Badge>
                <Badge variant="secondary">{tuition.board}</Badge>
                <Badge variant="secondary">{mode}</Badge>
                <Badge variant="secondary" className="capitalize">
                  {tuition.visibility === "public" ? "Open to all" : "Invite only"}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{tuition.title}</h1>
              <p className="text-sm text-muted-foreground">
                Class: {tuition.level} | Subjects: {tuition.subjects.join(", ")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" asChild>
                <Link href={`/guardian/tuition/${tuition.id}/bids`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View bids ({tuition.bidsCount})
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/guardian/my-tuitions">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              <Button asChild className="bg-primary">
                <Link href="/guardian/post-tuition">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post new
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">BDT</span>
              {tuition.budgetAmount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{tuition.budgetType.replace("-", " ")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Schedule</p>
            <p className="text-lg font-semibold text-foreground">{tuition.schedule.daysPerWeek} days/week</p>
            <p className="text-xs text-muted-foreground">{tuition.schedule.timeSlot}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Bids received</p>
            <p className="text-lg font-semibold text-foreground">{tuition.bidsCount}</p>
            <p className="text-xs text-muted-foreground">{daysLeft > 0 ? `${daysLeft} days left` : "Expired"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Mode</p>
            <p className="text-lg font-semibold text-foreground capitalize">{mode}</p>
            {tuition.location ? (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {tuition.location.area}, {tuition.location.city}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Online only</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Overview</CardTitle>
          <CardDescription>Key details for teachers reviewing your requirement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {tuition.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Schedule</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {schedule}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Mode & location</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {mode}
              </p>
              {tuition.location && (
                <p className="text-sm text-muted-foreground">
                  {tuition.location.area}, {tuition.location.city}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">BDT</span>
                {budgetValue} / {budgetType}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Student</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                {tuition.studentId ? "Student profile linked" : "Student info pending"}
              </p>
              <p className="text-xs text-muted-foreground">Level: {tuition.level}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Posted on</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(tuition.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Expiry</p>
              <p className="text-sm text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(tuition.expiresAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Requirements</CardTitle>
            <CardDescription>What you expect from the teacher.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground leading-relaxed">{tuition.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                Minimum experience: {tuition.minExperienceYears ? `${tuition.minExperienceYears}+ yrs` : "Any"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Gender: {tuition.genderPreference ? tuition.genderPreference : "Any"}
              </Badge>
              {tuition.languagePreference && tuition.languagePreference.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  Language: {tuition.languagePreference.join(", ")}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tags & Extras</CardTitle>
            <CardDescription>Quick cues for teachers browsing your post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Tag className="h-3.5 w-3.5" />
                {tuition.visibility === "public" ? "Open to all" : "Invite only"}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Status: {tuition.status}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {tuition.mode.includes("online") ? "Online friendly" : "Offline preferred"}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Provide class notes or past exam scripts to help teachers personalize lessons.</p>
              <p>If you need a demo, mention the preferred slot in your messages.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Bids</CardTitle>
          <CardDescription>Teachers who have applied.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {bids.length === 0 && <p className="text-sm text-muted-foreground">No bids yet.</p>}
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {bid.teacher?.fullName ?? "Teacher"} ({bid.proposedAmount.toLocaleString()} BDT {bid.proposedType})
                </p>
                <p className="text-xs text-muted-foreground">Status: {bid.status.replace("-", " ")}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{bid.message}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View bid
                </Button>
                {userType === "guardian" && (
                  <Button size="sm" className="bg-primary">
                    Hire
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {userType === "teacher" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Place your bid</CardTitle>
            <CardDescription>Share your rate and availability. Guardians see your bid details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                  BDT
                </span>
                <Input className="pl-12" placeholder="Proposed amount" type="number" />
              </div>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder="Amount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Per month</SelectItem>
                  <SelectItem value="per-hour">Per hour</SelectItem>
                  <SelectItem value="per-subject">Per subject</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Label className="text-xs text-muted-foreground">Available from</Label>
                <Input type="date" />
              </div>
            </div>
            <Textarea placeholder="Add your plan, experience, and how you will help the student." className="min-h-28" />
            <div className="flex gap-2 justify-end">
              <Button variant="outline">Preview</Button>
              <Button className="bg-primary">Submit bid</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
