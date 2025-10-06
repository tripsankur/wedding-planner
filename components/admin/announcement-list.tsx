"use client"

import { Button } from "@/components/ui/button"
import { deleteAnnouncement } from "@/lib/actions/announcement-actions"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"

interface Announcement {
  id: string
  title: string
  content: string
  created_at: string
}

export function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return

    setLoading(id)
    await deleteAnnouncement(id)
    setLoading(null)
  }

  if (announcements.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No announcements yet</p>
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="p-4 border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold">{announcement.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(announcement.id)}
              disabled={loading === announcement.id}
            >
              {loading === announcement.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(announcement.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      ))}
    </div>
  )
}
