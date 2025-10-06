-- Add venues table for location details
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  google_maps_link TEXT,
  description TEXT,
  parking_info TEXT,
  venue_type TEXT CHECK (venue_type IN ('ceremony', 'reception', 'hotel', 'other')) DEFAULT 'other',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add travel_info table for hotels and travel details
CREATE TABLE IF NOT EXISTS travel_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('hotel', 'airport', 'transportation', 'other')) DEFAULT 'other',
  description TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  booking_code TEXT,
  special_rate TEXT,
  distance_from_venue TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add registry_links table
CREATE TABLE IF NOT EXISTS registry_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add site_content table for dynamic content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT UNIQUE NOT NULL,
  content_value TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site content
INSERT INTO site_content (content_key, content_value, content_type) VALUES
  ('bride_name', 'Ankita Sawant', 'text'),
  ('groom_name', 'Davel Shivach', 'text'),
  ('wedding_date', '2025-03-28', 'date'),
  ('wedding_time', '18:30', 'time'),
  ('hero_subtitle', 'Join us as we celebrate our love', 'text'),
  ('couple_story', 'Our love story began...', 'textarea'),
  ('home_welcome_text', 'We are so excited to celebrate this special day with you!', 'textarea')
ON CONFLICT (content_key) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_venues_type ON venues(venue_type);
CREATE INDEX IF NOT EXISTS idx_travel_category ON travel_info(category);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
