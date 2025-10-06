"use client"

// Temporary admin auth until Supabase is connected
const ADMIN_KEY = "wedding_admin_session"

export function setAdminSession(email: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ email, timestamp: Date.now() }))
  }
}

export function getAdminSession() {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem(ADMIN_KEY)
    return session ? JSON.parse(session) : null
  }
  return null
}

export function clearAdminSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_KEY)
  }
}

export function isAdminAuthenticated(): boolean {
  const session = getAdminSession()
  return !!session
}
