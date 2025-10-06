"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { uploadPhoto } from "@/lib/actions/photo-actions"
import { Upload, Loader2, Check } from "lucide-react"

export function PhotoUploadDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("caption", caption)

    const result = await uploadPhoto(formData)

    if (result.success) {
      setSuccess(true)
      setCaption("")
      setFile(null)
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
      }, 2000)
    } else {
      setError(result.error || "Failed to upload photo")
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Photo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Max file size: 10MB</p>
          </div>

          <div>
            <Label htmlFor="caption">Caption (optional)</Label>
            <Textarea
              id="caption"
              placeholder="Add a caption to your photo..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Check className="h-4 w-4" />
              Photo uploaded! It will appear after approval.
            </div>
          )}

          <Button type="submit" disabled={loading || !file} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Photo"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Photos will be reviewed before appearing in the gallery
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
