"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function validateGuestToken(token: string) {
  const supabase = await getSupabaseServerClient()

  const { data: guest, error } = await supabase
    .from("guests")
    .select("*, guest_groups(*)")
    .eq("access_token", token)
    .single()

  if (error || !guest) {
    return { success: false, error: "Invalid access token" }
  }

  // Store token in cookie
  const cookieStore = await cookies()
  cookieStore.set("guest_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return { success: true, guest }
}

export async function getCurrentGuest() {
  const cookieStore = await cookies()
  const token = cookieStore.get("guest_token")?.value

  if (!token) {
    return null
  }

  const supabase = await getSupabaseServerClient()

  const { data: guest } = await supabase.from("guests").select("*, guest_groups(*)").eq("access_token", token).single()

  return guest
}

export async function logoutGuest() {
  const cookieStore = await cookies()
  cookieStore.delete("guest_token")
  return { success: true }
}
