"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendRSVPConfirmationEmail } from "./notification-actions"

interface RSVPData {
  guestId: string
  rsvps: Record<
    string,
    {
      status: string
      meal_choice: string
      plus_ones: number
      plus_one_names: string[]
      special_requests: string
    }
  >
  dietaryRestrictions: string
}

export async function submitRSVP(data: RSVPData) {
  try {
    const supabase = await getSupabaseServerClient()

    // Update guest dietary restrictions
    const { error: guestError } = await supabase
      .from("guests")
      .update({
        dietary_restrictions: data.dietaryRestrictions,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.guestId)

    if (guestError) {
      console.error("[v0] Error updating guest:", guestError)
      return { success: false, error: "Failed to update guest information" }
    }

    // Upsert RSVPs for each event
    const rsvpPromises = Object.entries(data.rsvps).map(([eventId, rsvpData]) => {
      return supabase
        .from("rsvps")
        .upsert(
          {
            guest_id: data.guestId,
            event_id: eventId,
            status: rsvpData.status,
            meal_choice: rsvpData.meal_choice,
            plus_ones: rsvpData.plus_ones,
            plus_one_names: rsvpData.plus_one_names,
            special_requests: rsvpData.special_requests,
            submitted_at: new Date().toISOString(),
          },
          {
            onConflict: "guest_id,event_id",
          },
        )
        .select()
    })

    const results = await Promise.all(rsvpPromises)

    // Check for errors
    const errors = results.filter((r) => r.error)
    if (errors.length > 0) {
      console.error("[v0] Error upserting RSVPs:", errors)
      return { success: false, error: "Failed to save RSVP responses" }
    }

    const emailPromises = results
      .filter((r) => r.data && r.data.length > 0)
      .map((r) => sendRSVPConfirmationEmail(r.data[0].id))

    await Promise.all(emailPromises)

    revalidatePath("/rsvp")
    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in submitRSVP:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
