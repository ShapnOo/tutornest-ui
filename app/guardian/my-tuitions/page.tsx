"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, IndianRupee, Calendar, Users, MapPin, PlusCircle, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { mockTuitionPosts } from "@/lib/mock-data"

const statusColors: Record<string, string> = {
  open: "bg-accent/10 text-accent border-accent/20",
  "in-bidding": "bg-info/10 text-info border-info/20",
  hired: "bg-primary/10 text-primary border-primary/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-muted-foreground",
  closed: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function MyTuitionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const tuitions = mockTuitionPosts

  const filterByStatus = (status?: string) => {
    let filtered = tuitions
    if (status) {
      filtered = filtered.filter((t) => t.status === status)
    }
    if (searchQuery) {
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return filtered
  }

  const TuitionCard = ({ tuition }: { tuition: (typeof tuitions)[0] }) => {
    const daysRemaining = Math.ceil((new Date(tuition.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {tuition.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
                <Badge variant="outline" className={statusColors[tuition.status]}>
                  {tuition.status.replace("-", " ")}
                </Badge>
              </div>

              <Link href={`/guardian/tuition/${tuition.id}/bids`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                  {tuition.title}
                </h3>
              </Link>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-medium text-foreground">₹{tuition.budgetAmount.toLocaleString()}</span>
                  <span>/ {tuition.budgetType}</span>
                </span>
                {tuition.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {tuition.location.area}, {tuition.location.city}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {tuition.bidsCount} bids received
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {daysRemaining > 0 ? `${daysRemaining} days left` : "Expired"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{tuition.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" asChild>
                <Link href={`/guardian/tuition/${tuition.id}/bids`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Bids ({tuition.bidsCount})
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Tuition
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Close Tuition
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Tuition Posts</h1>
          <p className="text-muted-foreground text-sm">Manage your tuition requirements</p>
        </div>
        <Button asChild className="bg-primary">
          <Link href="/guardian/post-tuition">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post New Tuition
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tuition posts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({tuitions.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({tuitions.filter((t) => t.status === "open").length})</TabsTrigger>
          <TabsTrigger value="in-bidding">
            In Bidding ({tuitions.filter((t) => t.status === "in-bidding").length})
          </TabsTrigger>
          <TabsTrigger value="hired">Hired ({tuitions.filter((t) => t.status === "hired").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filterByStatus().map((tuition) => (
              <TuitionCard key={tuition.id} tuition={tuition} />
            ))}
          </div>
        </TabsContent>

        {["open", "in-bidding", "hired"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="space-y-4">
              {filterByStatus(status).length > 0 ? (
                filterByStatus(status).map((tuition) => <TuitionCard key={tuition.id} tuition={tuition} />)
              ) : (
                <p className="text-center text-muted-foreground py-12">No {status.replace("-", " ")} tuitions found</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  )
}
