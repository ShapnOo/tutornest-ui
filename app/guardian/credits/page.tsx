"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { CreditCard, ShieldCheck, Clock } from "lucide-react"

const packs = [
  { label: "Starter", credits: 5, price: 300, highlight: false },
  { label: "Pro", credits: 15, price: 800, highlight: true },
  { label: "Growth", credits: 30, price: 1500, highlight: false },
]

const history = [
  { id: "GC-103", credits: 15, amount: 800, date: "Nov 20, 2025", status: "paid" },
  { id: "GC-102", credits: 5, amount: 300, date: "Oct 15, 2025", status: "paid" },
  { id: "GC-101", credits: 5, amount: 300, date: "Sep 10, 2025", status: "paid" },
]

export default function GuardianCreditsPage() {
  const [currentCredits, setCurrentCredits] = useState(5)

  return (
    <DashboardLayout
      userType="guardian"
      userName="Zahidul Islam"
      userImage="https://crmapi.criptonpro.com/uploads/1752042633812-291278820.jpg"
    >
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Post Tuition Credits</h1>
            <p className="text-xs text-muted-foreground">1 credit to post a tuition. Add credits to reach more tutors.</p>
          </div>
          <Badge variant="outline" className="text-[11px]">
            Current credits: {currentCredits}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="border-border/80">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground">Usage this month</p>
              <Progress value={30} className="h-2" />
              <p className="text-[11px] text-muted-foreground">30% of credits used</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4" />
                Next reset on Dec 31, 2025
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/80">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground">Protection</p>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Credits refunded if post is cancelled
              </div>
              <p className="text-[11px] text-muted-foreground">Applied automatically to new posts</p>
            </CardContent>
          </Card>
          <Card className="border-border/80">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs text-muted-foreground">Tip</p>
              <p className="text-sm text-foreground">Use clear subjects and time slots to get bids faster.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {packs.map((pack) => (
            <Card
              key={pack.label}
              className={pack.highlight ? "border-primary/60 shadow-md" : "border-border/80"}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center justify-between">
                  {pack.label}
                  {pack.highlight && (
                    <Badge variant="secondary" className="text-[11px]">
                      Popular
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-xs">BDT {pack.price}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-2xl font-bold text-foreground">{pack.credits} credits</p>
                <p className="text-[11px] text-muted-foreground">Use for {pack.credits} postings</p>
                <Button className="w-full bg-primary" size="sm" onClick={() => setCurrentCredits((c) => c + pack.credits)}>
                  <CreditCard className="h-4 w-4 mr-1" />
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Purchase History</CardTitle>
            <CardDescription className="text-xs">Recent credit top-ups</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount (BDT)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.credits}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      {item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
