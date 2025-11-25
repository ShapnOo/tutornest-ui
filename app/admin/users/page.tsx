"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, CheckCircle, XCircle, Eye, Ban, Mail } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  type: "teacher" | "guardian"
  status: "active" | "suspended" | "pending"
  verified: boolean
  joinedDate: string
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Tahmid Afsar Shapno",
    email: "rahul@email.com",
    type: "teacher",
    status: "active",
    verified: true,
    joinedDate: "Jan 15, 2024",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Zahidul Islam",
    email: "priya@email.com",
    type: "guardian",
    status: "active",
    verified: true,
    joinedDate: "Feb 20, 2024",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@email.com",
    type: "teacher",
    status: "pending",
    verified: false,
    joinedDate: "Nov 22, 2025",
    lastActive: "5 hours ago",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha@email.com",
    type: "teacher",
    status: "active",
    verified: true,
    joinedDate: "Mar 10, 2024",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Suresh Patel",
    email: "suresh@email.com",
    type: "guardian",
    status: "suspended",
    verified: true,
    joinedDate: "Apr 5, 2024",
    lastActive: "1 week ago",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const UserRow = ({ user }: { user: User }) => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {user.type}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            user.status === "active"
              ? "bg-accent/10 text-accent border-accent/20"
              : user.status === "suspended"
                ? "bg-destructive/10 text-destructive border-destructive/20"
                : "bg-warning/10 text-warning border-warning/20"
          }
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        {user.verified ? (
          <CheckCircle className="h-4 w-4 text-accent" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">{user.joinedDate}</TableCell>
      <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
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
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            {user.status === "active" ? (
              <DropdownMenuItem className="text-destructive">
                <Ban className="h-4 w-4 mr-2" />
                Suspend User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-accent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground text-sm">Manage teachers and guardians on the platform</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold text-foreground">2,847</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Teachers</p>
            <p className="text-2xl font-bold text-foreground">1,245</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Guardians</p>
            <p className="text-2xl font-bold text-foreground">1,602</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Verification</p>
            <p className="text-2xl font-bold text-foreground">23</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">All Users</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
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
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="guardians">Guardians</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="teachers" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter((u) => u.type === "teacher")
                    .map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="guardians" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter((u) => u.type === "guardian")
                    .map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter((u) => u.status === "pending")
                    .map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
