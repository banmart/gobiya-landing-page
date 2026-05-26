-- Seed: Local SEO for Los Angeles Businesses article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Local SEO for Los Angeles Businesses: How the 2026 Algorithm and AI Layer Determine Who Gets Found',
  'Local SEO',
  'local-seo-los-angeles',
  '/images/article-local-seo-los-angeles.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
