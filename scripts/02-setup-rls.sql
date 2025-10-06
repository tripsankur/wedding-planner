-- Enable Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_groups ENABLE ROW LEVEL SECURITY;

-- Guests can read their own data
CREATE POLICY "Guests can read own data"
  ON guests FOR SELECT
  USING (access_token = current_setting('app.current_token', true));

-- Guests can update their own data
CREATE POLICY "Guests can update own data"
  ON guests FOR UPDATE
  USING (access_token = current_setting('app.current_token', true));

-- Guests can read their own RSVPs
CREATE POLICY "Guests can read own RSVPs"
  ON rsvps FOR SELECT
  USING (guest_id IN (
    SELECT id FROM guests WHERE access_token = current_setting('app.current_token', true)
  ));

-- Guests can insert their own RSVPs
CREATE POLICY "Guests can insert own RSVPs"
  ON rsvps FOR INSERT
  WITH CHECK (guest_id IN (
    SELECT id FROM guests WHERE access_token = current_setting('app.current_token', true)
  ));

-- Guests can update their own RSVPs
CREATE POLICY "Guests can update own RSVPs"
  ON rsvps FOR UPDATE
  USING (guest_id IN (
    SELECT id FROM guests WHERE access_token = current_setting('app.current_token', true)
  ));

-- Everyone can read published events
CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  USING (true);

-- Everyone can read published announcements
CREATE POLICY "Anyone can read published announcements"
  ON announcements FOR SELECT
  USING (published = true);

-- Guests can upload photos
CREATE POLICY "Guests can insert photos"
  ON photos FOR INSERT
  WITH CHECK (guest_id IN (
    SELECT id FROM guests WHERE access_token = current_setting('app.current_token', true)
  ));

-- Everyone can read approved photos
CREATE POLICY "Anyone can read approved photos"
  ON photos FOR SELECT
  USING (approved = true);

-- Guests can read their own groups
CREATE POLICY "Guests can read own group"
  ON guest_groups FOR SELECT
  USING (id IN (
    SELECT group_id FROM guests WHERE access_token = current_setting('app.current_token', true)
  ));
