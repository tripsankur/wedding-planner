"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateGuestToken } from "@/lib/auth/guest-auth"
import { Loader2 } from "lucide-react"

export function TokenAccessForm() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await validateGuestToken(token.trim())

    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || "Invalid access code")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="token">Access Code</Label>
        <Input
          id="token"
          type="text"
          placeholder="Enter your access code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          className="mt-1"
        />
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Access RSVP"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Can't find your access code? Please contact us at{" "}
        <a href="mailto:wedding@sarahandmichael.com" className="text-primary hover:underline">
          wedding@sarahandmichael.com
        </a>
      </p>
    </form>
  )
}
