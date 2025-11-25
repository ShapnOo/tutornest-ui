"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Search,
  User,
  Briefcase,
  Bookmark,
  Calendar,
  FileText,
  Crown,
  GraduationCap,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  PlusCircle,
  Video,
} from "lucide-react"

interface SidebarProps {
  userType: "teacher" | "guardian" | "admin"
}

const teacherNavItems = [
  { href: "/teacher/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/teacher/find-tuitions", label: "Find Tuitions", icon: Search },
  { href: "/teacher/profile", label: "My Profile", icon: User },
  { href: "/teacher/my-bids", label: "My Bids", icon: Briefcase },
  { href: "/teacher/credits", label: "Credits", icon: DollarSign },
  { href: "/teacher/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/teacher/students", label: "My Students", icon: GraduationCap },
  { href: "/teacher/online-class", label: "Online Classes", icon: Video },
  { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
  { href: "/teacher/earnings", label: "Earnings", icon: DollarSign },
  { href: "/teacher/messages", label: "Messages", icon: MessageSquare },
  { href: "/teacher/premium", label: "Premium Features", icon: Crown },
]

const guardianNavItems = [
  { href: "/guardian/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/guardian/post-tuition", label: "Post Tuition", icon: PlusCircle },
  { href: "/guardian/my-tuitions", label: "My Tuitions", icon: Briefcase },
  { href: "/guardian/find-tutors", label: "Find Tutors", icon: Search },
  { href: "/guardian/hired-teachers", label: "Hired Teachers", icon: Users },
  { href: "/guardian/students", label: "My Children", icon: GraduationCap },
  { href: "/guardian/profile", label: "Profile", icon: User },
  { href: "/guardian/online-class", label: "Online Classes", icon: Video },
  { href: "/guardian/credits", label: "Credits", icon: DollarSign },
  { href: "/guardian/schedule", label: "Schedule", icon: Calendar },
  { href: "/guardian/payments", label: "Payments", icon: DollarSign },
  { href: "/guardian/messages", label: "Messages", icon: MessageSquare },
]

const adminNavItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/tuitions", label: "Tuitions", icon: Briefcase },
  { href: "/admin/verifications", label: "Verifications", icon: FileText },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname()

  const navItems = userType === "teacher" ? teacherNavItems : userType === "guardian" ? guardianNavItems : adminNavItems

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-56 border-r border-sidebar-border bg-sidebar overflow-y-auto">
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
