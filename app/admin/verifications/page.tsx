"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react"

interface Verification {
  id: string
  teacherName: string
  email: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  documents: { name: string; type: string; url: string }[]
  education: string
  experience: string
}

const mockVerifications: Verification[] = [
  {
    id: "1",
    teacherName: "Amit Kumar",
    email: "amit@email.com",
    submittedDate: "Nov 24, 2025",
    status: "pending",
    documents: [
      { name: "ID Proof", type: "Aadhaar Card", url: "#" },
      { name: "Degree Certificate", type: "B.Tech", url: "#" },
      { name: "Experience Letter", type: "Previous School", url: "#" },
    ],
    education: "B.Tech from NIT Warangal",
    experience: "5 years teaching experience",
  },
  {
    id: "2",
    teacherName: "Sneha Reddy",
    email: "sneha@email.com",
    submittedDate: "Nov 23, 2025",
    status: "pending",
    documents: [
      { name: "ID Proof", type: "PAN Card", url: "#" },
      { name: "Teaching Certificate", type: "B.Ed", url: "#" },
    ],
    education: "B.Ed from Delhi University",
    experience: "3 years teaching experience",
  },
  {
    id: "3",
    teacherName: "Rohit Singh",
    email: "rohit@email.com",
    submittedDate: "Nov 22, 2025",
    status: "pending",
    documents: [
      { name: "ID Proof", type: "Aadhaar Card", url: "#" },
      { name: "Degree Certificate", type: "M.Sc", url: "#" },
      { name: "Experience Letter", type: "Coaching Institute", url: "#" },
      { name: "Teaching Certificate", type: "NET Qualified", url: "#" },
    ],
    education: "M.Sc Chemistry from IIT Delhi",
    experience: "7 years teaching experience",
  },
]

export default function AdminVerificationsPage() {
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null)

  const VerificationCard = ({ verification }: { verification: Verification }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {verification.teacherName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{verification.teacherName}</h3>
              <p className="text-sm text-muted-foreground">{verification.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-muted-foreground">{verification.education}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{verification.experience}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {verification.documents.length} documents submitted
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{verification.submittedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                verification.status === "pending"
                  ? "bg-warning/10 text-warning border-warning/20"
                  : verification.status === "approved"
                    ? "bg-accent/10 text-accent border-accent/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
              }
            >
              <Clock className="h-3 w-3 mr-1" />
              {verification.status}
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => setSelectedVerification(verification)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Review Verification - {verification.teacherName}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p className="font-medium">{verification.education}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{verification.experience}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Submitted Documents</p>
                    <div className="space-y-2">
                      {verification.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Admin Notes (Optional)</Label>
                    <Textarea id="notes" className="mt-1.5" placeholder="Add any notes about this verification..." />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const pendingVerifications = mockVerifications.filter((v) => v.status === "pending")

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Verifications</h1>
          <p className="text-muted-foreground text-sm">Review and verify teacher credentials</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">{pendingVerifications.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Approved Today</p>
            <p className="text-2xl font-bold text-accent">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rejected Today</p>
            <p className="text-2xl font-bold text-destructive">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Review Time</p>
            <p className="text-2xl font-bold text-foreground">4.2 hrs</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Verification Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending ({pendingVerifications.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-4">
              <div className="space-y-4">
                {pendingVerifications.map((verification) => (
                  <VerificationCard key={verification.id} verification={verification} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="mt-4">
              <p className="text-center text-muted-foreground py-8">No recently approved verifications</p>
            </TabsContent>

            <TabsContent value="rejected" className="mt-4">
              <p className="text-center text-muted-foreground py-8">No recently rejected verifications</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
