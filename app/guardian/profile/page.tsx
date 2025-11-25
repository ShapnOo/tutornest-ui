"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Phone,
  Mail,
  MapPin,
  Globe2,
  Clock,
  UserRound,
  Pencil,
  ShieldCheck,
  CreditCard,
  Calendar,
  Bell,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react"

export default function GuardianProfilePage() {
  const profile = {
    name: "Priya Gupta",
    phone: "01XXX-123456",
    email: "priya.g@example.com",
    city: "Dhaka",
    area: "Dhanmondi",
    timezone: "Asia/Dhaka (GMT+6)",
    membership: "Premium",
    verified: true,
    communication: "WhatsApp",
    languages: ["Bangla", "English"],
    preferredBudget: "BDT 7,000 - 12,000 / month",
    schedule: "5:30 PM - 8:00 PM",
    demoPreference: "Wants a short demo before hiring",
    paymentMethod: "Visa •• 2456",
  }

  const children = [
    { name: "Arjun", level: "Class 10", focus: ["Math", "Physics"], mode: "Online + Home", days: 4 },
    { name: "Ananya", level: "Class 8", focus: ["English", "Bangla"], mode: "Online", days: 3 },
  ]

  const stats = [
    { label: "Active tuitions", value: 2 },
    { label: "Teachers hired", value: 1 },
    { label: "Pending demos", value: 2 },
    { label: "Messages", value: 4 },
  ]

  const preferences = [
    { label: "Teaching mode", value: "Online, Home tutor" },
    { label: "Languages", value: profile.languages.join(", ") },
    { label: "Budget", value: profile.preferredBudget },
    { label: "Schedule", value: profile.schedule },
    { label: "Communication", value: profile.communication },
    { label: "Demo", value: profile.demoPreference },
  ]

  const recentActivity = [
    { title: "Demo booked with Tahmid Afsar Shapno", date: "Nov 26, 2025", type: "Demo" },
    { title: "New bid on Class 10 Math tuition", date: "Nov 25, 2025", type: "Bid" },
    { title: "Payment reminder set for Dec 1", date: "Nov 24, 2025", type: "Billing" },
  ]

  return (
    <DashboardLayout userType="guardian" userName="Priya Gupta">
      <div className="max-w-6xl mx-auto space-y-4">
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-background border-primary/20">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/guardian-profile-woman.jpg" alt={profile.name} />
                  <AvatarFallback>{profile.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-semibold text-foreground">{profile.name}</h1>
                    <Badge variant="secondary" className="text-[11px]">
                      {profile.membership}
                    </Badge>
                    {profile.verified && (
                      <Badge variant="outline" className="text-[11px] flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {profile.area}, {profile.city}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Globe2 className="h-3.5 w-3.5" />
                      {profile.timezone}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {profile.phone}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {profile.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit profile
                </Button>
                <Button size="sm" className="bg-primary">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add child
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {stats.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-3 space-y-1">
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Children & Tuitions</CardTitle>
              <CardDescription className="text-xs">Subjects, mode, and schedule preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {children.map((child) => (
                <div
                  key={child.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <UserRound className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold text-foreground">{child.name}</p>
                      <Badge variant="outline" className="text-[11px]">
                        {child.level}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {child.focus.map((f) => (
                        <Badge key={f} variant="secondary" className="text-[11px]">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {child.days} days/week
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {child.mode}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View tuitions
                    </Button>
                    <Button size="sm" className="bg-primary">
                      Post tuition
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Preferences</CardTitle>
              <CardDescription className="text-xs">What you look for when hiring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {preferences.map((pref) => (
                <div key={pref.label} className="space-y-1">
                  <p className="text-[11px] text-muted-foreground">{pref.label}</p>
                  <p className="text-sm text-foreground">{pref.value}</p>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">Payment</p>
                <p className="text-sm text-foreground flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {profile.paymentMethod}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Activity</CardTitle>
              <CardDescription className="text-xs">Recent actions and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivity.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge variant="outline" className="text-[11px]">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Alerts</CardTitle>
              <CardDescription className="text-xs">Keep your profile up to date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Enable notifications for new bids
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Add a welcome message for tutors
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                Update budget for upcoming exams
              </div>
              <div className="pt-2">
                <Progress value={70} className="h-2" />
                <p className="text-[11px] text-muted-foreground mt-1">Profile completeness: 70%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
