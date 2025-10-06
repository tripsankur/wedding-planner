import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentGuest } from "@/lib/auth/guest-auth"
import { TokenAccessForm } from "@/components/rsvp/token-access-form"
import { RSVPDashboard } from "@/components/rsvp/rsvp-dashboard"
import { Heart } from "lucide-react"

export default async function RSVPPage() {
  const guest = await getCurrentGuest()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">RSVP</h1>
            <p className="text-xl text-muted-foreground">We can't wait to celebrate with you</p>
          </div>

          {!guest ? (
            <Card>
              <CardHeader>
                <CardTitle>Access Your Invitation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Please enter the access code from your invitation to view and respond to your RSVP.
                </p>
                <TokenAccessForm />
              </CardContent>
            </Card>
          ) : (
            <RSVPDashboard guest={guest} />
          )}
        </div>
      </main>
    </div>
  )
}
