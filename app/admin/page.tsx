"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/auth/temp-admin-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminNav } from "@/components/admin/admin-nav"
import { Users, CheckCircle, XCircle, Clock, ImageIcon } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  if (!mounted) {
    return null
  }

  const stats = {
    totalGuests: 0,
    attendingCount: 0,
    decliningCount: 0,
    pendingCount: 0,
    photosCount: 0,
    pendingPhotos: 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-serif">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your wedding.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalGuests}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attending</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.attendingCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Declined</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.decliningCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Photo Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Photos</span>
                  <span className="font-semibold">{stats.photosCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Approval</span>
                  <span className="font-semibold text-yellow-600">{stats.pendingPhotos}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a
                  href="/admin/content"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  Manage Content →
                </a>
                <a
                  href="/admin/guests"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  Manage Guests →
                </a>
                <a
                  href="/admin/guide"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  View Guide →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
