"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInAdmin, signUpAdmin } from "@/lib/auth/admin-auth"
import { Loader2 } from "lucide-react"

export function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = mode === "signin" ? await signInAdmin(email, password) : await signUpAdmin(email, password)

    if (result.success) {
      if (mode === "signup") {
        setError("Admin account created! Please check your email to verify, then sign in.")
        setMode("signin")
        setLoading(false)
      } else {
        router.push("/admin")
        router.refresh()
      }
    } else {
      setError(result.error || "Invalid credentials")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        {error && (
          <p className={`text-sm ${error.includes("created") ? "text-green-600" : "text-destructive"}`}>{error}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Create Admin Account"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin")
            setError("")
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {mode === "signin" ? "First time? Create admin account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}
