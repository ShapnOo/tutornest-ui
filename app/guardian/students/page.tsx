"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Edit, User, Phone, Mail, MapPin } from "lucide-react"

interface StudentWithGuardian {
  id: string
  studentName: string
  age: number
  class: string
  board: string
  subjectsNeeded: string[]
  guardian: {
    guardianName: string
    relationship: string
    phonePrimary: string
    email: string
    address: string
    city: string
  }
}

const mockChildren: StudentWithGuardian[] = [
  {
    id: "1",
    studentName: "Arjun Gupta",
    age: 15,
    class: "Class 10",
    board: "CBSE",
    subjectsNeeded: ["Mathematics", "Science", "English"],
    guardian: {
      guardianName: "Zahidul Islam",
      relationship: "Mother",
      phonePrimary: "+91 98765 43210",
      email: "priya.gupta@email.com",
      address: "123 Green Park",
      city: "New Delhi",
    },
  },
  {
    id: "2",
    studentName: "Ananya Gupta",
    age: 12,
    class: "Class 7",
    board: "CBSE",
    subjectsNeeded: ["Hindi", "Social Science"],
    guardian: {
      guardianName: "Zahidul Islam",
      relationship: "Mother",
      phonePrimary: "+91 98765 43210",
      email: "priya.gupta@email.com",
      address: "123 Green Park",
      city: "New Delhi",
    },
  },
]

export default function MyChildrenPage() {
  const [isAddingStudent, setIsAddingStudent] = useState(false)

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Children</h1>
          <p className="text-muted-foreground text-sm">Manage student profiles for tuition posts</p>
        </div>
        <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Student Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input id="studentName" className="mt-1.5" placeholder="Enter name" />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" className="mt-1.5" placeholder="Enter age" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Class *</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`Class ${i + 1}`}>
                          Class {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Board *</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="State Board">State Board</SelectItem>
                      <SelectItem value="IB">IB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium text-foreground mb-3">Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guardianName">Guardian Name *</Label>
                    <Input id="guardianName" className="mt-1.5" defaultValue="Zahidul Islam" />
                  </div>
                  <div>
                    <Label>Relationship *</Label>
                    <Select defaultValue="Mother">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" className="mt-1.5" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" className="mt-1.5" defaultValue="priya.gupta@email.com" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsAddingStudent(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary" onClick={() => setIsAddingStudent(false)}>
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Students List */}
      <div className="grid gap-6">
        {mockChildren.map((child) => (
          <Card key={child.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt={child.studentName} />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {child.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{child.studentName}</h3>
                      <p className="text-muted-foreground">
                        {child.class} • {child.board} • {child.age} years old
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {child.subjectsNeeded.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  {/* Guardian Info */}
                  <div className="mt-4 p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Guardian Information
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p className="font-medium text-foreground">{child.guardian.guardianName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Relationship</p>
                        <p className="font-medium text-foreground">{child.guardian.relationship}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> Phone
                        </p>
                        <p className="font-medium text-foreground">{child.guardian.phonePrimary}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> Email
                        </p>
                        <p className="font-medium text-foreground">{child.guardian.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Address
                      </p>
                      <p className="font-medium text-foreground">
                        {child.guardian.address}, {child.guardian.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
