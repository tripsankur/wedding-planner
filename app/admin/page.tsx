import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminNav } from "@/components/admin/admin-nav"
import { Users, CheckCircle, XCircle, Clock, ImageIcon } from "lucide-react"

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const supabase = await getSupabaseServerClient()

  // Get statistics
  const { count: totalGuests } = await supabase.from("guests").select("*", { count: "exact", head: true })

  const { count: attendingCount } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("status", "attending")

  const { count: decliningCount } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("status", "not_attending")

  const { count: pendingCount } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: photosCount } = await supabase.from("photos").select("*", { count: "exact", head: true })

  const { count: pendingPhotos } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("approved", false)

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your wedding.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalGuests || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attending</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{attendingCount || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Declined</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{decliningCount || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingCount || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
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
                  <span className="font-semibold">{photosCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending Approval</span>
                  <span className="font-semibold text-yellow-600">{pendingPhotos || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a
                  href="/admin/guests"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  Manage Guests →
                </a>
                <a
                  href="/admin/rsvps"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  View RSVPs →
                </a>
                <a
                  href="/admin/photos"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                >
                  Moderate Photos →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
