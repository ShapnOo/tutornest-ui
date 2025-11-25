"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Briefcase, DollarSign, TrendingUp, Clock, AlertTriangle, ArrowRight } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import Link from "next/link"

const revenueData = [
  { month: "Jul", revenue: 45000, bids: 120 },
  { month: "Aug", revenue: 62000, bids: 145 },
  { month: "Sep", revenue: 58000, bids: 138 },
  { month: "Oct", revenue: 85000, bids: 198 },
  { month: "Nov", revenue: 92000, bids: 215 },
]

const activityData = [
  { month: "Jul", tuitions: 45, hires: 12 },
  { month: "Aug", tuitions: 62, hires: 18 },
  { month: "Sep", tuitions: 58, hires: 15 },
  { month: "Oct", tuitions: 75, hires: 22 },
  { month: "Nov", tuitions: 88, hires: 28 },
]

const pendingVerifications = [
  { id: "1", name: "Amit Kumar", type: "teacher", date: "Nov 24, 2025", documents: 3 },
  { id: "2", name: "Sneha Reddy", type: "teacher", date: "Nov 23, 2025", documents: 2 },
  { id: "3", name: "Rohit Singh", type: "teacher", date: "Nov 22, 2025", documents: 4 },
]

const recentDisputes = [
  { id: "1", issue: "Payment not received", parties: "Rahul S. vs Priya G.", status: "open", date: "Nov 24" },
  { id: "2", issue: "Class cancellation", parties: "Amit K. vs Suresh P.", status: "reviewing", date: "Nov 23" },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Platform overview and management</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Users"
          value="2,847"
          change="+124 this month"
          changeType="positive"
          icon={Users}
          footer={{
            left: { label: "Teachers", value: 1245 },
            right: { label: "Guardians", value: 1602 },
          }}
        />
        <StatsCard
          title="Active Tuitions"
          value="342"
          change="+28 this week"
          changeType="positive"
          icon={Briefcase}
          footer={{
            left: { label: "Open", value: 156 },
            right: { label: "In Progress", value: 186 },
          }}
        />
        <StatsCard
          title="Total Revenue"
          value="₹4.2L"
          change="+18% from last month"
          changeType="positive"
          icon={DollarSign}
          footer={{
            left: { label: "This month", value: "₹92K" },
            right: { label: "Last month", value: "₹78K" },
          }}
        />
        <StatsCard
          title="Conversion Rate"
          value="32%"
          change="+4% improvement"
          changeType="positive"
          icon={TrendingUp}
          footer={{
            left: { label: "Avg bids/tuition", value: 6.4 },
            right: { label: "Avg hire time", value: "4.2 days" },
          }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue & Activity</CardTitle>
            <CardDescription>Monthly revenue and bid volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    tickFormatter={(v) => `₹${v / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tuitions & Hires</CardTitle>
            <CardDescription>Monthly tuition posts and successful hires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
                  <Bar dataKey="tuitions" name="Tuitions Posted" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hires" name="Successful Hires" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Pending Verifications</CardTitle>
              <CardDescription>Teachers awaiting document verification</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/verifications">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-warning/10 text-warning">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.documents} documents • {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Disputes */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Disputes</CardTitle>
              <CardDescription>Issues requiring attention</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/disputes">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDisputes.map((dispute) => (
                <div key={dispute.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{dispute.issue}</p>
                      <p className="text-xs text-muted-foreground">
                        {dispute.parties} • {dispute.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        dispute.status === "open"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {dispute.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
