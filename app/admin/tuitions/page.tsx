"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Eye, Flag, Ban, IndianRupee } from "lucide-react"
import { mockTuitionPosts } from "@/lib/mock-data"

const statusColors: Record<string, string> = {
  open: "bg-accent/10 text-accent border-accent/20",
  "in-bidding": "bg-info/10 text-info border-info/20",
  hired: "bg-primary/10 text-primary border-primary/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-muted-foreground",
  closed: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function AdminTuitionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const tuitions = mockTuitionPosts

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tuition Management</h1>
          <p className="text-muted-foreground text-sm">Monitor and manage all tuition posts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Tuitions</p>
            <p className="text-2xl font-bold text-foreground">342</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Open</p>
            <p className="text-2xl font-bold text-accent">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-primary">98</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-muted-foreground">76</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Flagged</p>
            <p className="text-2xl font-bold text-destructive">12</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">All Tuition Posts</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tuitions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Bids</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tuitions.map((tuition) => (
                    <TableRow key={tuition.id}>
                      <TableCell>
                        <p className="font-medium text-foreground line-clamp-1 max-w-xs">{tuition.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {tuition.level} • {tuition.board}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tuition.subjects.slice(0, 2).map((s) => (
                            <Badge key={s} variant="secondary" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                          {tuition.subjects.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{tuition.subjects.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center font-medium">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {tuition.budgetAmount.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">/{tuition.budgetType}</span>
                      </TableCell>
                      <TableCell>{tuition.bidsCount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[tuition.status]}>
                          {tuition.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(tuition.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="h-4 w-4 mr-2" />
                              Flag Post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="h-4 w-4 mr-2" />
                              Remove Post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="open" className="mt-4">
              <p className="text-center text-muted-foreground py-8">Filter: Open tuitions</p>
            </TabsContent>

            <TabsContent value="in-progress" className="mt-4">
              <p className="text-center text-muted-foreground py-8">Filter: In-progress tuitions</p>
            </TabsContent>

            <TabsContent value="flagged" className="mt-4">
              <p className="text-center text-muted-foreground py-8">No flagged tuitions</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
