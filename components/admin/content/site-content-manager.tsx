"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function SiteContentManager() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState({
    bride_name: "Ankita Sawant",
    groom_name: "Davel Shivach",
    wedding_date: "2025-03-28",
    wedding_time: "18:30",
    hero_subtitle: "Join us as we celebrate our love",
    home_welcome_text: "We are so excited to celebrate this special day with you!",
    couple_story: "Our love story began...",
  })

  async function handleSave() {
    setLoading(true)
    localStorage.setItem("wedding_content", JSON.stringify(content))
    setTimeout(() => {
      setLoading(false)
      alert("Content saved! (Connect Supabase to persist data)")
    }, 500)
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
              value={content.bride_name}
              onChange={(e) => setContent({ ...content, bride_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groom_name">Groom's Name</Label>
            <Input
              id="groom_name"
              value={content.groom_name}
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
              value={content.wedding_date}
              onChange={(e) => setContent({ ...content, wedding_date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wedding_time">Wedding Time</Label>
            <Input
              id="wedding_time"
              type="time"
              value={content.wedding_time}
              onChange={(e) => setContent({ ...content, wedding_time: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
          <Input
            id="hero_subtitle"
            value={content.hero_subtitle}
            onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
            placeholder="Join us as we celebrate our love"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="home_welcome_text">Welcome Message</Label>
          <Textarea
            id="home_welcome_text"
            value={content.home_welcome_text}
            onChange={(e) => setContent({ ...content, home_welcome_text: e.target.value })}
            rows={3}
            placeholder="We are so excited to celebrate this special day with you!"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="couple_story">Your Story</Label>
          <Textarea
            id="couple_story"
            value={content.couple_story}
            onChange={(e) => setContent({ ...content, couple_story: e.target.value })}
            rows={6}
            placeholder="Tell your love story..."
          />
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Connect Supabase integration to persist data permanently
        </p>
      </CardContent>
    </Card>
  )
}
