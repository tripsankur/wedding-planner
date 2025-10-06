import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentGuest } from "@/lib/auth/guest-auth"
import { PhotoUploadDialog } from "@/components/gallery/photo-upload-dialog"
import { PhotoGrid } from "@/components/gallery/photo-grid"
import { Camera, Upload } from "lucide-react"

export default async function GalleryPage() {
  const supabase = await getSupabaseServerClient()
  const guest = await getCurrentGuest()

  // Get approved photos
  const { data: photos } = await supabase
    .from("photos")
    .select("*, guests(first_name, last_name)")
    .eq("approved", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl text-muted-foreground mb-6">Share your favorite moments from our special day</p>

            {guest && <PhotoUploadDialog />}
          </div>

          {/* Upload Instructions */}
          {!guest && (
            <Card className="mb-8 max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Upload className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Want to share your photos?</h3>
                <p className="text-muted-foreground mb-4">
                  Sign in with your RSVP access code to upload photos from the wedding.
                </p>
                <Button asChild>
                  <a href="/rsvp">Sign In to Upload</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Photo Grid */}
          {photos && photos.length > 0 ? (
            <PhotoGrid photos={photos} />
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No photos yet</h3>
                <p className="text-muted-foreground">Be the first to share a memory from the wedding!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
