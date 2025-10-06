import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ExternalLink, Heart } from "lucide-react"

export default function RegistryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Registry</h1>
            <p className="text-xl text-muted-foreground">
              Your presence is the greatest gift, but if you wish to help us start our journey together, we've
              registered at the following stores.
            </p>
          </div>

          {/* Registry Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Amazon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Find everything from kitchen essentials to home decor on our Amazon registry.
                </p>
                <Button asChild className="w-full">
                  <a href="https://amazon.com/wedding/registry" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Registry
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Crate & Barrel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse our curated selection of home furnishings and kitchenware.
                </p>
                <Button asChild className="w-full">
                  <a href="https://crateandbarrel.com/registry" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Registry
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Target</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Everyday essentials and more for our new home together.</p>
                <Button asChild className="w-full">
                  <a href="https://target.com/gift-registry" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Registry
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Honeymoon Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Help us create unforgettable memories on our honeymoon in Italy.
                </p>
                <Button asChild className="w-full">
                  <a href="https://honeyfund.com/sarahandmichael" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Contribute
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Thank You Message */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Thank You</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are so grateful for your love and support as we begin this new chapter. Your presence at our wedding
                means the world to us, and any gift you choose to give is deeply appreciated. We can't wait to celebrate
                with you!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
