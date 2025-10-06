import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnnouncementForm } from "@/components/admin/announcement-form"
import { AnnouncementList } from "@/components/admin/announcement-list"
import { Plus } from "lucide-react"

export default async function AdminAnnouncementsPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const supabase = await getSupabaseServerClient()

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Announcements</h1>
          <p className="text-muted-foreground">Create and manage announcements for your guests</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Announcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnnouncementForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <AnnouncementList announcements={announcements || []} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
