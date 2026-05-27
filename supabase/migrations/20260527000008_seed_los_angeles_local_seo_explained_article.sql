-- Seed: Los Angeles Local SEO Explained article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Los Angeles Local SEO Explained: The Operational Cadence Required for Search Dominance',
  'Local SEO',
  'los-angeles-local-seo-explained',
  '/images/article-los-angeles-local-seo-explained.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
