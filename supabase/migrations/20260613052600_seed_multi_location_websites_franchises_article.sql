-- Seed: Multi Location Websites for Franchises article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Multi Location Websites for Franchises: The 2026 Web Architecture Playbook',
  'Local SEO',
  'multi-location-websites-for-franchises',
  '/images/article-multi-location-websites-franchises-thumbnail.webp',
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
