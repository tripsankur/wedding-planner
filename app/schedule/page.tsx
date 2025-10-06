import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Download } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function SchedulePage() {
  const supabase = await getSupabaseServerClient()

  const { data: events } = await supabase.from("events").select("*").order("display_order", { ascending: true })

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Event Schedule</h1>
            <p className="text-xl text-muted-foreground">Join us for a weekend of celebration</p>
          </div>

          {/* Events Timeline */}
          <div className="space-y-6">
            {events?.map((event, index) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.event_date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    {event.calendar_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={event.calendar_link} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                  {event.address && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Address:</strong> {event.address}
                    </p>
                  )}
                  {event.dress_code && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Dress Code:</strong> {event.dress_code}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Important Notes</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Please arrive 15 minutes early for the ceremony</li>
                <li>• Parking is available at all venues</li>
                <li>• Shuttle service will be provided between venues</li>
                <li>• For questions, please contact us through the RSVP page</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
