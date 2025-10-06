"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email/send-email"
import {
  getInvitationEmailTemplate,
  getRSVPConfirmationEmailTemplate,
  getPhotoApprovalEmailTemplate,
} from "@/lib/email/templates"

const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function sendInvitationEmail(guestId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: guest, error } = await supabase.from("guests").select("*").eq("id", guestId).single()

    if (error || !guest) {
      return { success: false, error: "Guest not found" }
    }

    const guestName = `${guest.first_name} ${guest.last_name}`
    const template = getInvitationEmailTemplate(guestName, guest.access_token, WEBSITE_URL)

    const result = await sendEmail({
      to: guest.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    if (result.success) {
      // Update guest record to mark invitation as sent
      await supabase
        .from("guests")
        .update({
          invitation_sent: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", guestId)
    }

    return result
  } catch (error) {
    console.error("[v0] Error sending invitation email:", error)
    return { success: false, error: "Failed to send invitation" }
  }
}

export async function sendRSVPConfirmationEmail(rsvpId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: rsvp, error } = await supabase
      .from("rsvps")
      .select("*, guests(first_name, last_name, email), events(title)")
      .eq("id", rsvpId)
      .single()

    if (error || !rsvp) {
      return { success: false, error: "RSVP not found" }
    }

    const guestName = `${rsvp.guests.first_name} ${rsvp.guests.last_name}`
    const template = getRSVPConfirmationEmailTemplate(guestName, rsvp.status, rsvp.events.title)

    return await sendEmail({
      to: rsvp.guests.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  } catch (error) {
    console.error("[v0] Error sending RSVP confirmation:", error)
    return { success: false, error: "Failed to send confirmation" }
  }
}

export async function sendPhotoApprovalEmail(photoId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: photo, error } = await supabase
      .from("photos")
      .select("*, guests(first_name, last_name, email)")
      .eq("id", photoId)
      .single()

    if (error || !photo) {
      return { success: false, error: "Photo not found" }
    }

    const guestName = `${photo.guests.first_name} ${photo.guests.last_name}`
    const template = getPhotoApprovalEmailTemplate(guestName, WEBSITE_URL)

    return await sendEmail({
      to: photo.guests.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  } catch (error) {
    console.error("[v0] Error sending photo approval email:", error)
    return { success: false, error: "Failed to send notification" }
  }
}
