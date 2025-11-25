"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { mockTuitionPosts } from "@/lib/mock-data"
import { Search, MapPin, Clock, Users, Briefcase, Calendar, CreditCard } from "lucide-react"
import type { TuitionPost } from "@/lib/types"

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla"]
const levels = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12"]
const modes = ["online", "home", "visit-tutor"]
const cities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Comilla", "Dinajpur"]

export default function FindTuitions() {
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState("all")
  const [level, setLevel] = useState("all")
  const [mode, setMode] = useState("all")
  const [city, setCity] = useState("all")
  const [bidTuition, setBidTuition] = useState<TuitionPost | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [bidType, setBidType] = useState("monthly")
  const [bidStartDate, setBidStartDate] = useState("")
  const [bidMessage, setBidMessage] = useState("")
  const [credits, setCredits] = useState(5)
  const [bidError, setBidError] = useState("")

  const totalOpen = mockTuitionPosts.filter((t) => t.status === "open").length
  const totalInBidding = mockTuitionPosts.filter((t) => t.status === "in-bidding").length

  const filtered = useMemo(() => {
    return mockTuitionPosts.filter((t) => {
      if (query && !t.title.toLowerCase().includes(query.toLowerCase()) && !t.subjects.join(" ").toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (subject !== "all" && !t.subjects.includes(subject)) return false
      if (level !== "all" && t.level !== level) return false
      if (mode !== "all" && !t.mode.includes(mode as any)) return false
      if (city !== "all" && t.location?.city !== city) return false
      return true
    })
  }, [query, subject, level, mode, city])

    return (
      <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno" userImage="/teacher-profile.png">
      <div className="max-w-6xl mx-auto space-y-4">
        <Card className="border-border/80">
          <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Find Tuitions</h1>
              <p className="text-xs text-muted-foreground">Browse and bid on the best matches for you</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline">Matches: {filtered.length}</Badge>
              <Badge variant="secondary">Open: {totalOpen}</Badge>
              <Badge variant="secondary">In bidding: {totalInBidding}</Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-[11px]">
                Credits: {credits}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 flex items-center gap-1"
                onClick={() => setCredits((c) => c + 5)}
              >
                <CreditCard className="h-3.5 w-3.5" />
                Buy 5
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Filters</CardTitle>
            <CardDescription className="text-xs">Keep it lean: subject, level, mode, city.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="relative lg:col-span-4">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or subject"
                className="pl-9 h-10 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="lg:col-span-2 h-10 text-sm">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="lg:col-span-2 h-10 text-sm">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                {levels.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="lg:col-span-2 h-10 text-sm capitalize">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any mode</SelectItem>
                {modes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m.replace("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="lg:col-span-2 h-10 text-sm">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any city</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((tuition) => (
            <Card key={tuition.id} className="hover:shadow-md transition-shadow border-border/80">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={tuition.status === "open" ? "default" : "outline"} className="text-[11px] capitalize">
                        {tuition.status}
                      </Badge>
                      <Badge variant="secondary" className="text-[11px]">
                        {tuition.level}
                      </Badge>
                      <Badge variant="outline" className="text-[11px] flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {Math.max(0, Math.ceil((tuition.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}d left
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2">{tuition.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {tuition.subjects.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-[11px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-foreground">BDT {tuition.budgetAmount.toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground capitalize">/ {tuition.budgetType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {tuition.location ? `${tuition.location.area}, ${tuition.location.city}` : "Online"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {tuition.schedule.daysPerWeek} days | {tuition.schedule.timeSlot}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    Mode: {tuition.mode.join(", ")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {tuition.bidsCount} bids
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {tuition.visibility === "public" ? "Open to all" : "Invite only"}
                    </Badge>
                    <Badge variant="outline" className="text-[11px] capitalize">
                      {tuition.budgetType}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3" asChild>
                      <Link href={`/teacher/tuition/${tuition.id}`}>View</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 px-3 bg-primary"
                      onClick={() => {
                        setBidError("")
                        setBidTuition(tuition)
                        setBidAmount(tuition.budgetAmount.toString())
                        setBidType(tuition.budgetType)
                        setBidStartDate("")
                        setBidMessage("")
                      }}
                    >
                      Bid now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No tuitions found matching your criteria.
              <div className="mt-3">
                <Button variant="outline" onClick={() => {
                  setQuery("")
                  setSubject("all")
                  setLevel("all")
                  setMode("all")
                  setCity("all")
                }}>
                  Clear filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog
        open={!!bidTuition}
        onOpenChange={(open) => {
          if (!open) setBidTuition(null)
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Place a bid</DialogTitle>
            <DialogDescription className="text-xs">
              Each bid costs 1 credit. Credits remaining: {credits}
            </DialogDescription>
          </DialogHeader>
          {bidTuition && (
            <div className="space-y-4 text-sm">
              <div className="rounded-md border border-border p-3 bg-muted/40 space-y-1">
                <p className="font-semibold text-foreground">{bidTuition.title}</p>
                <p className="text-xs text-muted-foreground">
                  {bidTuition.level} • {bidTuition.subjects.join(", ")}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>BDT {bidTuition.budgetAmount.toLocaleString()} / {bidTuition.budgetType}</span>
                  <span>|</span>
                  <span>
                    {bidTuition.schedule.daysPerWeek} days | {bidTuition.schedule.timeSlot}
                  </span>
                  {bidTuition.location && (
                    <>
                      <span>|</span>
                      <span>{bidTuition.location.area}, {bidTuition.location.city}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Proposed amount (BDT)</Label>
                  <Input
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="e.g., 8000"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Amount type</Label>
                  <Select value={bidType} onValueChange={setBidType}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="per-hour">Per hour</SelectItem>
                      <SelectItem value="per-subject">Per subject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Available from</Label>
                  <Input
                    type="date"
                    value={bidStartDate}
                    onChange={(e) => setBidStartDate(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label className="text-xs">Note to guardian</Label>
                  <Textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Briefly share your plan, experience, and trial availability."
                    className="min-h-[90px] text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Submitting will deduct 1 credit.</span>
                {bidError && <span className="text-destructive">{bidError}</span>}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setBidTuition(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-primary"
              onClick={() => {
                if (!bidTuition) return
                if (credits <= 0) {
                  setBidError("You need credits to place a bid. Buy credits to continue.")
                  return
                }
                setCredits((c) => c - 1)
                setBidTuition(null)
              }}
            >
              Submit bid (1 credit)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
