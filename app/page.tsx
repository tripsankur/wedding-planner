import { Navigation } from "@/components/navigation"
import { Countdown } from "@/components/countdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, MapPin, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=romantic+wedding+venue+sunset)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">Ankita & Davel</h1>
          <p className="text-xl md:text-2xl text-foreground mb-8">are getting married</p>
          <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-muted-foreground mb-12">
            <Calendar className="h-5 w-5" />
            <span>March 28, 2025</span>
            <span className="mx-2">•</span>
            <MapPin className="h-5 w-5" />
            <span>Reception Venue</span>
          </div>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/rsvp">RSVP Now</Link>
          </Button>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Counting Down</h2>
          <p className="text-center text-muted-foreground mb-12">Until we say "I do"</p>
          <Countdown targetDate="2025-03-28T18:30:00" />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3">How We Met</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We met on a rainy Tuesday at a coffee shop in downtown. Ankita was reading her favorite book, and
                  Davel accidentally spilled his coffee on her table. What started as an awkward apology turned into
                  hours of conversation and the beginning of our beautiful journey together.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3">The Proposal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Three years later, Davel took Ankita back to that same coffee shop. As they sat at "their table," he
                  got down on one knee and asked her to spend forever with him. Through happy tears, she said yes, and
                  we've been planning this special day ever since.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Wedding Details</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                <p className="text-muted-foreground mb-4">View the full timeline of events</p>
                <Button asChild variant="outline">
                  <Link href="/schedule">View Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Travel</h3>
                <p className="text-muted-foreground mb-4">Hotels and directions</p>
                <Button asChild variant="outline">
                  <Link href="/travel">Travel Info</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Registry</h3>
                <p className="text-muted-foreground mb-4">Help us start our journey</p>
                <Button asChild variant="outline">
                  <Link href="/registry">View Registry</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Ankita & Davel. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link href="/admin/login" className="hover:text-primary transition-colors">
              Admin Login
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
