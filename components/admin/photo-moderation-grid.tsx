"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { approvePhoto, deletePhoto } from "@/lib/actions/photo-actions"
import { Check, Trash2, Loader2 } from "lucide-react"

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

export function PhotoModerationGrid({ photos, approved = false }: { photos: Photo[]; approved?: boolean }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleApprove = async (photoId: string) => {
    setLoading(photoId)
    await approvePhoto(photoId)
    setLoading(null)
  }

  const handleDelete = async (photoId: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return

    setLoading(photoId)
    await deletePhoto(photoId)
    setLoading(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <Card key={photo.id}>
          <CardContent className="p-4">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
              <Image
                src={photo.url || "/placeholder.svg"}
                alt={photo.caption || "Wedding photo"}
                fill
                className="object-cover"
              />
            </div>

            {photo.caption && <p className="text-sm mb-2 line-clamp-2">{photo.caption}</p>}

            <div className="text-xs text-muted-foreground mb-3">
              <p>
                Uploaded by {photo.guests?.first_name} {photo.guests?.last_name}
              </p>
              <p>
                {new Date(photo.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-2">
              {!approved && (
                <Button
                  onClick={() => handleApprove(photo.id)}
                  disabled={loading === photo.id}
                  size="sm"
                  className="flex-1"
                >
                  {loading === photo.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => handleDelete(photo.id)}
                disabled={loading === photo.id}
                variant="destructive"
                size="sm"
                className={approved ? "flex-1" : ""}
              >
                {loading === photo.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
