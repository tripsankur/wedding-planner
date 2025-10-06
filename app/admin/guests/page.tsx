import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GuestTable } from "@/components/admin/guest-table"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default async function AdminGuestsPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const supabase = await getSupabaseServerClient()

  const { data: guests } = await supabase
    .from("guests")
    .select("*, guest_groups(*)")
    .order("last_name", { ascending: true })

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Guest Management</h1>
            <p className="text-muted-foreground">Manage your guest list and access tokens</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/guests/import">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/guests/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Guest
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Guests ({guests?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <GuestTable guests={guests || []} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
