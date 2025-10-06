import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhotoModerationGrid } from "@/components/admin/photo-moderation-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminPhotosPage() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const supabase = await getSupabaseServerClient()

  const { data: pendingPhotos } = await supabase
    .from("photos")
    .select("*, guests(first_name, last_name)")
    .eq("approved", false)
    .order("created_at", { ascending: false })

  const { data: approvedPhotos } = await supabase
    .from("photos")
    .select("*, guests(first_name, last_name)")
    .eq("approved", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Photo Moderation</h1>
          <p className="text-muted-foreground">Review and approve guest-uploaded photos</p>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingPhotos?.length || 0})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedPhotos?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingPhotos && pendingPhotos.length > 0 ? (
                  <PhotoModerationGrid photos={pendingPhotos} />
                ) : (
                  <p className="text-center text-muted-foreground py-8">No photos pending approval</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Photos</CardTitle>
              </CardHeader>
              <CardContent>
                {approvedPhotos && approvedPhotos.length > 0 ? (
                  <PhotoModerationGrid photos={approvedPhotos} approved />
                ) : (
                  <p className="text-center text-muted-foreground py-8">No approved photos yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
