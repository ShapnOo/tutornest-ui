"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTeachers } from "@/lib/mock-data"
import { Search, MapPin, Clock, Star, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

type FilterOption = { label: string; value: string }

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string
  onChange: (v: string) => void
  options: FilterOption[]
  placeholder: string
  className?: string
}) {
  const current = options.find((o) => o.value === value)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between min-w-[180px] text-sm", className)}
          role="combobox"
          aria-expanded="false"
        >
          <span className="text-left leading-tight">{current ? current.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[240px]">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem key={option.value} value={option.value} onSelect={(val) => onChange(val)}>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function FindTutorsPage() {
  const [query, setQuery] = useState("")
  const [modeFilter, setModeFilter] = useState<string>("all")
  const [subjectFilter, setSubjectFilter] = useState<string>("all")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [rateFilter, setRateFilter] = useState<string>("all")

  const teachers = useMemo(() => {
    return mockTeachers
      .filter((teacher) =>
        query
          ? teacher.fullName.toLowerCase().includes(query.toLowerCase()) ||
            teacher.subjects.some((s) => s.toLowerCase().includes(query.toLowerCase()))
          : true,
      )
      .filter((teacher) => (modeFilter === "all" ? true : teacher.teachingMode.includes(modeFilter as any)))
      .filter((teacher) => (subjectFilter === "all" ? true : teacher.subjects.includes(subjectFilter)))
      .filter((teacher) => (cityFilter === "all" ? true : teacher.location.city === cityFilter))
      .filter((teacher) => (levelFilter === "all" ? true : teacher.levels.includes(levelFilter)))
      .filter((teacher) =>
        experienceFilter === "all" ? true : teacher.experienceYears >= Number(experienceFilter),
      )
      .filter((teacher) => {
        if (rateFilter === "all") return true
        const max = Number(rateFilter)
        return teacher.hourlyRateFrom <= max
      })
  }, [query, modeFilter, subjectFilter, cityFilter, levelFilter, experienceFilter, rateFilter])

  const subjects = Array.from(new Set(mockTeachers.flatMap((t) => t.subjects)))
  const cities = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal"]
  const levels = Array.from(new Set(mockTeachers.flatMap((t) => t.levels)))

  const filterOptions = {
    subject: [{ label: "All subjects", value: "all" }, ...subjects.map((s) => ({ label: s, value: s }))],
    level: [{ label: "Any level", value: "all" }, ...levels.map((l) => ({ label: l, value: l }))],
    mode: [
      { label: "Any mode", value: "all" },
      { label: "Online", value: "online" },
      { label: "Home tutor (teacher visits)", value: "home-tutor" },
      { label: "At teacher place", value: "student-visit" },
      { label: "Hybrid", value: "hybrid" },
    ],
    city: [{ label: "Any city", value: "all" }, ...cities.map((c) => ({ label: c, value: c }))],
    experience: [
      { label: "Any experience", value: "all" },
      { label: "2+ yrs", value: "2" },
      { label: "5+ yrs", value: "5" },
      { label: "8+ yrs", value: "8" },
    ],
    rate: [
      { label: "Any rate", value: "all" },
      { label: "Up to 500 BDT/hr", value: "500" },
      { label: "Up to 800 BDT/hr", value: "800" },
      { label: "Up to 1200 BDT/hr", value: "1200" },
    ],
  }

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Find Tutors</h1>
          <p className="text-sm text-muted-foreground">Browse verified tutors across Bangladesh and invite them to your tuition.</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Filters</CardTitle>
                <CardDescription>Fine-tune to find the right tutor across Bangladesh.</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery("")
                  setSubjectFilter("all")
                  setModeFilter("all")
                  setCityFilter("all")
                  setLevelFilter("all")
                  setExperienceFilter("all")
                  setRateFilter("all")
                }}
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              <div className="relative lg:col-span-3">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name or subject"
                  className="pl-9 h-full"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <FilterSelect
                className="lg:col-span-2"
                value={subjectFilter}
                onChange={setSubjectFilter}
                placeholder="Subject"
                options={filterOptions.subject}
              />
              <FilterSelect
                className="lg:col-span-2"
                value={levelFilter}
                onChange={setLevelFilter}
                placeholder="Level"
                options={filterOptions.level}
              />
              <FilterSelect
                className="lg:col-span-2"
                value={modeFilter}
                onChange={setModeFilter}
                placeholder="Mode"
                options={filterOptions.mode}
              />
              <FilterSelect
                className="lg:col-span-3"
                value={cityFilter}
                onChange={setCityFilter}
                placeholder="City"
                options={filterOptions.city}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 items-stretch">
              <FilterSelect
                className="lg:col-span-3"
                value={experienceFilter}
                onChange={setExperienceFilter}
                placeholder="Experience"
                options={filterOptions.experience}
              />
              <FilterSelect
                className="lg:col-span-3"
                value={rateFilter}
                onChange={setRateFilter}
                placeholder="Rate"
                options={filterOptions.rate}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-md transition-shadow border-border/80">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={teacher.photo || "/placeholder.svg"} alt={teacher.fullName} />
                    <AvatarFallback>{teacher.fullName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{teacher.fullName}</p>
                        <p className="text-xs text-muted-foreground">{teacher.headline}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {teacher.verificationStatus === "verified" ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                      {teacher.subjects.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{teacher.subjects.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-medium text-foreground">{teacher.experienceYears}+ years</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-medium text-foreground flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {teacher.ratingAvg} ({teacher.ratingCount})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Rate range</p>
                    <p className="font-medium text-foreground">
                      BDT {teacher.hourlyRateFrom} - {teacher.hourlyRateTo} / hour
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Mode</p>
                    <p className="font-medium text-foreground capitalize">{teacher.teachingMode.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {teacher.location.area}, {teacher.location.city}
                  <Clock className="h-4 w-4 ml-3" />
                  Available now
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {teacher.languages?.slice(0, 2).map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/teacher/profile/${teacher.id}`}>View profile</Link>
                    </Button>
                    <Button size="sm" className="bg-primary">
                      Invite to bid
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {teachers.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                No tutors match the current filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

