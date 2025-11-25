"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Bell,
  CheckCircle2,
  ListChecks,
  ArrowRight,
  UserRound,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ScheduleItem = {
  id: string
  title: string
  guardian: string
  student: string
  type: "class" | "demo"
  dayKey: string
  startTime: string
  endTime: string
  mode: "Online" | "Home"
  status: "confirmed" | "awaiting-confirmation" | "reschedule-requested"
  location?: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: "class-1",
    title: "Class 10 Maths: Algebra drills",
    guardian: "Zahidul Islam",
    student: "Arjun",
    type: "class",
    dayKey: "2025-11-26",
    startTime: "17:00",
    endTime: "18:00",
    mode: "Online",
    status: "confirmed",
  },
  {
    id: "demo-1",
    title: "Demo: Physics & Chem overview",
    guardian: "Sneha Patil",
    student: "Tanvi",
    type: "demo",
    dayKey: "2025-11-26",
    startTime: "19:00",
    endTime: "19:30",
    mode: "Online",
    status: "awaiting-confirmation",
  },
  {
    id: "class-2",
    title: "Class 8 English writing",
    guardian: "Suresh Kumar",
    student: "Rahul",
    type: "class",
    dayKey: "2025-11-27",
    startTime: "16:00",
    endTime: "17:00",
    mode: "Home",
    status: "reschedule-requested",
    location: "South Delhi",
  },
  {
    id: "demo-2",
    title: "Demo: JEE Physics trial",
    guardian: "Anita Sharma",
    student: "Rohan",
    type: "demo",
    dayKey: "2025-11-28",
    startTime: "11:00",
    endTime: "11:45",
    mode: "Online",
    status: "confirmed",
  },
  {
    id: "class-3",
    title: "Class 12 Physics numericals",
    guardian: "Anita Sharma",
    student: "Rohan",
    type: "class",
    dayKey: "2025-11-29",
    startTime: "09:30",
    endTime: "10:30",
    mode: "Online",
    status: "confirmed",
  },
  {
    id: "class-4",
    title: "Class 10 Maths: Trigonometry",
    guardian: "Zahidul Islam",
    student: "Arjun",
    type: "class",
    dayKey: "2025-11-30",
    startTime: "10:00",
    endTime: "11:00",
    mode: "Online",
    status: "confirmed",
  },
]

const weekDays = [
  { key: "2025-11-24", label: "Mon", dateLabel: "Nov 24" },
  { key: "2025-11-25", label: "Tue", dateLabel: "Nov 25" },
  { key: "2025-11-26", label: "Wed", dateLabel: "Nov 26" },
  { key: "2025-11-27", label: "Thu", dateLabel: "Nov 27" },
  { key: "2025-11-28", label: "Fri", dateLabel: "Nov 28" },
  { key: "2025-11-29", label: "Sat", dateLabel: "Nov 29" },
  { key: "2025-11-30", label: "Sun", dateLabel: "Nov 30" },
]

const reminders = [
  { id: "rem-1", title: "Send Zoom link for Arjun", cta: "Send link" },
  { id: "rem-2", title: "Confirm demo with Tanvi", cta: "Confirm" },
  { id: "rem-3", title: "Respond to reschedule request", cta: "Pick slot" },
]

const typeStyles: Record<ScheduleItem["type"], string> = {
  class: "bg-primary/10 text-primary border-primary/20",
  demo: "bg-info/10 text-info border-info/20",
}

const statusStyles: Record<ScheduleItem["status"], string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "awaiting-confirmation": "bg-amber-50 text-amber-700 border-amber-100",
  "reschedule-requested": "bg-rose-50 text-rose-700 border-rose-100",
}

const modeStyles: Record<ScheduleItem["mode"], string> = {
  Online: "bg-sky-50 text-sky-700 border-sky-200",
  Home: "bg-orange-50 text-orange-700 border-orange-200",
}

const timeValue = (dayKey: string, time: string) => new Date(`${dayKey}T${time}:00`).getTime()

