"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createAnnouncement } from "@/lib/actions/announcement-actions"
import { Loader2, Check } from "lucide-react"

export function AnnouncementForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const result = await createAnnouncement({ title, content })

    if (result.success) {
      setSuccess(true)
      setTitle("")
      setContent("")
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(result.error || "Failed to create announcement")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Important Update"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="content">Message</Label>
        <Textarea
          id="content"
          placeholder="Share important information with your guests..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 min-h-32"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {success && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Check className="h-4 w-4" />
          Announcement created successfully!
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Announcement"
        )}
      </Button>
    </form>
  )
}
