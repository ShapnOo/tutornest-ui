"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndianRupee, Download, Calendar, CheckCircle, AlertTriangle } from "lucide-react"

const payouts = [
  { month: "Nov 2025", amount: 45000, status: "paid", date: "Nov 28, 2025" },
  { month: "Oct 2025", amount: 42000, status: "paid", date: "Oct 28, 2025" },
  { month: "Sep 2025", amount: 39800, status: "paid", date: "Sep 28, 2025" },
]

const invoices = [
  { id: "INV-2101", student: "Arif Hossain", amount: 7500, due: "Dec 1, 2025", status: "pending" },
  { id: "INV-2099", student: "Nusrat Jahan", amount: 12000, due: "Dec 5, 2025", status: "pending" },
  { id: "INV-2095", student: "Tahmid Rahman", amount: 4500, due: "Dec 10, 2025", status: "pending" },
  { id: "INV-2088", student: "Arif Hossain", amount: 7500, due: "Nov 1, 2025", status: "paid" },
]

export default function TeacherEarningsPage() {
  const totalPending = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0)
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0)

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno" userImage="/teacher-profile.png">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Earnings</h1>
            <p className="text-xs text-muted-foreground">Track payouts, invoices, and upcoming collections</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Pending (BDT)</p>
              <p className="text-2xl font-bold text-foreground">{totalPending.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Paid (BDT)</p>
              <p className="text-2xl font-bold text-foreground">{totalPaid.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">Last 4 invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-1">
              <p className="text-xs text-muted-foreground">Next payout</p>
              <p className="text-2xl font-bold text-foreground flex items-center gap-1">
                <IndianRupee className="h-5 w-5" />
                45,000
              </p>
              <p className="text-[11px] text-muted-foreground">Scheduled on 28 Nov 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground">Collection progress</p>
              <Progress value={65} className="h-2" />
              <p className="text-[11px] text-muted-foreground">65% of November invoices collected</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Payouts</CardTitle>
            <CardDescription className="text-xs">BDT transfers to your account</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount (BDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.month}>
                    <TableCell>{payout.month}</TableCell>
                    <TableCell>
                      <Badge variant={payout.status === "paid" ? "secondary" : "outline"} className="text-[11px]">
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      {payout.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="pt-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Pending Invoices</CardTitle>
                <CardDescription className="text-xs">Follow up with guardians for timely payments</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Due date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount (BDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((i) => i.status === "pending")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.student}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {invoice.due}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[11px] flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground">
                            {invoice.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="paid" className="pt-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Paid Invoices</CardTitle>
                <CardDescription className="text-xs">Recent clearances from guardians</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Paid on</TableHead>
                      <TableHead className="text-right">Amount (BDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((i) => i.status === "paid")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.student}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            {invoice.due}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground">
                            {invoice.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
