import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase.from("site_content").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const supabase = await getSupabaseServerClient()
  const content = await request.json()

  // Update each content key
  for (const [key, value] of Object.entries(content)) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ content_key: key, content_value: value as string, updated_at: new Date().toISOString() })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
