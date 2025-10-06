"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clearAdminSession } from "@/lib/auth/temp-admin-auth"
import { useRouter } from "next/navigation"
import { Home, Users, CheckSquare, ImageIcon, MessageSquare, LogOut, HelpCircle, Calendar } from "lucide-react"

export function AdminNav() {
  const router = useRouter()

  function handleLogout() {
    clearAdminSession()
    router.push("/admin/login")
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-semibold font-serif">
              Admin Panel
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/content"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Content
              </Link>
              <Link
                href="/admin/guests"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Users className="h-4 w-4" />
                Guests
              </Link>
              <Link
                href="/admin/rsvps"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <CheckSquare className="h-4 w-4" />
                RSVPs
              </Link>
              <Link
                href="/admin/photos"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ImageIcon className="h-4 w-4" />
                Photos
              </Link>
              <Link
                href="/admin/announcements"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Announcements
              </Link>
              <Link
                href="/admin/guide"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                Guide
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