const formatTimeRange = (item: ScheduleItem) => {
  const format = (time: string) =>
    new Date(`${item.dayKey}T${time}:00`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  return `${format(item.startTime)} - ${format(item.endTime)}`
}

const formatDateLabel = (dayKey: string) =>
  new Date(`${dayKey}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

export default function TeacherSchedulePage() {
  const sortedItems = [...scheduleItems].sort(
    (a, b) => timeValue(a.dayKey, a.startTime) - timeValue(b.dayKey, b.startTime),
  )
  const nextSession = sortedItems[0]
  const classesThisWeek = scheduleItems.filter((item) => item.type === "class").length
  const demosThisWeek = scheduleItems.filter((item) => item.type === "demo").length
  const pendingActions = scheduleItems.filter((item) => item.status !== "confirmed").length
  const uniqueGuardians = new Set(scheduleItems.map((item) => item.guardian)).size

  const filterByType = (type: "all" | "class" | "demo") => {
    if (type === "all") return sortedItems
    return sortedItems.filter((item) => item.type === type)
  }

  const groupedByDay = weekDays.map((day) => ({
    ...day,
    events: sortedItems.filter((item) => item.dayKey === day.key),
  }))

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground text-sm">
            Compact view of your classes, demos, and pending confirmations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/teacher/students">
              <UserRound className="h-4 w-4 mr-2" />
              My Students
            </Link>
          </Button>
          <Button asChild className="bg-primary">
            <Link href="/teacher/find-tuitions">
              <ArrowRight className="h-4 w-4 mr-2" />
              Find Tuitions
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">This week</p>
            <p className="text-2xl font-bold text-foreground mt-1">{sortedItems.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {classesThisWeek} classes | {demosThisWeek} demos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Pending actions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{pendingActions}</p>
            <p className="text-xs text-muted-foreground mt-1">Confirm demos or reschedules</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Guardians</p>
            <p className="text-2xl font-bold text-foreground mt-1">{uniqueGuardians}</p>
            <p className="text-xs text-muted-foreground mt-1">Active this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Next session</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatDateLabel(nextSession.dayKey)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatTimeRange(nextSession)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge className="bg-primary/10 text-primary border-primary/20">Class</Badge>
                <Badge className="bg-info/10 text-info border-info/20">Demo</Badge>
              </div>
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All ({sortedItems.length})</TabsTrigger>
                <TabsTrigger value="class">Classes ({classesThisWeek})</TabsTrigger>
                <TabsTrigger value="demo">Demos ({demosThisWeek})</TabsTrigger>
              </TabsList>
              {(["all", "class", "demo"] as const).map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  <div className="space-y-3">
                    {filterByType(tab).map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 rounded-lg border border-border bg-card/50 p-3 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-md border border-border bg-background px-3 py-2 text-left min-w-[110px]">
                            <p className="text-[11px] text-muted-foreground">{formatDateLabel(item.dayKey)}</p>
                            <p className="text-sm font-semibold text-foreground">
                              {new Date(`${item.dayKey}T${item.startTime}:00`).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className={cn("text-[11px]", typeStyles[item.type])}>
                                {item.type === "class" ? "Class" : "Demo"}
                              </Badge>
                              <Badge variant="outline" className={cn("text-[11px]", modeStyles[item.mode])}>
                                {item.mode}
                              </Badge>
                              <Badge variant="outline" className={cn("text-[11px]", statusStyles[item.status])}>
                                {item.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap text-sm">
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <UserRound className="h-3.5 w-3.5" />
                                {item.guardian} (for {item.student})
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {formatTimeRange(item)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {item.mode === "Home" ? item.location ?? "Home visit" : "Online"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.type === "demo" ? (
                            <Button size="sm" variant={item.status === "awaiting-confirmation" ? "default" : "outline"}>
                              {item.status === "awaiting-confirmation" ? "Confirm demo" : "Demo notes"}
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              Start / Details
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                    {filterByType(tab).length === 0 && (
                      <div className="text-center text-muted-foreground py-6 text-sm">No sessions found.</div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reminders.map((item) => (
                <div key={item.id} className="rounded-md border border-border bg-muted/40 p-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <Button size="sm" variant="outline">
                    {item.cta}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Quick actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="secondary">
                <Video className="h-4 w-4 mr-2" />
                Add meeting link
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ListChecks className="h-4 w-4 mr-2" />
                Mark attendance
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Block time slot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Week at a glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {groupedByDay.map((day) => (
              <div key={day.key} className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-center justify-between border-b border-border/70 pb-2 mb-3">
                  <div>
                    <p className="text-[11px] uppercase text-muted-foreground">{day.label}</p>
                    <p className="font-semibold text-foreground text-sm">{day.dateLabel}</p>
                  </div>
                  <Badge variant="outline" className="text-[11px]">
                    {day.events.length} {day.events.length === 1 ? "event" : "events"}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {day.events.length === 0 && <p className="text-xs text-muted-foreground">No sessions planned.</p>}
                  {day.events.map((event) => (
                    <div key={event.id} className="rounded-md border border-border bg-background p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className={cn("text-[11px]", typeStyles[event.type])}>
                          {event.type === "class" ? "Class" : "Demo"}
                        </Badge>
                        <span className="text-[11px] font-medium text-foreground">{formatTimeRange(event)}</span>
                      </div>
                      <p className="mt-2 font-semibold text-foreground text-sm line-clamp-1">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.guardian} | {event.student}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.mode === "Home" ? event.location ?? "Home visit" : "Online"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
