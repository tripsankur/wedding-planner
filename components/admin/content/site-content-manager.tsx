"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function SiteContentManager() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<Record<string, string>>({})
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const response = await fetch("/api/admin/content")
      const data = await response.json()
      const contentMap: Record<string, string> = {}
      data.forEach((item: any) => {
        contentMap[item.content_key] = item.content_value
      })
      setContent(contentMap)
    } catch (error) {
      toast({ title: "Error loading content", variant: "destructive" })
    }
  }

  async function handleSave() {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        toast({ title: "Content saved successfully!" })
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({ title: "Error saving content", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Information</CardTitle>
        <CardDescription>Update your wedding website's main content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bride_name">Bride's Name</Label>
            <Input
              id="bride_name"
              value={content.bride_name || ""}
              onChange={(e) => setContent({ ...content, bride_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groom_name">Groom's Name</Label>
            <Input
              id="groom_name"
              value={content.groom_name || ""}
              onChange={(e) => setContent({ ...content, groom_name: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wedding_date">Wedding Date</Label>
            <Input
              id="wedding_date"
              type="date"
              value={content.wedding_date || ""}
              onChange={(e) => setContent({ ...content, wedding_date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wedding_time">Wedding Time</Label>
            <Input
              id="wedding_time"
              type="time"
              value={content.wedding_time || ""}
              onChange={(e) => setContent({ ...content, wedding_time: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
          <Input
            id="hero_subtitle"
            value={content.hero_subtitle || ""}
            onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
            placeholder="Join us as we celebrate our love"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="home_welcome_text">Welcome Message</Label>
          <Textarea
            id="home_welcome_text"
            value={content.home_welcome_text || ""}
            onChange={(e) => setContent({ ...content, home_welcome_text: e.target.value })}
            rows={3}
            placeholder="We are so excited to celebrate this special day with you!"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="couple_story">Your Story</Label>
          <Textarea
            id="couple_story"
            value={content.couple_story || ""}
            onChange={(e) => setContent({ ...content, couple_story: e.target.value })}
            rows={6}
            placeholder="Tell your love story..."
          />
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
