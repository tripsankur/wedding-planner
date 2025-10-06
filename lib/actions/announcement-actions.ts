"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createAnnouncement({ title, content }: { title: string; content: string }) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("announcements").insert({
      title,
      content,
    })

    if (error) {
      console.error("[v0] Error creating announcement:", error)
      return { success: false, error: "Failed to create announcement" }
    }

    revalidatePath("/admin/announcements")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error creating announcement:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("announcements").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting announcement:", error)
      return { success: false, error: "Failed to delete announcement" }
    }

    revalidatePath("/admin/announcements")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting announcement:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
