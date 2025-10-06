import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RSVPForm } from "./rsvp-form"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { logoutGuest } from "@/lib/auth/guest-auth"
import type { Guest } from "@/lib/types/database"
import { LogOut } from "lucide-react"

export async function RSVPDashboard({ guest }: { guest: Guest }) {
  const supabase = await getSupabaseServerClient()

  // Get all events
  const { data: events } = await supabase.from("events").select("*").order("display_order", { ascending: true })

  // Get guest's RSVPs
  const { data: rsvps } = await supabase.from("rsvps").select("*").eq("guest_id", guest.id)

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                Welcome, {guest.first_name} {guest.last_name}!
              </CardTitle>
              <p className="text-muted-foreground mt-1">{guest.email}</p>
            </div>
            <form action={logoutGuest}>
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          {guest.guest_groups && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Group:</strong> {guest.guest_groups.name}
              </p>
              {guest.guest_groups.max_plus_ones > 0 && (
                <p className="text-sm text-muted-foreground">
                  <strong>Plus Ones Allowed:</strong> {guest.guest_groups.max_plus_ones}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* RSVP Form */}
      <RSVPForm guest={guest} events={events || []} existingRsvps={rsvps || []} />
    </div>
  )
}
