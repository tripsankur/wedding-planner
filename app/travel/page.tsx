import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Hotel, Plane, Car, Phone, ExternalLink } from "lucide-react"

export default function TravelPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel & Stay</h1>
            <p className="text-xl text-muted-foreground">Everything you need to know for your visit</p>
          </div>

          {/* Venue Location */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Venue Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Sunset Gardens</h3>
                  <p className="text-muted-foreground">456 Garden Ave, City, State 12345</p>
                </div>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img src="/map-location-pin.png" alt="Venue Map" className="w-full h-full object-cover" />
                </div>
                <Button asChild className="w-full">
                  <a
                    href="https://maps.google.com/?q=456+Garden+Ave+City+State+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Accommodations */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Hotel className="h-8 w-8 text-primary" />
              Accommodations
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>The Grand Hotel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">789 Hotel Blvd, City, State 12345</p>
                    <p className="text-sm">Our preferred hotel with a special room block for wedding guests.</p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-semibold mb-1">Group Code: SARAHMICHAEL2025</p>
                      <p className="text-sm text-muted-foreground">$159/night (expires May 21, 2025)</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>(555) 123-4567</span>
                    </div>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href="https://example.com/hotel" target="_blank" rel="noopener noreferrer">
                        Book Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Garden Inn & Suites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">321 Park Street, City, State 12345</p>
                    <p className="text-sm">A charming boutique hotel just minutes from the venue.</p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-semibold mb-1">Group Code: SM2025</p>
                      <p className="text-sm text-muted-foreground">$139/night (expires May 21, 2025)</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>(555) 987-6543</span>
                    </div>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href="https://example.com/hotel2" target="_blank" rel="noopener noreferrer">
                        Book Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Getting There */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  By Air
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">City International Airport (CIA)</h4>
                    <p className="text-sm text-muted-foreground">20 miles from venue (30 min drive)</p>
                  </div>
                  <p className="text-sm">
                    The closest airport with direct flights from most major cities. Rental cars, taxis, and rideshare
                    services are available.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  By Car
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">Free parking is available at all venues.</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>From North:</strong> Take I-95 South to Exit 42
                    </p>
                    <p>
                      <strong>From South:</strong> Take I-95 North to Exit 42
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Things to Do</h3>
              <p className="text-muted-foreground mb-4">While you're in town, check out these local favorites:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Downtown Historic District - charming shops and restaurants</li>
                <li>• City Botanical Gardens - beautiful walking trails</li>
                <li>• Riverside Park - perfect for morning jogs</li>
                <li>• Local Winery Tours - book in advance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
