"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, MessageSquare, Calendar, IndianRupee, Clock, MoreVertical, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HiredTeacher {
  id: string
  teacherName: string
  teacherImage: string
  rating: number
  studentName: string
  subjects: string[]
  agreedAmount: number
  classesPerWeek: number
  nextClass: string
  nextBillingDate: string
  classesCompleted: number
  totalClasses: number
  status: "active" | "paused"
}

const mockHiredTeachers: HiredTeacher[] = [
  {
    id: "1",
    teacherName: "Tahmid Afsar Shapno",
    teacherImage: "/professional-male-teacher-photo.jpg",
    rating: 4.9,
    studentName: "Arjun Gupta",
    subjects: ["Mathematics", "Science"],
    agreedAmount: 7500,
    classesPerWeek: 4,
    nextClass: "Tomorrow, 5:00 PM",
    nextBillingDate: "Dec 1, 2025",
    classesCompleted: 12,
    totalClasses: 16,
    status: "active",
  },
  {
    id: "2",
    teacherName: "Priya Patel",
    teacherImage: "/professional-female-teacher-photo.jpg",
    rating: 4.8,
    studentName: "Ananya Gupta",
    subjects: ["Hindi", "Social Science"],
    agreedAmount: 5000,
    classesPerWeek: 3,
    nextClass: "Wed, 4:00 PM",
    nextBillingDate: "Dec 5, 2025",
    classesCompleted: 8,
    totalClasses: 12,
    status: "active",
  },
]

export default function HiredTeachersPage() {
  const totalMonthlySpend = mockHiredTeachers.reduce((sum, t) => sum + t.agreedAmount, 0)

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hired Teachers</h1>
          <p className="text-muted-foreground text-sm">Manage your active tuition engagements</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Active Teachers</p>
            <p className="text-3xl font-bold text-foreground mt-1">{mockHiredTeachers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Monthly Spend</p>
            <p className="text-3xl font-bold text-foreground mt-1 flex items-center">
              <IndianRupee className="h-6 w-6" />
              {totalMonthlySpend.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Classes This Week</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {mockHiredTeachers.reduce((sum, t) => sum + t.classesPerWeek, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Teachers List */}
      <div className="space-y-4">
        {mockHiredTeachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={teacher.teacherImage || "/placeholder.svg"} alt={teacher.teacherName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {teacher.teacherName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{teacher.teacherName}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                    </div>
                    <Badge
                      variant={teacher.status === "active" ? "default" : "outline"}
                      className={teacher.status === "active" ? "bg-accent text-accent-foreground" : ""}
                    >
                      {teacher.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Teaching {teacher.studentName}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Fee</p>
                      <p className="font-semibold text-foreground">₹{teacher.agreedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Classes/Week</p>
                      <p className="font-semibold text-foreground">{teacher.classesPerWeek}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Class</p>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {teacher.nextClass}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Payment</p>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {teacher.nextBillingDate}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Monthly Progress</span>
                      <span className="text-foreground font-medium">
                        {teacher.classesCompleted} / {teacher.totalClasses} classes
                      </span>
                    </div>
                    <Progress value={(teacher.classesCompleted / teacher.totalClasses) * 100} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Join Class
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Payment History</DropdownMenuItem>
                      <DropdownMenuItem>Leave Review</DropdownMenuItem>
                      <DropdownMenuItem>Pause Classes</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">End Engagement</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
