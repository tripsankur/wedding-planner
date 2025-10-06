import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RSVPTable } from "@/components/admin/rsvp-table"

export default async function AdminRSVPsPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const supabase = await getSupabaseServerClient()

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*, guests(first_name, last_name, email), events(title, event_date)")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">RSVP Responses</h1>
          <p className="text-muted-foreground">Track and manage guest responses</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Responses ({rsvps?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <RSVPTable rsvps={rsvps || []} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
