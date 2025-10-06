"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentGuest } from "@/lib/auth/guest-auth"
import { put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { sendPhotoApprovalEmail } from "./notification-actions"

export async function uploadPhoto(formData: FormData) {
  try {
    const guest = await getCurrentGuest()

    if (!guest) {
      return { success: false, error: "You must be signed in to upload photos" }
    }

    const file = formData.get("file") as File
    const caption = formData.get("caption") as string

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 10MB" }
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" }
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    })

    // Save to database
    const supabase = await getSupabaseServerClient()
    const { error: dbError } = await supabase.from("photos").insert({
      guest_id: guest.id,
      url: blob.url,
      caption: caption || null,
      approved: false, // Requires admin approval
    })

    if (dbError) {
      console.error("[v0] Error saving photo to database:", dbError)
      return { success: false, error: "Failed to save photo" }
    }

    revalidatePath("/gallery")
    revalidatePath("/admin/photos")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error uploading photo:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function approvePhoto(photoId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("photos").update({ approved: true }).eq("id", photoId)

    if (error) {
      console.error("[v0] Error approving photo:", error)
      return { success: false, error: "Failed to approve photo" }
    }

    await sendPhotoApprovalEmail(photoId)

    revalidatePath("/gallery")
    revalidatePath("/admin/photos")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error approving photo:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deletePhoto(photoId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("photos").delete().eq("id", photoId)

    if (error) {
      console.error("[v0] Error deleting photo:", error)
      return { success: false, error: "Failed to delete photo" }
    }

    revalidatePath("/gallery")
    revalidatePath("/admin/photos")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting photo:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
