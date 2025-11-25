"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, IndianRupee, Calendar, MessageSquare, Edit, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Bid {
  id: string
  tuitionTitle: string
  subjects: string[]
  level: string
  proposedAmount: number
  originalBudget: number
  status: "applied" | "shortlisted" | "demo-scheduled" | "hired" | "rejected" | "withdrawn"
  appliedDate: string
  guardianName: string
}

const mockBids: Bid[] = [
  {
    id: "1",
    tuitionTitle: "Class 10 Math & Science Tutor - Online",
    subjects: ["Mathematics", "Science"],
    level: "Class 10",
    proposedAmount: 7500,
    originalBudget: 8000,
    status: "applied",
    appliedDate: "Nov 24, 2025",
    guardianName: "Zahidul Islam",
  },
  {
    id: "2",
    tuitionTitle: "JEE Physics Preparation",
    subjects: ["Physics"],
    level: "Class 11-12",
    proposedAmount: 14000,
    originalBudget: 15000,
    status: "shortlisted",
    appliedDate: "Nov 22, 2025",
    guardianName: "Rajesh Kumar",
  },
  {
    id: "3",
    tuitionTitle: "English Speaking Coach",
    subjects: ["English"],
    level: "Class 6-8",
    proposedAmount: 4500,
    originalBudget: 5000,
    status: "demo-scheduled",
    appliedDate: "Nov 20, 2025",
    guardianName: "Anita Sharma",
  },
  {
    id: "4",
    tuitionTitle: "Chemistry Tutor for NEET",
    subjects: ["Chemistry"],
    level: "NEET Prep",
    proposedAmount: 12000,
    originalBudget: 12000,
    status: "hired",
    appliedDate: "Nov 15, 2025",
    guardianName: "Suresh Patel",
  },
  {
    id: "5",
    tuitionTitle: "Class 9 Mathematics",
    subjects: ["Mathematics"],
    level: "Class 9",
    proposedAmount: 5500,
    originalBudget: 6000,
    status: "rejected",
    appliedDate: "Nov 10, 2025",
    guardianName: "Meera Joshi",
  },
]

const statusColors: Record<string, string> = {
  applied: "bg-info/10 text-info border-info/20",
  shortlisted: "bg-warning/10 text-warning border-warning/20",
  "demo-scheduled": "bg-primary/10 text-primary border-primary/20",
  hired: "bg-accent/10 text-accent border-accent/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  withdrawn: "bg-muted text-muted-foreground",
}

export default function MyBidsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filterBidsByStatus = (status?: string) => {
    let filtered = mockBids
    if (status) {
      filtered = filtered.filter((b) => b.status === status)
    }
    if (searchQuery) {
      filtered = filtered.filter((b) => b.tuitionTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return filtered
  }

  const BidCard = ({ bid }: { bid: Bid }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {bid.subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
              <Badge variant="outline" className={statusColors[bid.status]}>
                {bid.status.replace("-", " ")}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold text-foreground line-clamp-1">{bid.tuitionTitle}</h3>

            <p className="text-sm text-muted-foreground mt-1">
              Posted by {bid.guardianName} • {bid.level}
            </p>

            <div className="flex items-center gap-6 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">Your Bid</p>
                <p className="text-lg font-bold text-foreground flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {bid.proposedAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Posted Budget</p>
                <p className="text-sm text-muted-foreground">₹{bid.originalBudget.toLocaleString()}</p>
              </div>
              {bid.proposedAmount < bid.originalBudget && (
                <div>
                  <p className="text-xs text-muted-foreground">Savings for Guardian</p>
                  <p className="text-sm text-accent font-medium">
                    ₹{(bid.originalBudget - bid.proposedAmount).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Applied on {bid.appliedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bid.status === "applied" && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/teacher/bids/${bid.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              </Button>
            )}
            {(bid.status === "shortlisted" || bid.status === "demo-scheduled") && (
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/teacher/tuition/${bid.id}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Tuition
                  </Link>
                </DropdownMenuItem>
                {bid.status === "applied" && (
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Withdraw Bid
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Bids</h1>
          <p className="text-muted-foreground text-sm">Track and manage your tuition applications</p>
        </div>
        <Button asChild className="bg-primary">
          <Link href="/teacher/find-tuitions">Find More Tuitions</Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your bids..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({mockBids.length})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({mockBids.filter((b) => b.status === "applied").length})</TabsTrigger>
          <TabsTrigger value="shortlisted">
            Shortlisted ({mockBids.filter((b) => b.status === "shortlisted").length})
          </TabsTrigger>
          <TabsTrigger value="demo-scheduled">
            Demo ({mockBids.filter((b) => b.status === "demo-scheduled").length})
          </TabsTrigger>
          <TabsTrigger value="hired">Hired ({mockBids.filter((b) => b.status === "hired").length})</TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({mockBids.filter((b) => b.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filterBidsByStatus().map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        </TabsContent>

        {["applied", "shortlisted", "demo-scheduled", "hired", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="space-y-4">
              {filterBidsByStatus(status).length > 0 ? (
                filterBidsByStatus(status).map((bid) => <BidCard key={bid.id} bid={bid} />)
              ) : (
                <p className="text-center text-muted-foreground py-12">No {status.replace("-", " ")} bids found</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  )
}
