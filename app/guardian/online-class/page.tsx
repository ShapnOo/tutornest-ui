"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, Clock, Calendar, Link2, MapPin } from "lucide-react"

const classes = [
  {
    id: "class-1",
    title: "Class 10 Math - Algebra",
    teacher: "Tahmid Afsar Shapno",
    student: "Arif Hossain",
    time: "Today, 5:00 PM",
    duration: "60 mins",
    mode: "Online",
    joinLink: "/guardian/online-class/demo",
  },
  {
    id: "class-2",
    title: "HSC Physics - Numericals",
    teacher: "Priya Patel",
    student: "Nusrat Jahan",
    time: "Tomorrow, 6:30 PM",
    duration: "60 mins",
    mode: "Online",
    joinLink: "/guardian/online-class/demo",
  },
]

export default function GuardianOnlineClassPage() {
  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Online Classes</h1>
            <p className="text-xs text-muted-foreground">Join live sessions for your children</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Upcoming classes</CardTitle>
            <CardDescription className="text-xs">Use the join link to attend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {classes.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={item.teacher} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {item.teacher
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                      <Badge variant="outline" className="text-[11px]">
                        {item.mode}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Teacher: {item.teacher} | Student: {item.student}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.joinLink}>
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <Link href={item.joinLink}>
                      <Link2 className="h-4 w-4" />
                      Copy link
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
