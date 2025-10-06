-- RLS policies for new content tables

-- Venues policies
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view venues"
  ON venues FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage venues"
  ON venues FOR ALL
  USING (auth.role() = 'authenticated');

-- Travel info policies
ALTER TABLE travel_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view travel info"
  ON travel_info FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage travel info"
  ON travel_info FOR ALL
  USING (auth.role() = 'authenticated');

-- Registry links policies
ALTER TABLE registry_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view registry links"
  ON registry_links FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage registry links"
  ON registry_links FOR ALL
  USING (auth.role() = 'authenticated');

-- Site content policies
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage site content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated');
