"use client"

import type { ReactNode } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "teacher" | "guardian" | "admin"
  userName: string
  userImage?: string
}

export function DashboardLayout({ children, userType, userName, userImage }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} userName={userName} userImage={userImage} />
      <Sidebar userType={userType} />
      <main className="ml-56 pt-4 pb-8 px-6">{children}</main>
    </div>
  )
}
