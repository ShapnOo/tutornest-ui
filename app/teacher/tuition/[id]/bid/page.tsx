"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, IndianRupee, AlertCircle, CalendarIcon, Upload } from "lucide-react"
import Link from "next/link"
import { mockTuitionPosts } from "@/lib/mock-data"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function PlaceBidPage() {
  const params = useParams()
  const router = useRouter()
  const tuition = mockTuitionPosts.find((t) => t.id === params.id)

  const [bidAmount, setBidAmount] = useState("")
  const [message, setMessage] = useState("")
  const [deliveryPlan, setDeliveryPlan] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [error, setError] = useState("")

  if (!tuition) {
    return (
      <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
        <p>Tuition not found</p>
      </DashboardLayout>
    )
  }

  const minBid = Math.ceil(tuition.budgetAmount * 0.75)
  const maxBid = tuition.budgetAmount

  const handleBidAmountChange = (value: string) => {
    setBidAmount(value)
    const numValue = Number.parseInt(value)
    if (numValue < minBid) {
      setError(`Minimum bid allowed is ₹${minBid.toLocaleString()} (75% of posted budget)`)
    } else if (numValue > maxBid) {
      setError(`Maximum bid is ₹${maxBid.toLocaleString()} (posted budget)`)
    } else {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numValue = Number.parseInt(bidAmount)
    if (numValue < minBid || numValue > maxBid) {
      return
    }
    // Submit bid logic here
    router.push("/teacher/my-bids")
  }

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/teacher/find-tuitions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tuitions
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bid Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
                <CardDescription>Submit your proposal for this tuition opportunity</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bid Amount */}
                  <div>
                    <Label htmlFor="bidAmount">Your Bid Amount (₹ / {tuition.budgetType})</Label>
                    <div className="relative mt-1.5">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder={`Enter amount (₹${minBid.toLocaleString()} - ₹${maxBid.toLocaleString()})`}
                        className="pl-10"
                        value={bidAmount}
                        onChange={(e) => handleBidAmountChange(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Allowed bid range: ₹{minBid.toLocaleString()} – ₹{maxBid.toLocaleString()}
                    </p>
                    {error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Delivery Plan */}
                  <div>
                    <Label htmlFor="deliveryPlan">Your Teaching Plan</Label>
                    <Textarea
                      id="deliveryPlan"
                      placeholder="E.g., 4 days per week, 1.5 hours per day. Will cover all NCERT topics plus extra practice problems..."
                      className="mt-1.5 min-h-24"
                      value={deliveryPlan}
                      onChange={(e) => setDeliveryPlan(e.target.value)}
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <Label>Available Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full mt-1.5 justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Cover Message */}
                  <div>
                    <Label htmlFor="message">Cover Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain why you're the best fit for this tuition..."
                      className="mt-1.5 min-h-32"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Attachments */}
                  <div>
                    <Label>Attachments (Optional)</Label>
                    <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">Drag and drop files or click to upload</p>
                      <p className="text-xs text-muted-foreground">
                        Sample notes, demo plan, certificates (Max 5MB each)
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-primary" disabled={!!error || !bidAmount}>
                      Submit Bid
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/teacher/find-tuitions">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tuition Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tuition Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-2">{tuition.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tuition.subjects.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{tuition.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Board</span>
                    <span className="font-medium">{tuition.board}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mode</span>
                    <span className="font-medium capitalize">{tuition.mode.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">{tuition.schedule.daysPerWeek} days/week</span>
                  </div>
                </div>

                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground">Posted Budget</p>
                  <p className="text-xl font-bold text-foreground">
                    ₹{tuition.budgetAmount.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-1">/ {tuition.budgetType}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Min bid: ₹{minBid.toLocaleString()} (75%)</p>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>{tuition.bidsCount} bids already placed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
