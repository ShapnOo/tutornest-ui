"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, User, Shield } from "lucide-react"

export default function LoginSelectPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Teacher
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Bid on tuitions, manage classes, and earnings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full bg-primary">
              <Link href="/teacher/login">Login as Teacher</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/teacher/register">Create Teacher Account</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Guardian
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Post tuitions, hire teachers, and track classes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full bg-primary">
              <Link href="/guardian/login">Login as Guardian</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/guardian/register">Create Guardian Account</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Admin
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Manage users, posts, and platform settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full bg-primary">
              <Link href="/admin/login">Login as Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
