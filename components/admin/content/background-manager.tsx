"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Palette } from "lucide-react"

const backgroundPresets = [
  {
    id: "indian-warm",
    name: "Indian Warm",
    description: "Traditional warm colors with rose, orange, and amber",
    gradient: "from-rose-50 via-orange-50 to-amber-50",
    preview: "linear-gradient(to bottom right, #fff1f2, #ffedd5, #fef3c7)",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Elegant purple and gold tones",
    gradient: "from-purple-50 via-pink-50 to-amber-50",
    preview: "linear-gradient(to bottom right, #faf5ff, #fdf2f8, #fef3c7)",
  },
  {
    id: "emerald-gold",
    name: "Emerald & Gold",
    description: "Rich emerald green with golden accents",
    gradient: "from-emerald-50 via-teal-50 to-yellow-50",
    preview: "linear-gradient(to bottom right, #ecfdf5, #f0fdfa, #fefce8)",
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    description: "Vibrant sunset colors",
    gradient: "from-orange-100 via-red-50 to-pink-100",
    preview: "linear-gradient(to bottom right, #ffedd5, #fef2f2, #fce7f3)",
  },
  {
    id: "peacock-blue",
    name: "Peacock Blue",
    description: "Deep blue with turquoise highlights",
    gradient: "from-blue-50 via-cyan-50 to-teal-50",
    preview: "linear-gradient(to bottom right, #eff6ff, #ecfeff, #f0fdfa)",
  },
  {
    id: "marigold-festival",
    name: "Marigold Festival",
    description: "Bright marigold orange and yellow",
    gradient: "from-yellow-100 via-orange-100 to-amber-100",
    preview: "linear-gradient(to bottom right, #fef9c3, #ffedd5, #fef3c7)",
  },
]

export function BackgroundManager() {
  const [selectedBg, setSelectedBg] = useState("indian-warm")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load saved background preference
    const saved = localStorage.getItem("wedding_background")
    if (saved) {
      setSelectedBg(saved)
    }
  }, [])

  function handleSave() {
    setLoading(true)
    // Save to localStorage
    localStorage.setItem("wedding_background", selectedBg)

    // Update CSS variable on root
    const selected = backgroundPresets.find((bg) => bg.id === selectedBg)
    if (selected) {
      document.documentElement.style.setProperty("--wedding-bg-gradient", selected.gradient)
    }

    setTimeout(() => {
      setLoading(false)
      window.location.reload() // Reload to apply changes
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Background Themes
        </CardTitle>
        <CardDescription>Choose a colorful background theme for your wedding website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedBg} onValueChange={setSelectedBg}>
          <div className="grid md:grid-cols-2 gap-4">
            {backgroundPresets.map((preset) => (
              <div key={preset.id} className="relative">
                <RadioGroupItem value={preset.id} id={preset.id} className="peer sr-only" />
                <Label
                  htmlFor={preset.id}
                  className="flex flex-col gap-3 rounded-lg border-2 border-muted bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <div className="h-24 rounded-md border" style={{ background: preset.preview }} />
                  <div>
                    <div className="font-semibold">{preset.name}</div>
                    <div className="text-sm text-muted-foreground">{preset.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <Button onClick={handleSave} disabled={loading} className="w-full" size="lg">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Apply Background Theme
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          The selected background will be applied across all pages of your wedding website
        </p>
      </CardContent>
    </Card>
  )
}
