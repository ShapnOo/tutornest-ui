import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { ViewsChart } from "@/components/dashboard/views-chart"
import { RecentBids } from "@/components/tuition/recent-bids"
import { GoalsCard } from "@/components/dashboard/goals-card"
import { Button } from "@/components/ui/button"
import { Briefcase, Eye, CheckCircle, Trophy, Search } from "lucide-react"
import Link from "next/link"
import { mockTeacherStats, mockActivityData, mockProfileViewsData } from "@/lib/mock-data"

export default function TeacherDashboard() {
  const stats = mockTeacherStats

  const recentBids = [
    {
      id: "1",
      tuitionTitle: "Class 10 Math & Science Tutor",
      proposedAmount: 7500,
      originalBudget: 8000,
      status: "applied",
      appliedDate: "Nov 24, 2025",
    },
    {
      id: "2",
      tuitionTitle: "JEE Physics Preparation",
      proposedAmount: 14000,
      originalBudget: 15000,
      status: "shortlisted",
      appliedDate: "Nov 22, 2025",
    },
    {
      id: "3",
      tuitionTitle: "English Speaking Coach",
      proposedAmount: 4500,
      originalBudget: 5000,
      status: "demo-scheduled",
      appliedDate: "Nov 20, 2025",
    },
  ]

  const goals = [
    { label: "Monthly Bids", current: 5, target: 10 },
    { label: "Students Taught", current: 8, target: 15 },
    { label: "Demo Classes", current: 3, target: 5 },
  ]

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno" userImage="/teacher-profile.png">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Track your tuition applications and earnings</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/teacher/find-tuitions">
            <Search className="h-4 w-4 mr-2" />
            Find Tuitions
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Active Bids"
          value={stats.activeBids}
          change="+2 this month"
          changeType="positive"
          icon={Briefcase}
          footer={{
            left: { label: "Pending", value: 3 },
            right: { label: "Total", value: 12 },
          }}
        />
        <StatsCard
          title="Profile Views"
          value={stats.profileViews}
          change="+12% from last month"
          changeType="positive"
          icon={Eye}
          footer={{
            left: { label: "This week", value: 45 },
            right: { label: "Last week", value: 38 },
          }}
        />
        <StatsCard
          title="Shortlisted"
          value={3}
          subtitle="25% success rate"
          icon={CheckCircle}
          footer={{
            left: { label: "Pending", value: 2 },
            right: { label: "All time", value: 28 },
          }}
        />
        <StatsCard
          title="Hired"
          value={stats.hiredTuitions}
          subtitle="8 active students"
          change="+3 this month"
          changeType="positive"
          icon={Trophy}
          iconColor="text-accent"
          footer={{
            left: { label: "Upcoming", value: 2 },
            right: { label: "Completed", value: 10 },
          }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityChart
          title="Bid Activity"
          description="Your tuition bids and successful hires"
          data={mockActivityData}
        />
        <ViewsChart
          title="Profile Performance"
          description="How your profile is performing with guardians"
          data={mockProfileViewsData}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBids bids={recentBids} userType="teacher" />
        </div>
        <GoalsCard title="Monthly Goals" description="Track your progress towards your targets" goals={goals} />
      </div>
    </DashboardLayout>
  )
}
