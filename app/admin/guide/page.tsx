import { AdminNav } from "@/components/admin/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckSquare, ImageIcon, MessageSquare, Mail, Copy } from "lucide-react"

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Guide</h1>
          <p className="text-muted-foreground text-lg">Complete guide to managing your wedding website</p>
        </div>

        <div className="space-y-6">
          {/* Guest Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Guest Management</CardTitle>
              </div>
              <CardDescription>Add and organize your wedding guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Adding Guests</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Click "Add Guest" to manually add individual guests</li>
                  <li>Or use "Import CSV" to bulk upload guests from a spreadsheet</li>
                  <li>Each guest automatically gets a unique RSVP token</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Guest Groups & Plus-Ones</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Assign guests to groups (Family, Friends, Colleagues, etc.)</li>
                  <li>Set max plus-ones per group (e.g., couples get 0, singles get 1)</li>
                  <li>Groups help you manage invitations and seating arrangements</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags & Segmentation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Add tags like "reception-only", "vip", "local", "out-of-town"</li>
                  <li>Use tags to send targeted announcements to specific groups</li>
                  <li>Filter and search guests by tags in the admin panel</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Sending Invitations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>
                    Click the <Copy className="h-3 w-3 inline" /> icon to copy a guest's unique RSVP token
                  </li>
                  <li>
                    Share their personalized link:{" "}
                    <code className="bg-muted px-1 rounded">yourwebsite.com/rsvp?token=TOKEN</code>
                  </li>
                  <li>Or click "Send Invitation" to email them directly with their link</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* RSVP Tracking */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-6 w-6 text-primary" />
                <CardTitle>RSVP Tracking</CardTitle>
              </div>
              <CardDescription>Monitor and manage guest responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Viewing RSVPs</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>See all RSVPs with status badges (Attending, Declined, Pending)</li>
                  <li>View meal choices, dietary restrictions, and special requests</li>
                  <li>Track plus-ones and total guest count</li>
                  <li>Filter by event, status, or guest name</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">RSVP Status</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-green-600">Attending</span> - Guest confirmed they're coming
                  </li>
                  <li>
                    <span className="font-medium text-red-600">Declined</span> - Guest cannot attend
                  </li>
                  <li>
                    <span className="font-medium text-yellow-600">Pending</span> - Guest hasn't responded yet
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Meal Tracking</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>View meal choices for catering (Chicken, Vegetarian, Vegan, Fish)</li>
                  <li>See dietary restrictions and allergies</li>
                  <li>Export data for your caterer</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <ImageIcon className="h-6 w-6 text-primary" />
                <CardTitle>Photo Gallery Management</CardTitle>
              </div>
              <CardDescription>Moderate and manage guest-uploaded photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Photo Moderation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Review all photos uploaded by guests before they appear publicly</li>
                  <li>Click "Approve" to make photos visible in the gallery</li>
                  <li>Click "Delete" to remove inappropriate or duplicate photos</li>
                  <li>Guests receive email notifications when their photos are approved</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Photo Organization</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>View photos in tabs: Pending, Approved, All</li>
                  <li>See who uploaded each photo and when</li>
                  <li>Photos are stored securely in Vercel Blob storage</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>Announcements & Messaging</CardTitle>
              </div>
              <CardDescription>Send updates and messages to your guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Creating Announcements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Write updates about schedule changes, weather, or reminders</li>
                  <li>Target specific guest groups using tags</li>
                  <li>Send to "All Guests" or filter by tags like "reception-only"</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email Notifications</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Announcements are automatically emailed to selected guests</li>
                  <li>Guests also receive RSVP confirmation emails</li>
                  <li>Photo approval notifications are sent automatically</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Analytics */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Dashboard Analytics</CardTitle>
              </div>
              <CardDescription>Track your wedding planning progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Metrics</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>Total Guests</strong> - Number of people invited
                  </li>
                  <li>
                    <strong>RSVPs Received</strong> - How many have responded
                  </li>
                  <li>
                    <strong>Attending</strong> - Confirmed attendees
                  </li>
                  <li>
                    <strong>Pending Photos</strong> - Photos awaiting moderation
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Jump to any section from the dashboard</li>
                  <li>See recent activity and updates</li>
                  <li>Monitor RSVP progress at a glance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">📧 Send Invites Early</h4>
                <p className="text-muted-foreground">
                  Send RSVP links 6-8 weeks before the event to give guests time to respond.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">🏷️ Use Tags Strategically</h4>
                <p className="text-muted-foreground">
                  Tag guests by relationship, location, or event to send targeted updates.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">📸 Moderate Photos Daily</h4>
                <p className="text-muted-foreground">
                  Check pending photos regularly to keep the gallery fresh and engaging.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">📊 Export Data</h4>
                <p className="text-muted-foreground">
                  Download guest lists and RSVP data for your caterer, venue, and seating chart.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">🔒 Keep Tokens Secure</h4>
                <p className="text-muted-foreground">
                  Each guest's RSVP token is unique - don't share tokens publicly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
