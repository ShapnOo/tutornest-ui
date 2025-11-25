import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { GoalsCard } from "@/components/dashboard/goals-card"
import { ViewsChart } from "@/components/dashboard/views-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, CheckCircle, Trophy, PlusCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { mockGuardianStats, mockTuitionPosts } from "@/lib/mock-data"

export default function GuardianDashboard() {
  const stats = mockGuardianStats

  const goals = [
    { label: "Tuitions Posted", current: 2, target: 3 },
    { label: "Teachers Hired", current: 1, target: 2 },
    { label: "Demos Scheduled", current: 2, target: 4 },
  ]

  const bidTrend = [
    { month: "Jul", bids: 5, hired: 0 },
    { month: "Aug", bids: 8, hired: 1 },
    { month: "Sep", bids: 12, hired: 0 },
    { month: "Oct", bids: 15, hired: 1 },
    { month: "Nov", bids: 18, hired: 1 },
  ]

  const viewsTrend = [
    { date: "Week 1", views: 42 },
    { date: "Week 2", views: 58 },
    { date: "Week 3", views: 63 },
    { date: "Week 4", views: 77 },
    { date: "Week 5", views: 81 },
  ]

  const pipeline = [
    { label: "Open", value: 2 },
    { label: "In bidding", value: 3 },
    { label: "Shortlisted", value: 5 },
    { label: "Demo scheduled", value: 2 },
    { label: "Hired", value: 1 },
  ]

  const topSubjects = [
    { name: "Math & Science", value: 12 },
    { name: "English", value: 8 },
    { name: "Chemistry", value: 6 },
    { name: "Physics", value: 5 },
  ]

  return (
    <DashboardLayout
      userType="guardian"
      userName="Zahidul Islam"
      userImage="https://crmapi.criptonpro.com/uploads/1752042633812-291278820.jpg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-xs">Manage tuition posts and track progress</p>
        </div>
        <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
          <Link href="/guardian/post-tuition">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post Tuition
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-3.5">
        <StatsCard
          title="Active Tuitions"
          value={stats.activeTuitions}
          change="+1 this month"
          changeType="positive"
          icon={Briefcase}
          footer={{
            left: { label: "Open", value: 1 },
            right: { label: "In Progress", value: 1 },
          }}
        />
        <StatsCard
          title="Total Bids Received"
          value={stats.totalBidsReceived}
          change="+8 this week"
          changeType="positive"
          icon={Users}
          footer={{
            left: { label: "This week", value: 8 },
            right: { label: "Last week", value: 10 },
          }}
        />
        <StatsCard
          title="Shortlisted"
          value={stats.shortlisted}
          subtitle="28% of total bids"
          icon={CheckCircle}
          footer={{
            left: { label: "Pending review", value: 3 },
            right: { label: "All time", value: 12 },
          }}
        />
        <StatsCard
          title="Hired"
          value={stats.hired}
          subtitle="1 active teacher"
          icon={Trophy}
          iconColor="text-accent"
          footer={{
            left: { label: "Active", value: 1 },
            right: { label: "Completed", value: 0 },
          }}
        />
      </div>

      {/* My Tuitions Quick View */}
      <Card className="mb-3">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <div>
            <CardTitle className="text-sm font-semibold leading-tight">My Tuition Posts</CardTitle>
            <p className="text-[11px] text-muted-foreground">Recent posts at a glance</p>
          </div>
          <Button variant="outline" size="sm" className="h-8 px-2.5" asChild>
            <Link href="/guardian/my-tuitions">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-3">
          <div className="space-y-1.5">
            {mockTuitionPosts.slice(0, 2).map((tuition) => (
              <div
                key={tuition.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground truncate">{tuition.title}</h4>
                    <Badge variant={tuition.status === "open" ? "default" : "outline"} className="capitalize text-xs">
                      {tuition.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{tuition.subjects.join(", ")}</span>
                    <span>|</span>
                    <span>
                      BDT {tuition.budgetAmount.toLocaleString()} / {tuition.budgetType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{tuition.bidsCount}</p>
                    <p className="text-[11px] text-muted-foreground">bids</p>
                  </div>
                  <Button size="sm" className="h-8 px-3" asChild>
                    <Link href={`/guardian/tuition/${tuition.id}/bids`}>View Bids</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-2.5">
          <ActivityChart title="Bids Activity" description="Bids received and hires per month" data={bidTrend} />
          <ViewsChart title="Profile Views" description="Weekly views on your tuition posts" data={viewsTrend} />
        </div>
        <div className="space-y-3">
          <GoalsCard title="Hiring Goals" description="Track your progress in finding tutors" goals={goals} />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Pipeline</CardTitle>
              <p className="text-[11px] text-muted-foreground">Where your tuitions are today</p>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {pipeline.map((stage) => (
                <div key={stage.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{stage.label}</span>
                  <Badge variant="outline" className="text-[11px]">
                    {stage.value}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Top Subjects</CardTitle>
              <p className="text-[11px] text-muted-foreground">Most requested in your posts</p>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {topSubjects.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{item.value} bids</span>
                  </div>
                  <div className="h-1 rounded-full bg-muted">
                    <div
                      className="h-1 rounded-full bg-primary"
                      style={{ width: `${Math.min(item.value * 5, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

