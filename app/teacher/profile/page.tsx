"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Star, CheckCircle, MapPin, IndianRupee, Plus, X, Save } from "lucide-react"
import { mockTeacherProfile } from "@/lib/mock-data"

const allSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Computer Science",
  "Economics",
  "Accountancy",
  "History",
  "Geography",
]
const allLevels = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "JEE Prep", "NEET Prep", "Undergraduate"]
const allModes = ["online", "home-tutor", "student-visit", "hybrid"]
const allLanguages = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"]

export default function TeacherProfilePage() {
  const profile = mockTeacherProfile
  const [isAvailable, setIsAvailable] = useState(profile.availability)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(profile.subjects)
  const [selectedLevels, setSelectedLevels] = useState<string[]>(profile.levels)
  const [selectedModes, setSelectedModes] = useState<string[]>(profile.teachingMode)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(profile.languages)

  const toggleItem = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Teaching Profile</h1>
            <p className="text-muted-foreground text-sm">Manage your profile to attract more students</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} id="availability" />
              <Label htmlFor="availability" className="text-sm">
                {isAvailable ? "Available for new students" : "Not taking new students"}
              </Label>
            </div>
            <Button className="bg-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28">
                  <AvatarImage src="/professional-male-teacher-photo.jpg" alt={profile.fullName} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-foreground">{profile.fullName}</h2>
                  {profile.verificationStatus === "verified" && (
                    <Badge variant="outline" className="text-accent border-accent">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{profile.headline}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-medium">{profile.ratingAvg}</span>
                    <span className="text-muted-foreground">({profile.ratingCount} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {profile.location.area}, {profile.location.city}
                  </span>
                </div>
                <div className="flex items-center gap-6 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Experience</p>
                    <p className="font-semibold text-foreground">{profile.experienceYears} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Students Taught</p>
                    <p className="font-semibold text-foreground">{profile.totalStudentsTaught}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Classes</p>
                    <p className="font-semibold text-foreground">{profile.totalClasses}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
                <CardDescription>Your personal details and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={profile.fullName} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="headline">Headline / Tagline</Label>
                    <Input id="headline" defaultValue={profile.headline} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={profile.bio}
                    className="mt-1.5 min-h-32"
                    placeholder="Tell students about yourself, your teaching style, and what makes you unique..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={profile.location.city} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" defaultValue={profile.location.area} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allLanguages.map((lang) => (
                      <Badge
                        key={lang}
                        variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleItem(lang, selectedLanguages, setSelectedLanguages)}
                      >
                        {lang}
                        {selectedLanguages.includes(lang) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Tab */}
          <TabsContent value="teaching">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Teaching Preferences</CardTitle>
                <CardDescription>Subjects, levels, and teaching modes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Subjects You Teach</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allSubjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleItem(subject, selectedSubjects, setSelectedSubjects)}
                      >
                        {subject}
                        {selectedSubjects.includes(subject) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Levels / Classes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allLevels.map((level) => (
                      <Badge
                        key={level}
                        variant={selectedLevels.includes(level) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleItem(level, selectedLevels, setSelectedLevels)}
                      >
                        {level}
                        {selectedLevels.includes(level) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Teaching Mode</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allModes.map((mode) => (
                      <Badge
                        key={mode}
                        variant={selectedModes.includes(mode) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => toggleItem(mode, selectedModes, setSelectedModes)}
                      >
                        {mode.replace("-", " ")}
                        {selectedModes.includes(mode) && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedModes.some((m) => m !== "online") && (
                  <div>
                    <Label htmlFor="maxDistance">Maximum Distance (km) for Home Tuition</Label>
                    <Input
                      id="maxDistance"
                      type="number"
                      defaultValue={profile.location.maxDistanceKm}
                      className="mt-1.5 w-40"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pricing</CardTitle>
                <CardDescription>Set your rates for tuition services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyFrom">Hourly Rate (From)</Label>
                    <div className="relative mt-1.5">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="hourlyFrom" type="number" defaultValue={profile.hourlyRateFrom} className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hourlyTo">Hourly Rate (To)</Label>
                    <div className="relative mt-1.5">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="hourlyTo" type="number" defaultValue={profile.hourlyRateTo} className="pl-10" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="minMonthly">Minimum Monthly Package (Optional)</Label>
                  <div className="relative mt-1.5">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="minMonthly"
                      type="number"
                      defaultValue={profile.minMonthlyPackage}
                      className="pl-10 w-64"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum amount you charge for monthly tuition packages
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credentials Tab */}
          <TabsContent value="credentials">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Education & Credentials</CardTitle>
                <CardDescription>Your qualifications and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" defaultValue={profile.education} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue={profile.experienceYears} className="mt-1.5 w-32" />
                </div>
                <div>
                  <Label>Certifications</Label>
                  <div className="space-y-2 mt-2">
                    {profile.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input defaultValue={cert} className="flex-1" />
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Certification
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Achievements</Label>
                  <div className="space-y-2 mt-2">
                    {profile.achievements.map((ach, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input defaultValue={ach} className="flex-1" />
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Achievement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
