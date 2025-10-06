"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

interface Photo {
  id: string
  url: string
  caption: string | null
  created_at: string
  guests: {
    first_name: string
    last_name: string
  } | null
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.url || "/placeholder.svg"}
              alt={photo.caption || "Wedding photo"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.caption || "Wedding photo"}
                  fill
                  className="object-contain"
                />
              </div>
              {selectedPhoto.caption && <p className="text-lg">{selectedPhoto.caption}</p>}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Shared by {selectedPhoto.guests?.first_name} {selectedPhoto.guests?.last_name}
                </span>
                <span>
                  {new Date(selectedPhoto.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
