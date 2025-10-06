-- Insert sample events
-- Updated to single reception event on March 28, 2025 at 6:30 PM
INSERT INTO events (title, description, event_date, event_time, location, address, dress_code, display_order) VALUES
  ('Reception', 'Join us for an evening of celebration, dinner, and dancing as we begin our journey together.', '2025-03-28', '18:30:00', 'Reception Venue', 'Venue Address - To Be Updated', 'Formal', 1)
ON CONFLICT DO NOTHING;

-- Insert sample guest group
INSERT INTO guest_groups (name, max_plus_ones) VALUES
  ('Family', 2),
  ('Friends', 1),
  ('Individual Guests', 0)
ON CONFLICT DO NOTHING;
