export interface Guest {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  group_id: string | null
  access_token: string
  tags: string[]
  dietary_restrictions: string | null
  notes: string | null
  created_at: string
  updated_at: string
  guest_groups?: GuestGroup
}

export interface GuestGroup {
  id: string
  name: string
  max_plus_ones: number
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string
  event_time: string
  location: string
  address: string | null
  dress_code: string | null
  calendar_link: string | null
  display_order: number
  created_at: string
}

export interface RSVP {
  id: string
  guest_id: string
  event_id: string
  status: "attending" | "not_attending" | "pending"
  meal_choice: string | null
  plus_ones: number
  plus_one_names: string[]
  special_requests: string | null
  submitted_at: string | null
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  target_tags: string[]
  published: boolean
  created_at: string
}

export interface Photo {
  id: string
  guest_id: string | null
  url: string
  caption: string | null
  approved: boolean
  created_at: string
}
