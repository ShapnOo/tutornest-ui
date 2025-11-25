"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Info } from "lucide-react"

const presetSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Bangla",
  "Accounting",
  "Economics",
  "ICT",
]

const levels = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "Admission Test", "IELTS/Spoken English"]

const curriculums = [
  "Bangla Medium (NCTB)",
  "English Version (NCTB)",
  "English Medium (Cambridge/Edexcel)",
  "Madrasa (Alia)",
]

const boards = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Comilla", "Dinajpur"]

const modeOptions = ["Online", "Home (teacher visits)", "At teacher place (student visits)"]

const focusAreas = [
  "Board exam prep",
  "Concept clarity",
  "Homework support",
  "Admission test",
  "Spoken English",
  "Weak subject boost",
]

const dayOptions = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

const cityOptions = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal"]

const toggleValue = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
  setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
}

export default function PostTuitionPage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<string[]>([])
  const [customSubject, setCustomSubject] = useState("")
  const [selectedModes, setSelectedModes] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedFocus, setSelectedFocus] = useState<string[]>([])

  const showLocation = selectedModes.some((mode) => mode !== "Online")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/guardian/my-tuitions")
  }

  const addCustomSubject = () => {
    const trimmed = customSubject.trim()
    if (!trimmed) return
    if (!subjects.includes(trimmed)) {
      setSubjects((prev) => [...prev, trimmed])
    }
    setCustomSubject("")
  }

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="max-w-5xl mx-auto space-y-3">
        <Button variant="ghost" className="mb-1" asChild>
          <Link href="/guardian/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Basics</CardTitle>
              <CardDescription>Class level, curriculum, and a short, clear tuition title.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <Label htmlFor="title">Tuition title *</Label>
                  <Input id="title" placeholder="Class 10 Math & Physics - English Version" />
                  <p className="text-xs text-muted-foreground">Add class, subjects, and medium in one line.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="studentName">Student name</Label>
                    <Input id="studentName" placeholder="e.g., Arjun Gupta" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="studentsCount">Students (count)</Label>
                    <Input id="studentsCount" type="number" min={1} placeholder="1" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Class / Level *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Curriculum *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Choose curriculum" />
                      </SelectTrigger>
                      <SelectContent>
                        {curriculums.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Education Board</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                      <SelectContent>
                        {boards.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item} Board
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school">School / College</Label>
                    <Input id="school" placeholder="e.g., Viqarunnisa Noon School" className="mt-1.5" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="language">Preferred teaching language</Label>
                    <Input id="language" placeholder="e.g., Bangla or English" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Guardian contact (phone/WhatsApp) *</Label>
                    <Input id="contact" placeholder="01XXXXXXXXX" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Subjects</CardTitle>
              <CardDescription>Select multiple subjects or add your own.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {presetSubjects.map((subject) => {
                  const active = subjects.includes(subject)
                  return (
                    <Button
                      key={subject}
                      type="button"
                      size="sm"
                      variant={active ? "default" : "outline"}
                      onClick={() => toggleValue(subject, subjects, setSubjects)}
                    >
                      {subject}
                    </Button>
                  )
                })}
              </div>
              <div className="flex gap-2 max-w-md">
                <Input
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Add another subject (e.g., Higher Math, Biology Practical)"
                />
                <Button type="button" variant="outline" onClick={addCustomSubject}>
                  Add
                </Button>
              </div>
              {subjects.length > 0 && <p className="text-xs text-muted-foreground">Selected: {subjects.join(", ")}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Mode & Location</CardTitle>
              <CardDescription>Pick online or offline. For offline, share city and area so nearby teachers can bid.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {modeOptions.map((mode) => {
                  const active = selectedModes.includes(mode)
                  return (
                    <Button
                      key={mode}
                      type="button"
                      size="sm"
                      variant={active ? "default" : "outline"}
                      onClick={() => toggleValue(mode, selectedModes, setSelectedModes)}
                    >
                      {mode}
                    </Button>
                  )
                })}
              </div>
              {showLocation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>City *</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cityOptions.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="area">Area / Thana *</Label>
                    <Input id="area" placeholder="e.g., Dhanmondi, Mirpur, Banani" className="mt-1.5" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Schedule & Budget</CardTitle>
              <CardDescription>Pick days, time, and your monthly budget in BDT.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Schedule *</Label>
                  <div className="flex flex-wrap gap-2">
                    {dayOptions.map((day) => {
                      const active = selectedDays.includes(day)
                      return (
                        <Button
                          key={day}
                          type="button"
                          size="sm"
                          variant={active ? "default" : "outline"}
                          onClick={() => toggleValue(day, selectedDays, setSelectedDays)}
                        >
                          {day}
                        </Button>
                      )
                    })}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="timeSlot">Preferred time *</Label>
                      <Input id="timeSlot" placeholder="e.g., 6:00 PM - 7:30 PM" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Duration per class</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {["45 mins", "1 hour", "1.5 hours", "2 hours"].map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="daysPerWeek">Days per week *</Label>
                      <Input id="daysPerWeek" type="number" min={1} max={7} placeholder="3" className="mt-1.5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Budget (BDT) *</Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1 min-w-[180px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                        BDT
                      </span>
                      <Input id="budget" type="number" placeholder="Monthly amount in BDT" className="pl-12" />
                    </div>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Per month</SelectItem>
                        <SelectItem value="per-hour">Per hour</SelectItem>
                        <SelectItem value="per-subject">Per subject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flexible" />
                    <Label htmlFor="flexible" className="text-sm">
                      Flexible if teacher is experienced
                    </Label>
                  </div>
                  <Alert className="bg-muted">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">Highlight if you want a trial class.</AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Expectations & Preferences</CardTitle>
              <CardDescription>Explain the student's gaps, exam targets, and any soft preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <Label htmlFor="description">Requirements & expectations *</Label>
                  <Textarea
                    id="description"
                    className="min-h-32"
                    placeholder="Share syllabus focus, recent scores, weak chapters, language preference, and any discipline expectations."
                  />
                </div>
                <div className="space-y-3">
                  <Label>What to prioritize</Label>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map((item) => {
                      const active = selectedFocus.includes(item)
                      return (
                        <Button
                          key={item}
                          type="button"
                          size="sm"
                          variant={active ? "default" : "outline"}
                          onClick={() => toggleValue(item, selectedFocus, setSelectedFocus)}
                        >
                          {item}
                        </Button>
                      )
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Experience needed</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Any experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Any</SelectItem>
                          <SelectItem value="1">1+ years</SelectItem>
                          <SelectItem value="3">3+ years</SelectItem>
                          <SelectItem value="5">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gender preference</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="No preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">No preference</SelectItem>
                          <SelectItem value="female">Female teacher</SelectItem>
                          <SelectItem value="male">Male teacher</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Start from</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="this-week">This week</SelectItem>
                          <SelectItem value="next-week">Next week</SelectItem>
                          <SelectItem value="next-month">Next month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Contact preference</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-lg border">
                <Checkbox id="demo" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="demo" className="font-medium">
                    Ask for a demo class
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    We will highlight your post so teachers offer a short demo before you hire.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button type="button" variant="outline" className="sm:w-auto w-full">
                  Save as draft
                </Button>
                <Button type="submit" className="bg-primary sm:w-auto w-full">
                  Publish tuition
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
