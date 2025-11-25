"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Calendar, Clock, MapPin, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface StudentBooking {
  id: string
  studentName: string
  guardianName: string
  subjects: string[]
  level: string
  board: string
  city: string
  area: string
  agreedAmount: number
  classesPerWeek: number
  nextClass: string
  nextBillingDate: string
  classesCompleted: number
  totalClasses: number
  status: "active" | "paused" | "completed"
}

const mockStudents: StudentBooking[] = [
  {
    id: "1",
    studentName: "Arif Hossain",
    guardianName: "Farzana Hossain",
    subjects: ["Mathematics", "Science"],
    level: "Class 10",
    board: "Dhaka Board",
    city: "Dhaka",
    area: "Dhanmondi",
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
    studentName: "Nusrat Jahan",
    guardianName: "Shafiqul Islam",
    subjects: ["Chemistry"],
    level: "HSC Prep",
    board: "Dhaka Board",
    city: "Dhaka",
    area: "Mirpur",
    agreedAmount: 12000,
    classesPerWeek: 5,
    nextClass: "Today, 6:00 PM",
    nextBillingDate: "Dec 5, 2025",
    classesCompleted: 8,
    totalClasses: 20,
    status: "active",
  },
  {
    id: "3",
    studentName: "Tahmid Rahman",
    guardianName: "Mehnaz Rahman",
    subjects: ["English"],
    level: "Class 8",
    board: "Sylhet Board",
    city: "Sylhet",
    area: "Zindabazar",
    agreedAmount: 4500,
    classesPerWeek: 3,
    nextClass: "Wed, 4:00 PM",
    nextBillingDate: "Dec 10, 2025",
    classesCompleted: 10,
    totalClasses: 12,
    status: "active",
  },
]

export default function MyStudentsPage() {
  const activeStudents = mockStudents.filter((s) => s.status === "active")
  const totalEarnings = activeStudents.reduce((sum, s) => sum + s.agreedAmount, 0)

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">My Students</h1>
            <p className="text-xs text-muted-foreground">Bangladesh-based engagements at a glance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Active Students</p>
              <p className="text-2xl font-bold text-foreground mt-1">{activeStudents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Monthly Earnings (BDT)</p>
              <p className="text-2xl font-bold text-foreground mt-1">{totalEarnings.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Classes This Week</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {activeStudents.reduce((sum, s) => sum + s.classesPerWeek, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {mockStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow border-border/80">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={student.studentName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">{student.studentName}</h3>
                        <Badge
                          variant={student.status === "active" ? "default" : "outline"}
                          className={student.status === "active" ? "bg-accent text-accent-foreground" : ""}
                        >
                          {student.status}
                        </Badge>
                        <Badge variant="outline" className="text-[11px]">
                          {student.level}
                        </Badge>
                        <Badge variant="secondary" className="text-[11px]">
                          {student.board}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {student.area}, {student.city}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Guardian: {student.guardianName} • Subjects: {student.subjects.join(", ")}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-[11px] text-muted-foreground">Monthly Fee</p>
                        <p className="font-semibold text-foreground">BDT {student.agreedAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">Classes/Week</p>
                        <p className="font-semibold text-foreground">{student.classesPerWeek}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">Next Class</p>
                        <p className="font-semibold text-foreground flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {student.nextClass}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">Next Billing</p>
                        <p className="font-semibold text-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {student.nextBillingDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-muted-foreground">Monthly Progress</span>
                      <span className="text-foreground font-medium">
                        {student.classesCompleted} / {student.totalClasses} classes
                      </span>
                    </div>
                    <Progress value={(student.classesCompleted / student.totalClasses) * 100} className="h-1.5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Class</DropdownMenuItem>
                        <DropdownMenuItem>Mark Attendance</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">End Engagement</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
