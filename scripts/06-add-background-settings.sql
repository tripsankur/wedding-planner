-- Add background settings to site_content table
INSERT INTO site_content (content_key, content_value, content_type) VALUES
  ('background_theme', 'indian-warm', 'text'),
  ('background_gradient', 'from-rose-50 via-orange-50 to-amber-50', 'text')
ON CONFLICT (content_key) DO NOTHING;
